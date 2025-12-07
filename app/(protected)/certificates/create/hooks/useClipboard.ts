"use client"

import { useState, useCallback } from "react"
import type { Layer } from "../data"

export function useClipboard() {
  const [clipboard, setClipboard] = useState<Layer | null>(null)

  const copy = useCallback((layer: Layer) => {
    setClipboard(layer)
  }, [])

  const cut = useCallback((layer: Layer) => {
    setClipboard(layer)
    return true // Signal that the layer should be deleted
  }, [])

  const paste = useCallback(() => {
    if (!clipboard) return null

    // Create a new layer with offset position and new ID
    const newLayer = {
      ...clipboard,
      id: Date.now().toString(),
      x: clipboard.x + 10,
      y: clipboard.y + 10,
    }

    return newLayer
  }, [clipboard])

  const hasClipboard = clipboard !== null

  return { copy, cut, paste, hasClipboard }
}
