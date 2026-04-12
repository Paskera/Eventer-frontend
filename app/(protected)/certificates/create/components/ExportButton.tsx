"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, File } from "lucide-react"
import { toast } from "sonner"
import type { Layer, TextLayer } from "../data"
import { isTextLayer, isImageLayer, isTableLayer, isHyperlinkLayer } from "../data"
import { textLayerHtmlToDocxParagraphs } from "../parseHtmlForDocxExport"

const MM_PADDING_EXPORT = 20

interface ExportButtonProps {
  layers: Layer[]
  /** Актуальный текст из редактора (в т.ч. до blur) */
  getLayersForExport?: () => Layer[]
  backgroundImage: string | null
  pageWidth: number
  pageHeight: number
  zoomLevel?: number
}

function resolveLayers(layers: Layer[], getLayersForExport?: () => Layer[]): Layer[] {
  try {
    return getLayersForExport?.() ?? layers
  } catch {
    return layers
  }
}

/** Текст из HTML слоя для PDF/DOCX */
function htmlToPlainText(html: string): string {
  if (typeof document === "undefined") {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|h[1-6])\s*>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/&nbsp;/gi, " ")
      .trim()
  }
  const el = document.createElement("div")
  el.innerHTML = html
  return (el.innerText || "").replace(/\u00a0/g, " ").trim()
}

function splitPlainIntoLines(plain: string): string[] {
  const lines = plain.split(/\r?\n/).map((l) => l.trimEnd())
  if (lines.length === 0 || (lines.length === 1 && lines[0] === "")) return []
  return lines
}

/** Формат картинки для jsPDF addImage */
function jspdfImageFormat(dataUrl: string): string {
  if (dataUrl.startsWith("data:image/png")) return "PNG"
  if (dataUrl.startsWith("data:image/webp")) return "WEBP"
  if (dataUrl.startsWith("data:image/gif")) return "GIF"
  return "JPEG"
}

function docxImageType(src: string): "png" | "jpg" | "gif" | "bmp" | null {
  if (src.startsWith("data:image/png")) return "png"
  if (src.startsWith("data:image/jpeg") || src.startsWith("data:image/jpg")) return "jpg"
  if (src.startsWith("data:image/gif")) return "gif"
  if (src.startsWith("data:image/bmp")) return "bmp"
  return null
}

function mmToCssPx(mm: number): number {
  return (mm * 96) / 25.4
}

function sortExportLayers(ls: Layer[]): Layer[] {
  return [...ls].sort((a, b) => {
    const pa = a.pageIndex ?? 0
    const pb = b.pageIndex ?? 0
    if (pa !== pb) return pa - pb
    if (a.y !== b.y) return a.y - b.y
    return a.x - b.x
  })
}

