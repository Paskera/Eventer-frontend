"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TextLayer } from "../data"
import { FONTS } from "../data"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  ChevronDown,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FormattingToolbarProps {
  selectedLayer: TextLayer | null
  onUpdateLayer: (id: string, updates: Partial<TextLayer>) => void
}

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]

export default function FormattingToolbar({ selectedLayer, onUpdateLayer }: FormattingToolbarProps) {
  if (!selectedLayer) {
    return (
      <div className="h-14 border-b border-border bg-gradient-to-r from-card/50 via-card/30 to-card/50 backdrop-blur-sm flex items-center px-6 shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Type className="h-4 w-4 opacity-50" />
          <p className="text-sm">Выберите текстовый элемент для форматирования</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-14 border-b border-border bg-gradient-to-r from-card/50 via-card/30 to-card/50 backdrop-blur-sm flex items-center gap-3 px-6 overflow-x-auto shadow-sm min-w-0">
      <div className="flex items-center gap-2">
        <Select
          value={selectedLayer.fontFamily}
          onValueChange={(value) => onUpdateLayer(selectedLayer.id, { fontFamily: value })}
        >
          <SelectTrigger className="h-9 w-[140px] text-sm">
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

        <Select
          value={String(selectedLayer.fontSize)}
          onValueChange={(value) => onUpdateLayer(selectedLayer.id, { fontSize: Number(value) })}
        >
          <SelectTrigger className="h-9 w-[80px] text-sm min-w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex gap-1">
        <Button
          variant={selectedLayer.fontWeight === "bold" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              fontWeight: selectedLayer.fontWeight === "bold" ? "normal" : "bold",
            })
          }
          className="h-9 w-9 p-0"
          title="Жирный (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedLayer.fontStyle === "italic" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              fontStyle: selectedLayer.fontStyle === "italic" ? "normal" : "italic",
            })
          }
          className="h-9 w-9 p-0"
          title="Курсив (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedLayer.textDecoration === "underline" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              textDecoration: selectedLayer.textDecoration === "underline" ? "none" : "underline",
            })
          }
          className="h-9 w-9 p-0"
          title="Подчеркнутый (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex gap-1 flex-shrink-0">
        <Button
          variant={selectedLayer.alignment === "left" ? "default" : "ghost"}
          size="sm"
          onClick={() => onUpdateLayer(selectedLayer.id, { alignment: "left" })}
          className="h-9 w-9 p-0"
          title="По левому краю"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedLayer.alignment === "center" ? "default" : "ghost"}
          size="sm"
          onClick={() => onUpdateLayer(selectedLayer.id, { alignment: "center" })}
          className="h-9 w-9 p-0"
          title="По центру"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedLayer.alignment === "right" ? "default" : "ghost"}
          size="sm"
          onClick={() => onUpdateLayer(selectedLayer.id, { alignment: "right" })}
          className="h-9 w-9 p-0"
          title="По правому краю"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 gap-1 px-3">
            {selectedLayer.headingLevel === "h1" ? (
              <Heading1 className="h-4 w-4" />
            ) : selectedLayer.headingLevel === "h2" ? (
              <Heading2 className="h-4 w-4" />
            ) : selectedLayer.headingLevel === "h3" ? (
              <Heading3 className="h-4 w-4" />
            ) : (
              <Type className="h-4 w-4" />
            )}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="start">
          <div className="space-y-1">
            <Button
              variant={!selectedLayer.headingLevel || selectedLayer.headingLevel === "normal" ? "default" : "ghost"}
              size="sm"
              onClick={() =>
                onUpdateLayer(selectedLayer.id, { headingLevel: "normal", fontSize: 14, fontWeight: "normal" })
              }
              className="w-full justify-start h-9 text-sm"
            >
              <Type className="h-4 w-4 mr-2" />
              Обычный текст
            </Button>
            <Button
              variant={selectedLayer.headingLevel === "h1" ? "default" : "ghost"}
              size="sm"
              onClick={() => onUpdateLayer(selectedLayer.id, { headingLevel: "h1", fontSize: 32, fontWeight: "bold" })}
              className="w-full justify-start h-9 text-lg font-bold"
            >
              <Heading1 className="h-4 w-4 mr-2" />
              Заголовок 1
            </Button>
            <Button
              variant={selectedLayer.headingLevel === "h2" ? "default" : "ghost"}
              size="sm"
              onClick={() => onUpdateLayer(selectedLayer.id, { headingLevel: "h2", fontSize: 24, fontWeight: "bold" })}
              className="w-full justify-start h-9 text-base font-bold"
            >
              <Heading2 className="h-4 w-4 mr-2" />
              Заголовок 2
            </Button>
            <Button
              variant={selectedLayer.headingLevel === "h3" ? "default" : "ghost"}
              size="sm"
              onClick={() => onUpdateLayer(selectedLayer.id, { headingLevel: "h3", fontSize: 18, fontWeight: "bold" })}
              className="w-full justify-start h-9 text-sm font-bold"
            >
              <Heading3 className="h-4 w-4 mr-2" />
              Заголовок 3
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex gap-1">
        <Button
          variant={selectedLayer.listType === "bullet" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              listType: selectedLayer.listType === "bullet" ? "none" : "bullet",
            } as any)
          }
          className="h-9 w-9 p-0"
          title="Маркированный список"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedLayer.listType === "number" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              listType: selectedLayer.listType === "number" ? "none" : "number",
            } as any)
          }
          className="h-9 w-9 p-0"
          title="Нумерованный список"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex gap-1 flex-shrink-0">
        <Button
          variant={(selectedLayer as any).paragraphStyle === "quote" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              paragraphStyle: (selectedLayer as any).paragraphStyle === "quote" ? "normal" : "quote",
            } as any)
          }
          className="h-9 w-9 p-0"
          title="Цитата"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant={(selectedLayer as any).paragraphStyle === "code" ? "default" : "ghost"}
          size="sm"
          onClick={() =>
            onUpdateLayer(selectedLayer.id, {
              paragraphStyle: (selectedLayer as any).paragraphStyle === "code" ? "normal" : "code",
            } as any)
          }
          className="h-9 w-9 p-0"
          title="Код"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <label className="text-xs text-muted-foreground whitespace-nowrap">Цвет:</label>
        <input
          type="color"
          value={selectedLayer.color}
          onChange={(e) => onUpdateLayer(selectedLayer.id, { color: e.target.value })}
          className="h-9 w-12 rounded border border-border cursor-pointer flex-shrink-0"
          title="Цвет текста"
        />
      </div>
    </div>
  )
}
