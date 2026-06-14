"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, TableIcon, LinkIcon } from "lucide-react"
import { toast } from "sonner"
import type { ImageLayer } from "../data"

interface ObjectInserterProps {
  onInsertImage: (image: Omit<ImageLayer, "id">) => void
  onInsertTable: (table: any) => void
  onInsertHyperlink: (link: any) => void
  pageWidth: number
  pageHeight: number
}

export default function ObjectInserter({
  onInsertImage,
  onInsertTable,
  onInsertHyperlink,
  pageWidth,
  pageHeight,
}: ObjectInserterProps) {
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)
  const [linkText, setLinkText] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  const handleInsertImage = () => {
    if (!imageUrl) {
      toast.error("Пожалуйста, загрузите изображение или введите URL")
      return
    }

    // Валидация URL
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:")) {
      // Проверяем, что это валидный URL или data URL
      try {
        if (imageUrl.startsWith("http")) {
          new URL(imageUrl)
        }
      } catch (error) {
        toast.error("Некорректный URL изображения")
        return
      }
    } else {
      toast.error("URL должен начинаться с http://, https:// или data:")
      return
    }

    const xPercent = 50
    const yPercent = 50
    const widthPercent = 30
    const heightPercent = 30

    try {
      onInsertImage({
        type: "image",
        src: imageUrl,
        x: (xPercent * pageWidth) / 100,
        y: (yPercent * pageHeight) / 100,
        width: (widthPercent * pageWidth) / 100,
        height: (heightPercent * pageHeight) / 100,
        xPercent,
        yPercent,
        widthPercent,
        heightPercent,
        opacity: 1,
        rotation: 0,
      })

      setImageUrl("")
      setOpen(false)
      toast.success("Изображение добавлено")
    } catch (error) {
      console.error("Error inserting image:", error)
      toast.error("Ошибка при добавлении изображения")
    }
  }

  const handleInsertTable = () => {
    // Валидация размеров таблицы
    if (tableRows < 1 || tableRows > 50) {
      toast.error("Количество строк должно быть от 1 до 50")
      return
    }
    
    if (tableCols < 1 || tableCols > 20) {
      toast.error("Количество столбцов должно быть от 1 до 20")
      return
    }

    const xPercent = 10
    const yPercent = 20
    const widthPercent = 80

    try {
      const rows: string[][] = Array.from({ length: tableRows }, () => Array.from({ length: tableCols }, () => ""))

      onInsertTable({
        type: "table",
        x: (xPercent * pageWidth) / 100,
        y: (yPercent * pageHeight) / 100,
        width: (widthPercent * pageWidth) / 100,
        xPercent,
        yPercent,
        widthPercent,
        rows: rows.map((row) => row.map((text) => ({ text }))),
        borderColor: "#000000",
        borderWidth: 1,
        cellPadding: 8,
        headerRow: true,
        fontSize: 10,
      })

      setOpen(false)
      toast.success("Таблица добавлена")
    } catch (error) {
      console.error("Error inserting table:", error)
      toast.error("Ошибка при добавлении таблицы")
    }
  }

  const handleInsertHyperlink = () => {
    if (!linkText || !linkUrl) {
      toast.error("Пожалуйста, заполните текст ссылки и URL")
      return
    }

    // Валидация URL
    try {
      new URL(linkUrl)
    } catch (error) {
      toast.error("Некорректный URL. Используйте формат: https://example.com")
      return
    }

    const xPercent = 20
    const yPercent = 50
    const widthPercent = 60

    try {
      onInsertHyperlink({
        type: "hyperlink",
        text: linkText,
        url: linkUrl,
        x: (xPercent * pageWidth) / 100,
        y: (yPercent * pageHeight) / 100,
        fontSize: 12,
        color: "#0066cc",
        xPercent,
        yPercent,
        width: (widthPercent * pageWidth) / 100,
        widthPercent,
        underline: true,
      })

      setLinkText("")
      setLinkUrl("")
      setOpen(false)
      toast.success("Гиперссылка добавлена")
    } catch (error) {
      console.error("Error inserting hyperlink:", error)
      toast.error("Ошибка при добавлении гиперссылки")
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Валидация типа файла
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Неподдерживаемый формат изображения. Пожалуйста, выберите файл в формате JPG, PNG, WEBP или GIF.')
      e.target.value = "" // Сбрасываем input
      return
    }

    // Валидация размера файла (ограничим 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB в байтах
    if (file.size > maxSize) {
      toast.error('Размер файла превышает 10MB. Пожалуйста, выберите меньшее изображение.')
      e.target.value = "" // Сбрасываем input
      return
    }

    const reader = new FileReader()
    
    reader.onerror = () => {
      toast.error("Ошибка при чтении файла")
      e.target.value = ""
    }
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result
        if (result && typeof result === 'string') {
          setImageUrl(result)
          toast.success("Изображение загружено")
        } else {
          throw new Error("Неверный формат данных")
        }
      } catch (error) {
        console.error("Error processing image:", error)
        toast.error("Ошибка при обработке изображения")
        e.target.value = ""
      }
    }
    
    reader.readAsDataURL(file)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ImageIcon className="w-4 h-4 mr-2" />
          Вставить объект
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Вставка объекта</DialogTitle>
          <DialogDescription>Выберите тип объекта для вставки в документ</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="image">
              <ImageIcon className="w-4 h-4 mr-2" />
              Изображение
            </TabsTrigger>
            <TabsTrigger value="table">
              <TableIcon className="w-4 h-4 mr-2" />
              Таблица
            </TabsTrigger>
            <TabsTrigger value="link">
              <LinkIcon className="w-4 h-4 mr-2" />
              Гиперссылка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Загрузить изображение</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-url">Или введите URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleInsertImage} disabled={!imageUrl} className="w-full">
              Вставить изображение
            </Button>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="table-rows">Количество строк</Label>
                <Input
                  id="table-rows"
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="table-cols">Количество столбцов</Label>
                <Input
                  id="table-cols"
                  type="number"
                  min="1"
                  max="10"
                  value={tableCols}
                  onChange={(e) => setTableCols(Number(e.target.value))}
                />
              </div>
            </div>
            <Button onClick={handleInsertTable} className="w-full">
              Вставить таблицу
            </Button>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-text">Текст ссылки</Label>
              <Input
                id="link-text"
                type="text"
                placeholder="Нажмите здесь"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">URL адрес</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleInsertHyperlink} disabled={!linkText || !linkUrl} className="w-full">
              Вставить гиперссылку
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
