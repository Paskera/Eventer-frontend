/** Маркеры списков идут от font-size у li/ol; подгоняем под фактический кегль текста в пункте (не из вложенных списков). */
export function normalizeListMarkerFontSizes(root: HTMLElement): void {
  root.querySelectorAll("li").forEach((li) => {
    const liEl = li as HTMLElement
    let minPx = Infinity
    const walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT)
    let node: Node | null = walker.nextNode()
    while (node) {
      const text = node.textContent?.replace(/\u200b/g, "") ?? ""
      if (!text.trim()) {
        node = walker.nextNode()
        continue
      }
      const parent = node.parentElement
      if (!parent) {
        node = walker.nextNode()
        continue
      }
      const ownerLi = parent.closest("li")
      if (ownerLi !== liEl) {
        node = walker.nextNode()
        continue
      }
      const fs = parseFloat(window.getComputedStyle(parent).fontSize)
      if (Number.isFinite(fs)) minPx = Math.min(minPx, fs)
      node = walker.nextNode()
    }
    if (minPx < Infinity) {
      liEl.style.setProperty("font-size", `${minPx}px`, "important")
    }
  })

  root.querySelectorAll("ol, ul").forEach((list) => {
    const listEl = list as HTMLElement
    const directLis = list.querySelectorAll(":scope > li")
    if (directLis.length === 0) return
    let minPx = Infinity
    directLis.forEach((item) => {
      const fs = parseFloat(window.getComputedStyle(item).fontSize)
      if (Number.isFinite(fs)) minPx = Math.min(minPx, fs)
    })
    if (minPx < Infinity) {
      listEl.style.setProperty("font-size", `${minPx}px`, "important")
    }
  })
}
