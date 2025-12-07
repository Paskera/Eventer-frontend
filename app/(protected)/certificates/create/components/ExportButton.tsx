"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, File } from "lucide-react"
import { toast } from "sonner"
import type { Layer } from "../data"
import { isTextLayer, isImageLayer, isTableLayer, isHyperlinkLayer } from "../data"

interface ExportButtonProps {
  layers: Layer[]
  backgroundImage: string | null
  pageWidth: number
  pageHeight: number
}

export default function ExportButton({ layers, backgroundImage, pageWidth, pageHeight }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const exportToPDF = async () => {
    setExporting(true)
    try {
      // Валидация данных перед экспортом
      if (!layers || layers.length === 0) {
        toast.error("Нет данных для экспорта. Добавьте хотя бы один элемент.")
        return
      }

      if (pageWidth <= 0 || pageHeight <= 0) {
        toast.error("Некорректный размер страницы")
        return
      }

      // Dynamic import для уменьшения размера бандла
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF({
        orientation: pageWidth > pageHeight ? "landscape" : "portrait",
        unit: "mm",
        format: [pageWidth, pageHeight],
      })

      // Добавляем фоновое изображение если есть
      if (backgroundImage) {
        try {
          doc.addImage(backgroundImage, "JPEG", 0, 0, pageWidth, pageHeight)
        } catch (error) {
          console.warn("Не удалось добавить фоновое изображение:", error)
          // Продолжаем без фона
        }
      }

      // Обрабатываем каждый слой
      let errorCount = 0
      for (const layer of layers) {
        try {
          if (isTextLayer(layer)) {
            if (!layer.text || layer.text.trim() === "") continue
            doc.setFontSize(Math.max(1, Math.min(72, layer.fontSize || 12)))
            doc.setTextColor(layer.color || "#000000")
            doc.text(layer.text, Math.max(0, layer.x), Math.max(0, layer.y), {
              align: layer.alignment as "left" | "center" | "right",
              maxWidth: Math.max(1, layer.width),
            })
          } else if (isImageLayer(layer)) {
            if (!layer.src) {
              errorCount++
              continue
            }
            try {
              // Определяем формат изображения
              let format: "JPEG" | "PNG" = "JPEG"
              if (layer.src.startsWith("data:image/png")) format = "PNG"
              
              doc.addImage(
                layer.src,
                format,
                Math.max(0, layer.x),
                Math.max(0, layer.y),
                Math.max(1, layer.width),
                Math.max(1, layer.height)
              )
            } catch (error) {
              console.warn(`Не удалось добавить изображение слоя ${layer.id}:`, error)
              errorCount++
            }
          } else if (isTableLayer(layer)) {
            if (!layer.rows || layer.rows.length === 0) continue
            const cellWidth = layer.width / Math.max(1, layer.rows[0]?.length || 1)
            const cellHeight = 10

            layer.rows.forEach((row, rowIndex) => {
              if (!row || row.length === 0) return
              row.forEach((cell, colIndex) => {
                const x = layer.x + colIndex * cellWidth
                const y = layer.y + rowIndex * cellHeight

                doc.rect(x, y, cellWidth, cellHeight)
                doc.setFontSize(Math.max(1, Math.min(72, layer.fontSize || 10)))
                doc.text(cell?.text || "", x + 2, y + cellHeight / 2 + 2, { maxWidth: cellWidth - 4 })
              })
            })
          } else if (isHyperlinkLayer(layer)) {
            if (!layer.text || !layer.url) continue
            try {
              doc.setTextColor(layer.color || "#0066cc")
              doc.textWithLink(layer.text, Math.max(0, layer.x), Math.max(0, layer.y), { url: layer.url })
            } catch (error) {
              // Если textWithLink не поддерживается, просто добавляем текст
              doc.setTextColor(layer.color || "#0066cc")
              doc.text(layer.text, Math.max(0, layer.x), Math.max(0, layer.y))
            }
          }
        } catch (error) {
          console.warn(`Ошибка при обработке слоя ${layer.id}:`, error)
          errorCount++
        }
      }

      if (errorCount > 0) {
        toast.warning(`Экспорт завершен с предупреждениями. ${errorCount} элементов не удалось добавить.`)
      } else {
        toast.success("Документ успешно экспортирован в PDF")
      }

      doc.save("document.pdf")
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка"
      toast.error(`Ошибка при экспорте в PDF: ${errorMessage}`)
    } finally {
      setExporting(false)
    }
  }

  const exportToDOCX = async () => {
    setExporting(true)
    try {
      // Валидация данных перед экспортом
      if (!layers || layers.length === 0) {
        toast.error("Нет данных для экспорта. Добавьте хотя бы один элемент.")
        return
      }

      // Dynamic import
      const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, ExternalHyperlink } =
        await import("docx")

      const children: any[] = []
      let errorCount = 0

      // Обрабатываем каждый слой
      for (const layer of layers) {
        try {
          if (isTextLayer(layer)) {
            if (!layer.text || layer.text.trim() === "") continue
            children.push(
              new Paragraph({
                text: layer.text || "",
                alignment: layer.alignment === "center" ? "center" : layer.alignment === "right" ? "right" : "left",
                style: layer.headingLevel && layer.headingLevel !== "normal" ? layer.headingLevel.toUpperCase() : undefined,
              }),
            )
          } else if (isTableLayer(layer)) {
            if (!layer.rows || layer.rows.length === 0) continue
            try {
              const tableRows = layer.rows.map(
                (row) =>
                  new TableRow({
                    children: (row || []).map(
                      (cell) =>
                        new TableCell({
                          children: [new Paragraph(cell?.text || "")],
                        }),
                    ),
                  }),
              )

              if (tableRows.length > 0) {
                children.push(new Table({ rows: tableRows }))
              }
            } catch (error) {
              console.warn(`Ошибка при обработке таблицы ${layer.id}:`, error)
              errorCount++
            }
          } else if (isHyperlinkLayer(layer)) {
            if (!layer.text || !layer.url) continue
            try {
              // Валидация URL
              new URL(layer.url)
              
              children.push(
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: layer.text,
                          style: "Hyperlink",
                          color: layer.color?.replace("#", "") || "0066cc",
                          underline: {},
                        }),
                      ],
                      link: layer.url,
                    }),
                  ],
                }),
              )
            } catch (error) {
              console.warn(`Ошибка при обработке гиперссылки ${layer.id}:`, error)
              // Добавляем как обычный текст
              children.push(
                new Paragraph({
                  text: layer.text,
                }),
              )
              errorCount++
            }
          }
        } catch (error) {
          console.warn(`Ошибка при обработке слоя ${layer.id}:`, error)
          errorCount++
        }
      }

      if (children.length === 0) {
        toast.error("Нет данных для экспорта. Все элементы содержат ошибки.")
        return
      }

      const doc = new Document({
        sections: [
          {
            children,
          },
        ],
      })

      const blob = await Packer.toBlob(doc)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "document.docx"
      link.click()
      window.URL.revokeObjectURL(url)

      if (errorCount > 0) {
        toast.warning(`Экспорт завершен с предупреждениями. ${errorCount} элементов не удалось добавить.`)
      } else {
        toast.success("Документ успешно экспортирован в DOCX")
      }
    } catch (error) {
      console.error("Error exporting to DOCX:", error)
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка"
      toast.error(`Ошибка при экспорте в DOCX: ${errorMessage}`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" disabled={exporting}>
          <Download className="w-4 h-4 mr-2" />
          {exporting ? "Экспорт..." : "Экспорт"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportToPDF}>
          <File className="w-4 h-4 mr-2" />
          Экспорт в PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToDOCX}>
          <FileText className="w-4 h-4 mr-2" />
          Экспорт в DOCX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
