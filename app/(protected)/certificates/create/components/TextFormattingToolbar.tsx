"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import type { TextLayer } from "../data"

interface TextFormattingToolbarProps {
  layer: TextLayer
  onFormat?: (format: "bold" | "italic" | "underline") => void
  onAlign?: (align: "left" | "center" | "right") => void
  onUpdateLayer?: (id: string, updates: Partial<TextLayer>) => void
}

export function TextFormattingToolbar({
  layer,
  onFormat,
  onAlign,
  onUpdateLayer,
}: TextFormattingToolbarProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      const selectedText = selection?.toString().trim() || ""
      
      // Проверяем, что выделение находится в нужном слое
      if (selectedText && selectedText.length > 0 && selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const container = range.commonAncestorContainer
        const layerElement = container.nodeType === Node.TEXT_NODE
          ? container.parentElement?.closest(`[data-layer-id="${layer.id}"]`)
          : (container as HTMLElement)?.closest(`[data-layer-id="${layer.id}"]`)
        
        if (layerElement) {
          // Есть выделение в нужном слое - показываем панель
          const rect = range.getBoundingClientRect()
          
          setPosition({
            x: rect.left + rect.width / 2 - 150, // Центрируем панель над выделением
            y: rect.top - 50, // Показываем над выделением
          })
          setVisible(true)
        } else {
          setVisible(false)
        }
      } else {
        setVisible(false)
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Если клик не на панели и не на выделенном тексте, скрываем панель
      if (!target.closest('.fixed.z-50.bg-popover')) {
        const selection = window.getSelection()
        const selectedText = selection?.toString().trim() || ""
        if (!selectedText) {
          setVisible(false)
        }
      }
    }

    // Небольшая задержка для плавного появления
    const timeoutId = setTimeout(() => {
      document.addEventListener("selectionchange", handleSelectionChange)
      document.addEventListener("click", handleClick)
    }, 100)
    
    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("selectionchange", handleSelectionChange)
      document.removeEventListener("click", handleClick)
    }
  }, [layer.id])

  if (!visible) return null

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 bg-popover border border-border rounded-md shadow-lg p-1 flex items-center gap-1"
      style={{
        left: `${Math.max(10, Math.min(position.x, window.innerWidth - 320))}px`,
        top: `${Math.max(10, position.y)}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        variant={layer.fontWeight === "bold" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (onFormat) {
            onFormat("bold")
          } else if (onUpdateLayer) {
            onUpdateLayer(layer.id, {
              fontWeight: layer.fontWeight === "bold" ? "normal" : "bold",
            })
          }
        }}
        title="Жирный"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={layer.fontStyle === "italic" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (onFormat) {
            onFormat("italic")
          } else if (onUpdateLayer) {
            onUpdateLayer(layer.id, {
              fontStyle: layer.fontStyle === "italic" ? "normal" : "italic",
            })
          }
        }}
        title="Курсив"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={layer.textDecoration === "underline" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (onFormat) {
            onFormat("underline")
          } else if (onUpdateLayer) {
            onUpdateLayer(layer.id, {
              textDecoration: layer.textDecoration === "underline" ? "none" : "underline",
            })
          }
        }}
        title="Подчеркнутый"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <Button
        variant={layer.alignment === "left" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (onAlign) {
            onAlign("left")
          } else if (onUpdateLayer) {
            onUpdateLayer(layer.id, { alignment: "left" })
          }
        }}
        title="По левому краю"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={layer.alignment === "center" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (onAlign) {
            onAlign("center")
          } else if (onUpdateLayer) {
            onUpdateLayer(layer.id, { alignment: "center" })
          }
        }}
        title="По центру"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={layer.alignment === "right" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (onAlign) {
            onAlign("right")
          } else if (onUpdateLayer) {
            onUpdateLayer(layer.id, { alignment: "right" })
          }
        }}
        title="По правому краю"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
