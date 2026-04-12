"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  type TextLayer,
  type Layer,
  TEMPLATES,
  VARIABLES,
  isTextLayer,
  isImageLayer,
  getTextLayerPositionAnchor,
  type CertificateVariable,
} from "./data"
import {
  buildVariableSpanHtml,
  applyVariableRowToLayersWithStats,
  countFilledVariableCells,
} from "./certificateVariableHtml"
import { parseCertificateMergeFile } from "./mergeTableImport"
import { toast } from "sonner"
import FloatingPropertiesPanel from "./components/FloatingPropertiesPanel"
import ZoomableCanvas from "./components/ZoomableCanvas"
import type { PageSizeSettings } from "./components/PageSizeModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import PageSizeModal from "./components/PageSizeModal"
import TemplateSelector from "./components/TemplateSelector"
import InitialChoiceModal from "./components/InitialChoiceModal"
import { Eye, Settings, Save, Minus, Plus, RotateCw } from "lucide-react"
import {
  useCertificatePersistence,
  certificateDraftExistsInStorage,
} from "./hooks/useCertificatePersistence"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { EditorToolbar } from "./components/EditorToolbar"

import { useHistory } from "./hooks/useHistory"

const DEFAULT_BLANK_PAGE_SIZE: PageSizeSettings = {
  format: "A4",
  width: 210,
  height: 297,
  orientation: "portrait",
}

/** Пустой документ: один фоновый текстовый слой на весь лист A4 */
function createBlankCertificateLayers(): Layer[] {
  return [
    {
      id: "main-text-layer",
      type: "text",
      text: "<div>\u00A0</div>",
      x: 0,
      y: 0,
      fontSize: 16,
      fontFamily: "sans-serif",
      color: "#000000",
      alignment: "left",
      width: 100,
      xPercent: 0,
      yPercent: 0,
      widthPercent: 100,
      isBackground: true,
    },
  ]
}

export type DocumentConstructorPersistenceConfig = {
  enabled?: boolean
}

export type DocumentConstructorInitialState = {
  layers: Layer[]
  backgroundImage: string | null
  pageSizeSettings: PageSizeSettings
}

type CertificateDesignerProps = {
  initialState?: DocumentConstructorInitialState
  persistence?: DocumentConstructorPersistenceConfig
  onSave?: (state: DocumentConstructorInitialState) => void
}

