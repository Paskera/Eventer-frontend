"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TEMPLATES, TEMPLATE_CATEGORIES } from "../data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TemplateSelectorProps {
  onSelectTemplate: (index: number) => void
  onClose: () => void
}

export default function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  const filteredTemplates = React.useMemo(() => {
    if (selectedCategory === "all") {
      return TEMPLATES.map((template, index) => ({ template, index }))
    }
    return TEMPLATES.map((template, index) => ({ template, index })).filter(
      ({ template }) => template.category === selectedCategory,
    )
  }, [selectedCategory])

  const handleSelectTemplate = (index: number) => {
    onSelectTemplate(index)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden">
      <Card className="w-full max-w-4xl max-h-[85vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Выбор шаблона документа</CardTitle>
              <CardDescription className="mt-1">
                Выберите готовый шаблон для быстрого создания документа
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              {TEMPLATE_CATEGORIES.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                {filteredTemplates.map(({ template, index }) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:border-primary transition-all hover:shadow-md"
                    onClick={() => handleSelectTemplate(index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{template.previewIcon || "📄"}</span>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {TEMPLATE_CATEGORIES.find((c) => c.value === template.category)?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-xs line-clamp-2">
                        {template.description || "Шаблон документа"}
                      </CardDescription>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground">Элементов: {template.layers.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">Шаблоны не найдены в этой категории</p>
                </div>
              )}
            </ScrollArea>
          </Tabs>
        </div>

        <div className="border-t p-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </Card>
    </div>
  )
}
