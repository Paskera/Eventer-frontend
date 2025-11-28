"use client"

import { useRef } from "react"
import { TextLayer } from "../data"

interface CanvasProps {
  layers: TextLayer[]
  backgroundImage: string | null
  selectedLayerId: string | null
  onSelectLayer: (id: string) => void
  onLayerMouseDown: (e: React.MouseEvent, id: string) => void
  onLayerDoubleClick: (id: string) => void // добавляем обработчик двойного клика
  onCanvasDragOver: (e: React.DragEvent) => void
  onCanvasDrop: (e: React.DragEvent) => void
  width?: number;
  height?: number;
  orientation?: "portrait" | "landscape";
}

export default function Canvas({
  layers,
  backgroundImage,
  selectedLayerId,
  onSelectLayer,
  onLayerMouseDown,
  onLayerDoubleClick, // добавляем деструктуризацию onLayerDoubleClick
  onCanvasDragOver,
  onCanvasDrop,
  width,
  height,
  orientation = "portrait",
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  // Рассчитываем соотношение сторон на основе ширины и высоты с учетом ориентации
  const aspectRatio = width && height ?
    orientation === "portrait" ? width / height : height / width :
    210 / 297; // по умолчанию A4

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-4 md:p-8 max-w-full overflow-auto">
      <div
        ref={canvasRef}
        onDragOver={onCanvasDragOver}
        onDrop={onCanvasDrop}
        className="relative rounded-lg border-2 border-border bg-white shadow-2xl overflow-hidden"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: aspectRatio,
          width: width ? `${(width * 3.78).toFixed(2)}px` : 'auto',
          height: height ? `${(height * 3.78).toFixed(2)}px` : 'auto',
          maxWidth: '100%',
          maxHeight: '80vh',
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer.id}
            onMouseDown={(e) => onLayerMouseDown(e, layer.id)}
            onClick={(e) => {
              e.stopPropagation(); // предотвращаем всплытие события
              onSelectLayer(layer.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation(); // предотвращаем всплытие события
              onLayerDoubleClick(layer.id); // вызываем обработчик двойного клика из пропсов
            }}
            className={`absolute cursor-move rounded px-2 py-1 transition-all select-none ${
              selectedLayerId === layer.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:ring-1 hover:ring-border"
            }`}
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
            <span className="block whitespace-normal break-words cursor-text">
              {layer.text}
            </span>
          </div>
        ))}
      </div>

      {layers.length === 0 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Load a template to get started
        </p>
      )}
    </div>
  )
}