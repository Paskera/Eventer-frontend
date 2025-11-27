"use client"

import { useRef } from "react"
import { TextLayer } from "../data"

interface CanvasProps {
  layers: TextLayer[]
  backgroundImage: string | null
  selectedLayerId: string | null
  onSelectLayer: (id: string) => void
  onLayerMouseDown: (e: React.MouseEvent, id: string) => void
  onCanvasDragOver: (e: React.DragEvent) => void
  onCanvasDrop: (e: React.DragEvent) => void
}

export default function Canvas({
  layers,
  backgroundImage,
  selectedLayerId,
  onSelectLayer,
  onLayerMouseDown,
  onCanvasDragOver,
  onCanvasDrop,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-4 md:p-8">
      <div
        ref={canvasRef}
        onDragOver={onCanvasDragOver}
        onDrop={onCanvasDrop}
        className="relative w-full aspect-[8.5/11] max-w-3xl rounded-lg border-2 border-border bg-white shadow-2xl overflow-hidden"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer.id}
            onMouseDown={(e) => onLayerMouseDown(e, layer.id)}
            onClick={() => onSelectLayer(layer.id)}
            className={`absolute cursor-move rounded px-2 py-1 transition-all select-none ${
              selectedLayerId === layer.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:ring-1 hover:ring-border"
            }`}
            style={{
              top: `${layer.y}px`,
              width: `${layer.width}px`,
              fontFamily: layer.fontFamily,
              fontSize: `${layer.fontSize}px`,
              color: layer.color,
              textAlign: layer.alignment,
              ...(layer.alignment === "center" && {
                left: "50%",
                transform: "translateX(-50%)",
              }),
              ...(layer.alignment === "left" && {
                left: `${layer.x}px`,
              }),
              ...(layer.alignment === "right" && {
                right: `${layer.x}px`,
              }),
            }}
          >
            <span className="block whitespace-normal break-words">
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