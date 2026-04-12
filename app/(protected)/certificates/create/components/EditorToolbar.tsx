"use client"

import React, { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Image as ImageIcon, 
  Settings, 
  Save, 
  Eye, 
  Minus, 
  Plus, 
  RotateCw,
  LayoutTemplate,
  FileDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Pilcrow,
  Undo,
  Redo,
  Trash2,
  ImagePlus,
  MousePointer2,
  FileSpreadsheet,
} from "lucide-react"
import {
  VARIABLES,
  TextLayer,
  FONTS,
  isTextLayer,
  type Layer,
  type CertificateVariable,
  variableKindLabel,
} from "../data"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

import ExportButton from "./ExportButton"
import { normalizeListMarkerFontSizes } from "../normalizeListMarkerFontSizes"
function textLayerFromDomSelection(layers: Layer[]): TextLayer | undefined {
  if (typeof window === "undefined") return undefined
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return undefined
  const range = selection.getRangeAt(0)
  let node: Node | null = range.commonAncestorContainer
  if (node.nodeType === Node.TEXT_NODE) node = node.parentElement
  const host = node instanceof Element ? node.closest("[data-layer-id]") : null
  const id = host?.getAttribute("data-layer-id")
  if (!id) return undefined
  const layer = layers.find((l) => l.id === id)
  return layer && isTextLayer(layer) ? layer : undefined
}

function getSelectionOffsetsWithin(
  root: HTMLElement,
  sourceRange?: Range,
): { start: number; end: number } | null {
  const selection = window.getSelection()
  const range = sourceRange ?? (selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null)
  if (!range) return null
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null

  const before = range.cloneRange()
  before.selectNodeContents(root)
  before.setEnd(range.startContainer, range.startOffset)
  const start = before.toString().length
  const end = start + range.toString().length
  if (end <= start) return null
  return { start, end }
}

function restoreSelectionByOffsets(root: HTMLElement, start: number, end: number): Range | null {
  if (end <= start) return null

  const selection = window.getSelection()
  if (!selection) return null

  const range = document.createRange()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let current: Node | null = walker.nextNode()
  let index = 0
  let startSet = false
  let endSet = false

  while (current) {
    const textLength = current.textContent?.length ?? 0
    const nextIndex = index + textLength

    if (!startSet && start <= nextIndex) {
      range.setStart(current, Math.max(0, start - index))
      startSet = true
    }
    if (!endSet && end <= nextIndex) {
      range.setEnd(current, Math.max(0, end - index))
      endSet = true
      break
    }

    index = nextIndex
    current = walker.nextNode()
  }

  if (!startSet || !endSet) return null

  selection.removeAllRanges()
  selection.addRange(range)
  return range
}

interface EditorToolbarProps {
  onOpenTemplateSelector: () => void
  /** Вызвать на pointerdown у кнопки «Переменная», пока каретка ещё в документе */
  onBeforeVariableMenuOpen?: () => void
  onAddVariable: (variable: CertificateVariable) => void
  /** Загрузка CSV/Excel для подстановки в плейсхолдеры */
  onImportMergeTable: (file: File) => void
  onApplyMerge: () => void
  mergeDataRowsCount: number
  mergeDataRowIndex: number
  onMergeDataRowIndexChange: (index: number) => void
  onAddImageLayer: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBackgroundUpload: (file: File) => void
  onRemoveBackground: () => void
  backgroundImage: string | null
  onOpenPageSize: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onRotate: () => void
  zoomLevel: number
  rotation: number
  onSave: () => void
  lastSaved: Date | null
  onPreview: () => void
  selectedLayer: TextLayer | undefined
  onUpdateLayer: (id: string, updates: Partial<TextLayer>) => void
  onDeleteLayer: (id: string) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  layers: Layer[]
  /** Для экспорта: слои с актуальным HTML из редактора */
  getLayersForExport?: () => Layer[]
  pageSizeSettings: {
    width: number
    height: number
  }
  showFormattingSymbols: boolean
  onToggleFormattingSymbols: () => void
  onSelectAll?: () => void
  onSetEditingText?: (text: string) => void
}

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]

