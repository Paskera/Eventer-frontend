"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlignLeft, AlignCenter, AlignRight, Trash2, X, Italic, Underline, Strikethrough } from "lucide-react";
import { TextLayer, FONTS } from "../data";

interface FloatingPropertiesPanelProps {
  selectedLayer: TextLayer;
  onUpdateLayer: (id: string, updates: Partial<TextLayer>) => void;
  onDeleteLayer: (id: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
}

export default function FloatingPropertiesPanel({
  selectedLayer,
  onUpdateLayer,
  onDeleteLayer,
  onClose,
  position,
  onPositionChange,
}: FloatingPropertiesPanelProps) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Проверяем, что клик был именно на заголовке, а не на кнопке закрытия
    if (headerRef.current && (e.target === headerRef.current || headerRef.current.contains(e.target as Node))) {
      setIsDragging(true);
      const offsetX = e.clientX - position.x;
      const offsetY = e.clientY - position.y;
      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    onPositionChange({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  return (
    <div
      className="fixed z-50 w-72 bg-card border border-border rounded-lg shadow-lg p-4 overflow-y-auto"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={headerRef}
        className="flex justify-between items-center mb-4 cursor-move py-2 px-1 rounded-md hover:bg-accent transition-colors border-b border-border"
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drag-icon text-muted-foreground">
            <circle cx="9" cy="5" r="1"></circle>
            <circle cx="9" cy="12" r="1"></circle>
            <circle cx="9" cy="19" r="1"></circle>
            <circle cx="15" cy="5" r="1"></circle>
            <circle cx="15" cy="12" r="1"></circle>
            <circle cx="15" cy="19" r="1"></circle>
          </svg>
          <h3 className="text-sm font-semibold text-foreground">Свойства текста</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Поле "Содержание" убрано по требованиям */}

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">
          Шрифт
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
        <Label className="text-xs font-medium text-foreground">
          Жирность
        </Label>
        <Select
          value={selectedLayer.fontWeight || "normal"}
          onValueChange={(value) =>
            onUpdateLayer(selectedLayer.id, {
              fontWeight: value,
            })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Обычный</SelectItem>
            <SelectItem value="bold">Жирный</SelectItem>
            <SelectItem value="lighter">Тонкий</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Размер шрифта</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            type="number"
            value={selectedLayer.fontSize}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                fontSize: Number(e.target.value),
              })
            }
            min={12}
            max={72}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Цвет</Label>
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
        <Label className="text-xs font-medium text-foreground">Стиль текста</Label>
        <div className="mt-2 flex gap-2">
          <Button
            variant={selectedLayer.fontStyle === "italic" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              onUpdateLayer(selectedLayer.id, {
                fontStyle: selectedLayer.fontStyle === "italic" ? "normal" : "italic",
              })
            }
            className="p-2"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={selectedLayer.textDecoration?.includes("underline") ? "default" : "outline"}
            size="sm"
            onClick={() =>
              onUpdateLayer(selectedLayer.id, {
                textDecoration: selectedLayer.textDecoration === "underline" ? "none" : "underline",
              })
            }
            className="p-2"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            variant={selectedLayer.textDecoration?.includes("line-through") ? "default" : "outline"}
            size="sm"
            onClick={() =>
              onUpdateLayer(selectedLayer.id, {
                textDecoration: selectedLayer.textDecoration === "line-through" ? "none" : "line-through",
              })
            }
            className="p-2"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Междустрочный интервал</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            type="number"
            value={selectedLayer.lineHeight || 1.2}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                lineHeight: Number(e.target.value),
              })
            }
            min={0.5}
            max={3}
            step={0.1}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Межбуквенный интервал</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            type="number"
            value={selectedLayer.letterSpacing || 0}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                letterSpacing: Number(e.target.value),
              })
            }
            min={-5}
            max={10}
            step={0.1}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">
          Выравнивание
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
            Позиция X
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
            Позиция Y
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
        <Label className="text-xs font-medium text-foreground">Ширина</Label>
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

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Обводка</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            type="number"
            value={selectedLayer.borderWidth || 0}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                borderWidth: Number(e.target.value),
              })
            }
            min={0}
            max={10}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Цвет обводки</Label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="color"
            value={selectedLayer.borderColor || "#000000"}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                borderColor: e.target.value,
              })
            }
            className="h-10 w-16 rounded border border-border cursor-pointer"
          />
          <Input
            value={selectedLayer.borderColor || "#000000"}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                borderColor: e.target.value,
              })
            }
            className="flex-1 text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs font-medium text-foreground">Прозрачность</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            type="number"
            value={selectedLayer.opacity !== undefined ? selectedLayer.opacity : 1}
            onChange={(e) =>
              onUpdateLayer(selectedLayer.id, {
                opacity: Number(e.target.value),
              })
            }
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">0-1</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteLayer(selectedLayer.id)}
          className="flex-1 gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Удалить
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="flex-1"
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
}