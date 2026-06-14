"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type TextLayer, FONTS } from "../data"
import { normalizeListMarkerFontSizes } from "../normalizeListMarkerFontSizes"
import { List, ListOrdered } from "lucide-react"

interface FloatingPropertiesPanelProps {
  selectedLayer: any
  onUpdateLayer: (id: string, updates: any) => void
  onDeleteLayer: (id: string) => void
  onClose: () => void
  position: { x: number; y: number }
  onPositionChange: (position: { x: number; y: number }) => void
  isSidebar?: boolean
  onSetEditingText?: (text: string) => void
}

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]
const WIDTHS = [100, 150, 200, 250, 300, 400, 500]
const BORDER_WIDTHS = [0, 1, 2, 3, 4, 5]
const LETTER_SPACINGS = [-10, -5, 0, 5, 10, 15, 20]
const LINE_HEIGHTS = [
  { value: "1", label: "Одинарный" },
  { value: "1.2", label: "1.2" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "Двойной" },
]

const HEADING_STYLES = [
  { label: "Обычный текст", value: "normal", fontSize: 16, fontWeight: "normal" },
  { label: "Заголовок 1", value: "h1", fontSize: 32, fontWeight: "bold" },
  { label: "Заголовок 2", value: "h2", fontSize: 24, fontWeight: "bold" },
  { label: "Заголовок 3", value: "h3", fontSize: 18, fontWeight: "bold" },
]

