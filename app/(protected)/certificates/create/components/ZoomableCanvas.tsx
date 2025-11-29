"use client"

import type React from "react"

import { useRef, useState } from "react"
import type { TextLayer } from "../data"

interface ZoomableCanvasProps {
  layers: TextLayer[]
  backgroundImage: string | null
  selectedLayerId: string | null
  onSelectLayer: (id: string) => void
  onLayerMouseDown: (e: React.MouseEvent, id: string) => void
  onLayerDoubleClick: (id: string, newText?: string) => void
  onLayerContextMenu?: (id: string) => void
  onCanvasDragOver: (e: React.DragEvent) => void
  onCanvasDrop: (e: React.DragEvent) => void
  width?: number
  height?: number
  orientation?: "portrait" | "landscape"
  zoomLevel: number
  rotation: number
  pageWidth?: number // in mm
  pageHeight?: number // in mm
}

export default function ZoomableCanvas({
  layers,
  backgroundImage,
  selectedLayerId,
  onSelectLayer,
  onLayerMouseDown,
  onLayerDoubleClick,
  onLayerContextMenu,
  onCanvasDragOver,
  onCanvasDrop,
  width,
  height,
  orientation = "portrait",
  zoomLevel,
  rotation,
  pageWidth = 210,
  pageHeight = 297,
}: ZoomableCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState<string>("")

  const getLayerPositionPercent = (layer: TextLayer) => {
    return {
      x: layer.xPercent !== undefined ? layer.xPercent : (layer.x / pageWidth) * 100,
      y: layer.yPercent !== undefined ? layer.yPercent : (layer.y / pageHeight) * 100,
      width: layer.widthPercent !== undefined ? layer.widthPercent : (layer.width / pageWidth) * 100,
    }
  }

  const aspectRatio = width && height ? `${width} / ${height}` : "210 / 297"

  return (
    <div
      className="relative rounded-lg border-2 border-border bg-white shadow-2xl overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: aspectRatio,
        width: width ? `${(width * 3.78).toFixed(2)}px` : "auto",
        height: "auto",
        maxWidth: "100%",
        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
        transformOrigin: "center",
        transition: "transform 0.2s ease",
      }}
      onDragOver={onCanvasDragOver}
      onDrop={onCanvasDrop}
      ref={canvasRef}
    >
      {layers.map((layer) => {
        const position = getLayerPositionPercent(layer)

        let leftStyle: string | number = `${position.x}%`
        let transformStyle = "none"

        if (layer.alignment === "center") {
          leftStyle = `${position.x}%`
          transformStyle = "translateX(-50%)"
        } else if (layer.alignment === "right") {
          leftStyle = "auto"
        }

        return (
          <div
            key={layer.id}
            onMouseDown={(e) => {
              e.stopPropagation()
              if (e.button === 0) {
                onLayerMouseDown(e, layer.id)
              }
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectLayer(layer.id)
            }}
            onDoubleClick={(e) => {
              e.stopPropagation()
              setEditingLayerId(layer.id)
              setEditingText(layer.text)
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (onLayerContextMenu) {
                onLayerContextMenu(layer.id)
              }
            }}
            className={`absolute cursor-move transition-all select-none ${
              selectedLayerId === layer.id
                ? "ring-2 ring-blue-500 bg-blue-50 rounded"
                : "hover:ring-1 hover:ring-border rounded"
            }`}
            style={{
              top: `${position.y}%`,
              left: layer.alignment === "right" ? "auto" : leftStyle,
              right: layer.alignment === "right" ? `${position.x}%` : undefined,
              transform: transformStyle,
              width: `${position.width}%`,
              height: "auto",
              fontFamily: layer.fontFamily,
              fontSize: `${layer.fontSize}px`,
              color: layer.color,
              fontWeight: layer.fontWeight || "normal",
              fontStyle: layer.fontStyle || "normal",
              textDecoration: layer.textDecoration || "none",
              lineHeight: layer.lineHeight || "normal",
              letterSpacing: layer.letterSpacing ? `${layer.letterSpacing}px` : "normal",
              WebkitTextStroke: layer.borderWidth
                ? `${layer.borderWidth}px ${layer.borderColor || "#000000"}`
                : undefined,
              opacity: layer.opacity !== undefined ? layer.opacity : 1,
              textAlign: layer.alignment,
              boxSizing: "border-box",
              padding: "2px 4px",
              whiteSpace: "pre-wrap",
            }}
          >
            {editingLayerId === layer.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => {
                  onLayerDoubleClick(layer.id, editingText)
                  setEditingLayerId(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onLayerDoubleClick(layer.id, editingText)
                    setEditingLayerId(null)
                  } else if (e.key === "Escape") {
                    setEditingText(layer.text)
                    setEditingLayerId(null)
                  }
                }}
                autoFocus
                className="w-full bg-transparent border-b border-blue-500 focus:outline-none cursor-text"
                style={{
                  fontFamily: layer.fontFamily,
                  fontSize: `${layer.fontSize}px`,
                  color: layer.color,
                  fontWeight: layer.fontWeight || "normal",
                  fontStyle: layer.fontStyle || "normal",
                  textDecoration: layer.textDecoration || "none",
                  lineHeight: layer.lineHeight || "normal",
                  letterSpacing: layer.letterSpacing ? `${layer.letterSpacing}px` : "normal",
                  textAlign: layer.alignment,
                }}
              />
            ) : (
              <span className="block whitespace-normal break-words cursor-text" style={{ textAlign: layer.alignment }}>
                {layer.text}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
