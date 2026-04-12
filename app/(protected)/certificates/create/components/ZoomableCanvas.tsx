"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import type { ImageLayer, Layer, TextLayer } from "../data"
import { isTextLayer, isImageLayer, getTextLayerPositionAnchor } from "../data"
import { normalizeListMarkerFontSizes } from "../normalizeListMarkerFontSizes"
import { SelectableImageLayer } from "./SelectableImageLayer"

const MM_PADDING = 20

/** Пустой contenteditable не принимает ввод — держим минимальный узел (как тело при overflow). */
const MIN_EDITABLE_BODY_HTML = "<div>\u00A0</div>"

function isHtmlVisuallyEmptyForBody(html: string): boolean {
  const decoded = html
    .replace(/<br\s*\/?>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .trim()
  return !decoded
}

function hasStructuralRichContent(html: string): boolean {
  return (
    /<\s*(ul|ol|li|table|img|hr)\b/i.test(html) ||
    /data-certificate-var\s*=/i.test(html)
  )
}

function normalizeMinimumEditableHtml(html: string): string {
  const h = (html ?? "").trim()
  if (!h) return MIN_EDITABLE_BODY_HTML
  if (hasStructuralRichContent(h)) return html
  if (isHtmlVisuallyEmptyForBody(h)) return MIN_EDITABLE_BODY_HTML
  return html
}

/**
 * Каретка внутри реальных текстовых узлов. selectNodeContents(root)+collapse(false)
 * при разметке <div><div>&nbsp;</div></div> оказывается ПОСЛЕ внутреннего блока —
 * первый введённый символ уходит во вторую строку.
 */
function placeCaretInEditableRoot(root: HTMLElement, position: "start" | "end") {
  const selection = window.getSelection()
  if (!selection) return

  const range = document.createRange()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Node[] = []
  let node: Node | null = walker.nextNode()
  while (node) {
    textNodes.push(node)
    node = walker.nextNode()
  }

  if (textNodes.length > 0) {
    const target = position === "start" ? textNodes[0]! : textNodes[textNodes.length - 1]!
    const len = target.textContent?.length ?? 0
    const offset = position === "start" ? 0 : len
    range.setStart(target, Math.min(Math.max(0, offset), len))
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
    return
  }

  const block =
    root.querySelector<HTMLElement>("div, p, li") ??
    (root.firstElementChild instanceof HTMLElement ? root.firstElementChild : null)
  if (block) {
    range.setStart(block, 0)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
    return
  }

  range.selectNodeContents(root)
  range.collapse(position === "start")
  selection.removeAllRanges()
  selection.addRange(range)
}

function elementFromEventTarget(node: EventTarget | null): Element | null {
  if (!node) return null
  if (node instanceof Element) return node
  if (node instanceof Node && node.parentElement) return node.parentElement
  return null
}

/** Панель форматирования, свойства, порталы Radix — не завершать редактирование и не затирать DOM */
function isInsideEditorChrome(node: EventTarget | null): boolean {
  const el = elementFromEventTarget(node)
  if (!el) return false
  return !!(
    el.closest("[data-certificate-editor-toolbar]") ||
    el.closest("[data-image-layer-toolbar]") ||
    el.closest(".properties-panel") ||
    el.closest('[role="dialog"]') ||
    el.closest('[role="alertdialog"]') ||
    el.closest('[role="listbox"]') ||
    el.closest('[role="menu"]') ||
    el.closest("[data-radix-popper-content-wrapper]") ||
    el.closest("[data-radix-select-content]") ||
    el.closest("[data-radix-dropdown-menu-content]")
  )
}

function textLayerAbsoluteStyle(layer: TextLayer): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    top: `${layer.y}mm`,
    width: `${layer.width}mm`,
    zIndex: 2,
  }
  const anchor = getTextLayerPositionAnchor(layer)
  if (anchor === "center") {
    return { ...base, left: `${layer.x}mm`, transform: "translateX(-50%)" }
  }
  if (anchor === "right") {
    return { ...base, left: `${layer.x}mm`, transform: "translateX(-100%)" }
  }
  return { ...base, left: `${layer.x}mm` }
}

