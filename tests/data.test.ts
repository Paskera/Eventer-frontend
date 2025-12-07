import { describe, expect, it } from "vitest"
import {
  DEFAULT_PAGE_SETTINGS,
  TEMPLATES,
  createDocumentFromTemplate,
  isHyperlinkLayer,
  isImageLayer,
  isTableLayer,
  isTextLayer,
} from "@/app/(protected)/certificates/create/data"

describe("templates and layers", () => {
  it("builds document state from template with unique ids", () => {
    const doc = createDocumentFromTemplate(TEMPLATES[0], DEFAULT_PAGE_SETTINGS)
    expect(doc.layers.length).toBeGreaterThan(0)
    const ids = new Set(doc.layers.map((l) => l.id))
    expect(ids.size).toBe(doc.layers.length)
    expect(doc.page).toEqual(DEFAULT_PAGE_SETTINGS)
  })

  it("type guards detect layer kinds", () => {
    const sample = [
      { id: "1", text: "t", x: 0, y: 0, fontSize: 12, fontFamily: "sans-serif", color: "#000", alignment: "left", width: 100 },
      { id: "2", type: "image", src: "data:image/png;base64,abc", x: 0, y: 0, width: 10, height: 10 },
      { id: "3", type: "table", x: 0, y: 0, width: 10, rows: [[{ text: "a" }]] },
      { id: "4", type: "hyperlink", text: "link", url: "https://example.com", x: 0, y: 0, fontSize: 12, width: 50 },
    ]

    expect(isTextLayer(sample[0] as any)).toBe(true)
    expect(isImageLayer(sample[1] as any)).toBe(true)
    expect(isTableLayer(sample[2] as any)).toBe(true)
    expect(isHyperlinkLayer(sample[3] as any)).toBe(true)
  })
})