export default function FloatingPropertiesPanel({
  selectedLayer,
  onUpdateLayer,
  onDeleteLayer,
  onClose,
  position,
  onPositionChange,
  isSidebar = false,
  onSetEditingText,
}: FloatingPropertiesPanelProps) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [tempValues, setTempValues] = useState({
    fontSize: String(selectedLayer.fontSize || 16),
    width: String(selectedLayer.width || 300),
    borderWidth: String(selectedLayer.borderWidth || 0),
    letterSpacing: String(selectedLayer.letterSpacing || 0),
    x: String(Math.round(selectedLayer.x)),
    y: String(Math.round(selectedLayer.y)),
  })
  const headerRef = useRef<HTMLDivElement>(null)
  const originalValues = useRef({
    fontSize: selectedLayer.fontSize || 16,
    width: selectedLayer.width || 300,
    borderWidth: selectedLayer.borderWidth || 0,
    letterSpacing: selectedLayer.letterSpacing || 0,
    x: Math.round(selectedLayer.x),
    y: Math.round(selectedLayer.y),
  })

  const [selectionStyles, setSelectionStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: "",
    fontFamily: "",
    color: "",
  })
  const lastRangeRef = useRef<Range | null>(null)

  useEffect(() => {
    const updateSelectionStyles = () => {
      if (typeof document !== 'undefined') {
        const selection = window.getSelection()
        let fontSize = ""
        let fontFamily = ""
        let color = ""

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          
          let container = range.commonAncestorContainer as HTMLElement
          if (container.nodeType === Node.TEXT_NODE) container = container.parentElement as HTMLElement
          if (container && container.closest('[contenteditable="true"]')) {
            lastRangeRef.current = range.cloneRange()
          }

          let element = range.commonAncestorContainer as HTMLElement
          if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement as HTMLElement
          }

          if (element && element.closest('[contenteditable="true"]')) {
            const style = window.getComputedStyle(element)
            fontSize = style.fontSize.replace("px", "")
            fontFamily = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim()
            
            const rgb = style.color.match(/\d+/g)
            if (rgb && rgb.length >= 3) {
              color = "#" + rgb.slice(0, 3).map(x => {
                const hex = parseInt(x).toString(16)
                return hex.length === 1 ? "0" + hex : hex
              }).join("")
            }
          }
        }

        setSelectionStyles({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          fontSize,
          fontFamily,
          color,
        })
      }
    }

    document.addEventListener('selectionchange', updateSelectionStyles)
    return () => document.removeEventListener('selectionchange', updateSelectionStyles)
  }, [])

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    const selection = window.getSelection()
    if (selection && lastRangeRef.current && (selection.rangeCount === 0 || selection.getRangeAt(0) !== lastRangeRef.current)) {
      selection.removeAllRanges()
      selection.addRange(lastRangeRef.current)
    }

    document.execCommand(command, false, value)
    
    const activeEl = document.activeElement
    if (activeEl && activeEl.getAttribute('contenteditable') === 'true') {
      const el = activeEl as HTMLElement
      if (el.querySelector("li")) {
        normalizeListMarkerFontSizes(el)
      }
      onSetEditingText?.(el.innerHTML)
    }
  }

  const applyInlineStyle = (styleName: string, styleValue: string) => {
    const selection = window.getSelection()
    let range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : lastRangeRef.current

    if (!range || range.collapsed) return

    if (selection && lastRangeRef.current && (selection.rangeCount === 0 || selection.getRangeAt(0) !== lastRangeRef.current)) {
      selection.removeAllRanges()
      selection.addRange(lastRangeRef.current)
      range = lastRangeRef.current
    }

    const activeEl = range.commonAncestorContainer instanceof HTMLElement 
      ? range.commonAncestorContainer.closest('[contenteditable="true"]') as HTMLElement
      : range.commonAncestorContainer.parentElement?.closest('[contenteditable="true"]') as HTMLElement
    
    if (!activeEl) return

    activeEl.focus({ preventScroll: true })

    if (styleName === 'font-size') {
      document.execCommand('styleWithCSS', false, 'false')
      document.execCommand('fontSize', false, '7')
      const fontTags = activeEl.querySelectorAll('font[size="7"]')
      fontTags.forEach(tag => {
        const span = document.createElement('span')
        span.style.fontSize = styleValue
        while (tag.firstChild) span.appendChild(tag.firstChild)
        tag.parentNode?.replaceChild(span, tag)
      })
      document.execCommand('styleWithCSS', false, 'true')
    } else if (styleName === 'font-family') {
      // Use the same robust replacement strategy for font-family
      document.execCommand('styleWithCSS', false, 'false')
      document.execCommand('fontName', false, '___temp_font___')
      
      const fontTags = activeEl.querySelectorAll('font[face="___temp_font___"]')
      fontTags.forEach(tag => {
        const span = document.createElement('span')
        span.style.fontFamily = styleValue
        
        while (tag.firstChild) span.appendChild(tag.firstChild)
        tag.parentNode?.replaceChild(span, tag)
      })
      
      document.execCommand('styleWithCSS', false, 'true')
    } else if (styleName === 'color') {
      // Прямое применение цвета стабильнее между браузерами.
      document.execCommand('styleWithCSS', false, 'true')
      document.execCommand('foreColor', false, styleValue)
      document.execCommand('styleWithCSS', false, 'true')
    } else if (styleName === 'text-align') {
      document.execCommand('styleWithCSS', false, 'true')
      const command = styleValue === 'center' ? 'justifyCenter' : 
                     styleValue === 'right' ? 'justifyRight' : 'justifyLeft'
      document.execCommand(command, false, undefined)
    }

    if (activeEl.querySelector("li")) {
      normalizeListMarkerFontSizes(activeEl)
    }
    onSetEditingText?.(activeEl.innerHTML)
  }

  useEffect(() => {
    setTempValues({
      fontSize: String(selectedLayer.fontSize || 16),
      width: String(selectedLayer.width || 300),
      borderWidth: String(selectedLayer.borderWidth || 0),
      letterSpacing: String(selectedLayer.letterSpacing || 0),
      x: String(Math.round(selectedLayer.x)),
      y: String(Math.round(selectedLayer.y)),
    })
    originalValues.current = {
      fontSize: selectedLayer.fontSize || 16,
      width: selectedLayer.width || 300,
      borderWidth: selectedLayer.borderWidth || 0,
      letterSpacing: selectedLayer.letterSpacing || 0,
      x: Math.round(selectedLayer.x),
      y: Math.round(selectedLayer.y),
    }
  }, [selectedLayer.id])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && (e.target === headerRef.current || headerRef.current.contains(e.target as Node))) {
      setIsDragging(true)
      const offsetX = e.clientX - position.x
      const offsetY = e.clientY - position.y
      setDragOffset({ x: offsetX, y: offsetY })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    onPositionChange({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const validateAndParse = (
    value: string,
    min: number,
    max: number,
    fieldName: keyof typeof originalValues.current,
  ): number => {
    if (value === "" || value === "-") {
      return originalValues.current[fieldName]
    }
    const num = Number(value)
    if (isNaN(num)) {
      return originalValues.current[fieldName]
    }
    return Math.max(min, Math.min(max, num))
  }

  const handleInputChange = (field: string, value: string) => {
    setTempValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof typeof tempValues) => {
    const value = tempValues[field]
    let finalValue: number

    switch (field) {
      case "fontSize":
        finalValue = validateAndParse(value, 8, 72, "fontSize")
        break
      case "width":
        finalValue = validateAndParse(value, 50, 2000, "width")
        break
      case "borderWidth":
        finalValue = validateAndParse(value, 0, 5, "borderWidth")
        break
      case "letterSpacing":
        finalValue = validateAndParse(value, -20, 20, "letterSpacing")
        break
      case "x":
        finalValue = validateAndParse(value, 0, 10000, "x")
        break
      case "y":
        finalValue = validateAndParse(value, 0, 10000, "y")
        break
      default:
        return
    }

    setTempValues((prev) => ({
      ...prev,
      [field]: String(finalValue),
    }))

    const updateData: any = {}
    switch (field) {
      case "fontSize":
        updateData.fontSize = finalValue
        break
      case "width":
        updateData.width = finalValue
        break
      case "borderWidth":
        updateData.borderWidth = finalValue
        break
      case "letterSpacing":
        updateData.letterSpacing = finalValue
        break
      case "x":
        updateData.x = finalValue
        break
      case "y":
        updateData.y = finalValue
        break
    }

    onUpdateLayer(selectedLayer.id, updateData)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: keyof typeof tempValues) => {
    if (e.key === "Enter") {
      ;(e.target as HTMLInputElement).blur()
    }
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, onPositionChange])

  return (
    <div
      className={`${
        isSidebar 
          ? "h-full flex flex-col" 
          : "fixed z-50 bg-card border border-border rounded-lg shadow-lg overflow-hidden flex flex-col max-h-[90vh] properties-panel"
      }`}
      style={!isSidebar ? { left: `${position.x}px`, top: `${position.y}px`, width: "320px" } : undefined}
      onMouseDown={(e) => {
        if (!isSidebar) handleMouseDown(e)
        // Prevent stealing focus from the active contenteditable
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || (e.target as HTMLElement).closest('[role="combobox"]')) {
           return;
        }
        e.preventDefault();
      }}
    >
      <div
        ref={headerRef}
        className={`flex justify-between items-center p-3 border-b border-border transition-colors flex-shrink-0 ${
          !isSidebar ? "cursor-move bg-muted hover:bg-muted/80" : "bg-transparent"
        }`}
      >
        <h3 className="text-sm font-semibold text-foreground">Свойства элемента</h3>
        {!isSidebar && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-lg">
            ✕
          </button>
        )}
      </div>

      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        <div>
          <Label className="text-xs font-medium text-foreground">Стиль абзаца</Label>
          <Select
            value="custom"
            onValueChange={(value) => {
              const style = HEADING_STYLES.find((s) => s.value === value)
              if (style) {
                onUpdateLayer(selectedLayer.id, {
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                })
              }
            }}
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue placeholder="Выберите стиль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom" disabled>
                -- Выберите стиль --
              </SelectItem>
              {HEADING_STYLES.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Списки</Label>
          <div className="mt-2 flex gap-1">
            <Button
              variant={selectedLayer.listType === "bullet" ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                executeCommand('insertUnorderedList')
                onUpdateLayer(selectedLayer.id, {
                  listType: selectedLayer.listType === "bullet" ? "none" : "bullet",
                })
              }}
              className="flex-1 h-8 text-xs gap-2"
            >
              <List className="w-3 h-3" />
              Маркеры
            </Button>
            <Button
              variant={selectedLayer.listType === "number" ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                executeCommand('insertOrderedList')
                onUpdateLayer(selectedLayer.id, {
                  listType: selectedLayer.listType === "number" ? "none" : "number",
                })
              }}
              className="flex-1 h-8 text-xs gap-2"
            >
              <ListOrdered className="w-3 h-3" />
              Нумерация
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Межстрочный интервал</Label>
          <Select
            value={selectedLayer.lineHeight || "normal"}
            onValueChange={(value) =>
              onUpdateLayer(selectedLayer.id, {
                lineHeight: value,
              })
            }
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue placeholder="Нормальный" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Нормальный</SelectItem>
              {LINE_HEIGHTS.map((lh) => (
                <SelectItem key={lh.value} value={lh.value}>
                  {lh.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-px bg-border my-2" />

        <div>
          <Label className="text-xs font-medium text-foreground">Шрифт</Label>
          <Select
            value={selectionStyles.fontFamily || selectedLayer.fontFamily}
            onValueChange={(value) => {
              const selection = window.getSelection()
              if (selection && !selection.isCollapsed) {
                applyInlineStyle('font-family', value)
              } else {
                onUpdateLayer(selectedLayer.id, {
                  fontFamily: value,
                })
              }
            }}
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Жирность</Label>
          <Select
            value={selectionStyles.bold ? "bold" : selectedLayer.fontWeight || "normal"}
            onValueChange={(value) => {
              const selection = window.getSelection()
              if (selection && !selection.isCollapsed) {
                executeCommand('bold')
              } else {
                onUpdateLayer(selectedLayer.id, {
                  fontWeight: value,
                })
              }
            }}
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Обычный</SelectItem>
              <SelectItem value="bold">Жирный</SelectItem>
              <SelectItem value="lighter">Тонкий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Размер шрифта</Label>
          <Select
            value={selectionStyles.fontSize || String(selectedLayer.fontSize)}
            onValueChange={(value) => {
              const selection = window.getSelection()
              if (selection && !selection.isCollapsed) {
                applyInlineStyle('font-size', `${value}px`)
              } else {
                onUpdateLayer(selectedLayer.id, {
                  fontSize: Number(value),
                })
              }
            }}
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Цвет текста</Label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="color"
              value={selectionStyles.color || selectedLayer.color}
              onChange={(e) => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  applyInlineStyle('color', e.target.value)
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    color: e.target.value,
                  })
                }
              }}
              className="h-9 w-12 rounded border border-border cursor-pointer"
            />
            <Input
              value={selectionStyles.color || selectedLayer.color}
              onChange={(e) => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  applyInlineStyle('color', e.target.value)
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    color: e.target.value,
                  })
                }
              }}
              className="text-xs flex-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Стиль текста</Label>
          <div className="mt-2 flex gap-1">
            <Button
              variant={selectionStyles.italic || selectedLayer.fontStyle === "italic" ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  executeCommand('italic')
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    fontStyle: selectedLayer.fontStyle === "italic" ? "normal" : "italic",
                  })
                }
              }}
              className="flex-1 h-8 text-xs"
            >
              <span className="italic">I</span>
            </Button>
            <Button
              variant={selectionStyles.underline || selectedLayer.textDecoration?.includes("underline") ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  executeCommand('underline')
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    textDecoration: selectedLayer.textDecoration === "underline" ? "none" : "underline",
                  })
                }
              }}
              className="flex-1 h-8 text-xs"
            >
              <span className="underline">U</span>
            </Button>
            <Button
              variant={selectedLayer.textDecoration?.includes("line-through") ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  executeCommand('strikeThrough')
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    textDecoration: selectedLayer.textDecoration === "line-through" ? "none" : "line-through",
                  })
                }
              }}
              className="flex-1 h-8 text-xs"
            >
              <span className="line-through">S</span>
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Выравнивание</Label>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <Button
              variant={selectedLayer.alignment === "left" ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  applyInlineStyle('text-align', 'left')
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    alignment: "left",
                  })
                }
              }}
              className="h-8 text-xs"
            >
              ⬅
            </Button>
            <Button
              variant={selectedLayer.alignment === "center" ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  applyInlineStyle('text-align', 'center')
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    alignment: "center",
                  })
                }
              }}
              className="h-8 text-xs"
            >
              ↔
            </Button>
            <Button
              variant={selectedLayer.alignment === "right" ? "default" : "outline"}
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selection = window.getSelection()
                if (selection && !selection.isCollapsed) {
                  applyInlineStyle('text-align', 'right')
                } else {
                  onUpdateLayer(selectedLayer.id, {
                    alignment: "right",
                  })
                }
              }}
              className="h-8 text-xs"
            >
              ➡
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs font-medium text-foreground">X</Label>
            <Input
              type="text"
              value={tempValues.x}
              onChange={(e) => handleInputChange("x", e.target.value)}
              onBlur={() => handleInputBlur("x")}
              onKeyDown={(e) => handleInputKeyDown(e, "x")}
              onFocus={handleInputFocus}
              className="mt-1 text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground">Y</Label>
            <Input
              type="text"
              value={tempValues.y}
              onChange={(e) => handleInputChange("y", e.target.value)}
              onBlur={() => handleInputBlur("y")}
              onKeyDown={(e) => handleInputKeyDown(e, "y")}
              onFocus={handleInputFocus}
              className="mt-1 text-sm"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Ширина</Label>
          <Select
            value={String(selectedLayer.width)}
            onValueChange={(value) =>
              onUpdateLayer(selectedLayer.id, {
                width: Number(value),
              })
            }
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WIDTHS.map((width) => (
                <SelectItem key={width} value={String(width)}>
                  {width} px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Прозрачность</Label>
          <div className="mt-1 flex items-center gap-2">
            <Input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectedLayer.opacity !== undefined ? selectedLayer.opacity : 1}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  opacity: Number(e.target.value),
                })
              }
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 text-right">
              {Math.round((selectedLayer.opacity !== undefined ? selectedLayer.opacity : 1) * 100)}%
            </span>
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Обводка</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Select
                value={String(selectedLayer.borderWidth || 0)}
                onValueChange={(value) =>
                  onUpdateLayer(selectedLayer.id, {
                    borderWidth: Number(value),
                  })
                }
              >
                <SelectTrigger className="text-sm flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BORDER_WIDTHS.map((width) => (
                    <SelectItem key={width} value={String(width)}>
                      {width} px
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="color"
                value={selectedLayer.borderColor || "#000000"}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    borderColor: e.target.value,
                  })
                }
                className="h-8 w-10 rounded border border-border cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-foreground">Интервал букв</Label>
          <Select
            value={String(selectedLayer.letterSpacing || 0)}
            onValueChange={(value) =>
              onUpdateLayer(selectedLayer.id, {
                letterSpacing: Number(value),
              })
            }
          >
            <SelectTrigger className="mt-1 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LETTER_SPACINGS.map((spacing) => (
                <SelectItem key={spacing} value={String(spacing)}>
                  {spacing} px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 p-4 border-t border-border bg-muted/50 flex-shrink-0">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteLayer(selectedLayer.id)}
          className="flex-1 h-8 text-xs"
        >
          🗑 Удалить
        </Button>
        <Button variant="outline" size="sm" onClick={onClose} className="flex-1 h-8 text-xs bg-transparent">
          Закрыть
        </Button>
      </div>
    </div>
  )
}
