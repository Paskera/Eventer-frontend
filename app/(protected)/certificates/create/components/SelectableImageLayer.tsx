"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import type { ImageLayer, ImageTextWrapPreset } from "../data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

type ResizeHandle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w"

const HANDLE_SIZE = 7
const ROT_OFFSET = 28
const MIN_MM = 5

function getMmPerPx(el: HTMLElement | null, pageWidthMm: number): number {
  if (!el) return pageWidthMm / 600
  const page = el.closest("[data-certificate-page]") as HTMLElement | null
  if (!page) return pageWidthMm / 600
  const w = page.getBoundingClientRect().width
  return w > 0 ? pageWidthMm / w : pageWidthMm / 600
}

function clampToPage(layer: ImageLayer, pw: number, ph: number): Partial<ImageLayer> {
  const h = layer.height ?? MIN_MM
  const w = Math.max(MIN_MM, layer.width)
  const hh = Math.max(MIN_MM, h)
  const x = Math.max(0, Math.min(layer.x, pw - w))
  const y = Math.max(0, Math.min(layer.y, ph - hh))
  return { x, y, width: w, height: hh }
}

const PRESETS: { id: ImageTextWrapPreset; label: string }[] = [
  { id: "inline", label: "В строке с текстом" },
  { id: "square", label: "Квадрат" },
  { id: "tight", label: "Плотное" },
  { id: "topbottom", label: "Сверху и снизу" },
  { id: "behind", label: "За текстом" },
]

function WrapIcon({ preset, active }: { preset: ImageTextWrapPreset; active: boolean }) {
  const line = "bg-slate-700 dark:bg-slate-200"
  const box = "border border-slate-700 dark:border-slate-200 bg-white rounded-[1px]"
  return (
    <span
      className={`inline-flex items-center justify-center w-[22px] h-[14px] ${
        active ? "ring-2 ring-blue-600 rounded-full p-0.5" : ""
      }`}
      aria-hidden
    >
      {preset === "inline" && (
        <span className="flex items-center gap-0.5">
          <span className={`w-2 h-2 shrink-0 ${box}`} />
          <span className={`flex-1 h-0.5 min-w-[6px] ${line}`} />
        </span>
      )}
      {preset === "square" && (
        <span className="flex items-center gap-0.5">
          <span className={`w-2 h-2 shrink-0 ${box}`} />
          <span className="flex flex-col gap-0.5 flex-1 min-w-[6px]">
            <span className={`h-0.5 w-full ${line}`} />
            <span className={`h-0.5 w-full ${line}`} />
          </span>
        </span>
      )}
      {preset === "tight" && (
        <span className="flex items-center gap-0.5">
          <span className={`h-0.5 w-1 ${line}`} />
          <span className={`w-2 h-2 shrink-0 ${box}`} />
          <span className={`h-0.5 w-1 ${line}`} />
        </span>
      )}
      {preset === "topbottom" && (
        <span className="flex flex-col items-center justify-center gap-0.5 w-full h-full">
          <span className={`h-0.5 w-full ${line}`} />
          <span className={`w-2 h-2 shrink-0 ${box}`} />
          <span className={`h-0.5 w-full ${line}`} />
        </span>
      )}
      {preset === "behind" && (
        <span className="relative w-full h-full flex items-center justify-center">
          <span className={`absolute inset-x-0.5 top-1/2 -translate-y-1/2 h-0.5 ${line}`} />
          <span className={`relative w-2 h-2 ${box} z-[1]`} />
        </span>
      )}
    </span>
  )
}

export interface SelectableImageLayerProps {
  layer: ImageLayer
  isSelected: boolean
  pageWidthMm: number
  pageHeightMm: number
  zoomLevel: number
  onSelect: () => void
  onUpdate: (updates: Partial<ImageLayer>) => void
  onEndTextEdit: () => void
}

