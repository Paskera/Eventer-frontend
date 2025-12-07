"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUp,
  ArrowDown,
  ArrowUpToLine,
  ArrowDownToLine,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyEnd,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd,
} from "lucide-react"

interface LayerManagerProps {
  selectedLayerId: string | null
  onMoveLayer: (direction: "up" | "down" | "top" | "bottom") => void
  onAlignLayer: (alignment: "left" | "center" | "right" | "top" | "middle" | "bottom") => void
}

export default function LayerManager({ selectedLayerId, onMoveLayer, onAlignLayer }: LayerManagerProps) {
  if (!selectedLayerId) return null

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Управление слоями</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Порядок слоев:</p>
          <div className="grid grid-cols-4 gap-1">
            <Button variant="outline" size="sm" onClick={() => onMoveLayer("top")} title="На передний план">
              <ArrowUpToLine className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onMoveLayer("up")} title="Вперед">
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onMoveLayer("down")} title="Назад">
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onMoveLayer("bottom")} title="На задний план">
              <ArrowDownToLine className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Выравнивание:</p>
          <div className="grid grid-cols-3 gap-1">
            <Button variant="outline" size="sm" onClick={() => onAlignLayer("left")} title="По левому краю">
              <AlignHorizontalJustifyStart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAlignLayer("center")} title="По центру горизонтально">
              <AlignHorizontalJustifyCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAlignLayer("right")} title="По правому краю">
              <AlignHorizontalJustifyEnd className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAlignLayer("top")} title="По верхнему краю">
              <AlignVerticalJustifyStart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAlignLayer("middle")} title="По центру вертикально">
              <AlignVerticalJustifyCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAlignLayer("bottom")} title="По нижнему краю">
              <AlignVerticalJustifyEnd className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
