import { useState, useEffect, useCallback, useRef } from "react";
import { TextLayer, TEMPLATES } from "../data";

interface UseCertificateDesignerReturn {
  layers: TextLayer[];
  setLayers: React.Dispatch<React.SetStateAction<TextLayer[]>>;
  selectedLayerId: string | null;
  setSelectedLayerId: React.Dispatch<React.SetStateAction<string | null>>;
  backgroundImage: string | null;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string | null>>;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  showPageSizeModal: boolean;
 setShowPageSizeModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageSizeSettings: {
    format: string;
    width: number;
    height: number;
    orientation: "portrait" | "landscape";
  };
  setPageSizeSettings: React.Dispatch<
    React.SetStateAction<{
      format: string;
      width: number;
      height: number;
      orientation: "portrait" | "landscape";
    }>
  >;
  panelPosition: { x: number; y: number };
  setPanelPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  showFloatingPanel: boolean;
  setShowFloatingPanel: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateLayer: (id: string, updates: Partial<TextLayer>) => void;
  handleLayerMouseDown: (
    e: React.MouseEvent,
    layerId: string
  ) => void;
  handleLayerDoubleClick: (id: string, newText?: string) => void;
  handleAddVariable: (varLabel: string) => void;
  handleDeleteLayer: (id: string) => void;
 handleBackgroundUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCanvasDragOver: (e: React.DragEvent) => void;
  handleCanvasDrop: (e: React.DragEvent) => void;
  handleLoadTemplate: (templateIndex: number) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleRotate: () => void;
  zoomLevel: number;
  rotation: number;
}

export const useCertificateDesigner = (): UseCertificateDesignerReturn => {
  const [layers, setLayers] = useState<TextLayer[]>(TEMPLATES[0].layers);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("1");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showPageSizeModal, setShowPageSizeModal] = useState(false);
  const [pageSizeSettings, setPageSizeSettings] = useState<{
    format: string;
    width: number;
    height: number;
    orientation: "portrait" | "landscape";
  }>({
    format: "A4",
    width: 210,
    height: 297,
    orientation: "portrait",
  });
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const dragOffset = useRef({ x: 0, y: 0 });
  const draggedLayerId = useRef<string | null>(null);

  const handleUpdateLayer = useCallback(
    (id: string, updates: Partial<TextLayer>) => {
      setLayers((prevLayers) =>
        prevLayers.map((l) => (l.id === id ? { ...l, ...updates } : l))
      );
    },
    []
  );

  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.preventDefault();
    setSelectedLayerId(layerId);
    draggedLayerId.current = layerId;

    const layer = layers.find((l) => l.id === layerId);
    if (!layer) return;

    // Устанавливаем начальную позицию панели
    if (panelPosition.x === 0 && panelPosition.y === 0) {
      const canvasEl = e.currentTarget.parentElement;
      if (canvasEl) {
        const canvasRect = canvasEl.getBoundingClientRect();
        const panelX = e.clientX + 20; // немного правее курсора
        const panelY = e.clientY - 100; // немного выше курсора
        setPanelPosition({ x: panelX, y: panelY });
      }
    }

    setShowFloatingPanel(true);

    const canvasEl = e.currentTarget.parentElement;
    if (!canvasEl) return;

    const canvasRect = canvasEl.getBoundingClientRect();
    const pixelX = layer.x * 3.78; // конвертируем мм в пиксели
    const pixelY = layer.y * 3.78; // конвертируем мм в пиксели
    const offsetX = e.pageX - (canvasRect.left + window.scrollX) - pixelX;
    const offsetY = e.pageY - (canvasRect.top + window.scrollY) - pixelY;

    dragOffset.current = { x: offsetX, y: offsetY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedLayerId.current) return;

      const layer = layers.find((l) => l.id === draggedLayerId.current!);
      if (!layer) return;

      const canvasEl = document.querySelector(".rounded-lg.border-2.border-border");
      if (!canvasEl) return;

      const canvasRect = canvasEl.getBoundingClientRect();
      const newPixelX = Math.max(
        0,
        e.pageX - (canvasRect.left + window.scrollX) - dragOffset.current.x
      );
      const newPixelY = Math.max(
        0,
        e.pageY - (canvasRect.top + window.scrollY) - dragOffset.current.y
      );

      // Преобразуем координаты из пикселей обратно в миллиметры
      const newX = Math.max(0, newPixelX / 3.78); // конвертируем пиксели в мм
      const newY = Math.max(0, newPixelY / 3.78); // конвертируем пиксели в мм

      handleUpdateLayer(draggedLayerId.current, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      draggedLayerId.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [layers, handleUpdateLayer]);

  const handleLayerDoubleClick = (id: string, newText?: string) => {
    if (newText !== undefined) {
      handleUpdateLayer(id, { text: newText });
    }
  };

  const handleAddVariable = (varLabel: string) => {
    const newId = Date.now().toString();
    const newLayer: TextLayer = {
      id: newId,
      text: varLabel,
      x: 105, // центрировано по ширине A4 (210/2)
      y: 20, // смещение сверху
      fontSize: 28,
      fontFamily: "sans-serif",
      color: "#000000",
      alignment: "center",
      width: 300, // ширина в пикселях
    };
    setLayers([...layers, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleDeleteLayer = (id: string) => {
    setLayers(layers.filter((l) => l.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setBackgroundImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Обработка перетаскивания переменных текста
      const varLabel = e.dataTransfer.getData("text/plain");
      if (varLabel) {
        const canvasEl = e.currentTarget;
        if (!canvasEl) return;

        const canvasRect = canvasEl.getBoundingClientRect();
        // Получаем позицию в пикселях
        const pixelX = e.clientX - canvasRect.left;
        const pixelY = e.clientY - canvasRect.top;

        // Преобразуем координаты из пикселей в миллиметры
        const x = Math.max(0, pixelX / 3.78); // конвертируем пиксели в мм
        const y = Math.max(0, pixelY / 3.78); // конвертируем пиксели в мм

        const newId = Date.now().toString();
        const newLayer: TextLayer = {
          id: newId,
          text: varLabel,
          x: x,
          y: y,
          fontSize: 28,
          fontFamily: "sans-serif",
          color: "#000000",
          alignment: "center",
          width: 300, // width остается в пикселях, возможно, его тоже нужно конвертировать
        };
        setLayers([...layers, newLayer]);
        setSelectedLayerId(newId);
      }
    }
 };

  const handleLoadTemplate = (templateIndex: number) => {
    setLayers(TEMPLATES[templateIndex].layers.map((l) => ({ ...l })));
    setSelectedLayerId(null);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2)); // Максимальное увеличение 200%
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Минимальное уменьшение 50%
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return {
    layers,
    setLayers,
    selectedLayerId,
    setSelectedLayerId,
    backgroundImage,
    setBackgroundImage,
    showPreview,
    setShowPreview,
    showPageSizeModal,
    setShowPageSizeModal,
    pageSizeSettings,
    setPageSizeSettings,
    panelPosition,
    setPanelPosition,
    showFloatingPanel,
    setShowFloatingPanel,
    handleUpdateLayer,
    handleLayerMouseDown,
    handleLayerDoubleClick,
    handleAddVariable,
    handleDeleteLayer,
    handleBackgroundUpload,
    handleCanvasDragOver,
    handleCanvasDrop,
    handleLoadTemplate,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    zoomLevel,
    rotation,
  };
};