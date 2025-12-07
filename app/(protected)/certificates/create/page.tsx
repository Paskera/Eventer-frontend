"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { type TextLayer, type Layer, TEMPLATES } from "./data"
import FloatingPropertiesPanel from "./components/FloatingPropertiesPanel"
import ZoomableCanvas from "./components/ZoomableCanvas"
import type { PageSizeSettings } from "./components/PageSizeModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import PageSizeModal from "./components/PageSizeModal"
import TemplateSelector from "./components/TemplateSelector"
import { Eye, Settings, Save, Minus, Plus, RotateCw } from "lucide-react"
import { useCertificatePersistence } from "./hooks/useCertificatePersistence"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { EditorToolbar } from "./components/EditorToolbar"

import { useHistory } from "./hooks/useHistory"

export default function CertificateDesigner() {
  const { 
    state: layers, 
    set: setLayers, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useHistory<Layer[]>([])
  
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [draggedLayerId, setDraggedLayerId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showPreview, setShowPreview] = useState(false)
  const [showPageSizeModal, setShowPageSizeModal] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [pageSizeSettings, setPageSizeSettings] = useState<PageSizeSettings>({
    format: "A4",
    width: 210,
    height: 297,
    orientation: "portrait",
  })
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 })
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")

  const [showContextMenu, setShowContextMenu] = useState(false)

  const { save, lastSaved } = useCertificatePersistence({
    layers,
    backgroundImage,
    pageSizeSettings,
    setLayers,
    setBackgroundImage,
    setPageSizeSettings,
  })

  const selectedLayer = layers.find((l) => l.id === selectedLayerId)

  const handleUpdateLayer = useCallback((id: string, updates: Partial<Layer>) => {
    setLayers((prevLayers) => prevLayers.map((l) => (l.id === id ? { ...l, ...updates } as Layer : l)))
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

          return {
            ...layer,
            x: Math.max(0, Math.min(newWidth, newX)),
            y: Math.max(0, Math.min(newHeight, newY)),
            width: Math.max(5, Math.min(newWidth, newWidth_abs)),
            xPercent: clampedXPercent,
            yPercent: clampedYPercent,
            widthPercent: clampedWidthPercent,
          }
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedLayerId) return

      const layer = layers.find((l) => l.id === draggedLayerId)
      if (!layer) return

      const canvasEl = document.querySelector(".rounded-lg.border-2.border-border")
      if (!canvasEl) return

      const canvasRect = canvasEl.getBoundingClientRect()

      const scale = zoomLevel
      const rawX = (e.clientX - canvasRect.left - dragOffset.x) / scale
      const rawY = (e.clientY - canvasRect.top - dragOffset.y) / scale

      // Convert pixels to percentage based on current canvas size
      const canvasWidthPx = canvasRect.width / scale
      const canvasHeightPx = canvasRect.height / scale

      let xPercent = (rawX / canvasWidthPx) * 100
      let yPercent = (rawY / canvasHeightPx) * 100

      // Get layer width percentage
      const widthPercent =
        layer.widthPercent !== undefined ? layer.widthPercent : (layer.width / pageSizeSettings.width) * 100

      // Adjust boundaries based on alignment
      if (layer.alignment === "center") {
        xPercent = Math.max(widthPercent / 2, Math.min(100 - widthPercent / 2, xPercent))
      } else if (layer.alignment === "right") {
        xPercent = Math.max(0, Math.min(100 - widthPercent, xPercent))
      } else {
        xPercent = Math.max(0, Math.min(100 - widthPercent, xPercent))
      }

      yPercent = Math.max(0, Math.min(100, yPercent))

      // Convert percentage back to mm for storage
      const newX = (xPercent / 100) * pageSizeSettings.width
      const newY = (yPercent / 100) * pageSizeSettings.height

      handleUpdateLayer(draggedLayerId, {
        x: newX,
        y: newY,
        xPercent,
        yPercent,
      })
    }

    const handleMouseUp = () => {
      setDraggedLayerId(null)
    }

    if (draggedLayerId) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [
    draggedLayerId,
    dragOffset,
    layers,
    handleUpdateLayer,
    zoomLevel,
    pageSizeSettings.width,
    pageSizeSettings.height,
  ])

  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    // If it's a left click (button 0), select the layer but hide context menu
    if (e.button === 0) {
      e.preventDefault()
      setSelectedLayerId(layerId)
      setDraggedLayerId(layerId)
      setShowContextMenu(false) // Hide context menu on left click
    }

    const canvasEl = e.currentTarget.parentElement
    if (!canvasEl) return

    const canvasRect = canvasEl.getBoundingClientRect()
    const layer = layers.find((l) => l.id === layerId)
    if (!layer) return

    const scale = zoomLevel
    const canvasWidthPx = canvasRect.width / scale
    const canvasHeightPx = canvasRect.height / scale

    const xPercent = layer.xPercent !== undefined ? layer.xPercent : (layer.x / pageSizeSettings.width) * 100
    const yPercent = layer.yPercent !== undefined ? layer.yPercent : (layer.y / pageSizeSettings.height) * 100

    let layerPixelX = (xPercent / 100) * canvasWidthPx
    const layerPixelY = (yPercent / 100) * canvasHeightPx

    // Adjust for alignment
    const widthPercent =
      layer.widthPercent !== undefined ? layer.widthPercent : (layer.width / pageSizeSettings.width) * 100
    const layerWidthPx = (widthPercent / 100) * canvasWidthPx

    if (layer.alignment === "center") {
      layerPixelX -= layerWidthPx / 2
    } else if (layer.alignment === "right") {
      layerPixelX -= layerWidthPx
    }

    const offsetX = (e.clientX - canvasRect.left) / scale - layerPixelX
    const offsetY = (e.clientY - canvasRect.top) / scale - layerPixelY

    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleLayerDoubleClick = (layerId: string, newText?: string) => {
    if (newText !== undefined) {
      handleUpdateLayer(layerId, { text: newText })
    }
  }

  const handleSaveEditingText = () => {
    if (editingLayerId) {
      handleUpdateLayer(editingLayerId, { text: editingText })
      setEditingLayerId(null)
      setEditingText("")
    }
  }

  const handleAddTextLayer = () => {
    const newId = Date.now().toString()
    const xPercent = (105 / pageSizeSettings.width) * 100
    const yPercent = (148 / pageSizeSettings.height) * 100
    const widthPercent = (80 / pageSizeSettings.width) * 100

    const newLayer: TextLayer = {
      id: newId,
      text: "Новый текст",
      x: 105,
      y: 148,
      fontSize: 24,
      fontFamily: "sans-serif",
      color: "#000000",
      alignment: "center",
      width: 80,
      xPercent,
      yPercent,
      widthPercent,
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newId)
  }

  const handleAddVariable = (varLabel: string) => {
    const newId = Date.now().toString()
    const xPercent = (105 / pageSizeSettings.width) * 100 // center of page
    const yPercent = (20 / pageSizeSettings.height) * 100
    const widthPercent = (80 / pageSizeSettings.width) * 100

    const newLayer: TextLayer = {
      id: newId,
      text: varLabel,
      x: 105,
      y: 20,
      fontSize: 28,
      fontFamily: "sans-serif",
      color: "#000000",
      alignment: "center",
      width: 80,
      xPercent,
      yPercent,
      widthPercent,
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newId)
  }

  const handleAddImageLayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const newId = Date.now().toString()
          // Default size: 50mm width, height proportional
          const defaultWidth = 50
          const aspectRatio = img.width / img.height
          const defaultHeight = defaultWidth / aspectRatio

          // Center
          const x = (pageSizeSettings.width - defaultWidth) / 2
          const y = (pageSizeSettings.height - defaultHeight) / 2

          const newLayer: Layer = {
            id: newId,
            type: "image",
            src: event.target?.result as string,
            x,
            y,
            width: defaultWidth,
            height: defaultHeight,
            opacity: 1,
            rotation: 0
          }
          setLayers([...layers, newLayer])
          setSelectedLayerId(newId)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
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

        const img = new Image()
        img.onload = () => {
          // Calculate aspect ratio and set page size based on image
          const width = Math.round(img.width / 3.78) // Convert pixels to mm
          const height = Math.round(img.height / 3.78) // Convert pixels to mm

          const oldWidth = pageSizeSettings.width
          const oldHeight = pageSizeSettings.height

          const newPageSize = {
            format: "Custom" as const,
            width: width,
            height: height,
            orientation: (width >= height ? "landscape" : "portrait") as const,
          }

          setPageSizeSettings(newPageSize)

          scaleLayersToPageSize(oldWidth, oldHeight, width, height)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setBackgroundImage(event.target?.result as string)

          const img = new Image()
          img.onload = () => {
            const width = Math.round(img.width / 3.78)
            const height = Math.round(img.height / 3.78)

            const oldWidth = pageSizeSettings.width
            const oldHeight = pageSizeSettings.height

            const newPageSize = {
              format: "Custom" as const,
              width: width,
              height: height,
              orientation: (width >= height ? "landscape" : "portrait") as const,
            }

            setPageSizeSettings(newPageSize)

            scaleLayersToPageSize(oldWidth, oldHeight, width, height)
          }
          img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    } else {
      const varLabel = e.dataTransfer.getData("text/plain")
      if (varLabel) {
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
        const newLayer: TextLayer = {
          id: newId,
          text: varLabel,
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
        setLayers([...layers, newLayer])
        setSelectedLayerId(newId)
      }
    }
  }

  const handleLoadTemplate = (templateIndex: number) => {
    // Base size for templates (A4 in mm)
    const BASE_WIDTH = 210
    const BASE_HEIGHT = 297

    const templateLayers = TEMPLATES[templateIndex].layers.map((layer) => {
      // Convert from base A4 size to percentages
      const xPercent = (layer.x / BASE_WIDTH) * 100
      const yPercent = (layer.y / BASE_HEIGHT) * 100
      const widthPercent = (layer.width / BASE_WIDTH) * 100

      // Convert percentages to current page absolute positions
      const x = (xPercent * pageSizeSettings.width) / 100
      const y = (yPercent * pageSizeSettings.height) / 100
      const width = (widthPercent * pageSizeSettings.width) / 100

      return {
        ...layer,
        x,
        y,
        width,
        xPercent,
        yPercent,
        widthPercent,
      }
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

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-foreground">Конструктор сертификатов</h1>
          </div>
          <EditorToolbar
            onOpenTemplateSelector={() => setShowTemplateSelector(true)}
            onAddVariable={handleAddVariable}
            onAddTextLayer={handleAddTextLayer}
            onAddImageLayer={handleAddImageLayer}
            onBackgroundUpload={handleBackgroundUpload}
            onRemoveBackground={() => {
              setBackgroundImage(null)
            }}
            backgroundImage={backgroundImage}
            onOpenPageSize={() => setShowPageSizeModal(true)}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onRotate={handleRotate}
            zoomLevel={zoomLevel}
            rotation={rotation}
            onSave={() => save(true)}
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
            pageSizeSettings={pageSizeSettings}
          />
        </div>
        <div className="flex flex-1 min-w-0 overflow-hidden relative">
          <div 
            className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-4 overflow-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedLayerId(null)
                setShowContextMenu(false)
              }
            }}
          >
            <ZoomableCanvas
              layers={layers}
              backgroundImage={backgroundImage}
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onLayerMouseDown={handleLayerMouseDown}
              onLayerDoubleClick={handleLayerDoubleClick}
              onCanvasDragOver={handleCanvasDragOver}
              onCanvasDrop={handleCanvasDrop}
              onLayerContextMenu={handleLayerContextMenu}
              width={pageSizeSettings.width}
              height={pageSizeSettings.height}
              orientation={pageSizeSettings.orientation}
              zoomLevel={zoomLevel}
              rotation={rotation}
            />
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
            />
          )}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Предварительный просмотр сертификата</h2>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
              Закрыть
            </Button>
          </div>
          <div className="flex-1 flex items-start justify-center bg-slate-100 p-4 overflow-auto pt-8">
            <div
              className="relative bg-white rounded-lg overflow-hidden border-2 border-border"
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                aspectRatio: `${pageSizeSettings.width} / ${pageSizeSettings.height}`,
                width: `${(pageSizeSettings.width * 3.78).toFixed(2)}px`,
                height: "auto",
                maxWidth: "100%",
              }}
            >
              {layers.map((layer) => {
                const position = {
                  x: layer.xPercent !== undefined ? layer.xPercent : (layer.x / pageSizeSettings.width) * 100,
                  y: layer.yPercent !== undefined ? layer.yPercent : (layer.y / pageSizeSettings.height) * 100,
                  width:
                    layer.widthPercent !== undefined
                      ? layer.widthPercent
                      : (layer.width / pageSizeSettings.width) * 100,
                }

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
                    className="absolute"
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
                    <span className="block whitespace-normal break-words" style={{ textAlign: layer.alignment }}>
                      {layer.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <Dialog open={editingLayerId !== null} onOpenChange={(open) => !open && setEditingLayerId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать текст</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Введите текст"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEditingText()
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLayerId(null)}>
              Отмена
            </Button>
            <Button onClick={handleSaveEditingText}>Сохранить</Button>
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
    </>
  )
}