export function CertificateDesigner({ initialState, persistence, onSave }: CertificateDesignerProps = {}) {
  const isEmbeddedMode = Boolean(initialState)

  const {
    state: layers,
    set: setLayers,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: resetLayersHistory,
  } = useHistory<Layer[]>(createBlankCertificateLayers())
  
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("main-text-layer")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  const layersRef = useRef(layers)
  useEffect(() => {
    layersRef.current = layers
  }, [layers])

  const [showPreview, setShowPreview] = useState(false)
  const [showPageSizeModal, setShowPageSizeModal] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [showInitialChoice, setShowInitialChoice] = useState(!initialState)
  const [hasLastDocument, setHasLastDocument] = useState(false)
  const [pageSizeSettings, setPageSizeSettings] = useState<PageSizeSettings>(DEFAULT_BLANK_PAGE_SIZE)
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 })
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [editingLayerId, setEditingLayerId] = useState<string | null>("main-text-layer")
  const [editingText, setEditingText] = useState("")
  const [editingSelectionStart, setEditingSelectionStart] = useState<number | null>(null)
  const [editingSelectionEnd, setEditingSelectionEnd] = useState<number | null>(null)
  const [showFormattingSymbols, setShowFormattingSymbols] = useState(false)

  const [showContextMenu, setShowContextMenu] = useState(false)

  /** После выбора файла фона — вариант: растянуть по листу или изменить размер листа */
  const [backgroundFitChoice, setBackgroundFitChoice] = useState<{
    dataUrl: string
    imgWidthPx: number
    imgHeightPx: number
  } | null>(null)
  /** Размер страницы до подгонки под фон, чтобы вернуть его после удаления фона */
  const pageSizeBeforeBackgroundFitRef = useRef<PageSizeSettings | null>(null)

  /** Строки из CSV/Excel, ключи — id переменных (participant_name и т.д.) */
  const [mergeRows, setMergeRows] = useState<Record<string, string>[]>([])
  const [mergeRowIndex, setMergeRowIndex] = useState(0)
  /** После подстановки из таблицы обновить DOM contenteditable, даже если фокус в тулбаре */
  const [contentHtmlSyncNonce, setContentHtmlSyncNonce] = useState(0)

  const editingLayerIdRef = useRef(editingLayerId)
  const editingTextRef = useRef(editingText)
  useEffect(() => {
    editingLayerIdRef.current = editingLayerId
  }, [editingLayerId])
  useEffect(() => {
    editingTextRef.current = editingText
  }, [editingText])

  /** Пока открывается меню «Переменная», фокус уходит с редактора — сохраняем Range на pointerdown триггера */
  const savedVariableInsertRangeRef = useRef<Range | null>(null)
  const captureSelectionForVariableInsert = useCallback(() => {
    if (typeof window === "undefined") return
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) {
      savedVariableInsertRangeRef.current = null
      return
    }
    const range = sel.getRangeAt(0)
    const ancestor =
      range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? (range.commonAncestorContainer as Element)
        : range.commonAncestorContainer.parentElement
    const host = ancestor?.closest(".document-container .rich-text-content[contenteditable='true']")
    if (!host) {
      savedVariableInsertRangeRef.current = null
      return
    }
    try {
      savedVariableInsertRangeRef.current = range.cloneRange()
    } catch {
      savedVariableInsertRangeRef.current = null
    }
  }, [])

  useEffect(() => {
    setHasLastDocument(certificateDraftExistsInStorage())
  }, [])

  const getLayersForPersistence = useCallback((): Layer[] => {
    const L = layersRef.current
    const id = editingLayerIdRef.current
    const html = editingTextRef.current
    if (id == null) return L
    return L.map((l) =>
      isTextLayer(l) && l.id === id ? { ...l, text: html } : l,
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    setEditingLayerId(null)

    const containers = Array.from(document.querySelectorAll(".document-container"))
    if (containers.length === 0) return

    const active = document.activeElement
    const target =
      containers.find((c) => active instanceof Node && c.contains(active)) ?? containers[0]

    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(target)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }, [])

  const handleDeleteSelection = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return

    const range = selection.getRangeAt(0)
    const containers = Array.from(document.querySelectorAll(".document-container"))
    const container = containers.find(
      (c) => c.contains(range.commonAncestorContainer),
    )
    if (!container) return

    // Find all layer elements that are at least partially within the selection
    const layerElements = Array.from(container.querySelectorAll('[data-layer-id]'))
    const affectedLayerIds: string[] = []
    
    layerElements.forEach(el => {
      if (selection.containsNode(el, true)) {
        const id = el.getAttribute('data-layer-id')
        if (id) affectedLayerIds.push(id)
      }
    })

    if (affectedLayerIds.length === 0) return

    // Create a copy of layers to modify
    let updatedLayers = [...layers]
    let firstAffectedId: string | null = null
    let remainingText = ""

    // This is a simplified logic: if multiple blocks are selected, 
    // we merge them and remove the selected text parts.
    // For now, let's at least handle deleting the layers that are FULLY selected
    // and clearing text in partially selected ones.
    
    const newLayers = updatedLayers.filter(layer => {
      if (!affectedLayerIds.includes(layer.id)) return true
      
      // If it's a text layer and partially selected, we'd ideally truncate it.
      // For now, if multiple are selected, we'll delete them to satisfy the "not deleting" issue.
      return false 
    })

    if (newLayers.length !== updatedLayers.length) {
      setLayers(newLayers)
      selection.removeAllRanges()
    }
  }, [layers, setLayers])

  const handleSelectAllRef = useRef(handleSelectAll)
  const handleDeleteSelectionRef = useRef(handleDeleteSelection)
  
  useEffect(() => {
    handleSelectAllRef.current = handleSelectAll
    handleDeleteSelectionRef.current = handleDeleteSelection
  }, [handleSelectAll, handleDeleteSelection])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+8 is Ctrl+* on many layouts, or check for Ctrl+* on numpad
      if (e.ctrlKey && (e.key === '*' || e.key === '8' && e.shiftKey)) {
        e.preventDefault()
        setShowFormattingSymbols(prev => !prev)
      }

      // Backspace or Delete for multi-block selection
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const activeElement = document.activeElement
        const isInput = activeElement?.tagName === 'INPUT' || 
                        activeElement?.tagName === 'TEXTAREA' || 
                        activeElement?.getAttribute('contenteditable') === 'true'
        
        if (!isInput) {
          const selection = window.getSelection()
          if (selection && !selection.isCollapsed) {
            e.preventDefault()
            handleDeleteSelectionRef.current()
          }
        }
      }

      // Ctrl+A for Select All
      if (e.ctrlKey && e.key === 'a') {
        // If not in a focused input/textarea or contenteditable, handle custom select all
        const activeElement = document.activeElement
        const isInput = activeElement?.tagName === 'INPUT' || 
                        activeElement?.tagName === 'TEXTAREA' || 
                        activeElement?.getAttribute('contenteditable') === 'true'
        
        // Only intercept if we're not in a toolbar input or a regular input
        const isToolbarInput = activeElement?.closest('.border-b.border-border.bg-background')
        if (!isInput && !isToolbarInput) {
          e.preventDefault()
          handleSelectAllRef.current()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const { save, lastSaved, restoreDraftFromLocalStorage } = useCertificatePersistence({
    layers,
    backgroundImage,
    pageSizeSettings,
    setLayers,
    setBackgroundImage,
    setPageSizeSettings,
    enabled: persistence?.enabled ?? !isEmbeddedMode,
    /** На полной странице конструктора черновик подставляется только по кнопке «Последний документ» */
    autoLoadOnMount: isEmbeddedMode,
    getLayersForPersistence,
  })

  const hasInitializedRef = useRef(false)
  useEffect(() => {
    if (!initialState || hasInitializedRef.current) return
    
    if (initialState.layers && initialState.layers.length > 0) {
      setLayers(initialState.layers, false)
      setSelectedLayerId(null)
      setEditingLayerId(null)
      setEditingText("")
    }
    
    setBackgroundImage(initialState.backgroundImage)
    setPageSizeSettings(initialState.pageSizeSettings)
    
    hasInitializedRef.current = true
  }, [initialState, setLayers])

  const selectedLayer = layers.find((l) => l.id === selectedLayerId)

  const handleUpdateLayer = useCallback((id: string, updates: Partial<Layer>) => {
    setLayers((prevLayers) => {
      const newLayers = prevLayers.map((l) => {
        if (l.id !== id) return l
        if (
          isTextLayer(l) &&
          !l.isBackground &&
          updates.alignment !== undefined &&
          updates.positionAnchor === undefined &&
          (l as TextLayer).positionAnchor === undefined &&
          updates.alignment !== (l as TextLayer).alignment
        ) {
          const tl = l as TextLayer
          return { ...l, positionAnchor: tl.alignment, ...updates } as Layer
        }
        return { ...l, ...updates } as Layer
      })
      
      // Cleanup empty pages (except page 0)
      const pageIndices = Array.from(new Set(newLayers.map(l => l.pageIndex || 0))).sort((a, b) => a - b)
      if (pageIndices.length <= 1) return newLayers

      const pagesToKeep = new Set([0]) // Always keep page 0
      pageIndices.forEach(idx => {
        if (idx === 0) return
        const layersOnPage = newLayers.filter(l => (l.pageIndex || 0) === idx)
        const hasContent = layersOnPage.some(l => {
          if (isTextLayer(l)) {
            const text = l.text?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() || ""
            return text.length > 0 && text !== "\u00A0"
          }
          return true // Keep page if it has images or other non-text layers
        })
        if (hasContent) pagesToKeep.add(idx)
      })

      if (pagesToKeep.size === pageIndices.length) return newLayers

      // Filter out layers on empty pages and re-index remaining pages
      const sortedKeepIndices = Array.from(pagesToKeep).sort((a, b) => a - b)
      const indexMap = new Map(sortedKeepIndices.map((oldIdx, newIdx) => [oldIdx, newIdx]))
      
      return newLayers
        .filter(l => pagesToKeep.has(l.pageIndex || 0))
        .map(l => ({ ...l, pageIndex: indexMap.get(l.pageIndex || 0) || 0 }))
    })
  }, [setLayers])

  const scaleLayersToPageSize = useCallback(
    (oldWidth: number, oldHeight: number, newWidth: number, newHeight: number) => {
      setLayers((prevLayers) =>
        prevLayers.map((layer) => {
          // Calculate current position as percentage of old page size
          const xPercent = layer.xPercent !== undefined ? layer.xPercent : (layer.x / oldWidth) * 100
          const yPercent = layer.yPercent !== undefined ? layer.yPercent : (layer.y / oldHeight) * 100
          const widthPercent = layer.widthPercent !== undefined ? layer.widthPercent : (layer.width / oldWidth) * 100

          // Convert percentages to new absolute values
          const newX = (xPercent * newWidth) / 100
          const newY = (yPercent * newHeight) / 100
          const newWidth_abs = (widthPercent * newWidth) / 100

          // Clamp values to keep text within bounds
          const clampedXPercent = Math.max(0, Math.min(100, xPercent))
          const clampedYPercent = Math.max(0, Math.min(100, yPercent))
          const clampedWidthPercent = Math.max(5, Math.min(100 - clampedXPercent, widthPercent))

          const base = {
            ...layer,
            x: Math.max(0, Math.min(newWidth, newX)),
            y: Math.max(0, Math.min(newHeight, newY)),
            width: Math.max(5, Math.min(newWidth, newWidth_abs)),
            xPercent: clampedXPercent,
            yPercent: clampedYPercent,
            widthPercent: clampedWidthPercent,
          }

          if (isImageLayer(layer) && layer.height != null && layer.height > 0 && oldHeight > 0) {
            const heightPercent =
              layer.heightPercent ?? (layer.height / oldHeight) * 100
            const newH = Math.max(1, (heightPercent * newHeight) / 100)
            return { ...base, height: newH, heightPercent } as Layer
          }

          return base
        }),
      )
    },
    [],
  )

  const handleFitTemplateToPage = useCallback(() => {
    // Use the default A4 size as the original template size
    const templateWidth = 210 // A4 width in mm
    const templateHeight = 297 // A4 height in mm

    scaleLayersToPageSize(templateWidth, templateHeight, pageSizeSettings.width, pageSizeSettings.height)
  }, [pageSizeSettings.width, pageSizeSettings.height, scaleLayersToPageSize])

  const handleLayerDoubleClick = (layerId: string, newText?: string) => {
    if (newText !== undefined) {
      handleUpdateLayer(layerId, { text: newText })
    }
  }

  const handleAddVariable = useCallback(
    (variable: CertificateVariable) => {
      const html = buildVariableSpanHtml(variable)

      const restored = savedVariableInsertRangeRef.current
      savedVariableInsertRangeRef.current = null
      if (restored) {
        try {
          if (document.contains(restored.startContainer)) {
            const sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(restored)
          }
        } catch {
          /* устаревший Range */
        }
      }

      const tryInsertInBody = (): boolean => {
        const preferredId = editingLayerIdRef.current
        let ce: HTMLElement | null = null
        if (preferredId) {
          ce = document.querySelector(
            `[data-layer-id="${preferredId}"] .rich-text-content[contenteditable="true"]`,
          ) as HTMLElement | null
        }
        const active = document.activeElement
        if (!ce && active instanceof HTMLElement && active.isContentEditable) {
          if (active.closest(".document-container")) ce = active
        }
        if (!ce) {
          ce = document.querySelector(
            ".document-container .rich-text-content[contenteditable='true']",
          ) as HTMLElement | null
        }
        if (!ce) return false

        const layerHost = ce.closest("[data-layer-id]")
        const layerId = layerHost?.getAttribute("data-layer-id")
        if (!layerId) return false

        ce.focus({ preventScroll: true })
        document.execCommand("insertHTML", false, html)
        const nextHtml = ce.innerHTML
        handleUpdateLayer(layerId, { text: nextHtml })
        if (editingLayerIdRef.current === layerId) {
          setEditingText(nextHtml)
        }
        setEditingLayerId(layerId)
        setSelectedLayerId(layerId)
        return true
      }

      if (tryInsertInBody()) return

      const prev = layersRef.current
      const main = prev.find(
        (l) => isTextLayer(l) && l.isBackground && (l.pageIndex ?? 0) === 0,
      ) as TextLayer | undefined

      if (!main) {
        toast.error("Поставьте курсор в текст документа или откройте редактирование.")
        return
      }

      const currentHtml =
        main.id === editingLayerIdRef.current ? editingTextRef.current : main.text || ""
      const base = currentHtml.trim().length === 0 ? "<div>\u00A0</div>" : currentHtml
      const nextText = `${base}${html}`

      handleUpdateLayer(main.id, { text: nextText })
      setEditingLayerId(main.id)
      setSelectedLayerId(main.id)
      setEditingText(nextText)
    },
    [handleUpdateLayer],
  )

  const handleImportMergeTable = useCallback(async (file: File) => {
    try {
      const { rows, rawHeaders } = await parseCertificateMergeFile(file)
      if (rows.length === 0) {
        toast.error(
          rawHeaders.length === 0
            ? "В файле нет данных или лист пустой."
            : "Не найдено столбцов по заголовкам переменных. Используйте подписи вроде «Имя участника», «Дата мероприятия».",
        )
        return
      }
      setMergeRows(rows)
      setMergeRowIndex(0)
      toast.success(`Загружено строк: ${rows.length}`)
    } catch (err) {
      console.error(err)
      toast.error("Не удалось прочитать CSV или Excel.")
    }
  }, [])

  const handleApplyMerge = useCallback(() => {
    if (mergeRows.length === 0) {
      toast.error("Сначала загрузите таблицу CSV или Excel.")
      return
    }
    const row = mergeRows[mergeRowIndex] ?? mergeRows[0]
    const eid = editingLayerIdRef.current
    const liveEditing =
      eid != null ? { layerId: eid, html: editingTextRef.current } : null

    const prevLayers = layersRef.current
    const { layers: next, filledInDocument: inDoc } = applyVariableRowToLayersWithStats(
      prevLayers,
      row,
      liveEditing,
    )
    setLayers(next)

    const tl =
      eid != null
        ? (next.find((l) => l.id === eid && isTextLayer(l)) as TextLayer | undefined)
        : undefined

    queueMicrotask(() => {
      if (tl) {
        setEditingText(tl.text)
        setContentHtmlSyncNonce((n) => n + 1)
      } else if (eid != null) {
        setContentHtmlSyncNonce((n) => n + 1)
      }

      const inRow = countFilledVariableCells(row)

      if (inRow === 0) {
        toast.warning(
          "В выбранной строке нет непустых ячеек для полей, либо заголовки в файле не совпали с переменными. Первая строка: Имя участника, Место участника, Дата мероприятия…",
        )
      } else if (inDoc === 0) {
        toast.warning(
          "В таблице есть заполненные столбцы, но в документе не найдены подходящие переменные. Вставьте поля через «Вставка» → «Переменная» (или перетащите из панели).",
        )
      } else if (inRow > inDoc) {
        toast.success(
          `В документ подставлено значений: ${inDoc}. В строке таблицы заполнено столбцов: ${inRow} — часть данных не попала в макет (нет таких переменных на листе).`,
        )
      } else {
        toast.success(`В документ подставлено значений: ${inDoc}.`)
      }
    })
  }, [mergeRows, mergeRowIndex, setLayers])

  const handleAddImageLayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ""
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      if (!dataUrl) return

      const image = new Image()
      const insertInlineImage = (widthPx: number, heightPx: number) => {
        const safeSrc = dataUrl.replace(/"/g, "&quot;")
        const imgHtml = `<img src="${safeSrc}" alt="" width="${Math.round(widthPx)}" height="${Math.round(heightPx)}" class="certificate-inline-img" style="max-width:100%;height:auto;vertical-align:baseline;display:inline-block" />`

        const tryInsertInFocusedBody = (): boolean => {
          const active = document.activeElement
          let ce: HTMLElement | null = null
          if (active instanceof HTMLElement && active.isContentEditable) {
            if (active.closest(".document-container")) ce = active
          }
          if (!ce) {
            ce = document.querySelector(
              ".document-container .rich-text-content[contenteditable='true']",
            ) as HTMLElement | null
          }
          if (!ce) return false

          const layerHost = ce.closest("[data-layer-id]")
          const layerId = layerHost?.getAttribute("data-layer-id")
          if (!layerId) return false

          ce.focus({ preventScroll: true })
          document.execCommand("insertHTML", false, imgHtml)

          const nextHtml = ce.innerHTML
          handleUpdateLayer(layerId, { text: nextHtml })
          if (editingLayerIdRef.current === layerId) {
            setEditingText(nextHtml)
          }
          setEditingLayerId(layerId)
          setSelectedLayerId(layerId)
          return true
        }

        if (tryInsertInFocusedBody()) return

        const prev = layersRef.current
        const main = prev.find(
          (l) =>
            isTextLayer(l) &&
            l.isBackground &&
            (l.pageIndex ?? 0) === 0,
        ) as TextLayer | undefined

        if (!main) return

        const currentHtml =
          main.id === editingLayerIdRef.current ? editingTextRef.current : main.text || ""
        const base =
          currentHtml.trim().length === 0 ? "<div>\u00A0</div>" : currentHtml
        const nextText = `${base}<p>${imgHtml}</p>`

        handleUpdateLayer(main.id, { text: nextText })
        setEditingLayerId(main.id)
        setSelectedLayerId(main.id)
        setEditingText(nextText)
      }

      image.onload = () => {
        const maxWpx = 560
        let w = image.naturalWidth
        let h = image.naturalHeight
        if (w <= 0 || h <= 0) {
          insertInlineImage(400, 300)
          return
        }
        if (w > maxWpx) {
          h = Math.round((h * maxWpx) / w)
          w = maxWpx
        }
        insertInlineImage(w, h)
      }
      image.onerror = () => insertInlineImage(400, 300)
      image.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteLayer = (id: string) => {
    setLayers((prevLayers) => {
      const newLayers = prevLayers.filter((l) => l.id !== id)
      
      // Cleanup empty pages
      const pageIndices = Array.from(new Set(newLayers.map(l => l.pageIndex || 0))).sort((a, b) => a - b)
      if (pageIndices.length <= 1) return newLayers

      const pagesToKeep = new Set([0])
      pageIndices.forEach(idx => {
        if (idx === 0) return
        const layersOnPage = newLayers.filter(l => (l.pageIndex || 0) === idx)
        const hasContent = layersOnPage.some(l => {
          if (isTextLayer(l)) {
            const text = l.text?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() || ""
            return text.length > 0 && text !== "\u00A0"
          }
          return true
        })
        if (hasContent) pagesToKeep.add(idx)
      })

      if (pagesToKeep.size === pageIndices.length) return newLayers

      const sortedKeepIndices = Array.from(pagesToKeep).sort((a, b) => a - b)
      const indexMap = new Map(sortedKeepIndices.map((oldIdx, newIdx) => [oldIdx, newIdx]))
      
      return newLayers
        .filter(l => pagesToKeep.has(l.pageIndex || 0))
        .map(l => ({ ...l, pageIndex: indexMap.get(l.pageIndex || 0) || 0 }))
    })

    if (selectedLayerId === id) {
      setSelectedLayerId(null)
    }
  }

  const handleBackgroundUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      const img = new Image()
      img.onload = () => {
        setBackgroundFitChoice({
          dataUrl,
          imgWidthPx: img.width,
          imgHeightPx: img.height,
        })
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  const applyBackgroundStretchToPage = () => {
    if (!backgroundFitChoice) return
    setBackgroundImage(backgroundFitChoice.dataUrl)
    setBackgroundFitChoice(null)
  }

  const applyPageSizeToBackground = () => {
    if (!backgroundFitChoice) return
    const { dataUrl, imgWidthPx, imgHeightPx } = backgroundFitChoice
    const width = Math.round(imgWidthPx / 3.78)
    const height = Math.round(imgHeightPx / 3.78)
    const oldWidth = pageSizeSettings.width
    const oldHeight = pageSizeSettings.height
    if (!pageSizeBeforeBackgroundFitRef.current) {
      pageSizeBeforeBackgroundFitRef.current = { ...pageSizeSettings }
    }
    setBackgroundImage(dataUrl)
    setPageSizeSettings({
      format: "Custom",
      width,
      height,
      orientation: (width >= height ? "landscape" : "portrait") as const,
    })
    scaleLayersToPageSize(oldWidth, oldHeight, width, height)
    setBackgroundFitChoice(null)
  }

  const handleRemoveBackground = useCallback(() => {
    const restoreSettings = pageSizeBeforeBackgroundFitRef.current
    const currentWidth = pageSizeSettings.width
    const currentHeight = pageSizeSettings.height

    setBackgroundImage(null)
    setBackgroundFitChoice(null)

    if (restoreSettings) {
      setPageSizeSettings(restoreSettings)
      if (
        restoreSettings.width !== currentWidth ||
        restoreSettings.height !== currentHeight
      ) {
        scaleLayersToPageSize(
          currentWidth,
          currentHeight,
          restoreSettings.width,
          restoreSettings.height,
        )
      }
      pageSizeBeforeBackgroundFitRef.current = null
    }
  }, [pageSizeSettings, scaleLayersToPageSize])

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string
          const img = new Image()
          img.onload = () => {
            setBackgroundFitChoice({
              dataUrl,
              imgWidthPx: img.width,
              imgHeightPx: img.height,
            })
          }
          img.src = dataUrl
        }
        reader.readAsDataURL(file)
      }
    } else {
      const varPayload = e.dataTransfer.getData("text/plain")
      if (!varPayload) return

      const variable: CertificateVariable | undefined = varPayload.startsWith("certificate-var:")
        ? VARIABLES.find((v) => v.id === varPayload.slice("certificate-var:".length))
        : VARIABLES.find((v) => v.label === varPayload)

      const canvasEl = e.currentTarget
      if (!canvasEl) return

      const canvasRect = canvasEl.getBoundingClientRect()
      const pixelX = e.clientX - canvasRect.left
      const pixelY = e.clientY - canvasRect.top

      const x = Math.max(0, pixelX / 3.78)
      const y = Math.max(0, pixelY / 3.78)

      const xPercent = (x / pageSizeSettings.width) * 100
      const yPercent = (y / pageSizeSettings.height) * 100
      const widthPercent = (80 / pageSizeSettings.width) * 100

      const newId = Date.now().toString()
      const layerText = variable
        ? `<div>${buildVariableSpanHtml(variable)}</div>`
        : varPayload

      const newLayer: TextLayer = {
        id: newId,
        text: layerText,
        x: x,
        y: y,
        fontSize: 28,
        fontFamily: "sans-serif",
        color: "#000000",
        alignment: "center",
        width: 80,
        xPercent,
        yPercent,
        widthPercent,
      }
      setLayers((prev) => [...prev, newLayer])
      setSelectedLayerId(newId)
    }
  }

  const handleLoadTemplate = (templateIndex: number) => {
    // Base size for templates (A4 in mm)
    const BASE_WIDTH = 210
    const BASE_HEIGHT = 297

    const template = TEMPLATES[templateIndex]

    // Set page orientation if defined in template
    let currentWidth = pageSizeSettings.width
    let currentHeight = pageSizeSettings.height

    if (template.orientation) {
      const isLandscape = template.orientation === "landscape"
      currentWidth = isLandscape ? 297 : 210
      currentHeight = isLandscape ? 210 : 297
      
      setPageSizeSettings({
        format: "A4",
        width: currentWidth,
        height: currentHeight,
        orientation: template.orientation,
      })
    }

    const templateLayers = template.layers.map((layer) => {
      const xPercent = (layer.x / BASE_WIDTH) * 100
      const yPercent = (layer.y / BASE_HEIGHT) * 100
      const widthPercent = (layer.width / BASE_WIDTH) * 100

      const x = (xPercent * currentWidth) / 100
      const y = (yPercent * currentHeight) / 100
      const width = (widthPercent * currentWidth) / 100

      const next: Layer = {
        ...layer,
        x,
        y,
        width,
        xPercent,
        yPercent,
        widthPercent,
      }

      if (isImageLayer(layer) && layer.height != null) {
        const heightPercent = (layer.height / BASE_HEIGHT) * 100
        const scaledHeight = (heightPercent * currentHeight) / 100
        return {
          ...next,
          height: scaledHeight,
          heightPercent,
        } as Layer
      }

      return next
    })

    setLayers(templateLayers)
    setSelectedLayerId(null)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handlePageSizeChange = (settings: PageSizeSettings) => {
    setPageSizeSettings(settings)
  }

  const handleLayerContextMenu = (layerId: string) => {
    setSelectedLayerId(layerId)
    setShowContextMenu(true)
    
    // Position logic for context menu could be handled here if needed,
    // but FloatingPropertiesPanel handles its own positioning or uses panelPosition
    // We might need to update panelPosition to mouse coordinates if we want it to appear at cursor
  }

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSave = useCallback(() => {
    const mergedLayers = getLayersForPersistence()
    setLayers(mergedLayers, false)
    save(true)
    onSave?.({
      layers: mergedLayers,
      backgroundImage,
      pageSizeSettings,
    })
  }, [
    backgroundImage,
    getLayersForPersistence,
    onSave,
    pageSizeSettings,
    save,
    setLayers,
  ])

  const handleOverflow = useCallback(
    (pageIndex: number, overflownContent: string, remainingContent: string) => {
      const editId = editingLayerIdRef.current
      if (!editId) return

      const prevLayers = layersRef.current
      const editingLayer = prevLayers.find(
        (l) => (l.pageIndex || 0) === pageIndex && l.id === editId,
      ) as TextLayer | undefined
      if (!editingLayer?.isBackground) return

      const nextPageIndex = pageIndex + 1
      const nextLayerId = `page-${nextPageIndex}-text`
      const nextLayer = prevLayers.find(
        (l) => (l.pageIndex || 0) === nextPageIndex && l.isBackground,
      ) as TextLayer | undefined

      let newLayers: Layer[]
      let focus: { id: string; text: string }

      const mapped = prevLayers.map((l) => {
        if (l.id === editingLayer.id) {
          return { ...l, text: remainingContent || "<div>\u00A0</div>" } as Layer
        }
        return l
      })

      if (!nextLayer) {
        const created: TextLayer = {
          ...editingLayer,
          id: nextLayerId,
          pageIndex: nextPageIndex,
          text: overflownContent || "<div>\u00A0</div>",
          isBackground: true,
        }
        newLayers = [...mapped, created]
        focus = { id: nextLayerId, text: overflownContent || "<div>\u00A0</div>" }
      } else {
        const updatedText = (overflownContent || "") + (nextLayer.text || "")
        newLayers = mapped.map((l) =>
          l.id === nextLayer.id ? ({ ...nextLayer, text: updatedText } as Layer) : l,
        )
        focus = { id: nextLayer.id, text: updatedText }
      }

      setLayers(newLayers)
      queueMicrotask(() => {
        setSelectedLayerId(focus.id)
        setEditingLayerId(focus.id)
        setEditingText(focus.text)
      })
    },
    [setLayers],
  )

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-foreground">Конструктор сертификатов</h1>
          </div>
          <EditorToolbar
            onOpenTemplateSelector={() => setShowTemplateSelector(true)}
            onBeforeVariableMenuOpen={captureSelectionForVariableInsert}
            onAddVariable={handleAddVariable}
            onImportMergeTable={handleImportMergeTable}
            onApplyMerge={handleApplyMerge}
            mergeDataRowsCount={mergeRows.length}
            mergeDataRowIndex={mergeRowIndex}
            onMergeDataRowIndexChange={setMergeRowIndex}
            onAddImageLayer={handleAddImageLayer}
            onBackgroundUpload={handleBackgroundUpload}
            onRemoveBackground={handleRemoveBackground}
            backgroundImage={backgroundImage}
            onOpenPageSize={() => setShowPageSizeModal(true)}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onRotate={handleRotate}
            zoomLevel={zoomLevel}
            rotation={rotation}
            onSave={handleSave}
            lastSaved={lastSaved}
            onPreview={() => setShowPreview(true)}
            selectedLayer={selectedLayer as TextLayer}
            onUpdateLayer={handleUpdateLayer}
            onDeleteLayer={handleDeleteLayer}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            layers={layers}
            getLayersForExport={getLayersForPersistence}
            pageSizeSettings={pageSizeSettings}
            showFormattingSymbols={showFormattingSymbols}
        onToggleFormattingSymbols={() => setShowFormattingSymbols(!showFormattingSymbols)}
        onSelectAll={handleSelectAll}
        onSetEditingText={setEditingText}
      />
        </div>
        <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden relative">
          <div
            className="flex-1 flex flex-col items-center bg-[#f0f2f5] p-0 overflow-auto min-h-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedLayerId(null)
                setShowContextMenu(false)
              }
            }}
          >
            <div className="py-10 flex flex-col items-center shrink-0">
              <ZoomableCanvas
                layers={layers}
                backgroundImage={backgroundImage}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
                onLayerDoubleClick={handleLayerDoubleClick}
                onCanvasDragOver={handleCanvasDragOver}
                onCanvasDrop={handleCanvasDrop}
                width={pageSizeSettings.width}
                height={pageSizeSettings.height}
                zoomLevel={zoomLevel}
                rotation={rotation}
                showFormattingSymbols={showFormattingSymbols}
                editingLayerId={editingLayerId}
                setEditingLayerId={setEditingLayerId}
                editingText={editingText}
                setEditingText={setEditingText}
                contentHtmlSyncNonce={contentHtmlSyncNonce}
                editingSelectionStart={editingSelectionStart}
                editingSelectionEnd={editingSelectionEnd}
                setEditingSelectionStart={setEditingSelectionStart}
                setEditingSelectionEnd={setEditingSelectionEnd}
                onOverflow={handleOverflow}
                onUpdateLayer={handleUpdateLayer}
              />
            </div>
          </div>
        </div>

          {selectedLayer && showContextMenu && (
            <FloatingPropertiesPanel
              selectedLayer={selectedLayer}
              onUpdateLayer={handleUpdateLayer}
              onDeleteLayer={handleDeleteLayer}
              onClose={() => setShowContextMenu(false)}
              position={panelPosition}
              onPositionChange={setPanelPosition}
              isSidebar={false}
              onSetEditingText={setEditingText}
            />
          )}
        </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Предварительный просмотр сертификата</h2>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
              Закрыть
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center gap-8 bg-slate-100 p-4 overflow-auto pt-8">
            {(() => {
              const pw = pageSizeSettings.width
              const ph = pageSizeSettings.height
              const byPage = layers.reduce(
                (acc, layer) => {
                  const p = layer.pageIndex ?? 0
                  if (!acc[p]) acc[p] = []
                  acc[p].push(layer)
                  return acc
                },
                {} as Record<number, Layer[]>,
              )
              const pageIndices = Object.keys(byPage)
                .map(Number)
                .sort((a, b) => a - b)
              const maxIdx = pageIndices.length ? Math.max(...pageIndices, 0) : 0
              const indices = Array.from({ length: maxIdx + 1 }, (_, i) => i)

              return indices.map((pageIdx) => {
                const pageLayers = byPage[pageIdx] || []
                const bodyLayers = pageLayers.filter((l) => isTextLayer(l) && l.isBackground) as TextLayer[]
                const floatText = pageLayers.filter((l) => isTextLayer(l) && !l.isBackground) as TextLayer[]
                const imgs = pageLayers.filter(isImageLayer)

                return (
                  <div key={pageIdx} className="flex flex-col items-center gap-1">
                    <div
                      className="relative bg-white rounded-lg overflow-hidden border-2 border-border flex-shrink-0"
                      style={{
                        backgroundImage: backgroundImage && pageIdx === 0 ? `url(${backgroundImage})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: `${pw}mm`,
                        height: `${ph}mm`,
                        maxWidth: "100%",
                      }}
                    >
                      <div
                        className="absolute inset-0 z-[1] box-border overflow-hidden"
                        style={{ padding: "20mm" }}
                      >
                        {bodyLayers.map((layer) => (
                          <div
                            key={layer.id}
                            className="w-full"
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
                              opacity: layer.opacity !== undefined ? layer.opacity : 1,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            <span
                              className="block whitespace-normal break-words"
                              style={{
                                textAlign: layer.alignment,
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                              }}
                              dangerouslySetInnerHTML={{ __html: layer.text || "\u00A0" }}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="absolute inset-0 z-[2] pointer-events-none">
                        {imgs.map((layer) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={layer.id}
                            src={layer.src}
                            alt=""
                            className="absolute select-none"
                            style={{
                              left: `${layer.x}mm`,
                              top: `${layer.y}mm`,
                              width: `${layer.width}mm`,
                              height: layer.height ? `${layer.height}mm` : "auto",
                              opacity: layer.opacity !== undefined ? layer.opacity : 1,
                              transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
                              transformOrigin: "center center",
                            }}
                          />
                        ))}
                        {floatText.map((layer) => {
                          const anchor = getTextLayerPositionAnchor(layer)
                          const base: React.CSSProperties = {
                            position: "absolute",
                            top: `${layer.y}mm`,
                            width: `${layer.width}mm`,
                            fontFamily: layer.fontFamily,
                            fontSize: `${layer.fontSize}px`,
                            color: layer.color,
                            fontWeight: layer.fontWeight || "normal",
                            fontStyle: layer.fontStyle || "normal",
                            textDecoration: layer.textDecoration || "none",
                            lineHeight: layer.lineHeight || "normal",
                            letterSpacing: layer.letterSpacing ? `${layer.letterSpacing}px` : "normal",
                            opacity: layer.opacity !== undefined ? layer.opacity : 1,
                            textAlign: layer.alignment,
                            boxSizing: "border-box",
                            whiteSpace: "pre-wrap",
                          }
                          const pos: React.CSSProperties =
                            anchor === "center"
                              ? { ...base, left: `${layer.x}mm`, transform: "translateX(-50%)" }
                              : anchor === "right"
                                ? { ...base, left: `${layer.x}mm`, transform: "translateX(-100%)" }
                                : { ...base, left: `${layer.x}mm` }

                          return (
                            <div key={layer.id} style={pos}>
                              <span
                                className="block whitespace-normal break-words"
                                style={{
                                  textAlign: layer.alignment,
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word",
                                }}
                                dangerouslySetInnerHTML={{ __html: layer.text || "\u00A0" }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Страница {pageIdx + 1}</span>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      )}

      <Dialog
        open={backgroundFitChoice !== null}
        onOpenChange={(open) => {
          if (!open) setBackgroundFitChoice(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Как вставить фон?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Текущий размер листа: {pageSizeSettings.width} × {pageSizeSettings.height} мм.
          </p>
          <div className="flex flex-col gap-2 py-2">
            <Button type="button" onClick={applyBackgroundStretchToPage}>
              Растянуть фон по листу
            </Button>
            <Button type="button" variant="secondary" onClick={applyPageSizeToBackground}>
              Подогнать лист под изображение
            </Button>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setBackgroundFitChoice(null)}>
              Отмена
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PageSizeModal
        open={showPageSizeModal}
        onOpenChange={setShowPageSizeModal}
        onSave={handlePageSizeChange}
        initialSettings={pageSizeSettings}
      />

      {showTemplateSelector && (
        <TemplateSelector
          onSelectTemplate={handleLoadTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      {showInitialChoice && !initialState && (
        <InitialChoiceModal
          hasLastDocument={hasLastDocument}
          onChooseOwn={() => {
            const blank = createBlankCertificateLayers()
            resetLayersHistory(blank)
            setPageSizeSettings(DEFAULT_BLANK_PAGE_SIZE)
            setBackgroundImage(null)
            pageSizeBeforeBackgroundFitRef.current = null
            setZoomLevel(1)
            setRotation(0)
            setSelectedLayerId("main-text-layer")
            setEditingLayerId("main-text-layer")
            setEditingText(blank[0].text)
            setShowInitialChoice(false)
          }}
          onChooseTemplate={() => {
            setShowInitialChoice(false)
            setShowTemplateSelector(true)
          }}
          onChooseLastDocument={() => {
            const ok = restoreDraftFromLocalStorage()
            if (ok) {
              setShowInitialChoice(false)
              setSelectedLayerId(null)
              setEditingLayerId(null)
              setEditingText("")
            }
          }}
        />
      )}
    </>
  )
}

export default function CertificateDesignerPage() {
  return <CertificateDesigner />
}
