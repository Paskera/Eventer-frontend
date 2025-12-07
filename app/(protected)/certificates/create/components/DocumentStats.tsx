"use client"

import { Badge } from "@/components/ui/badge"
import type { Layer } from "../data"
import { isTextLayer } from "../data"

interface DocumentStatsProps {
  layers: Layer[]
}

export default function DocumentStats({ layers }: DocumentStatsProps) {
  const textLayers = layers.filter(isTextLayer)
  const allText = textLayers.map((l) => l.text).join(" ")

  const wordCount = allText.split(/\s+/).filter((word) => word.length > 0).length
  const charCount = allText.length
  const charNoSpaces = allText.replace(/\s/g, "").length

  return (
    <div className="flex gap-2 text-xs items-center flex-wrap">
      <span className="text-muted-foreground whitespace-nowrap">Статистика:</span>
      <Badge variant="secondary" className="font-normal whitespace-nowrap">
        Слов: {wordCount}
      </Badge>
      <Badge variant="secondary" className="font-normal whitespace-nowrap">
        Символов: {charCount}
      </Badge>
      <Badge variant="secondary" className="font-normal whitespace-nowrap">
        Без пробелов: {charNoSpaces}
      </Badge>
      <Badge variant="secondary" className="font-normal whitespace-nowrap">
        Элементов: {layers.length}
      </Badge>
    </div>
  )
}
