import type { TextLayer } from "./data"

/** Промежуточное представление для сборки docx Paragraph / TextRun */
export type DocxExportRun = {
  text: string
  font: string
  halfPoints: number
  colorHex: string
  bold: boolean
  italics: boolean
  underline: boolean
}

export type DocxExportLinePart =
  | { kind: "text"; run: DocxExportRun }
  | { kind: "break" }
  | { kind: "image"; src: string; widthPx: number; heightPx: number }

export type DocxExportParagraph = {
  parts: DocxExportLinePart[]
}

function mapFontFamily(raw: string): string {
  const first = raw.replace(/['"]/g, "").split(",")[0]?.trim() || ""
  const f = first.toLowerCase()
  if (!f || f === "sans-serif" || f === "system-ui" || f === "ui-sans-serif") return "Arial"
  if (f === "serif" || f === "ui-serif") return "Times New Roman"
  if (f === "monospace" || f === "ui-monospace") return "Courier New"
  if (f.includes("geist")) return "Segoe UI"
  return first || "Arial"
}

function normalizeHex6(input: string): string | null {
  const t = input.trim()
  if (t.startsWith("#")) {
    const h = t.slice(1)
    if (h.length === 3) {
      return `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`
    }
    if (h.length === 6) return h
    return null
  }
  const m = t.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (m) {
    const to = (n: number) => n.toString(16).padStart(2, "0")
    return `${to(+m[1])}${to(+m[2])}${to(+m[3])}`
  }
  if (typeof document !== "undefined") {
    const ctx = document.createElement("canvas").getContext("2d")
    if (ctx) {
      try {
        ctx.fillStyle = "#000000"
        ctx.fillStyle = t
        const out = String(ctx.fillStyle)
        if (out.startsWith("#") && out.length >= 7) return out.slice(1, 7)
      } catch {
        /* ignore */
      }
    }
  }
  return null
}

/** Размеры из выпадающего списка редактора задаются как Npx, но по смыслу для Word — N pt */
const EDITOR_SIZE_AS_PT = new Set([
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72,
])

/** CSS px → половинки пункта Word (1 pt = 2 half-points; 1px ≈ 0.75 pt при 96dpi) */
function pxToHalfPoints(px: number): number {
  const pt = px * (72 / 96)
  return Math.min(160, Math.max(8, Math.round(pt * 2)))
}

function fontSizePxToHalfPoints(px: number): number {
  const rounded = Math.round(px)
  if (EDITOR_SIZE_AS_PT.has(rounded)) {
    return Math.min(160, Math.max(8, rounded * 2))
  }
  return pxToHalfPoints(px)
}

function parseStyleAttr(style: string): Partial<DocxExportRun> {
  const patch: Partial<DocxExportRun> = {}
  const fs = style.match(/font-size\s*:\s*([^;]+)/i)?.[1]?.trim()
  if (fs) {
    const n = parseFloat(fs)
    if (!Number.isNaN(n)) {
      if (fs.includes("px")) patch.halfPoints = fontSizePxToHalfPoints(n)
      else if (fs.includes("pt")) patch.halfPoints = Math.min(160, Math.max(8, Math.round(n * 2)))
    }
  }
  const ff = style.match(/font-family\s*:\s*([^;]+)/i)?.[1]
  if (ff) patch.font = mapFontFamily(ff)
  const col = style.match(/color\s*:\s*([^;]+)/i)?.[1]?.trim()
  if (col) {
    const hex = normalizeHex6(col)
    if (hex) patch.colorHex = hex
  }
  const fw = style.match(/font-weight\s*:\s*([^;]+)/i)?.[1]?.trim()
  if (fw === "bold" || fw === "bolder" || fw === "700" || (parseInt(fw || "", 10) || 0) >= 600) {
    patch.bold = true
  }
  const td = style.match(/text-decoration(?:-line)?\s*:\s*([^;]+)/i)?.[1] || ""
  if (td.includes("underline")) patch.underline = true
  if (td.includes("line-through")) {
    /* strike в docx отдельно — пока игнорируем */
  }
  return patch
}

function baseRunFromLayer(layer: TextLayer): DocxExportRun {
  const colorHex = normalizeHex6(layer.color || "#000000") || "000000"
  return {
    text: "",
    font: mapFontFamily(layer.fontFamily || "sans-serif"),
    halfPoints: Math.min(160, Math.max(8, Math.round((layer.fontSize || 16) * 2))),
    colorHex,
    bold: layer.fontWeight === "bold" || layer.fontWeight === "700",
    italics: layer.fontStyle === "italic",
    underline: layer.textDecoration === "underline",
  }
}

function mergeRun(base: DocxExportRun, patch: Partial<DocxExportRun>): DocxExportRun {
  return {
    text: patch.text ?? base.text,
    font: patch.font ?? base.font,
    halfPoints: patch.halfPoints ?? base.halfPoints,
    colorHex: patch.colorHex ?? base.colorHex,
    bold: patch.bold ?? base.bold,
    italics: patch.italics ?? base.italics,
    underline: patch.underline ?? base.underline,
  }
}

const LEGACY_FONT_SIZE_PT = [10, 13, 16, 18, 24, 32, 48]

function collectParts(node: Node, style: DocxExportRun, out: DocxExportLinePart[]) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = (node.textContent || "").replace(/\u00a0/g, " ")
    if (text.length > 0) {
      out.push({ kind: "text", run: mergeRun(style, { text }) })
    }
    return
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return

  const el = node as Element
  const tag = el.tagName.toLowerCase()

  if (tag === "br") {
    out.push({ kind: "break" })
    return
  }

  if (tag === "img") {
    const src = el.getAttribute("src") || ""
    if (src) {
      let widthPx = parseInt(el.getAttribute("width") || "", 10) || 0
      let heightPx = parseInt(el.getAttribute("height") || "", 10) || 0
      const st = el.getAttribute("style") || ""
      const mwp = st.match(/width\s*:\s*(\d+(?:\.\d+)?)\s*px/i)
      const mhp = st.match(/height\s*:\s*(\d+(?:\.\d+)?)\s*px/i)
      if (mwp) widthPx = Math.round(parseFloat(mwp[1]))
      if (mhp) heightPx = Math.round(parseFloat(mhp[1]))
      if (!widthPx || !heightPx) {
        widthPx = 400
        heightPx = 300
      }
      widthPx = Math.max(24, Math.min(1200, widthPx))
      heightPx = Math.max(24, Math.min(1200, heightPx))
      out.push({ kind: "image", src, widthPx, heightPx })
    }
    return
  }

  let next = { ...style, text: "" }

  if (tag === "b" || tag === "strong") next.bold = true
  if (tag === "i" || tag === "em") next.italics = true
  if (tag === "u") next.underline = true

  if (tag === "span" && el.hasAttribute("style")) {
    next = mergeRun(next, parseStyleAttr(el.getAttribute("style") || ""))
  }
  if (tag === "font") {
    const st = el.getAttribute("style")
    if (st) next = mergeRun(next, parseStyleAttr(st))
    const sz = el.getAttribute("size")
    if (sz) {
      const n = parseInt(sz, 10)
      if (!Number.isNaN(n) && n >= 1 && n <= 7) {
        const pt = LEGACY_FONT_SIZE_PT[n - 1] ?? 16
        next.halfPoints = Math.min(160, Math.max(8, pt * 2))
      }
    }
    const face = el.getAttribute("face")
    if (face) next.font = mapFontFamily(face)
    const color = el.getAttribute("color")
    if (color) {
      const hex = normalizeHex6(color)
      if (hex) next.colorHex = hex
    }
  }

  for (const ch of el.childNodes) {
    collectParts(ch, next, out)
  }
}

function isBlockTag(tag: string) {
  return (
    tag === "div" ||
    tag === "p" ||
    tag === "h1" ||
    tag === "h2" ||
    tag === "h3" ||
    tag === "h4" ||
    tag === "h5" ||
    tag === "h6" ||
    tag === "li" ||
    tag === "blockquote"
  )
}

/**
 * Разбивает HTML слоя на абзацы с сохранением inline-стилей (как в contenteditable).
 */
export function textLayerHtmlToDocxParagraphs(html: string, layer: TextLayer): DocxExportParagraph[] {
  const base = baseRunFromLayer(layer)
  const wrapped = `<div id="docx-export-root">${html || ""}</div>`
  const doc = new DOMParser().parseFromString(wrapped, "text/html")
  const root = doc.getElementById("docx-export-root")
  if (!root) return []

  const blockElements: Element[] = []
  const direct = [...root.children].filter((c): c is Element => c.nodeType === Node.ELEMENT_NODE)

  if (direct.length === 1 && direct[0].tagName.toLowerCase() === "div") {
    const inner = direct[0]
    const innerKids = [...inner.children].filter((c): c is Element => c.nodeType === Node.ELEMENT_NODE)
    const allBlocks =
      innerKids.length > 0 && innerKids.every((c) => isBlockTag(c.tagName.toLowerCase()))
    if (allBlocks) {
      blockElements.push(...innerKids)
    } else {
      blockElements.push(inner)
    }
  } else if (direct.length > 0) {
    blockElements.push(...direct)
  }

  const paragraphs: DocxExportParagraph[] = []

  const hasRenderable = (parts: DocxExportLinePart[]) =>
    parts.some(
      (p) =>
        p.kind === "image" ||
        (p.kind === "text" && p.run.text.trim().length > 0),
    )

  if (blockElements.length === 0) {
    const parts: DocxExportLinePart[] = []
    collectParts(root, base, parts)
    if (hasRenderable(parts)) {
      paragraphs.push({ parts })
    }
    return paragraphs
  }

  for (const block of blockElements) {
    const parts: DocxExportLinePart[] = []
    collectParts(block, base, parts)
    if (hasRenderable(parts)) {
      paragraphs.push({ parts })
    }
  }

  return paragraphs
}
