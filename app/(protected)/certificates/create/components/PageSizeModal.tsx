"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PageSizeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (settings: PageSizeSettings) => void
  initialSettings?: PageSizeSettings
}

export interface PageSizeSettings {
  format: string
  width: number
  height: number
  orientation: "portrait" | "landscape"
}

const PAGE_FORMATS = [
  { id: "A4", width: 210, height: 297 },
  { id: "A3", width: 297, height: 420 },
  { id: "A5", width: 148, height: 210 },
  { id: "letter", width: 216, height: 279 },
  { id: "legal", width: 216, height: 356 },
  { id: "tabloid", width: 279, height: 432 },
]

export default function PageSizeModal({ open, onOpenChange, onSave, initialSettings }: PageSizeModalProps) {
  const [format, setFormat] = useState<string>(initialSettings?.format || "A4")
  const [width, setWidth] = useState<number>(initialSettings?.width || 210)
  const [height, setHeight] = useState<number>(initialSettings?.height || 297)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(initialSettings?.orientation || "portrait")
  const [isManualInput, setIsManualInput] = useState(false)

  useEffect(() => {
    if (!isManualInput) {
      const selectedFormat = PAGE_FORMATS.find((f) => f.id === format)
      if (selectedFormat) {
        if (orientation === "portrait") {
          setWidth(selectedFormat.width)
          setHeight(selectedFormat.height)
        } else {
          setWidth(selectedFormat.height)
          setHeight(selectedFormat.width)
        }
      }
    }
  }, [format, orientation, isManualInput])

  const handleSave = () => {
    onSave({ format, width, height, orientation })
    onOpenChange(false)
  }

  const handleOrientationChange = (value: "portrait" | "landscape") => {
    setOrientation(value)
    setWidth(height)
    setHeight(width)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Изменить размер страницы</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              Формат
            </Label>
            <Select
              value={format}
              onValueChange={(value) => {
                setFormat(value)
                setIsManualInput(false)
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Выберите формат" />
              </SelectTrigger>
              <SelectContent>
                {PAGE_FORMATS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    Лист {f.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Ширина</Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => {
                setWidth(Number(e.target.value))
                setIsManualInput(true)
              }}
              className="w-full"
            />
            <span className="text-sm text-muted-foreground">мм</span>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Высота</Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => {
                setHeight(Number(e.target.value))
                setIsManualInput(true)
              }}
              className="w-full"
            />
            <span className="text-sm text-muted-foreground">мм</span>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Ориентация</Label>
          <div className="col-span-3 flex gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="portrait"
                name="orientation"
                checked={orientation === "portrait"}
                onChange={() => {
                  handleOrientationChange("portrait")
                }}
                className="h-4 w-4"
              />
              <Label htmlFor="portrait">Портретная</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="landscape"
                name="orientation"
                checked={orientation === "landscape"}
                onChange={() => {
                  handleOrientationChange("landscape")
                }}
                className="h-4 w-4"
              />
              <Label htmlFor="landscape">Альбомная</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