export function SelectableImageLayer({
  layer,
  isSelected,
  pageWidthMm,
  pageHeightMm,
  zoomLevel,
  onSelect,
  onUpdate,
  onEndTextEdit,
}: SelectableImageLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [toolbarStyle, setToolbarStyle] = useState<React.CSSProperties>({ visibility: "hidden" })

  const preset: ImageTextWrapPreset = layer.textWrapPreset ?? "square"

  const applyResize = useCallback(
    (handle: ResizeHandle, dx: number, dy: number, start: ImageLayer) => {
      let { x, y, width, height } = start
      const h = height ?? MIN_MM

      switch (handle) {
        case "se":
          width = Math.max(MIN_MM, width + dx)
          height = Math.max(MIN_MM, h + dy)
          break
        case "e":
          width = Math.max(MIN_MM, width + dx)
          break
        case "s":
          height = Math.max(MIN_MM, h + dy)
          break
        case "sw":
          x += dx
          width = Math.max(MIN_MM, width - dx)
          height = Math.max(MIN_MM, h + dy)
          break
        case "w":
          x += dx
          width = Math.max(MIN_MM, width - dx)
          break
        case "nw":
          x += dx
          y += dy
          width = Math.max(MIN_MM, width - dx)
          height = Math.max(MIN_MM, h - dy)
          break
        case "n":
          y += dy
          height = Math.max(MIN_MM, h - dy)
          break
        case "ne":
          y += dy
          width = Math.max(MIN_MM, width + dx)
          height = Math.max(MIN_MM, h - dy)
          break
        default:
          break
      }

      const next: ImageLayer = { ...start, x, y, width, height }
      const clamped = clampToPage(next, pageWidthMm, pageHeightMm)
      const ph = pageHeightMm
      const heightPercent = clamped.height != null && ph > 0 ? (clamped.height / ph) * 100 : undefined
      onUpdate({
        ...clamped,
        xPercent: (clamped.x! / pageWidthMm) * 100,
        yPercent: (clamped.y! / pageHeightMm) * 100,
        widthPercent: (clamped.width! / pageWidthMm) * 100,
        heightPercent,
      })
    },
    [onUpdate, pageHeightMm, pageWidthMm],
  )

  useLayoutEffect(() => {
    if (!isSelected || !rootRef.current) {
      setToolbarStyle({ visibility: "hidden" })
      return
    }
    const update = () => {
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setToolbarStyle({
        position: "fixed",
        left: Math.max(8, r.left),
        top: r.bottom + 8,
        zIndex: 60,
        visibility: "visible",
      })
    }
    update()
    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update, true)
      window.removeEventListener("resize", update)
    }
  }, [isSelected, layer.x, layer.y, layer.width, layer.height, layer.rotation, zoomLevel])

  type DragState =
    | { kind: "move"; startClientX: number; startClientY: number; start: ImageLayer }
    | {
        kind: "resize"
        handle: ResizeHandle
        startClientX: number
        startClientY: number
        start: ImageLayer
      }
    | {
        kind: "rotate"
        startRotation: number
        startPointerAngle: number
        cx: number
        cy: number
      }

  const startDrag = useCallback(
    (e: React.PointerEvent, state: DragState) => {
      e.preventDefault()
      e.stopPropagation()
      document.body.style.userSelect = "none"

      const onMove = (ev: PointerEvent) => {
        const mm = getMmPerPx(rootRef.current, pageWidthMm)
        if (state.kind === "move") {
          const dx = (ev.clientX - state.startClientX) * mm
          const dy = (ev.clientY - state.startClientY) * mm
          const next = { ...state.start, x: state.start.x + dx, y: state.start.y + dy }
          const c = clampToPage(next as ImageLayer, pageWidthMm, pageHeightMm)
          const ph = pageHeightMm
          const heightPercent =
            c.height != null && ph > 0 ? (c.height / ph) * 100 : undefined
          onUpdate({
            ...c,
            xPercent: (c.x! / pageWidthMm) * 100,
            yPercent: (c.y! / pageHeightMm) * 100,
            widthPercent: (c.width! / pageWidthMm) * 100,
            heightPercent,
          })
          return
        }
        if (state.kind === "resize") {
          const dx = (ev.clientX - state.startClientX) * mm
          const dy = (ev.clientY - state.startClientY) * mm
          applyResize(state.handle, dx, dy, state.start)
          return
        }
        const ang = (Math.atan2(ev.clientY - state.cy, ev.clientX - state.cx) * 180) / Math.PI
        let nextRot = state.startRotation + (ang - state.startPointerAngle)
        while (nextRot > 180) nextRot -= 360
        while (nextRot < -180) nextRot += 360
        onUpdate({ rotation: nextRot })
      }

      const onUp = () => {
        document.body.style.removeProperty("user-select")
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
        window.removeEventListener("pointercancel", onUp)
      }

      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
      window.addEventListener("pointercancel", onUp)
    },
    [applyResize, onUpdate, pageHeightMm, pageWidthMm],
  )

  const startRotate = (e: React.PointerEvent) => {
    if (!rootRef.current) return
    const r = rootRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const startPointerAngle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI
    startDrag(e, {
      kind: "rotate",
      startRotation: layer.rotation ?? 0,
      startPointerAngle,
      cx,
      cy,
    })
  }

  const handleStyle = (h: ResizeHandle): React.CSSProperties => ({
    position: "absolute",
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    background: "#2563eb",
    border: "1px solid #fff",
    boxSizing: "border-box",
    zIndex: 5,
    pointerEvents: "auto",
    touchAction: "none",
    ...(h === "nw" && { left: -HANDLE_SIZE / 2, top: -HANDLE_SIZE / 2, cursor: "nwse-resize" }),
    ...(h === "n" && { left: "50%", top: -HANDLE_SIZE / 2, transform: "translateX(-50%)", cursor: "ns-resize" }),
    ...(h === "ne" && { right: -HANDLE_SIZE / 2, top: -HANDLE_SIZE / 2, cursor: "nesw-resize" }),
    ...(h === "e" && { right: -HANDLE_SIZE / 2, top: "50%", transform: "translateY(-50%)", cursor: "ew-resize" }),
    ...(h === "se" && { right: -HANDLE_SIZE / 2, bottom: -HANDLE_SIZE / 2, cursor: "nwse-resize" }),
    ...(h === "s" && { left: "50%", bottom: -HANDLE_SIZE / 2, transform: "translateX(-50%)", cursor: "ns-resize" }),
    ...(h === "sw" && { left: -HANDLE_SIZE / 2, bottom: -HANDLE_SIZE / 2, cursor: "nesw-resize" }),
    ...(h === "w" && { left: -HANDLE_SIZE / 2, top: "50%", transform: "translateY(-50%)", cursor: "ew-resize" }),
  })

  return (
    <>
      <div
        ref={rootRef}
        role="button"
        tabIndex={0}
        className={`pointer-events-auto absolute p-0 border-0 bg-transparent overflow-visible ${
          isSelected ? "outline-none" : ""
        }`}
        style={{
          left: `${layer.x}mm`,
          top: `${layer.y}mm`,
          width: `${layer.width}mm`,
          height: layer.height ? `${layer.height}mm` : "auto",
          maxHeight: layer.height ? `${layer.height}mm` : undefined,
          opacity: layer.opacity !== undefined ? layer.opacity : 1,
          transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
          transformOrigin: "center center",
          cursor: isSelected ? "move" : "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
          onEndTextEdit()
        }}
        onPointerDown={(e) => {
          if (e.target !== e.currentTarget && (e.target as HTMLElement).closest("[data-resize-handle]")) return
          if ((e.target as HTMLElement).closest("[data-rotate-handle]")) return
          e.stopPropagation()
          onSelect()
          onEndTextEdit()
          startDrag(e, {
            kind: "move",
            startClientX: e.clientX,
            startClientY: e.clientY,
            start: { ...layer },
          })
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect()
            onEndTextEdit()
          }
        }}
      >
        <div
          className={`relative w-full h-full ${isSelected ? "ring-2 ring-blue-600 ring-offset-0" : ""}`}
          style={{ minHeight: layer.height ? undefined : "1px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layer.src}
            alt=""
            className={
              layer.height
                ? "block h-full w-full select-none pointer-events-none"
                : "block w-full h-auto max-h-[80vh] select-none object-contain pointer-events-none"
            }
            style={{ objectFit: layer.height ? "fill" : undefined }}
            draggable={false}
          />

          {isSelected && (
            <>
              <div
                data-rotate-handle
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto"
                style={{ top: -ROT_OFFSET, touchAction: "none" }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  startRotate(e)
                }}
              >
                <div className="w-px h-3 bg-blue-600" />
                <div
                  className="rounded-full bg-blue-600 border border-white"
                  style={{ width: 10, height: 10, marginTop: -1 }}
                />
              </div>

              {(["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const).map((h) => (
                <div
                  key={h}
                  data-resize-handle
                  style={handleStyle(h)}
                  onPointerDown={(e) => {
                    startDrag(e, {
                      kind: "resize",
                      handle: h,
                      startClientX: e.clientX,
                      startClientY: e.clientY,
                      start: { ...layer },
                    })
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {isSelected && (
        <div
          className="flex items-center gap-0.5 rounded-lg border border-border bg-background px-1 py-1 shadow-md"
          style={toolbarStyle}
          data-image-layer-toolbar
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {PRESETS.map((p) => (
            <Button
              key={p.id}
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              title={p.label}
              aria-label={p.label}
              aria-pressed={preset === p.id}
              onClick={() => onUpdate({ textWrapPreset: p.id })}
            >
              <WrapIcon preset={p.id} active={preset === p.id} />
            </Button>
          ))}
          <div className="w-px h-5 bg-border mx-0.5" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Ещё">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem disabled>Параметры изображения</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  )
}
