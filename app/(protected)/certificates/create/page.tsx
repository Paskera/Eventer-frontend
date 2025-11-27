"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, Save } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TextLayer, TEMPLATES } from "./data"
import Toolbox from "./components/Toolbox"
import Canvas from "./components/Canvas"
import PropertiesPanel from "./components/PropertiesPanel"

export default function CertificateDesigner() {
  const [layers, setLayers] = useState<TextLayer[]>(TEMPLATES[0].layers)
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("1")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [draggedLayerId, setDraggedLayerId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showPreview, setShowPreview] = useState(false)

  const selectedLayer = layers.find((l) => l.id === selectedLayerId)

  const handleUpdateLayer = useCallback(
    (id: string, updates: Partial<TextLayer>) => {
      setLayers((prevLayers) =>
        prevLayers.map((l) => (l.id === id ? { ...l, ...updates } : l))
      )
    },
    []
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedLayerId) return

      const layer = layers.find((l) => l.id === draggedLayerId)
      if (!layer) return

      const canvasEl = document.querySelector(".aspect-\\[8\\.5\\/11\\]")
      if (!canvasEl) return

      const canvasRect = canvasEl.getBoundingClientRect()
      const newX = Math.max(
        0,
        e.pageX - (canvasRect.left + window.scrollX) - dragOffset.x
      )
      const newY = Math.max(
        0,
        e.pageY - (canvasRect.top + window.scrollY) - dragOffset.y
      )

      handleUpdateLayer(draggedLayerId, { x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setDraggedLayerId(null)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggedLayerId, dragOffset, layers, handleUpdateLayer])

  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.preventDefault()
    setSelectedLayerId(layerId)
    setDraggedLayerId(layerId)

    const layer = layers.find((l) => l.id === layerId)
    if (!layer) return

    const canvasEl = e.currentTarget.parentElement
    if (!canvasEl) return

    const canvasRect = canvasEl.getBoundingClientRect()
    const offsetX = e.pageX - (canvasRect.left + window.scrollX) - layer.x
    const offsetY = e.pageY - (canvasRect.top + window.scrollY) - layer.y

    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleAddVariable = (varLabel: string) => {
    const newId = Date.now().toString()
    const newLayer: TextLayer = {
      id: newId,
      text: varLabel,
      x: 150,
      y: 200,
      fontSize: 28,
      fontFamily: "sans-serif",
      color: "#000000",
      alignment: "center",
      width: 300,
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
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setBackgroundImage(event.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleLoadTemplate = (templateIndex: number) => {
    setLayers(TEMPLATES[templateIndex].layers.map((l) => ({ ...l })))
    setSelectedLayerId(null)
  }

  return (
    <div>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Certificate Designer
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save Template
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
                <BreadcrumbLink href="/events/1">
                  Tech Summit 2024
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Certificates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mx-auto flex h-[calc(100vh-140px)]">
          <Toolbox
            onLoadTemplate={handleLoadTemplate}
            onAddVariable={handleAddVariable}
            onBackgroundUpload={handleBackgroundUpload}
            onRemoveBackground={() => setBackgroundImage(null)}
            backgroundImage={backgroundImage}
          />
          <Canvas
            layers={layers}
            backgroundImage={backgroundImage}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onLayerMouseDown={handleLayerMouseDown}
            onCanvasDragOver={handleCanvasDragOver}
            onCanvasDrop={handleCanvasDrop}
          />
          <PropertiesPanel
            selectedLayer={selectedLayer}
            onUpdateLayer={handleUpdateLayer}
            onDeleteLayer={handleDeleteLayer}
          />
        </div>
      </div>
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          <div
            className="relative w-full aspect-[8.5/11] bg-white rounded-lg overflow-hidden border-2 border-border"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {layers.map((layer) => (
              <div
                key={layer.id}
                className="absolute"
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
        </DialogContent>
      </Dialog>
    </div>
  )
}
