"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Bold, Italic, Underline, Copy, Scissors, Clipboard, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import type { TextLayer } from "../data"

interface TextSelectionMenuProps {
  selectedText: string
  position: { x: number; y: number }
  layer: TextLayer
  onCopy?: () => void
  onCut?: () => void
  onPaste?: () => void
  onFormat?: (format: "bold" | "italic" | "underline") => void
  onAlign?: (align: "left" | "center" | "right") => void
  onClose?: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TextSelectionMenu({
  selectedText,
  position,
  layer,
  onCopy,
  onCut,
  onPaste,
  onFormat,
  onAlign,
  onClose,
  open,
  onOpenChange,
}: TextSelectionMenuProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuContent
        className="w-64"
        style={{
          position: "fixed",
          left: `${Math.max(10, Math.min(position.x, window.innerWidth - 280))}px`,
          top: `${Math.max(10, position.y)}px`,
          transform: "none",
        }}
        align="start"
        onClick={(e) => e.stopPropagation()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* Панель быстрого форматирования */}
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border">
          <Button
            variant={layer.fontWeight === "bold" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {
              onFormat?.("bold")
              onOpenChange(false)
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
              onFormat?.("italic")
              onOpenChange(false)
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
              onFormat?.("underline")
              onOpenChange(false)
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
              onAlign?.("left")
              onOpenChange(false)
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
              onAlign?.("center")
              onOpenChange(false)
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
              onAlign?.("right")
              onOpenChange(false)
            }}
            title="По правому краю"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenuSeparator />

        {/* Основные действия */}
        <DropdownMenuItem onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Копировать
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCut}>
          <Scissors className="mr-2 h-4 w-4" />
          Вырезать
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPaste}>
          <Clipboard className="mr-2 h-4 w-4" />
          Вставить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