export function EditorToolbar({
  onOpenTemplateSelector,
  onBeforeVariableMenuOpen,
  onAddVariable,
  onImportMergeTable,
  onApplyMerge,
  mergeDataRowsCount,
  mergeDataRowIndex,
  onMergeDataRowIndexChange,
  onAddImageLayer,
  onBackgroundUpload,
  onRemoveBackground,
  backgroundImage,
  onOpenPageSize,
  onZoomIn,
  onZoomOut,
  onRotate,
  zoomLevel,
  rotation,
  onSave,
  lastSaved,
  onPreview,
  selectedLayer,
  onUpdateLayer,
  onDeleteLayer,
  undo,
  redo,
  canUndo,
  canRedo,
  layers,
  getLayersForExport,
  pageSizeSettings,
  showFormattingSymbols,
  onToggleFormattingSymbols,
  onSelectAll,
  onSetEditingText,
}: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const mergeFileInputRef = useRef<HTMLInputElement>(null)
  const [selectionStyles, setSelectionStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: "",
    fontFamily: "",
    color: "",
  })
  const lastRangeRef = useRef<Range | null>(null)
  const lastEditableRef = useRef<HTMLElement | null>(null)
  const lastSelectionOffsetsRef = useRef<{ start: number; end: number } | null>(null)

  useEffect(() => {
    const updateSelectionStyles = () => {
      if (typeof document !== 'undefined') {
        const selection = window.getSelection()
        let fontSize = ""
        let fontFamily = ""
        let color = ""

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          
          // Save range if it's inside our editor
          let container = range.commonAncestorContainer as HTMLElement
          if (container.nodeType === Node.TEXT_NODE) container = container.parentElement as HTMLElement
          if (container && container.closest('[contenteditable="true"]') && !range.collapsed) {
            const editable = container.closest('[contenteditable="true"]') as HTMLElement | null
            lastRangeRef.current = range.cloneRange()
            if (editable) {
              lastEditableRef.current = editable
              const offsets = getSelectionOffsetsWithin(editable, range)
              if (offsets) lastSelectionOffsetsRef.current = offsets
            }
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

  const effectiveTextLayer: TextLayer | undefined =
    textLayerFromDomSelection(layers) ??
    (selectedLayer && isTextLayer(selectedLayer) ? selectedLayer : undefined)

  const updateLayer = (updates: Partial<TextLayer>) => {
    if (effectiveTextLayer) {
      onUpdateLayer(effectiveTextLayer.id, updates)
    }
  }

  const restoreSavedNonCollapsedRange = (): Range | null => {
    const selection = window.getSelection()
    if (!selection) return null

    if (selection.rangeCount > 0) {
      const live = selection.getRangeAt(0)
      if (!live.collapsed) {
        return live
      }
    }

    const saved = lastRangeRef.current
    if (saved && !saved.collapsed) {
      try {
        selection.removeAllRanges()
        selection.addRange(saved)
        return saved
      } catch {
        // stale range after DOM mutation
      }
    }

    const active = document.activeElement
    const editable =
      active instanceof HTMLElement && active.getAttribute("contenteditable") === "true"
        ? active
        : lastEditableRef.current
    const offsets = lastSelectionOffsetsRef.current
    if (!editable || !offsets) return null

    const restored = restoreSelectionByOffsets(editable, offsets.start, offsets.end)
    if (!restored) return null
    lastRangeRef.current = restored.cloneRange()
    return restored
  }

  const baseFontSizePx = (): number => {
    const fromSel = selectionStyles.fontSize ? Number.parseFloat(selectionStyles.fontSize) : NaN
    if (Number.isFinite(fromSel) && fromSel > 0) return fromSel
    return effectiveTextLayer?.fontSize ?? 16
  }

  const syncEditingHtmlPreserveSelection = (
    activeEl: HTMLElement,
    preferredOffsets?: { start: number; end: number } | null,
  ) => {
    lastEditableRef.current = activeEl
    const offsets =
      preferredOffsets ??
      getSelectionOffsetsWithin(activeEl) ??
      lastSelectionOffsetsRef.current

    if (offsets) {
      lastSelectionOffsetsRef.current = { ...offsets }
    }

    onSetEditingText?.(activeEl.innerHTML)
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        try {
          activeEl.focus({ preventScroll: true })
          if (offsets) {
            const restored = restoreSelectionByOffsets(activeEl, offsets.start, offsets.end)
            if (restored && !restored.collapsed) {
              lastRangeRef.current = restored.cloneRange()
              lastSelectionOffsetsRef.current = { ...offsets }
            }
          }
        } catch {
          /* range устарел после мутации DOM */
        }
      })
    })
  }

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    restoreSavedNonCollapsedRange()

    document.execCommand(command, false, value)

    const activeEl = document.activeElement
    if (activeEl && activeEl.getAttribute("contenteditable") === "true") {
      const el = activeEl as HTMLElement
      if (el.querySelector("li")) {
        normalizeListMarkerFontSizes(el)
      }
      syncEditingHtmlPreserveSelection(el)
    }
  }

  const applyInlineStyle = (styleName: string, styleValue: string) => {
    const range = restoreSavedNonCollapsedRange()
    if (!range) return

    const activeEl = range.commonAncestorContainer instanceof HTMLElement 
      ? range.commonAncestorContainer.closest('[contenteditable="true"]') as HTMLElement
      : range.commonAncestorContainer.parentElement?.closest('[contenteditable="true"]') as HTMLElement
    
    if (!activeEl) return
    const offsetsSnapshot = getSelectionOffsetsWithin(activeEl, range)

    // Ensure focus is back on the element before command
    activeEl.focus({ preventScroll: true })

    if (styleName === 'font-size') {
      // FORCE HTML tags instead of CSS for this step to make the replacement predictable
      document.execCommand('styleWithCSS', false, 'false')
      document.execCommand('fontSize', false, '7')
      
      // Now find all font tags in the editor. Multi-line selection creates multiple font tags.
      const fontTags = activeEl.querySelectorAll('font[size="7"]')
      fontTags.forEach(tag => {
        const span = document.createElement('span')
        span.style.fontSize = styleValue
        
        // Move all content from font tag to span
        while (tag.firstChild) span.appendChild(tag.firstChild)
        tag.parentNode?.replaceChild(span, tag)
      })
      
      // Restore styleWithCSS for other commands
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
    } else if (styleName === "color") {
      // Прямое применение цвета надёжнее, чем временный маркер:
      // в некоторых браузерах foreColor не создаёт <font>, поэтому маркерный
      // проход ничего не меняет и цвет визуально не применяется.
      document.execCommand("styleWithCSS", false, "true")
      document.execCommand("foreColor", false, styleValue)
      document.execCommand("styleWithCSS", false, "true")
    }

    if (activeEl.querySelector("li")) {
      normalizeListMarkerFontSizes(activeEl)
    }
    syncEditingHtmlPreserveSelection(activeEl, offsetsSnapshot)
  }

  const applyAlignment = (alignment: "left" | "center" | "right") => {
    const range = restoreSavedNonCollapsedRange()
    if (range) {
      const command =
        alignment === "left"
          ? "justifyLeft"
          : alignment === "center"
            ? "justifyCenter"
            : "justifyRight"
      executeCommand(command)
      return
    }
    updateLayer({ alignment })
  }

  return (
    <div data-certificate-editor-toolbar className="border-b border-border bg-background flex flex-col">
      {/* Top helper bar */}
      <div className="flex items-center justify-between px-4 py-1 border-b border-border/50 text-xs bg-muted/20">
        <div className="flex items-center gap-4">
          <span className="font-medium text-foreground/80">Конструктор сертификатов</span>
          <div className="flex items-center gap-1 border-l border-border/50 pl-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={undo} 
              disabled={!canUndo}
              title="Отменить (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={redo} 
              disabled={!canRedo}
              title="Повторить (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </Button>
          </div>
          {lastSaved && (
            <span className="text-muted-foreground border-l border-border/50 pl-4">
              Сохранено: {format(lastSaved, "HH:mm:ss", { locale: ru })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            layers={layers}
            getLayersForExport={getLayersForExport}
            backgroundImage={backgroundImage}
            pageWidth={pageSizeSettings.width}
            pageHeight={pageSizeSettings.height}
            zoomLevel={zoomLevel}
          />
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onSave} title="Сохранить">
            <Save className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <div className="px-4 pt-1 border-b border-border/50">
          <TabsList className="bg-transparent h-8 p-0 gap-1">
            <TabsTrigger 
              value="home" 
              className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs"
            >
              Главная
            </TabsTrigger>
            <TabsTrigger 
              value="insert" 
              className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs"
            >
              Вставка
            </TabsTrigger>
            <TabsTrigger 
              value="layout" 
              className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs"
            >
              Макет
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-2 h-28 bg-muted/10 flex items-center overflow-x-auto">
          {/* HOME TAB */}
          <TabsContent value="home" className="flex items-center gap-4 m-0 h-full w-full">
            {/* Font Group */}
            <div className="flex flex-col gap-2 px-2 border-r border-border h-full justify-center min-w-[320px]">
              <div className="flex items-center gap-2">
                <Select
                  value={selectionStyles.fontFamily || effectiveTextLayer?.fontFamily || "sans-serif"}
                  onValueChange={(value) => {
                    const range = restoreSavedNonCollapsedRange()
                    if (range) {
                      applyInlineStyle('font-family', value)
                    } else {
                      updateLayer({ fontFamily: value })
                    }
                  }}
                  disabled={!effectiveTextLayer}
                >
                  <SelectTrigger
                    className="h-9 w-[160px] text-sm"
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    <SelectValue placeholder="Шрифт" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={selectionStyles.fontSize || String(effectiveTextLayer?.fontSize || 16)}
                  onValueChange={(value) => {
                    const range = restoreSavedNonCollapsedRange()
                    if (range) {
                      applyInlineStyle('font-size', `${value}px`)
                    } else {
                      updateLayer({ fontSize: Number(value) })
                    }
                  }}
                  disabled={!effectiveTextLayer}
                >
                  <SelectTrigger
                    className="h-9 w-[80px] text-sm"
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    <SelectValue placeholder="Размер" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_SIZES.map((size) => (
                      <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center border border-input rounded-md h-9 overflow-hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const newSize = Math.min(96, baseFontSizePx() + 2)
                      const range = restoreSavedNonCollapsedRange()
                      if (range) {
                        applyInlineStyle("font-size", `${newSize}px`)
                      } else {
                        updateLayer({ fontSize: newSize })
                      }
                    }}
                    disabled={!effectiveTextLayer}
                  >
                    <span className="text-sm font-bold">A</span><span className="text-[10px] align-top">+</span>
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const newSize = Math.max(8, baseFontSizePx() - 2)
                      const range = restoreSavedNonCollapsedRange()
                      if (range) {
                        applyInlineStyle("font-size", `${newSize}px`)
                      } else {
                        updateLayer({ fontSize: newSize })
                      }
                    }}
                    disabled={!effectiveTextLayer}
                  >
                    <span className="text-sm">A</span><span className="text-[10px] align-top">-</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center bg-background border border-input rounded-md p-1">
                  <Button
                    variant={selectionStyles.bold || effectiveTextLayer?.fontWeight === "bold" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const range = restoreSavedNonCollapsedRange()
                      if (range) {
                        executeCommand('bold')
                      } else {
                        updateLayer({ fontWeight: effectiveTextLayer?.fontWeight === "bold" ? "normal" : "bold" })
                      }
                    }}
                    disabled={!effectiveTextLayer}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={selectionStyles.italic || effectiveTextLayer?.fontStyle === "italic" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const range = restoreSavedNonCollapsedRange()
                      if (range) {
                        executeCommand('italic')
                      } else {
                        updateLayer({ fontStyle: effectiveTextLayer?.fontStyle === "italic" ? "normal" : "italic" })
                      }
                    }}
                    disabled={!effectiveTextLayer}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={selectionStyles.underline || effectiveTextLayer?.textDecoration?.includes("underline") ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const range = restoreSavedNonCollapsedRange()
                      if (range) {
                        executeCommand('underline')
                      } else {
                        updateLayer({ textDecoration: effectiveTextLayer?.textDecoration === "underline" ? "none" : "underline" })
                      }
                    }}
                    disabled={!effectiveTextLayer}
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                </div>
                
                <Separator orientation="vertical" className="h-8 mx-2" />
                
                <div className="flex items-center gap-2">
                  <div
                      className="flex flex-col items-center cursor-pointer p-1 rounded hover:bg-muted"
                      title="Цвет текста"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        const input = document.getElementById('color-picker-input');
                        if (input) input.click();
                      }}
                    >
                      <span className="font-bold text-sm">A</span>
                      <div 
                        className="h-1 w-6" 
                        style={{ backgroundColor: selectionStyles.color || effectiveTextLayer?.color || "#000000" }}
                      />
                      <input
                        id="color-picker-input"
                        type="color"
                        value={selectionStyles.color || effectiveTextLayer?.color || "#000000"}
                        onChange={(e) => {
                          const range = restoreSavedNonCollapsedRange()
                          if (range) {
                            applyInlineStyle("color", e.target.value)
                          } else {
                            updateLayer({ color: e.target.value })
                          }
                        }}
                        disabled={!effectiveTextLayer}
                        className="hidden"
                      />
                    </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground text-center mt-[-4px]">Шрифт</span>
            </div>

            {/* Paragraph Group */}
            <div className="flex flex-col gap-2 px-2 border-r border-border h-full justify-center">
              <div className="flex items-center gap-1">
                <Button
                  variant={effectiveTextLayer?.listType === "bullet" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    executeCommand('insertUnorderedList')
                    // Also toggle state for backward compatibility if needed, but the primary change is in HTML
                    updateLayer({ listType: effectiveTextLayer?.listType === "bullet" ? "none" : "bullet" })
                  }}
                  disabled={!effectiveTextLayer}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={effectiveTextLayer?.listType === "number" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    executeCommand('insertOrderedList')
                    updateLayer({ listType: effectiveTextLayer?.listType === "number" ? "none" : "number" })
                  }}
                  disabled={!effectiveTextLayer}
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant={showFormattingSymbols ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onToggleFormattingSymbols}
                  title="Отобразить все знаки (Ctrl+*)"
                >
                  <Pilcrow className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant={effectiveTextLayer?.alignment === "left" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyAlignment("left")}
                  disabled={!effectiveTextLayer}
                  title="По левому краю (весь блок текста слоя)"
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={effectiveTextLayer?.alignment === "center" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyAlignment("center")}
                  disabled={!effectiveTextLayer}
                  title="По центру (весь блок текста слоя)"
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant={effectiveTextLayer?.alignment === "right" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyAlignment("right")}
                  disabled={!effectiveTextLayer}
                  title="По правому краю (весь блок текста слоя)"
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground text-center mt-[-4px]">Абзац</span>
            </div>

            <div className="flex items-stretch gap-3 px-2 h-full justify-center">
              <div className="flex flex-col gap-1 justify-center border-r border-border pr-3">
                <div className="flex items-center bg-background border border-input rounded-md px-2 h-10 gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onZoomOut}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm w-12 text-center select-none">{Math.round(zoomLevel * 100)}%</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onZoomIn}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground text-center mt-[-4px]">Масштаб</span>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <Button
                  variant="ghost"
                  className="h-20 flex flex-col gap-2 px-4"
                  onClick={onPreview}
                >
                  <Eye className="w-6 h-6" />
                  <span className="text-sm">Просмотр</span>
                </Button>
              </div>
            </div>

          </TabsContent>

          {/* INSERT TAB */}
          <TabsContent value="insert" className="flex items-center gap-4 m-0 h-full w-full">
            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button 
                variant="ghost" 
                className="h-20 flex flex-col gap-2 px-4"
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-sm">Изображение</span>
              </Button>
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={onAddImageLayer}
              />
            </div>

            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button 
                variant="ghost" 
                className="h-20 flex flex-col gap-2 px-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="w-6 h-6" />
                <span className="text-sm">Фон</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onBackgroundUpload(file)
                  e.target.value = ""
                }}
              />
              {backgroundImage && (
                <Button variant="ghost" size="sm" onClick={onRemoveBackground} className="h-6 text-xs text-destructive">
                  Удалить
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-20 flex flex-col gap-2 px-4"
                    onPointerDownCapture={() => onBeforeVariableMenuOpen?.()}
                  >
                    <div className="flex relative">
                      <FileDown className="w-6 h-6" />
                      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold">{`{ }`}</span>
                    </div>
                    <span className="text-sm">Переменная</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuLabel className="text-xs font-semibold normal-case">
                    Удостоверительные документы
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {VARIABLES.map((variable) => (
                    <DropdownMenuItem
                      key={variable.id}
                      onClick={() => onAddVariable(variable)}
                      className="cursor-pointer flex items-start justify-between gap-2"
                    >
                      <span className="leading-tight">{variable.label}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0 uppercase tracking-wide">
                        {variableKindLabel(variable.kind)}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-1.5 px-2 border-r border-border h-full justify-center min-w-[168px]">
              <span className="text-[10px] text-muted-foreground leading-none">Данные CSV / Excel</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 justify-start"
                onClick={() => mergeFileInputRef.current?.click()}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                Загрузить таблицу
              </Button>
              <input
                ref={mergeFileInputRef}
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onImportMergeTable(file)
                  e.target.value = ""
                }}
              />
              {mergeDataRowsCount > 0 ? (
                <div className="flex flex-col gap-1.5 mt-0.5">
                  <Select
                    value={String(mergeDataRowIndex)}
                    onValueChange={(v) => onMergeDataRowIndexChange(Number.parseInt(v, 10))}
                  >
                    <SelectTrigger className="h-8 text-xs" onPointerDown={(ev) => ev.preventDefault()}>
                      <SelectValue placeholder="Строка" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: mergeDataRowsCount }, (_, i) => (
                        <SelectItem key={i} value={String(i)}>
                          Строка {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" size="sm" className="h-8 text-xs" onClick={onApplyMerge}>
                    Подставить в поля
                  </Button>
                </div>
              ) : null}
            </div>
          </TabsContent>

          {/* LAYOUT TAB */}
          <TabsContent value="layout" className="flex items-center gap-4 m-0 h-full w-full">
            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button 
                variant="ghost" 
                className="h-20 flex flex-col gap-2 px-4"
                onClick={onOpenPageSize}
              >
                <Settings className="w-6 h-6" />
                <span className="text-sm">Размер</span>
              </Button>
            </div>

            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button 
                variant="ghost" 
                className="h-20 flex flex-col gap-2 px-4"
                onClick={onOpenTemplateSelector}
              >
                <LayoutTemplate className="w-6 h-6" />
                <span className="text-sm">Шаблоны</span>
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
