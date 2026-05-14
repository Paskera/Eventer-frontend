"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { apiEvents } from "@/app/api/http/event/events"
import { apiStages } from "@/app/api/http/stages/stages"
import { apiBracket, BracketMatch, BracketRead } from "@/app/api/http/bracket/bracket"
import { NetworkIcon, TrophyIcon, CalendarIcon, ClockIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function StageBracketPage() {
  const params = useParams()
  const eventId = params.id as string
  const stageId = params.stageId as string

  // 1. Fetch Event Details
  const { data: event, isPending: isEventPending } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => apiEvents.getEventDetail(Number(eventId)),
  })

  // 2. Fetch Stage Details
  const { data: stage, isPending: isStagePending } = useQuery({
    queryKey: ["stages", eventId, stageId],
    queryFn: () => apiStages.getStage(Number(eventId), Number(stageId)),
  })

  // 3. Fetch Bracket Data for this specific stage
  const { data: bracket, isPending: isBracketPending } = useQuery<BracketRead>({
    queryKey: ["bracket", eventId, stageId],
    queryFn: () => apiBracket.getBracket(Number(eventId), Number(stageId)),
    enabled: !!stageId,
  })

  const isLoading = isEventPending || isStagePending || isBracketPending

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!bracket || bracket.groups.length === 0) {
    return (
      <div className="h-full w-full relative bg-background overflow-auto animate-in fade-in duration-500 rounded-tl-md">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/30 bg-[length:40px_40px] opacity-40 pointer-events-none"></div>
        <div className="w-full h-full flex items-center justify-center relative z-10">
          <div className="text-center space-y-5 max-w-md p-8 rounded-xl bg-background/40 backdrop-blur-sm border border-border/10">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-500 border border-green-200/50 dark:border-green-500/20 shadow-inner">
              <NetworkIcon className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Сетка формируется</h2>
            <p className="text-[16px] text-muted-foreground leading-relaxed">
              Турнирная сетка появится здесь после завершения этапа регистрации и распределения команд в этапе "{stage?.stage_name || "Турнир"}".
            </p>
            <div className="pt-4">
              <button 
                onClick={async () => {
                  try {
                    await apiBracket.generateBracket(Number(eventId), Number(stageId), {
                      bracket_type: "single_elimination",
                      match_duration_minutes: 30
                    })
                    window.location.reload()
                  } catch (e) {
                    // alert("Ошибка при генерации сетки")
                    alert(e.text, 'd')
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all"
              >
                Сгенерировать сетку
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Assuming we show the first group (Winner Bracket)
  const mainGroup = bracket.groups[0]
  const hasRounds = mainGroup?.rounds && mainGroup.rounds.length > 0

  return (
    <div className="h-full w-full relative bg-background overflow-auto animate-in fade-in duration-500 rounded-tl-md">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/30 bg-[length:40px_40px] opacity-40 pointer-events-none"></div>

      <div className="relative z-10 p-6 md:p-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-500 font-bold tracking-wider uppercase text-xs">
               <TrophyIcon className="w-4 h-4" />
               <span>Турнирная сетка — {stage?.stage_name}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              {mainGroup.name}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Следите за продвижением команд по турнирной лестнице в реальном времени.
            </p>
          </div>

          {!hasRounds && (
             <button 
               onClick={async () => {
                 try {
                   await apiBracket.generateBracket(Number(eventId), Number(stageId), {
                     bracket_type: "single_elimination",
                     match_duration_minutes: 30
                   })
                   window.location.reload()
                 } catch (e) {
                  //  alert("Ошибка при генерации сетки")
                   alert(e)
                 }
               }}
               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all"
             >
               Сгенерировать сетку
             </button>
          )}
        </div>

        {/* Bracket Visualization */}
        {hasRounds ? (
          <div className="flex gap-12 md:gap-20 overflow-x-auto pb-10 min-w-max scrollbar-hide">
            {mainGroup.rounds.map((round) => (
              <div key={round.round_number} className="flex flex-col gap-8 w-[240px] md:w-[280px]">
                <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-20 py-2 border-b border-border/50 mb-4">
                  <Badge variant="outline" className="bg-muted/50 border-border text-foreground font-bold px-3 py-1">
                     Раунд {round.round_number}
                  </Badge>
                </div>

                <div className="flex-1 flex flex-col justify-around gap-12">
                  {round.matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl bg-muted/5">
             <p className="text-muted-foreground italic">В этой группе пока нет матчей. Нажмите кнопку выше, чтобы создать их.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function MatchCard({ match }: { match: BracketMatch }) {
  const isCompleted = match.status === "completed"

  return (
    <Card className={cn(
      "relative group border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-green-500/40 overflow-hidden",
      isCompleted && "bg-muted/30"
    )}>
      <div className="p-3 md:p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-border/50 pb-2">
           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
             Матч #{match.match_number}
           </span>
           {match.scheduled_time && (
             <div className="flex items-center gap-1 text-[10px] font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded border border-green-100 dark:border-green-500/20">
               <ClockIcon className="w-2.5 h-2.5" />
               <span>{new Date(match.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>
           )}
        </div>

        <div className="space-y-2">
          {match.teams.map((team, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center justify-between p-2 rounded-md transition-colors",
                team.id ? "bg-background/80" : "bg-muted/40 border border-dashed border-border/50",
                isCompleted && team.id && "opacity-70"
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  team.id ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-muted-foreground/30"
                )} />
                <span className={cn(
                  "text-sm truncate",
                  team.id ? "font-bold text-foreground" : "text-muted-foreground italic text-xs"
                )}>
                  {team.name || (team.from_match ? `Победитель #${team.from_match}` : 'TBA')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {match.scheduled_time && (
           <div className="pt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
             <CalendarIcon className="w-3 h-3" />
             <span>{new Date(match.scheduled_time).toLocaleDateString()}</span>
           </div>
        )}
      </div>
    </Card>
  )
}
