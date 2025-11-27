"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react"
import { TextLayer, FONTS } from "../data"

interface PropertiesPanelProps {
  selectedLayer: TextLayer | undefined
  onUpdateLayer: (id: string, updates: Partial<TextLayer>) => void
  onDeleteLayer: (id: string) => void
}

export default function PropertiesPanel({
  selectedLayer,
  onUpdateLayer,
  onDeleteLayer,
}: PropertiesPanelProps) {
  if (!selectedLayer) {
    return (
      <div className="w-72 border-l border-border bg-card p-4 overflow-y-auto">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Select a text layer on the canvas to edit properties
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-72 border-l border-border bg-card p-4 overflow-y-auto">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Text Properties
      </h3>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Content</Label>
        <Input
          value={selectedLayer.text}
          onChange={(e) =>
            onUpdateLayer(selectedLayer.id, {
              text: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">
          Font Family
        </Label>
        <Select
          value={selectedLayer.fontFamily}
          onValueChange={(value) =>
            onUpdateLayer(selectedLayer.id, {
              fontFamily: value,
            })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONTS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-medium text-foreground">
            Font Size
          </Label>
          <span className="text-xs text-muted-foreground">
            {selectedLayer.fontSize}px
          </span>
        </div>
        <Slider
          value={[selectedLayer.fontSize]}
          onValueChange={(value: number[]) =>
            onUpdateLayer(selectedLayer.id, {
              fontSize: value[0],
            })
          }
          min={12}
          max={72}
          step={1}
        />
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Color</Label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="color"
            value={selectedLayer.color}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                color: e.target.value,
              })
            }
            className="h-10 w-16 rounded border border-border cursor-pointer"
          />
          <Input
            value={selectedLayer.color}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                color: e.target.value,
              })
            }
            className="flex-1 text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">
          Alignment
        </Label>
        <div className="mt-2 flex gap-2">
          {(
            [
              { value: "left", icon: AlignLeft },
              { value: "center", icon: AlignCenter },
              { value: "right", icon: AlignRight },
            ] as const
          ).map(({ value, icon: Icon }) => (
            <Button
              key={value}
              variant={
                selectedLayer.alignment === value ? "default" : "outline"
              }
              size="sm"
              onClick={() =>
                onUpdateLayer(selectedLayer.id, {
                  alignment: value,
                })
              }
              className="flex-1 gap-1"
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs font-medium text-foreground">
            X Position
          </Label>
          <Input
            type="number"
            value={Math.round(selectedLayer.x)}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                x: Number(e.target.value),
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs font-medium text-foreground">
            Y Position
          </Label>
          <Input
            type="number"
            value={Math.round(selectedLayer.y)}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                y: Number(e.target.value),
              })
            }
            className="mt-1"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Width</Label>
        <Input
          type="number"
          value={selectedLayer.width}
          onChange={(e) =>
            onUpdateLayer(selectedLayer.id, {
              width: Number(e.target.value),
            })
          }
          className="mt-1"
        />
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDeleteLayer(selectedLayer.id)}
        className="w-full gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Delete Layer
      </Button>
    </div>
  )
}