/** Цветовые функции из Tailwind v4 / modern CSS, которые ломают парсер html2canvas */
const MODERN_COLOR_FN = /lab\s*\(|oklch\s*\(|lch\s*\(|color\s*\(\s*display-p3/i

function stripStylesheetsFromClone(clonedDoc: Document) {
  clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((n) => n.remove())
  clonedDoc.querySelectorAll('link[rel="preload"][as="style"]').forEach((n) => n.remove())
  clonedDoc.querySelectorAll("style").forEach((n) => n.remove())
}

function normalizeColorWithCanvas(value: string): string {
  const ctx = document.createElement("canvas").getContext("2d")
  if (!ctx) return "#000000"
  try {
    ctx.fillStyle = "#000000"
    ctx.fillStyle = value.trim()
    const out = String(ctx.fillStyle)
    if (out && !MODERN_COLOR_FN.test(out)) return out
  } catch {
    /* ignore */
  }
  return "#000000"
}

/** null — не выставлять свойство (полагаемся на длинные формы вроде background-color) */
function sanitizeCSSValueForHtml2Canvas(propName: string, value: string): string | null {
  if (!value || !MODERN_COLOR_FN.test(value)) return value
  if (propName === "background") {
    return null
  }
  if (
    propName === "background-image" ||
    propName === "border-image" ||
    propName === "border-image-source"
  ) {
    return "none"
  }
  if (
    propName === "box-shadow" ||
    propName === "text-shadow" ||
    propName === "filter" ||
    propName === "backdrop-filter"
  ) {
    return "none"
  }
  return normalizeColorWithCanvas(value)
}

/**
 * html2canvas парсит &lt;style&gt;/link и падает на oklch/lab из globals.css.
 * Убираем их и переносим вычисленные стили на клон (с безопасными цветами).
 */
function prepareCertificateCloneForHtml2Canvas(
  originalRoot: HTMLElement,
  clonedRoot: HTMLElement,
  clonedDoc: Document,
) {
  stripStylesheetsFromClone(clonedDoc)

  const walkerOrig = document.createTreeWalker(originalRoot, NodeFilter.SHOW_ELEMENT)
  const walkerClone = clonedDoc.createTreeWalker(clonedRoot, NodeFilter.SHOW_ELEMENT)

  let nodeOrig = walkerOrig.nextNode() as Element | null
  let nodeClone = walkerClone.nextNode() as Element | null

  while (nodeOrig && nodeClone) {
    const styleTarget =
      nodeClone instanceof HTMLElement || nodeClone instanceof SVGElement ? nodeClone.style : null
    if (styleTarget) {
      const cs = getComputedStyle(nodeOrig)
      for (let i = 0; i < cs.length; i++) {
        const name = cs.item(i)
        if (!name) continue
        let val = cs.getPropertyValue(name)
        if (!val) continue
        const sanitized = sanitizeCSSValueForHtml2Canvas(name, val)
        if (sanitized === null) continue
        val = sanitized
        try {
          styleTarget.setProperty(name, val, cs.getPropertyPriority(name))
        } catch {
          /* несовместимое сочетание свойств — пропускаем */
        }
      }
    }

    nodeOrig = walkerOrig.nextNode() as Element | null
    nodeClone = walkerClone.nextNode() as Element | null
  }
}

export default function ExportButton({
  layers,
  getLayersForExport,
  backgroundImage,
  pageWidth,
  pageHeight,
  zoomLevel = 1,
}: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const exportToPDF = async () => {
    setExporting(true)
    try {
      if (pageWidth <= 0 || pageHeight <= 0) {
        toast.error("Некорректный размер страницы")
        return
      }

      const pageNodes = document.querySelectorAll("[data-certificate-page]")
      if (pageNodes.length > 0) {
        try {
          const html2canvas = (await import("html2canvas")).default
          const { jsPDF } = await import("jspdf")

          const orientation = pageWidth > pageHeight ? "landscape" : "portrait"
          const doc = new jsPDF({
            orientation,
            unit: "mm",
            format: [pageWidth, pageHeight],
            compress: true,
          })

          const scale = Math.min(3, Math.max(2, 2 / Math.max(zoomLevel, 0.2)))

          for (let i = 0; i < pageNodes.length; i++) {
            if (i > 0) {
              doc.addPage([pageWidth, pageHeight], orientation)
            }
            const el = pageNodes[i] as HTMLElement
            const canvas = await html2canvas(el, {
              scale,
              useCORS: true,
              allowTaint: true,
              logging: false,
              backgroundColor: "#ffffff",
              onclone: (clonedDoc, clonedEl) => {
                prepareCertificateCloneForHtml2Canvas(el, clonedEl, clonedDoc)
              },
            })
            const imgData = canvas.toDataURL("image/png", 1.0)
            doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST")
          }

          doc.save("document.pdf")
          toast.success("PDF сохранён")
          return
        } catch (err) {
          console.warn("html2canvas / растровый PDF:", err)
          toast.warning("Снимок страницы не удался — сохраняем упрощённый PDF.")
        }
      }

      // Fallback: векторный PDF (нет разметки страницы на экране или сбой html2canvas)
      const L = resolveLayers(layers, getLayersForExport)
      if (!L.length) {
        toast.error("Нет данных для экспорта.")
        return
      }

      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF({
        orientation: pageWidth > pageHeight ? "landscape" : "portrait",
        unit: "mm",
        format: [pageWidth, pageHeight],
      })

      if (backgroundImage) {
        try {
          doc.addImage(backgroundImage, jspdfImageFormat(backgroundImage), 0, 0, pageWidth, pageHeight)
        } catch {
          console.warn("Фон в PDF не добавлен (формат или данные).")
        }
      }

      let errorCount = 0
      for (const layer of sortExportLayers(L)) {
        try {
          if (isTextLayer(layer)) {
            const html = layer.text || ""
            const plain = htmlToPlainText(html)
            const hasImg = /<img\s/i.test(html)
            if (!plain && !hasImg) continue

            let cursorY = Math.max(0, layer.y)
            if (plain) {
              const lines = splitPlainIntoLines(plain)
              if (lines.length > 0) {
                doc.setFontSize(Math.max(1, Math.min(72, layer.fontSize || 12)))
                doc.setTextColor(layer.color || "#000000")
                const textBlock = lines.join("\n")
                const wrapped = doc.splitTextToSize(textBlock, Math.max(1, layer.width))
                doc.text(wrapped, Math.max(0, layer.x), cursorY, {
                  align: (layer.alignment as "left" | "center" | "right") || "left",
                  maxWidth: Math.max(1, layer.width),
                  baseline: "top",
                })
                const lineHmm = ((layer.fontSize || 12) * 25.4) / 72
                cursorY += (Array.isArray(wrapped) ? wrapped.length : 1) * lineHmm + 2
              }
            }

            if (hasImg) {
              try {
                const container = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html")
                const wrap = container.body.querySelector("div")
                wrap?.querySelectorAll("img").forEach((im) => {
                  const src = im.getAttribute("src")
                  if (!src) return
                  const wAttr = parseInt(im.getAttribute("width") || "0", 10) || 400
                  const hAttr = parseInt(im.getAttribute("height") || "0", 10) || 300
                  const maxW = Math.max(10, layer.width)
                  let wMm = (wAttr * 25.4) / 96
                  let hMm = (hAttr * 25.4) / 96
                  if (wMm > maxW) {
                    const s = maxW / wMm
                    wMm *= s
                    hMm *= s
                  }
                  const fmt = src.startsWith("data:image/png") ? "PNG" : "JPEG"
                  doc.addImage(src, fmt, Math.max(0, layer.x), cursorY, wMm, hMm)
                  cursorY += hMm + 2
                })
              } catch {
                errorCount++
              }
            }
          } else if (isImageLayer(layer)) {
            if (!layer.src) {
              errorCount++
              continue
            }
            const fmt = layer.src.startsWith("data:image/png") ? "PNG" : "JPEG"
            const h = layer.height ?? layer.width
            try {
              doc.addImage(
                layer.src,
                fmt,
                Math.max(0, layer.x),
                Math.max(0, layer.y),
                Math.max(1, layer.width),
                Math.max(1, h),
                undefined,
                undefined,
                layer.rotation ?? 0,
              )
            } catch {
              errorCount++
            }
          }
        } catch {
          errorCount++
        }
      }

      if (errorCount > 0) {
        toast.warning(`Часть элементов в PDF не попала (${errorCount}).`)
      } else {
        toast.success("PDF сохранён")
      }
      doc.save("document.pdf")
    } catch (error) {
      console.error("exportToPDF:", error)
      toast.error(error instanceof Error ? error.message : "Ошибка экспорта в PDF")
    } finally {
      setExporting(false)
    }
  }

  const exportToDOCX = async () => {
    setExporting(true)
    try {
      const L = resolveLayers(layers, getLayersForExport)
      if (!L.length) {
        toast.error("Нет данных для экспорта.")
        return
      }

      const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        ImageRun,
        Table,
        TableCell,
        TableRow,
        ExternalHyperlink,
        AlignmentType,
        PageOrientation,
        HeadingLevel,
        PageBreak,
        convertMillimetersToTwip,
        UnderlineType,
      } = await import("docx")

      const marginTwip = convertMillimetersToTwip(MM_PADDING_EXPORT)
      const wTwip = convertMillimetersToTwip(pageWidth)
      const hTwip = convertMillimetersToTwip(pageHeight)
      const orientation = pageWidth > pageHeight ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT

      const children: import("docx").FileChild[] = []
      let errorCount = 0
      let lastPage = -1

      const textAlignment = (layer: TextLayer) => {
        if (layer.alignment === "center") return AlignmentType.CENTER
        if (layer.alignment === "right") return AlignmentType.RIGHT
        return AlignmentType.LEFT
      }

      const headingFromLayer = (layer: TextLayer) => {
        switch (layer.headingLevel) {
          case "h1":
            return HeadingLevel.HEADING_1
          case "h2":
            return HeadingLevel.HEADING_2
          case "h3":
            return HeadingLevel.HEADING_3
          default:
            return undefined
        }
      }

      if (backgroundImage) {
        const t = docxImageType(backgroundImage)
        if (t) {
          try {
            const maxWpx = Math.round(mmToCssPx(pageWidth - MM_PADDING_EXPORT * 2))
            const maxHpx = Math.round(mmToCssPx(pageHeight - MM_PADDING_EXPORT * 2))
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [
                  new ImageRun({
                    type: t,
                    data: backgroundImage,
                    transformation: { width: maxWpx, height: maxHpx },
                  }),
                ],
              }),
            )
          } catch {
            errorCount++
          }
        }
      }

      for (const layer of sortExportLayers(L)) {
        try {
          const p = layer.pageIndex ?? 0
          if (p !== lastPage && lastPage >= 0) {
            children.push(new Paragraph({ children: [new PageBreak()] }))
          }
          lastPage = p

          if (isTextLayer(layer)) {
            const html = layer.text || ""
            const plain = htmlToPlainText(html)
            if (!plain && !/<img\s/i.test(html)) continue

            const docxParas = textLayerHtmlToDocxParagraphs(html, layer)
            if (docxParas.length === 0) continue

            docxParas.forEach((para, paraIdx) => {
              const runChildren: (InstanceType<typeof TextRun> | InstanceType<typeof ImageRun>)[] = []
              for (const part of para.parts) {
                if (part.kind === "break") {
                  runChildren.push(new TextRun({ break: 1 }))
                  continue
                }
                if (part.kind === "image") {
                  const t = docxImageType(part.src)
                  if (t) {
                    runChildren.push(
                      new ImageRun({
                        type: t,
                        data: part.src,
                        transformation: {
                          width: part.widthPx,
                          height: part.heightPx,
                        },
                      }),
                    )
                  }
                  continue
                }
                const r = part.run
                if (!r.text) continue
                runChildren.push(
                  new TextRun({
                    text: r.text,
                    font: r.font,
                    size: r.halfPoints,
                    color: r.colorHex,
                    bold: r.bold,
                    italics: r.italics,
                    underline: r.underline ? { type: UnderlineType.SINGLE } : undefined,
                  }),
                )
              }
              if (runChildren.length === 0) return
              children.push(
                new Paragraph({
                  alignment: textAlignment(layer),
                  heading: paraIdx === 0 ? headingFromLayer(layer) : undefined,
                  children: runChildren,
                }),
              )
            })
          } else if (isImageLayer(layer)) {
            if (!layer.src) {
              errorCount++
              continue
            }
            const t = docxImageType(layer.src)
            if (!t) {
              errorCount++
              continue
            }
            const wPx = Math.max(24, Math.round(mmToCssPx(layer.width)))
            const hPx = Math.max(24, Math.round(mmToCssPx(layer.height ?? layer.width)))
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 120, after: 120 },
                children: [
                  new ImageRun({
                    type: t,
                    data: layer.src,
                    transformation: {
                      width: wPx,
                      height: hPx,
                      rotation: layer.rotation,
                    },
                  }),
                ],
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
            } catch {
              errorCount++
            }
          } else if (isHyperlinkLayer(layer)) {
            if (!layer.text || !layer.url) continue
            try {
              new URL(layer.url)
              children.push(
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      link: layer.url,
                      children: [
                        new TextRun({
                          text: layer.text,
                          color: (layer.color || "#0563C1").replace(/^#/, ""),
                          underline: { type: UnderlineType.SINGLE },
                        }),
                      ],
                    }),
                  ],
                }),
              )
            } catch {
              children.push(new Paragraph({ text: layer.text }))
              errorCount++
            }
          }
        } catch {
          errorCount++
        }
      }

      if (children.length === 0) {
        toast.error("Не удалось собрать содержимое для DOCX.")
        return
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  width: wTwip,
                  height: hTwip,
                  orientation,
                },
                margin: {
                  top: marginTwip,
                  right: marginTwip,
                  bottom: marginTwip,
                  left: marginTwip,
                },
              },
            },
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
        toast.warning(`DOCX сохранён; не всё удалось перенести (${errorCount}).`)
      } else {
        toast.success("Документ Word (.docx) сохранён")
      }
    } catch (error) {
      console.error("exportToDOCX:", error)
      toast.error(error instanceof Error ? error.message : "Ошибка экспорта в DOCX")
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
        <DropdownMenuItem
          onClick={() => {
            void exportToPDF()
          }}
        >
          <File className="w-4 h-4 mr-2" />
          Экспорт в PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            void exportToDOCX()
          }}
        >
          <FileText className="w-4 h-4 mr-2" />
          Экспорт в Word (DOCX)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
