"use client"

import type * as React from "react"
import { Tooltip as TooltipPrimitive, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: string
  shortcut?: string
  side?: "top" | "right" | "bottom" | "left"
}

export function Tooltip({ children, content, shortcut, side = "bottom" }: TooltipProps) {
  return (
    <TooltipPrimitive>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={5}>
        <div className="flex items-center gap-2">
          <span>{content}</span>
          {shortcut && (
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              {shortcut}
            </kbd>
          )}
        </div>
      </TooltipContent>
    </TooltipPrimitive>
  )
}
