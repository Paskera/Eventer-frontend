"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { TEMPLATES, VARIABLES } from "../data"
import { useRef } from "react"

interface ToolboxProps {
  onLoadTemplate: (index: number) => void
  onAddVariable: (label: string) => void
  onBackgroundUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveBackground: () => void
  backgroundImage: string | null
}

export default function Toolbox({
  onLoadTemplate,
  onAddVariable,
  onBackgroundUpload,
  onRemoveBackground,
  backgroundImage,
}: ToolboxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-background">
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="variables">Переменные</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-4 space-y-2">
          {TEMPLATES.map((template, idx) => (
            <Button
              key={template.name}
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => onLoadTemplate(idx)}
            >
              <span className="mr-2">📋</span>
              {template.name}
            </Button>
          ))}
        </TabsContent>

        <TabsContent value="variables" className="mt-4 space-y-2">
          {VARIABLES.map((variable) => (
            <button
              key={variable.id}
              onClick={() => onAddVariable(variable.label)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "copy"
                e.dataTransfer.setData("text/plain", variable.label)
              }}
              className="w-full"
            >
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 w-full justify-center">
                {variable.label}
              </Badge>
            </button>
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Настройки документа</h3>
        <div className="space-y-2">
          <Label htmlFor="background-upload" className="text-xs font-medium text-foreground">
            Фоновое изображение
          </Label>
          <input
            id="background-upload"
            type="file"
            accept="image/*"
            onChange={onBackgroundUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 bg-transparent"
            onClick={() => fileInputRef.current?.click()}
          >
            <span>📤</span>
            Загрузить фон
          </Button>
          {backgroundImage && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs gap-2"
              onClick={() => {
                onRemoveBackground()
                fileInputRef.current!.value = ""
              }}
            >
              <span>🗑️</span>
              Удалить фон
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
