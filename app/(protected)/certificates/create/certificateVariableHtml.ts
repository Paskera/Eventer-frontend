import type { CertificateVariable } from "./data"
import { VARIABLES, isTextLayer, type Layer } from "./data"

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/** Текст вида {{Подпись}} без span (старые шаблоны / копипаст) */
function applyMustachePlaceholdersToHtmlStringWithStats(
  html: string,
  row: Record<string, string>,
): { html: string; filled: number } {
  let out = html
  let filled = 0
  for (const v of VARIABLES) {
    const val = row[v.id]
    const re = new RegExp(`\\{\\{\\s*${escapeRegExp(v.label)}\\s*\\}\\}`, "g")
    if (val != null && String(val).trim() !== "") {
      const matches = out.match(re)
      if (matches) filled += matches.length
      out = out.replace(re, escapeText(String(val).trim()))
    }
  }
  return { html: out, filled }
}

/** Вставка в contenteditable: неразрывный плейсхолдер с id для подстановки из таблицы */
export function buildVariableSpanHtml(v: CertificateVariable): string {
  const display = `{{${v.label}}}`
  return `<span class="certificate-variable" data-certificate-var="${escapeAttr(v.id)}" data-certificate-var-kind="${escapeAttr(v.kind)}" title="${escapeAttr(v.label)}">${escapeText(display)}</span>`
}

/** Сколько плейсхолдеров в этом HTML реально получили непустое значение из строки */
export function applyVariableRowToHtmlWithStats(
  html: string,
  row: Record<string, string>,
): { html: string; filledInDocument: number } {
  if (!html) return { html, filledInDocument: 0 }

  const hasDataAttr = html.includes("data-certificate-var")
  const hasMustache = VARIABLES.some((v) => html.includes(`{{${v.label}}}`))
  if (!hasDataAttr && !hasMustache) return { html, filledInDocument: 0 }

  let filledInDocument = 0
  let result = html

  if (hasDataAttr) {
    const doc = new DOMParser().parseFromString(`<div id="merge-root">${html}</div>`, "text/html")
    const root = doc.getElementById("merge-root")
    if (root) {
      root.querySelectorAll("[data-certificate-var]").forEach((el) => {
        const id = el.getAttribute("data-certificate-var")
        if (!id) return
        const raw = row[id]
        const val = raw != null ? String(raw).trim() : ""
        const def = VARIABLES.find((x) => x.id === id)
        const fallback = def ? `{{${def.label}}}` : ""
        if (val !== "") {
          el.textContent = val
          filledInDocument++
        } else {
          el.textContent = fallback
        }
      })
      result = root.innerHTML
    }
  }

  const { html: afterMustache, filled: mustacheFilled } =
    applyMustachePlaceholdersToHtmlStringWithStats(result, row)
  return { html: afterMustache, filledInDocument: filledInDocument + mustacheFilled }
}

export function applyVariableRowToHtml(html: string, row: Record<string, string>): string {
  return applyVariableRowToHtmlWithStats(html, row).html
}

/** Сколько непустых ячеек в строке соответствует известным переменным (для подсказок в UI) */
export function countFilledVariableCells(row: Record<string, string>): number {
  return VARIABLES.filter((v) => {
    const x = row[v.id]
    return x != null && String(x).trim() !== ""
  }).length
}

/**
 * @param liveEditing — пока слой открыт в contenteditable, актуальный HTML в `editingText`,
 * а `layer.text` в state часто устаревает до blur; без этого подстановка из таблицы не видна.
 */
export function applyVariableRowToLayers(
  layers: Layer[],
  row: Record<string, string>,
  liveEditing?: { layerId: string; html: string } | null,
): Layer[] {
  return applyVariableRowToLayersWithStats(layers, row, liveEditing).layers
}

export function applyVariableRowToLayersWithStats(
  layers: Layer[],
  row: Record<string, string>,
  liveEditing?: { layerId: string; html: string } | null,
): { layers: Layer[]; filledInDocument: number } {
  let filledInDocument = 0
  const nextLayers = layers.map((layer) => {
    if (!isTextLayer(layer)) return layer
    const source =
      liveEditing != null && layer.id === liveEditing.layerId
        ? liveEditing.html
        : layer.text || ""
    const { html: next, filledInDocument: n } = applyVariableRowToHtmlWithStats(source, row)
    filledInDocument += n
    if (next === (layer.text || "")) return layer
    return { ...layer, text: next }
  })
  return { layers: nextLayers, filledInDocument }
}
