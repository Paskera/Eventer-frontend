"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface DragDropZoneProps {
  onDrop: (file: File) => void
  accept?: string
  className?: string
  children?: React.ReactNode
}

export function DragDropZone({ onDrop, accept = "image/*", className, children }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const file = files[0]

    if (file && file.type.startsWith("image/")) {
      onDrop(file)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative transition-all duration-200",
        isDragging && "ring-2 ring-primary ring-offset-2 bg-primary/5",
        className,
      )}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-primary">
            <Upload className="h-12 w-12 animate-bounce" />
            <p className="text-lg font-semibold">Отпустите, чтобы загрузить</p>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
