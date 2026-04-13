"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { apiEvents } from "@/app/api/http/event/events"
import { NetworkIcon } from "lucide-react"

export default function BracketPage() {
  const params = useParams()
  const eventId = params.id as string

  const { data: event, isPending: isEventPending } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => apiEvents.getEventDetail(Number(eventId)),
  })

  if (isEventPending) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    // h-[calc(100vh-64px)] fix need overflow-auto? yep.
    <div className="h-full w-full relative bg-background overflow-auto animate-in fade-in duration-500 rounded-tl-md">
      {/* Background Canvas Grid */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/30 bg-[length:40px_40px] opacity-40 pointer-events-none"></div>

      {event && (
        <>
          {/* Full Screen Interactive Area */}
          <div className="w-full h-full flex items-center justify-center relative z-10">
            <div className="text-center space-y-5 max-w-md p-8 rounded-xl bg-background/40 backdrop-blur-sm border border-border/10">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-500 border border-green-200/50 dark:border-green-500/20 shadow-inner">
                <NetworkIcon className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Сетка формируется</h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed">
                Турнирная сетка появится здесь после завершения этапа регистрации и распределения команд.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
