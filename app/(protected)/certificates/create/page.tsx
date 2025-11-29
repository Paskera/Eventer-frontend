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
import { type TextLayer, TEMPLATES } from "./data"
import Toolbox from "./components/Toolbox"
import ZoomableCanvas from "./components/ZoomableCanvas"
import FloatingPropertiesPanel from "./components/FloatingPropertiesPanel"
import type { PageSizeSettings } from "./components/PageSizeModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import PageSizeModal from "./components/PageSizeModal"
import { Eye, Settings, Save, Minus, Plus, RotateCw } from "lucide-react"

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
    orientation: "portrait",
  })
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 })
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")

  const selectedLayer = layers.find((l) => l.id === selectedLayerId)

  const handleUpdateLayer = useCallback((id: string, updates: Partial<TextLayer>) => {
    setLayers((prevLayers) => prevLayers.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedLayerId) return

      const layer = layers.find((l) => l.id === draggedLayerId)
      if (!layer) return

      const canvasEl = document.querySelector(".rounded-lg.border-2.border-border")
      if (!canvasEl) return

      const canvasRect = canvasEl.getBoundingClientRect()
      const newPixelX = Math.max(0, e.pageX - (canvasRect.left + window.scrollX) - dragOffset.x)
      const newPixelY = Math.max(0, e.pageY - (canvasRect.top + window.scrollY) - dragOffset.y)

      const newX = Math.max(0, newPixelX / 3.78)
      const newY = Math.max(0, newPixelY / 3.78)

      handleUpdateLayer(draggedLayerId, { x: newX, y: newY })
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
  }, [draggedLayerId, dragOffset, layers, handleUpdateLayer])

  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.preventDefault()
    setSelectedLayerId(layerId)

    // Only start dragging, don't open floating panel
    setDraggedLayerId(layerId)

    const canvasEl = e.currentTarget.parentElement
    if (!canvasEl) return

    const canvasRect = canvasEl.getBoundingClientRect()
    const layer = layers.find((l) => l.id === layerId)
    if (!layer) return

    let pixelX = layer.x * 3.78

    if (layer.alignment === "center") {
      pixelX = layer.x * 3.78
    } else if (layer.alignment === "right") {
      pixelX = layer.x * 3.78
    }

    const pixelY = layer.y * 3.78
    const offsetX = e.pageX - (canvasRect.left + window.scrollX) - pixelX
    const offsetY = e.pageY - (canvasRect.top + window.scrollY) - pixelY

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

  const handleAddVariable = (varLabel: string) => {
    const newId = Date.now().toString()
    const newLayer: TextLayer = {
      id: newId,
      text: varLabel,
      x: 105,
      y: 20,
      fontSize: 28,
      fontFamily: "sans-serif",
      color: "#000000",
      alignment: "center",
      width: 80, // reduced from 300 to 80mm for better proportions
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

        const img = new Image()
        img.onload = () => {
          // Calculate aspect ratio and set page size based on image
          const width = Math.round(img.width / 3.78) // Convert pixels to mm
          const height = Math.round(img.height / 3.78) // Convert pixels to mm

          setPageSizeSettings({
            format: "Custom",
            width: width,
            height: height,
            orientation: width >= height ? "landscape" : "portrait",
          })
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

            setPageSizeSettings({
              format: "Custom",
              width: width,
              height: height,
              orientation: width >= height ? "landscape" : "portrait",
            })
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
          width: 80, // reduced from 300 to 80mm for better proportions
        }
        setLayers([...layers, newLayer])
        setSelectedLayerId(newId)
      }
    }
  }

  const handleLoadTemplate = (templateIndex: number) => {
    setLayers(TEMPLATES[templateIndex].layers.map((l) => ({ ...l })))
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
    setShowFloatingPanel(true)
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
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowPreview(true)}>
                <Eye className="w-4 h-4" />
                Предпросмотр
              </Button>
              <Button size="sm" className="gap-2" onClick={() => setShowPageSizeModal(true)}>
                <Settings className="w-4 h-4" />
                Размер страницы
              </Button>
              <Button size="sm" className="gap-2">
                <Save className="w-4 h-4" />
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
                <BreadcrumbLink href="/events/1">Tech Summit 2024</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Certificates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="border-t border-border px-6 py-2 flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} className="gap-1 bg-transparent">
              <Minus className="w-4 h-4" />
              Уменьшить
            </Button>
            <span className="text-sm text-muted-foreground px-2 min-w-16">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} className="gap-1 bg-transparent">
              <Plus className="w-4 h-4" />
              Увеличить
            </Button>
            <div className="border-l border-border mx-2 h-6"></div>
            <Button variant="outline" size="sm" onClick={handleRotate} className="gap-1 bg-transparent">
              <RotateCw className="w-4 h-4" />
              {rotation}°
            </Button>
          </div>
        </div>
        <div className="flex flex-1 min-w-0 overflow-hidden">
          <Toolbox
            onLoadTemplate={handleLoadTemplate}
            onAddVariable={handleAddVariable}
            onBackgroundUpload={handleBackgroundUpload}
            onRemoveBackground={() => {
              setBackgroundImage(null)
            }}
            backgroundImage={backgroundImage}
          />
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-4 overflow-auto">
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
                aspectRatio:
                  pageSizeSettings.orientation === "portrait"
                    ? `${pageSizeSettings.width} / ${pageSizeSettings.height}`
                    : `${pageSizeSettings.height} / ${pageSizeSettings.width}`,
                width: pageSizeSettings.width ? `${(pageSizeSettings.width * 3.78).toFixed(2)}px` : "auto",
                height: "auto",
              }}
            >
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="absolute"
                  style={{
                    top: `${(layer.y * 3.78).toFixed(2)}px`,
                    left:
                      layer.alignment === "center"
                        ? "50%"
                        : layer.alignment === "left"
                          ? `${(layer.x * 3.78).toFixed(2)}px`
                          : undefined,
                    right: layer.alignment === "right" ? `${(layer.x * 3.78).toFixed(2)}px` : undefined,
                    width: `${(layer.width * 3.78).toFixed(2)}px`,
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
                    transform: layer.alignment === "center" ? "translateX(-50%)" : undefined,
                  }}
                >
                  <span className="block whitespace-normal break-words">{layer.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

    </>
  )
}
