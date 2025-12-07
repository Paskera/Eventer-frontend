"use client"

import React, { useRef } from "react"
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
  Heading1,
  Heading2,
  Pilcrow,
  Type,
  Undo,
  Redo,
  Trash2,
  ImagePlus
} from "lucide-react"
import { VARIABLES, TextLayer, FONTS } from "../data"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

import ExportButton from "./ExportButton"
import { Layer } from "../data"

interface EditorToolbarProps {
  onOpenTemplateSelector: () => void
  onAddVariable: (label: string) => void
  onAddTextLayer: () => void
  onAddImageLayer: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBackgroundUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
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
  pageSizeSettings: {
    width: number
    height: number
  }
}

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]

export function EditorToolbar({
  onOpenTemplateSelector,
  onAddVariable,
  onAddTextLayer,
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
  pageSizeSettings,
}: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const updateLayer = (updates: Partial<TextLayer>) => {
    if (selectedLayer) {
      onUpdateLayer(selectedLayer.id, updates)
    }
  }

  return (
    <div className="border-b border-border bg-background flex flex-col">
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
            backgroundImage={backgroundImage}
            pageWidth={pageSizeSettings.width}
            pageHeight={pageSizeSettings.height}
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
            <TabsTrigger 
              value="view" 
              className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs"
            >
              Вид
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-2 h-28 bg-muted/10 flex items-center overflow-x-auto">
          {/* HOME TAB */}
          <TabsContent value="home" className="flex items-center gap-4 m-0 h-full w-full">
            {/* Actions */}
            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button
                variant="ghost"
                className="h-20 flex flex-col gap-2 px-4 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => selectedLayer && onDeleteLayer(selectedLayer.id)}
                disabled={!selectedLayer}
                title="Удалить выделенный элемент"
              >
                <Trash2 className="w-6 h-6" />
                <span className="text-xs">Удалить</span>
              </Button>
            </div>

            {/* Font Group */}
            <div className="flex flex-col gap-2 px-2 border-r border-border h-full justify-center min-w-[320px]">
              <div className="flex items-center gap-2">
                <Select
                  value={selectedLayer?.fontFamily || "sans-serif"}
                  onValueChange={(value) => updateLayer({ fontFamily: value })}
                  disabled={!selectedLayer}
                >
                  <SelectTrigger className="h-9 w-[160px] text-sm">
                    <SelectValue placeholder="Шрифт" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={String(selectedLayer?.fontSize || 16)}
                  onValueChange={(value) => updateLayer({ fontSize: Number(value) })}
                  disabled={!selectedLayer}
                >
                  <SelectTrigger className="h-9 w-[80px] text-sm">
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
                    onClick={() => updateLayer({ fontSize: (selectedLayer?.fontSize || 16) + 2 })}
                    disabled={!selectedLayer}
                  >
                    <span className="text-sm font-bold">A</span><span className="text-[10px] align-top">+</span>
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none"
                    onClick={() => updateLayer({ fontSize: Math.max(8, (selectedLayer?.fontSize || 16) - 2) })}
                    disabled={!selectedLayer}
                  >
                    <span className="text-sm">A</span><span className="text-[10px] align-top">-</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center bg-background border border-input rounded-md p-1">
                  <Button
                    variant={selectedLayer?.fontWeight === "bold" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateLayer({ fontWeight: selectedLayer?.fontWeight === "bold" ? "normal" : "bold" })}
                    disabled={!selectedLayer}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={selectedLayer?.fontStyle === "italic" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateLayer({ fontStyle: selectedLayer?.fontStyle === "italic" ? "normal" : "italic" })}
                    disabled={!selectedLayer}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={selectedLayer?.textDecoration?.includes("underline") ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateLayer({ textDecoration: selectedLayer?.textDecoration === "underline" ? "none" : "underline" })}
                    disabled={!selectedLayer}
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                </div>
                
                <Separator orientation="vertical" className="h-8 mx-2" />
                
                <div className="flex items-center gap-2">
                  <div 
                    className="flex flex-col items-center cursor-pointer p-1 rounded hover:bg-muted"
                    title="Цвет текста"
                    onClick={() => {
                      const input = document.getElementById('color-picker-input');
                      if (input) input.click();
                    }}
                  >
                    <span className="font-bold text-sm">A</span>
                    <div 
                      className="h-1 w-6" 
                      style={{ backgroundColor: selectedLayer?.color || "#000000" }}
                    />
                    <input
                      id="color-picker-input"
                      type="color"
                      value={selectedLayer?.color || "#000000"}
                      onChange={(e) => updateLayer({ color: e.target.value })}
                      disabled={!selectedLayer}
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
                  variant={selectedLayer?.listType === "bullet" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateLayer({ listType: selectedLayer?.listType === "bullet" ? "none" : "bullet" })}
                  disabled={!selectedLayer}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedLayer?.listType === "number" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateLayer({ listType: selectedLayer?.listType === "number" ? "none" : "number" })}
                  disabled={!selectedLayer}
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant={selectedLayer?.alignment === "left" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateLayer({ alignment: "left" })}
                  disabled={!selectedLayer}
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedLayer?.alignment === "center" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateLayer({ alignment: "center" })}
                  disabled={!selectedLayer}
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedLayer?.alignment === "right" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateLayer({ alignment: "right" })}
                  disabled={!selectedLayer}
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground text-center mt-[-4px]">Абзац</span>
            </div>

            {/* Styles Group */}
            <div className="flex flex-col gap-1 px-2 h-full justify-center">
              <div className="flex items-center gap-1 bg-background border border-input rounded-md p-1">
                <Button
                  variant="ghost"
                  className="h-20 flex flex-col gap-2 px-3 hover:bg-muted min-w-[60px]"
                  onClick={() => updateLayer({ fontSize: 16, fontWeight: "normal" })}
                  disabled={!selectedLayer}
                >
                  <Pilcrow className="w-6 h-6" />
                  <span className="text-xs">Обычный</span>
                </Button>
                <Button
                  variant="ghost"
                  className="h-20 flex flex-col gap-2 px-3 hover:bg-muted min-w-[60px]"
                  onClick={() => updateLayer({ fontSize: 24, fontWeight: "bold" })}
                  disabled={!selectedLayer}
                >
                  <Heading2 className="w-6 h-6" />
                  <span className="text-xs">Заголовок</span>
                </Button>
                <Button
                  variant="ghost"
                  className="h-20 flex flex-col gap-2 px-3 hover:bg-muted min-w-[60px]"
                  onClick={() => updateLayer({ fontSize: 32, fontWeight: "bold" })}
                  disabled={!selectedLayer}
                >
                  <Heading1 className="w-6 h-6" />
                  <span className="text-xs">Название</span>
                </Button>
              </div>
              <span className="text-xs text-muted-foreground text-center mt-[-4px]">Стили</span>
            </div>
          </TabsContent>

          {/* INSERT TAB */}
          <TabsContent value="insert" className="flex items-center gap-4 m-0 h-full w-full">
            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button 
                variant="ghost" 
                className="h-20 flex flex-col gap-2 px-4"
                onClick={onAddTextLayer}
              >
                <Type className="w-6 h-6" />
                <span className="text-sm">Текстовое поле</span>
              </Button>
            </div>

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
                onChange={onBackgroundUpload}
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
                  <Button variant="ghost" className="h-20 flex flex-col gap-2 px-4">
                    <div className="flex relative">
                      <FileDown className="w-6 h-6" />
                      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold">{`{ }`}</span>
                    </div>
                    <span className="text-sm">Переменная</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Вставить переменную</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {VARIABLES.map((variable) => (
                    <DropdownMenuItem 
                      key={variable.id} 
                      onClick={() => onAddVariable(variable.label)}
                      className="cursor-pointer"
                    >
                      {variable.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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

          {/* VIEW TAB */}
          <TabsContent value="view" className="flex items-center gap-4 m-0 h-full w-full">
            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
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

            <div className="flex flex-col gap-1 px-2 border-r border-border h-full justify-center">
              <Button 
                variant="ghost" 
                className="h-20 flex flex-col gap-2 px-4"
                onClick={onPreview}
              >
                <Eye className="w-6 h-6" />
                <span className="text-sm">Просмотр</span>
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
