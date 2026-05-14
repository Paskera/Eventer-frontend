"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { apiEvents } from "@/app/api/http/event/events"
import { apiStages } from "@/app/api/http/stages/stages"
import { apiBracket, BracketMatch, BracketRead } from "@/app/api/http/bracket/bracket"
import { NetworkIcon, TrophyIcon, CalendarIcon, ClockIcon, MoreVerticalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function StageBracketPage() {
  const params = useParams()
  const eventId = params.id as string
  const stageId = params.stageId as string
  const queryClient = useQueryClient()

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
              <GenerateBracketDialog 
                eventId={Number(eventId)} 
                stageId={Number(stageId)} 
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ["bracket", eventId, stageId] })} 
              />
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
             <GenerateBracketDialog 
               eventId={Number(eventId)} 
               stageId={Number(stageId)} 
               onSuccess={() => queryClient.invalidateQueries({ queryKey: ["bracket", eventId, stageId] })} 
             />
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
                    <MatchCard 
                      key={match.id} 
                      match={match} 
                      eventId={Number(eventId)}
                      stageId={Number(stageId)}
                      onSuccess={() => queryClient.invalidateQueries({ queryKey: ["bracket", eventId, stageId] })}
                    />
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

function MatchCard({ match, eventId, stageId, onSuccess }: { match: BracketMatch, eventId: number, stageId: number, onSuccess: () => void }) {
  const isCompleted = match.status === "completed" || match.status === "walkover"

  const handleComplete = async (winnerId: number, type: 'normal' | 'walkover') => {
    try {
      if (type === 'normal') {
        await apiBracket.completeMatch(eventId, stageId, match.id, { winner_team_id: winnerId })
      } else {
        await apiBracket.walkoverMatch(eventId, stageId, match.id, { winner_team_id: winnerId })
      }
      onSuccess()
      toast.success("Матч успешно завершён!")
    } catch (e: any) {
      if (e?.response?.status === 403) {
        toast.error("У вас нет прав. Только судья этого турнира может завершать матчи.")
      } else {
        const detail = e?.response?.data?.detail;
        toast.error(typeof detail === 'string' ? detail : "Ошибка при завершении матча")
      }
    }
  }

  const bothTeamsPresent = match.teams.length === 2 && match.teams.every(t => t.id !== null)

  return (
    <Card className={cn(
      "relative group border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-green-500/40 overflow-visible",
      isCompleted && "bg-muted/30"
    )}>
      <div className="p-3 md:p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-border/50 pb-2">
           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
             Матч #{match.match_number}
           </span>
           <div className="flex items-center gap-2">
             {match.scheduled_time && (
               <div className="flex items-center gap-1 text-[10px] font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded border border-green-100 dark:border-green-500/20">
                 <ClockIcon className="w-2.5 h-2.5" />
                 <span>{new Date(match.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
               </div>
             )}
             {!isCompleted && bothTeamsPresent && (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <button className="text-muted-foreground hover:text-foreground">
                     <MoreVerticalIcon className="w-4 h-4" />
                   </button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                   <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Победитель</div>
                   {match.teams.map((team) => (
                     <DropdownMenuItem key={team.id} onClick={() => handleComplete(team.id!, 'normal')}>
                       {team.name}
                     </DropdownMenuItem>
                   ))}
                   <div className="h-px bg-border my-1" />
                   <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Техническое поражение</div>
                   {match.teams.map((team) => (
                     <DropdownMenuItem key={`wo-${team.id}`} onClick={() => handleComplete(team.id!, 'walkover')} className="text-orange-500">
                       Выиграл {team.name} (T.П.)
                     </DropdownMenuItem>
                   ))}
                 </DropdownMenuContent>
               </DropdownMenu>
             )}
           </div>
        </div>

        <div className="space-y-2">
          {match.teams.map((team, idx) => {
            const isWinner = isCompleted && match.winner_id === team.id
            const isWalkoverLoser = isCompleted && match.completion_type === 'walkover' && team.id && !isWinner
            
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md transition-colors",
                  team.id ? "bg-background/80" : "bg-muted/40 border border-dashed border-border/50",
                  isCompleted && team.id && !isWinner && !isWalkoverLoser && "opacity-50",
                  isWinner && "ring-1 ring-green-500/50 bg-green-500/5",
                  isWalkoverLoser && "ring-1 ring-red-500/50 bg-red-500/5 opacity-80"
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    team.id ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-muted-foreground/30",
                    isWinner && "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]",
                    isWalkoverLoser && "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  )} />
                  <span className={cn(
                    "text-sm truncate",
                    team.id ? "font-bold text-foreground" : "text-muted-foreground italic text-xs",
                    isWinner && "text-yellow-600 dark:text-yellow-500",
                    isWalkoverLoser && "text-red-600 dark:text-red-500 line-through decoration-red-500/50"
                  )}>
                    {team.name || (team.from_match ? `Победитель #${team.from_match}` : 'TBA')}
                  </span>
                </div>
              </div>
            )
          })}
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

function GenerateBracketDialog({ eventId, stageId, onSuccess }: { eventId: number, stageId: number, onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [bracketType, setBracketType] = useState("single_elimination")
  const [matchDuration, setMatchDuration] = useState(30)
  const [pointsWin, setPointsWin] = useState(3)
  const [pointsDraw, setPointsDraw] = useState(1)
  const [pointsLoss, setPointsLoss] = useState(0)

  const handleGenerate = async () => {
    try {
      const data: any = {
        bracket_type: bracketType,
        match_duration_minutes: matchDuration,
      }
      
      if (bracketType === "round_robin") {
        data.points_win = pointsWin
        data.points_draw = pointsDraw
        data.points_loss = pointsLoss
      }

      await apiBracket.generateBracket(eventId, stageId, data)
      toast.success("Сетка успешно сгенерирована!")
      setOpen(false)
      onSuccess()
    } catch (e: any) {
      const detail = e?.response?.data?.detail;
      toast.error(typeof detail === 'string' ? detail : "Ошибка при генерации сетки")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all">
          Сгенерировать сетку
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-extrabold tracking-tight">Настройки генерации сетки</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-[16px] font-bold text-foreground">Тип сетки</Label>
            <Select value={bracketType} onValueChange={setBracketType}>
              <SelectTrigger className="text-[16px] py-6 bg-muted/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single_elimination" className="text-[16px] py-2.5">Single Elimination (На выбывание)</SelectItem>
                <SelectItem value="double_elimination" className="text-[16px] py-2.5">Double Elimination (До 2-х поражений)</SelectItem>
                <SelectItem value="round_robin" className="text-[16px] py-2.5">Round Robin (Круговая)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/50">
            <Label className="text-[16px] font-bold text-foreground">Длительность матча (мин)</Label>
            <Input 
              type="number" 
              value={matchDuration} 
              onChange={(e) => setMatchDuration(Number(e.target.value))} 
              min={1} 
              className="w-24 text-2xl font-bold text-center bg-background py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          
          {bracketType === "round_robin" && (
            <div className="pt-6 border-t border-border/50">
              <Label className="text-[16px] font-bold text-foreground block mb-4">Очки за матч</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 bg-green-500/5 p-3 rounded-lg border border-green-500/20 text-center">
                  <Label className="text-sm font-semibold text-green-700 dark:text-green-500">Победа</Label>
                  <Input type="number" value={pointsWin} onChange={(e) => setPointsWin(Number(e.target.value))} className="text-center font-bold text-2xl bg-background py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <div className="space-y-2 bg-muted/20 p-3 rounded-lg border border-border/50 text-center">
                  <Label className="text-sm font-semibold text-muted-foreground">Ничья</Label>
                  <Input type="number" value={pointsDraw} onChange={(e) => setPointsDraw(Number(e.target.value))} className="text-center font-bold text-2xl bg-background py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <div className="space-y-2 bg-red-500/5 p-3 rounded-lg border border-red-500/20 text-center">
                  <Label className="text-sm font-semibold text-red-700 dark:text-red-500">Поражение</Label>
                  <Input type="number" value={pointsLoss} onChange={(e) => setPointsLoss(Number(e.target.value))} className="text-center font-bold text-2xl bg-background py-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end pt-4 mt-2">
          <Button onClick={handleGenerate} className="bg-green-600 hover:bg-green-700 text-white text-[16px] font-bold px-8 py-6 w-full sm:w-auto">
            Сгенерировать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
