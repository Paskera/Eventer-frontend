"use client"

import type React from "react"

import { useRef, useState } from "react"
import type { TextLayer } from "../data"
import { isTextLayer, isImageLayer } from "../data"

interface ZoomableCanvasProps {
  layers: any[] // Relaxed type for now, or import Layer type
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

  const actualPageWidth = width || pageWidth
  const actualPageHeight = height || pageHeight

  const getLayerPositionPercent = (layer: any) => {
    return {
      x: layer.xPercent !== undefined ? layer.xPercent : (layer.x / actualPageWidth) * 100,
      y: layer.yPercent !== undefined ? layer.yPercent : (layer.y / actualPageHeight) * 100,
      width: layer.widthPercent !== undefined ? layer.widthPercent : (layer.width / actualPageWidth) * 100,
      height: layer.height ? (layer.height / actualPageHeight) * 100 : undefined,
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
        let transformStyle = `rotate(${layer.rotation || 0}deg)`

        if (isTextLayer(layer)) {
          if (layer.alignment === "center") {
            leftStyle = `${position.x}%`
            transformStyle = `translateX(-50%) rotate(${layer.rotation || 0}deg)`
          } else if (layer.alignment === "right") {
            leftStyle = "auto"
          }
        }

        return (
          <div
            key={layer.id}
            onMouseDown={(e) => {
              e.stopPropagation()
              if (editingLayerId === layer.id) return
              if (e.button === 0) {
                onLayerMouseDown(e, layer.id)
              }
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (editingLayerId !== layer.id) {
                onSelectLayer(layer.id)
              }
            }}
            onDoubleClick={(e) => {
              e.stopPropagation()
              if (isTextLayer(layer)) {
                setEditingLayerId(layer.id)
                setEditingText(layer.text)
              }
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
                ? "ring-2 ring-blue-500 bg-blue-50/10 rounded"
                : "hover:ring-1 hover:ring-border rounded"
            }`}
            style={{
              top: `${position.y}%`,
              left: isTextLayer(layer) && layer.alignment === "right" ? "auto" : leftStyle,
              right: isTextLayer(layer) && layer.alignment === "right" ? `${position.x}%` : undefined,
              transform: transformStyle,
              width: `${position.width}%`,
              height: position.height ? `${position.height}%` : "auto",
              opacity: layer.opacity !== undefined ? layer.opacity : 1,
              
              // Text specific styles
              ...(isTextLayer(layer) ? {
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
                textAlign: layer.alignment,
                boxSizing: "border-box",
                padding: "2px 4px",
                whiteSpace: "pre-wrap",
              } : {}),

              // Image specific styles
              ...(isImageLayer(layer) ? {
                backgroundImage: `url(${layer.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              } : {})
            }}
          >
            {isTextLayer(layer) ? (
              editingLayerId === layer.id ? (
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => {
                    onLayerDoubleClick(layer.id, editingText)
                    setEditingLayerId(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      onLayerDoubleClick(layer.id, editingText)
                      setEditingLayerId(null)
                    } else if (e.key === "Escape") {
                      setEditingText(layer.text)
                      setEditingLayerId(null)
                    }
                  }}
                  autoFocus
                  className="w-full bg-transparent border-b border-blue-500 focus:outline-none cursor-text resize-none overflow-hidden"
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
                    minHeight: "1.5em",
                  }}
                  rows={editingText.split("\n").length || 1}
                />
              ) : layer.listType === "bullet" || layer.listType === "number" ? (
                <div
                  className="block whitespace-normal break-words cursor-text"
                  style={{ textAlign: layer.alignment }}
                >
                  {layer.listType === "bullet" ? (
                    <ul className="list-disc list-inside">
                      {layer.text.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <ol className="list-decimal list-inside">
                      {layer.text.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ) : (
                <span className="block whitespace-normal break-words cursor-text" style={{ textAlign: layer.alignment }}>
                  {layer.text}
                </span>
              )
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
