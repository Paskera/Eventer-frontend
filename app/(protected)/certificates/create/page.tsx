"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, Save, Settings } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TextLayer, TEMPLATES } from "./data"
import Toolbox from "./components/Toolbox"
import Canvas from "./components/Canvas"
import PropertiesPanel from "./components/PropertiesPanel"
import FloatingPropertiesPanel from "./components/FloatingPropertiesPanel"
import PageSizeModal, { PageSizeSettings } from "./components/PageSizeModal"

export default function CertificateDesigner() {
  const [layers, setLayers] = useState<TextLayer[]>(TEMPLATES[0].layers)
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("1")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [draggedLayerId, setDraggedLayerId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showPreview, setShowPreview] = useState(false)
  const [showPageSizeModal, setShowPageSizeModal] = useState(false)
  const [pageSizeSettings, setPageSizeSettings] = useState<PageSizeSettings>({
    format: "A4",
    width: 210,
    height: 297,
    orientation: "portrait"
  })
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);
  const [editingTextLayerId, setEditingTextLayerId] = useState<string | null>(null);

  const selectedLayer = layers.find((l) => l.id === selectedLayerId)

  const handleUpdateLayer = useCallback(
    (id: string, updates: Partial<TextLayer>) => {
      setLayers((prevLayers) =>
        prevLayers.map((l) => (l.id === id ? { ...l, ...updates } : l))
      )
    },
    []
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedLayerId) return

      const layer = layers.find((l) => l.id === draggedLayerId)
      if (!layer) return

      const canvasEl = document.querySelector(".rounded-lg.border-2.border-border")
      if (!canvasEl) return

      const canvasRect = canvasEl.getBoundingClientRect()
      const newPixelX = Math.max(
        0,
        e.pageX - (canvasRect.left + window.scrollX) - dragOffset.x
      )
      const newPixelY = Math.max(
        0,
        e.pageY - (canvasRect.top + window.scrollY) - dragOffset.y
      )

      // Преобразуем координаты из пикселей обратно в миллиметры
      const newX = Math.max(0, newPixelX / 3.78); // конвертируем пиксели в мм
      const newY = Math.max(0, newPixelY / 3.78); // конвертируем пиксели в мм

      handleUpdateLayer(draggedLayerId, { x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setDraggedLayerId(null)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggedLayerId, dragOffset, layers, handleUpdateLayer])

  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.preventDefault()
    setSelectedLayerId(layerId)
    setDraggedLayerId(layerId)

    const layer = layers.find((l) => l.id === layerId)
    if (!layer) return

    // Проверяем, есть ли уже сохраненная позиция панели
    // Если нет, устанавливаем начальную позицию рядом с элементом
    if (panelPosition.x === 0 && panelPosition.y === 0) {
      const canvasEl = e.currentTarget.parentElement
      if (canvasEl) {
        const canvasRect = canvasEl.getBoundingClientRect()
        const panelX = e.clientX + 20 // немного правее курсора
        const panelY = e.clientY - 100 // немного выше курсора
        setPanelPosition({ x: panelX, y: panelY })
      }
    }

    setShowFloatingPanel(true)

    const canvasEl = e.currentTarget.parentElement;
    if (!canvasEl) return;
    
    const canvasRect = canvasEl.getBoundingClientRect();
    const pixelX = layer.x * 3.78; // конвертируем мм в пиксели
    const pixelY = layer.y * 3.78; // конвертируем мм в пиксели
    const offsetX = e.pageX - (canvasRect.left + window.scrollX) - pixelX
    const offsetY = e.pageY - (canvasRect.top + window.scrollY) - pixelY

    setDragOffset({ x: offsetX, y: offsetY })
  }
  const handleLayerDoubleClick = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (!layer) return;

    const newText = prompt("Введите новый текст:", layer.text);
    if (newText !== null) {
      handleUpdateLayer(layerId, { text: newText });
    }
  };

  const handleAddVariable = (varLabel: string) => {
    const newId = Date.now().toString()
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
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newId)
  }

  const handleDeleteLayer = (id: string) => {
    setLayers(layers.filter((l) => l.id !== id))
    if (selectedLayerId === id) {
      setSelectedLayerId(null)
    }
  }

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setBackgroundImage(event.target?.result as string)
        }
        reader.readAsDataURL(file)
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
        }
        setLayers([...layers, newLayer]);
        setSelectedLayerId(newId);
      }
    }
  }

  const handleLoadTemplate = (templateIndex: number) => {
    setLayers(TEMPLATES[templateIndex].layers.map((l) => ({ ...l })))
    setSelectedLayerId(null)
  }

  return (
    <div>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Конструктор сертификатов
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="h-4 w-4" />
                Предпросмотр
              </Button>
              <Button size="sm" className="gap-2" onClick={() => setShowPageSizeModal(true)}>
                <Settings className="h-4 w-4" />
                Размер страницы
              </Button>
              <Button size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Сохранить шаблон
              </Button>
            </div>
          </div>
          <Breadcrumb className="border-t border-border px-6 py-2 text-sm text-muted-foreground">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/events">Events</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/events/1">
                  Tech Summit 2024
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Certificates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mx-auto flex h-[calc(100vh-140px)]">
          <Toolbox
            onLoadTemplate={handleLoadTemplate}
            onAddVariable={handleAddVariable}
            onBackgroundUpload={handleBackgroundUpload}
            onRemoveBackground={() => setBackgroundImage(null)}
            backgroundImage={backgroundImage}
          />
          <Canvas
            layers={layers}
            backgroundImage={backgroundImage}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onLayerMouseDown={handleLayerMouseDown}
            onLayerDoubleClick={handleLayerDoubleClick}
            onCanvasDragOver={handleCanvasDragOver}
            onCanvasDrop={handleCanvasDrop}
            width={pageSizeSettings.width}
            height={pageSizeSettings.height}
            orientation={pageSizeSettings.orientation}
          />
          {/* Убрали статическую панель */}
        </div>
      </div>
    <PageSizeModal
      open={showPageSizeModal}
      onOpenChange={setShowPageSizeModal}
      onSave={setPageSizeSettings}
      initialSettings={pageSizeSettings}
    />
    {showFloatingPanel && selectedLayer && (
      <FloatingPropertiesPanel
        selectedLayer={selectedLayer}
        onUpdateLayer={handleUpdateLayer}
        onDeleteLayer={handleDeleteLayer}
        onClose={() => setShowFloatingPanel(false)}
        position={panelPosition}
        onPositionChange={setPanelPosition}
      />
    )}
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Предварительный просмотр сертификата</DialogTitle>
        </DialogHeader>
          <div
            className="relative bg-white rounded-lg overflow-hidden border-2 border-border max-w-full max-h-[70vh]"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: pageSizeSettings.orientation === "portrait" ?
                pageSizeSettings.width / pageSizeSettings.height :
                pageSizeSettings.height / pageSizeSettings.width,
              width: pageSizeSettings.width ? `${(pageSizeSettings.width * 3.78).toFixed(2)}px` : 'auto',
              height: pageSizeSettings.height ? `${(pageSizeSettings.height * 3.78).toFixed(2)}px` : 'auto',
            }}
          >
            {layers.map((layer) => (
              <div
                key={layer.id}
                className="absolute"
                style={{
                  top: `${(layer.y * 3.78).toFixed(2)}px`, // конвертируем мм в пиксели
                  left: layer.alignment === "center" ? `calc(50% + ${(layer.x - 105) * 3.78}px)` : layer.alignment === "left" ? `${(layer.x * 3.78).toFixed(2)}px` : undefined, // вычисляем позицию с учетом выравнивания
                  right: layer.alignment === "right" ? `${(layer.x * 3.78).toFixed(2)}px` : undefined, // конвертируем мм в пиксели
                  width: `${(layer.width * 3.78).toFixed(2)}px`, // конвертируем мм в пиксели
                  fontFamily: layer.fontFamily,
                  fontSize: `${layer.fontSize}px`,
                  color: layer.color,
                  fontWeight: layer.fontWeight || 'normal',
                  fontStyle: layer.fontStyle || 'normal',
                  textDecoration: layer.textDecoration || 'none',
                  lineHeight: layer.lineHeight || 'normal',
                  letterSpacing: layer.letterSpacing ? `${layer.letterSpacing}px` : 'normal',
                  WebkitTextStroke: layer.borderWidth ? `${layer.borderWidth}px ${layer.borderColor || '#000000'}` : undefined,
                  opacity: layer.opacity !== undefined ? layer.opacity : 1,
                  textAlign: layer.alignment,
                  transform: layer.alignment === "center" ? "translateX(-50%)" : undefined, // применяем transform только для центрирования
                }}
              >
                <span className="block whitespace-normal break-words">
                  {layer.text}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