interface LayerItemProps {
  layer: TextLayer
  isSelected: boolean
  isEditing: boolean
  showFormattingSymbols: boolean
  onDoubleClick: (id: string, newText?: string) => void
  editingText: string
  setEditingText: (text: string) => void
  editingSelectionStart: number | null
  editingSelectionEnd?: number | null
  setEditingSelectionStart: (pos: number | null) => void
  setEditingSelectionEnd?: (pos: number | null) => void
  /** Поток текста в области полей (как тело в Google Docs) */
  layout?: "flow" | "absolute"
  className?: string
  /** Увеличивается после подстановки из CSV/Excel — обновить DOM, даже если фокус в тулбаре */
  contentHtmlSyncNonce?: number
}

function LayerItem({
  layer,
  isSelected,
  isEditing,
  showFormattingSymbols,
  onDoubleClick,
  editingText,
  setEditingText,
  editingSelectionStart,
  editingSelectionEnd,
  setEditingSelectionStart,
  setEditingSelectionEnd,
  layout = "flow",
  className = "",
  contentHtmlSyncNonce = 0,
}: LayerItemProps) {
  const editableRef = useRef<HTMLDivElement>(null)
  const wasEditingRef = useRef(false)
  const lastPointerDownTargetRef = useRef<EventTarget | null>(null)
  const lastHtmlSyncNonceRef = useRef(0)

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      lastPointerDownTargetRef.current = event.target
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => document.removeEventListener("pointerdown", onPointerDown, true)
  }, [])

  useEffect(() => {
    if (!isEditing) {
      wasEditingRef.current = false
      return
    }

    if (!editableRef.current) return

    const div = editableRef.current
    const isAlreadyFocused = document.activeElement === div
    const justEnteredEditMode = !wasEditingRef.current
    wasEditingRef.current = true

    // Пока поле в фокусе, не подменяем innerHTML из пропа — иначе сбрасывается выделение
    // после кнопок панели (жирный, размер и т.д.).
    if (!isAlreadyFocused) {
      const nextHtml = normalizeMinimumEditableHtml(editingText)
      if (div.innerHTML !== nextHtml) {
        div.innerHTML = nextHtml
      }
      if (div.querySelector("li")) {
        normalizeListMarkerFontSizes(div)
      }
      // Без preventScroll браузер сам прокручивает overflow-контейнер к каретке;
      // при text-align right/left на масштабированном холсте это сдвигает весь документ в сторону.
      div.focus({ preventScroll: true })

      const caretAtStart = nextHtml === MIN_EDITABLE_BODY_HTML
      placeCaretInEditableRoot(div, caretAtStart ? "start" : "end")

      // Только при первом входе в редактирование (двойной клик), не при возврате фокуса с панели —
      // block/inline: nearest — не тянуть горизонтальный скролл к «центру» элемента (ломало альбомный лист).
      if (justEnteredEditMode) {
        div.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
      }
    }
  }, [isEditing, layer.id, editingText])

  useEffect(() => {
    if (!editableRef.current || !isEditing) return
    const div = editableRef.current
    const nextHtml = normalizeMinimumEditableHtml(editingText)
    const mergePush = contentHtmlSyncNonce !== lastHtmlSyncNonceRef.current

    if (div.innerHTML === nextHtml) {
      if (mergePush) lastHtmlSyncNonceRef.current = contentHtmlSyncNonce
      return
    }

    const inChrome = isInsideEditorChrome(document.activeElement)
    // Не затирать живой DOM, пока фокус в тулбаре/меню — кроме явной подстановки из таблицы
    if (inChrome && !mergePush) return

    lastHtmlSyncNonceRef.current = contentHtmlSyncNonce

    const focusedHere = document.activeElement === div
    div.innerHTML = nextHtml
    if (div.querySelector("li")) {
      normalizeListMarkerFontSizes(div)
    }
    if (focusedHere || inChrome) {
      requestAnimationFrame(() => placeCaretInEditableRoot(div, "end"))
    }
  }, [editingText, isEditing, contentHtmlSyncNonce])

  const isFlow = layout === "flow"

  return (
    <div
      data-layer-id={layer.id}
      onMouseDown={(e) => {
        if (isEditing) {
          e.stopPropagation()
        }
      }}
      onClick={(e) => {
        if (!isEditing) {
          e.stopPropagation()
          const selection = window.getSelection()
          if (selection && selection.toString().length > 0) {
            return
          }
          onDoubleClick(layer.id)
        }
      }}
      className={`relative mb-0 min-h-[1.5em] pointer-events-auto ${isFlow ? "w-full" : "w-full"} ${isSelected && !isEditing ? "ring-2 ring-primary/40 ring-offset-1 rounded-sm" : ""} ${className}`}
      style={{
        width: isFlow ? "100%" : "100%",
        height: "auto",
        opacity: layer.opacity !== undefined ? layer.opacity : 1,
        cursor: "text",
        ...(isTextLayer(layer)
          ? {
              fontFamily: layer.fontFamily,
              fontSize: `${layer.fontSize}px`,
              color: layer.color,
              fontWeight: layer.fontWeight || "normal",
              fontStyle: layer.fontStyle || "normal",
              textDecoration: layer.textDecoration || "none",
              lineHeight: layer.lineHeight || "normal",
              letterSpacing: layer.letterSpacing ? `${layer.letterSpacing}px` : "normal",
              textAlign: layer.alignment,
              boxSizing: "border-box",
              padding: "0",
              whiteSpace: "pre-wrap",
            }
          : {}),
      }}
    >
      <>
        <div
          ref={editableRef}
          contentEditable={isEditing}
          className="w-full outline-none rich-text-content cursor-text select-text"
          onInput={(e) => {
            const el = e.currentTarget
            if (el.querySelector("li")) {
              normalizeListMarkerFontSizes(el)
            }
            let html = el.innerHTML
            if (!hasStructuralRichContent(html) && isHtmlVisuallyEmptyForBody(html)) {
              el.innerHTML = MIN_EDITABLE_BODY_HTML
              html = el.innerHTML
              requestAnimationFrame(() => placeCaretInEditableRoot(el, "start"))
            }
            setEditingText(html)
          }}
          onKeyUp={() => {}}
          onBlur={() => {
            if (!isEditing) return
            const raw = editableRef.current?.innerHTML
            const htmlSnapshot = normalizeMinimumEditableHtml(raw ?? "")
            window.setTimeout(() => {
              const ed = editableRef.current
              if (!ed?.isContentEditable) return
              const active = document.activeElement
              if (active === ed || (active && ed.contains(active))) return
              if (isInsideEditorChrome(active)) return
              if (isInsideEditorChrome(lastPointerDownTargetRef.current)) return
              onDoubleClick(layer.id, htmlSnapshot)
            }, 0)
          }}
          style={{
            textAlign: layer.alignment,
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            lineHeight: "inherit",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
          dangerouslySetInnerHTML={!isEditing ? { __html: layer.text || "\u00A0" } : undefined}
        />
        {showFormattingSymbols && !isEditing && (
          <span className="text-blue-400/50 ml-0.5 select-none inline-block">¶</span>
        )}
      </>
    </div>
  )
}

interface ZoomableCanvasProps {
  layers: any[]
  backgroundImage: string | null
  selectedLayerId: string | null
  onSelectLayer: (id: string) => void
  onLayerDoubleClick: (id: string, newText?: string) => void
  onCanvasDragOver: (e: React.DragEvent) => void
  onCanvasDrop: (e: React.DragEvent) => void
  width?: number
  height?: number
  zoomLevel: number
  rotation: number
  pageWidth?: number
  pageHeight?: number
  showFormattingSymbols?: boolean
  onSplitLayer?: (layerId: string, atIndex: number, newText: string) => void
  onMergeLayers?: (targetLayerId: string, sourceLayerId: string) => void
  onOverflow?: (pageIndex: number, overflownContent: string, remainingContent: string) => void
  editingLayerId: string | null
  setEditingLayerId: (id: string | null) => void
  editingText: string
  setEditingText: (text: string) => void
  editingSelectionStart: number | null
  editingSelectionEnd?: number | null
  setEditingSelectionStart: (pos: number | null) => void
  setEditingSelectionEnd?: (pos: number | null) => void
  onUpdateLayer: (id: string, updates: Partial<Layer>) => void
  /** См. LayerItem — после merge обновить contenteditable под фокусом тулбара */
  contentHtmlSyncNonce?: number
}

export default function ZoomableCanvas({
  layers,
  backgroundImage,
  selectedLayerId,
  onSelectLayer,
  onLayerDoubleClick,
  onCanvasDragOver,
  onCanvasDrop,
  width,
  height,
  zoomLevel,
  rotation,
  pageHeight = 297,
  showFormattingSymbols = false,
  editingLayerId,
  setEditingLayerId,
  editingText,
  setEditingText,
  editingSelectionStart,
  editingSelectionEnd,
  setEditingSelectionStart,
  setEditingSelectionEnd,
  onOverflow,
  onUpdateLayer,
  contentHtmlSyncNonce = 0,
}: ZoomableCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const overflowCooldownUntilRef = useRef(0)

  const pageHeightMm = height ?? pageHeight

  useEffect(() => {
    if (!onOverflow) return
    if (rotation !== 0) return

    let isChecking = false

    const checkOverflow = () => {
      if (Date.now() < overflowCooldownUntilRef.current) return
      if (isChecking) return
      isChecking = true

      requestAnimationFrame(() => {
        const pageContainers = canvasRef.current?.querySelectorAll(".document-container")
        pageContainers?.forEach((container, idx) => {
          const editingLayer = layers.find(
            (l) => (l.pageIndex || 0) === idx && l.id === editingLayerId,
          ) as TextLayer | undefined
          if (!editingLayer || !editingLayer.isBackground) return

          const editingLayerEl = container.querySelector(`[data-layer-id="${editingLayerId}"]`) as HTMLElement | null
          if (!editingLayerEl) return

          const richTextContent = editingLayerEl.querySelector(".rich-text-content") as HTMLElement | null
          if (!richTextContent) return

          const containerEl = container as HTMLElement
          const containerRect = containerEl.getBoundingClientRect()
          const cs = getComputedStyle(containerEl)
          const padBottom = Number.parseFloat(cs.paddingBottom) || 0

          const maxContentBottomFromTop = (containerEl.clientHeight - padBottom) / zoomLevel

          const richTextRect = richTextContent.getBoundingClientRect()
          const richTextBottomUnscaled = (richTextRect.bottom - containerRect.top) / zoomLevel

          let isCursorOverflown = false
          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0 && richTextContent.contains(selection.anchorNode)) {
            const range = selection.getRangeAt(0)
            const rects = range.getClientRects()
            if (rects.length > 0) {
              const lastRect = rects[rects.length - 1]
              const cursorBottomUnscaled = (lastRect.bottom - containerRect.top) / zoomLevel
              if (cursorBottomUnscaled > maxContentBottomFromTop) {
                isCursorOverflown = true
              }
            }
          }

          if (richTextBottomUnscaled <= maxContentBottomFromTop && !isCursorOverflown) return

          const blocks = Array.from(richTextContent.children) as HTMLElement[]

          if (blocks.length === 0 && richTextContent.innerText.trim().length > 0) {
            overflowCooldownUntilRef.current = Date.now() + 200
            onOverflow(idx, richTextContent.innerHTML, "")
            isChecking = false
            return
          }

          let overflownHTML = ""
          let remainingHTML = ""
          let splitFound = false

          blocks.forEach((block) => {
            const blockRect = block.getBoundingClientRect()
            const blockBottomRelativeUnscaled = (blockRect.bottom - containerRect.top) / zoomLevel

            if (!splitFound && blockBottomRelativeUnscaled <= maxContentBottomFromTop) {
              remainingHTML += block.outerHTML
            } else {
              splitFound = true
              overflownHTML += block.outerHTML
            }
          })

          if (splitFound && overflownHTML) {
            overflowCooldownUntilRef.current = Date.now() + 200
            onOverflow(idx, overflownHTML, remainingHTML)
          }
        })
        isChecking = false
      })
    }

    const observer = new MutationObserver(checkOverflow)
    if (canvasRef.current) {
      observer.observe(canvasRef.current, { childList: true, subtree: true, characterData: true, attributes: true })
    }

    checkOverflow()

    return () => observer.disconnect()
  }, [onOverflow, editingLayerId, layers, editingText, zoomLevel, rotation, pageHeightMm])

  const layersByPage: Record<number, any[]> = layers.reduce(
    (acc, layer) => {
      const i = layer.pageIndex || 0
      if (!acc[i]) acc[i] = []
      acc[i].push(layer)
      return acc
    },
    {} as Record<number, any[]>,
  )

  const pageIndices = Object.keys(layersByPage).map(Number).sort((a, b) => a - b)
  if (pageIndices.length === 0) pageIndices.push(0)

  const maxPageIndex = Math.max(...pageIndices, 0)
  const allPageIndices = Array.from({ length: maxPageIndex + 1 }, (_, i) => i)

  const pageW = width ?? 210
  const pageH = height ?? 297
  const getLiveLayerText = (id: string): string =>
    editingLayerId === id ? editingText : (layers.find((l) => l.id === id)?.text || "")

  return (
    <div
      className="flex flex-col gap-12 items-center"
      style={{
        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
        transformOrigin: "top center",
        transition: "transform 0.2s ease",
      }}
      onDragOver={onCanvasDragOver}
      onDrop={onCanvasDrop}
      ref={canvasRef}
    >
      {allPageIndices.map((idx) => {
        const pageLayers = layersByPage[idx] || []
        const flowTextLayers = pageLayers.filter((l) => isTextLayer(l) && l.isBackground) as TextLayer[]
        const floatingTextLayers = pageLayers.filter((l) => isTextLayer(l) && !l.isBackground) as TextLayer[]
        const imageLayers = pageLayers.filter((l) => isImageLayer(l)) as ImageLayer[]
        const behindImages = imageLayers.filter((l) => l.textWrapPreset === "behind")
        const frontImages = imageLayers.filter((l) => l.textWrapPreset !== "behind")

        return (
          <div key={idx} className="flex flex-col items-center gap-4">
            <div
              data-certificate-page
              className="relative bg-white flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_16px_rgba(0,0,0,0.1)]"
              style={{
                backgroundImage: backgroundImage && idx === 0 ? `url(${backgroundImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: `${pageW}mm`,
                maxWidth: `${pageW}mm`,
                height: `${pageH}mm`,
                minHeight: `${pageH}mm`,
                maxHeight: `${pageH}mm`,
                backgroundColor: "white",
                overflow: "hidden",
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  const firstBody = pageLayers.find((l) => isTextLayer(l) && l.isBackground) as TextLayer | undefined
                  const firstText = firstBody || (pageLayers.find(isTextLayer) as TextLayer | undefined)
                  if (firstText) {
                    onSelectLayer(firstText.id)
                    setEditingLayerId(firstText.id)
                    setEditingText(getLiveLayerText(firstText.id))
                  }
                }
              }}
            >
              <div
                className="w-full h-full relative z-0 overflow-hidden"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    const firstBody = pageLayers.find((l) => isTextLayer(l) && l.isBackground) as TextLayer | undefined
                    const firstText = firstBody || (pageLayers.find(isTextLayer) as TextLayer | undefined)
                    if (firstText) {
                      onSelectLayer(firstText.id)
                      setEditingLayerId(firstText.id)
                      setEditingText(getLiveLayerText(firstText.id))
                    }
                  }
                }}
              >
                <div className="absolute inset-0 z-[3] pointer-events-none">
                  {behindImages.map((layer) => (
                    <SelectableImageLayer
                      key={layer.id}
                      layer={layer}
                      isSelected={selectedLayerId === layer.id}
                      pageWidthMm={pageW}
                      pageHeightMm={pageH}
                      zoomLevel={zoomLevel}
                      onSelect={() => onSelectLayer(layer.id)}
                      onUpdate={(updates) => onUpdateLayer(layer.id, updates)}
                      onEndTextEdit={() => setEditingLayerId(null)}
                    />
                  ))}
                </div>

                <div
                  className={`flex flex-col gap-0 items-start w-full document-container overflow-hidden absolute inset-0 z-[10] pointer-events-none`}
                  style={{
                    boxSizing: "border-box",
                    height: `${pageH}mm`,
                    maxHeight: `${pageH}mm`,
                    minHeight: `${pageH}mm`,
                    padding: `${MM_PADDING}mm`,
                  }}
                >
                  {flowTextLayers.map((layer) => (
                    <LayerItem
                      key={layer.id}
                      layer={layer}
                      isSelected={selectedLayerId === layer.id}
                      isEditing={editingLayerId === layer.id}
                      showFormattingSymbols={showFormattingSymbols}
                      onDoubleClick={(id, newText) => {
                        if (newText !== undefined) {
                          onLayerDoubleClick(id, newText)
                          setEditingLayerId(null)
                        } else {
                          setEditingLayerId(id)
                          setEditingText(getLiveLayerText(id))
                        }
                      }}
                      layout="flow"
                      editingText={editingText}
                      setEditingText={setEditingText}
                      editingSelectionStart={editingSelectionStart}
                      editingSelectionEnd={editingSelectionEnd}
                      setEditingSelectionStart={setEditingSelectionStart}
                      setEditingSelectionEnd={setEditingSelectionEnd}
                      contentHtmlSyncNonce={contentHtmlSyncNonce}
                    />
                  ))}
                </div>

                <div
                  className="absolute inset-0 z-[20] pointer-events-none"
                  aria-hidden={floatingTextLayers.length === 0 && imageLayers.length === 0}
                >
                  {frontImages.map((layer) => (
                    <SelectableImageLayer
                      key={layer.id}
                      layer={layer}
                      isSelected={selectedLayerId === layer.id}
                      pageWidthMm={pageW}
                      pageHeightMm={pageH}
                      zoomLevel={zoomLevel}
                      onSelect={() => onSelectLayer(layer.id)}
                      onUpdate={(updates) => onUpdateLayer(layer.id, updates)}
                      onEndTextEdit={() => setEditingLayerId(null)}
                    />
                  ))}

                  {floatingTextLayers.map((layer) => (
                    <div key={layer.id} style={textLayerAbsoluteStyle(layer)} className="pointer-events-auto">
                      <LayerItem
                        layer={layer}
                        isSelected={selectedLayerId === layer.id}
                        isEditing={editingLayerId === layer.id}
                        showFormattingSymbols={showFormattingSymbols}
                        onDoubleClick={(id, newText) => {
                          if (newText !== undefined) {
                            onLayerDoubleClick(id, newText)
                            setEditingLayerId(null)
                          } else {
                            setEditingLayerId(id)
                            setEditingText(getLiveLayerText(id))
                          }
                        }}
                        layout="absolute"
                        editingText={editingText}
                        setEditingText={setEditingText}
                        editingSelectionStart={editingSelectionStart}
                        editingSelectionEnd={editingSelectionEnd}
                        setEditingSelectionStart={setEditingSelectionStart}
                        setEditingSelectionEnd={setEditingSelectionEnd}
                        contentHtmlSyncNonce={contentHtmlSyncNonce}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-medium select-none">
              Страница {idx + 1}
            </div>
          </div>
        )
      })}
    </div>
  )
}
