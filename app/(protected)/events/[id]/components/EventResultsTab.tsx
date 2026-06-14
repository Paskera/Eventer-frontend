"use client"

import { useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"
import { apiBracket } from "@/app/api/http/bracket/bracket"
import { TrophyIcon, Medal, Award, Loader2, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventResultsTabProps {
  eventId: number;
  stages: any[];
  eventStatus: string;
}

export const EventResultsTab = ({ eventId, stages, eventStatus }: EventResultsTabProps) => {
  const { data: results, isLoading: isResultsLoading } = useQuery({
    queryKey: ["event_results", eventId],
    queryFn: () => apiEvents.getEventResults(eventId),
  })

  // Fetch bracket standings for all bracket stages
  const bracketStages = stages?.filter(s => s.type === "BRACKET") || [];

  // Create an array of queries, but we can just use independent queries or a single component for each bracket

  const isClosed = eventStatus === 'closed' || eventStatus === 'завершен' || eventStatus === 'ARCHIVED';

  if (isResultsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Загрузка результатов...</p>
      </div>
    )
  }

  const leaderboard = results?.score_leaderboard || [];
  const hasScores = leaderboard.length > 0;
  const hasBrackets = bracketStages.length > 0;

  if (!hasScores && !hasBrackets) {
    return (
      <div className="p-10 md:p-16 border border-border bg-gradient-to-b from-muted/30 to-background rounded-md text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm border border-green-200 dark:border-green-500/20">
          <TrophyIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Итоги еще не подведены</h2>
        <p className="text-[17px] text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Результаты будут опубликованы здесь по мере проведения этапов оценки и завершения турниров.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {isClosed ? "Итоговые результаты" : "Промежуточные результаты"}
        </h2>
        <p className="text-muted-foreground">
          {isClosed
            ? "Мероприятие завершено. Окончательные результаты турнира."
            : "Мероприятие еще идет. Текущий рейтинг команд."}
        </p>
      </div>

      {hasScores && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Award className="text-green-600" />
            Рейтинг по баллам
          </h3>
          <Card className="overflow-hidden border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-bold">Место</th>
                    <th className="px-6 py-4 font-bold">Команда</th>
                    <th className="px-6 py-4 font-bold text-right">Общий балл</th>
                    <th className="px-6 py-4 font-bold text-right min-w-[200px]">Баллы по этапам</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const isFirst = entry.rank === 1;
                    const isSecond = entry.rank === 2;
                    const isThird = entry.rank === 3;

                    return (
                      <tr key={entry.team_id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 font-bold text-lg">
                            {isFirst && <Medal className="w-6 h-6 text-yellow-500" />}
                            {isSecond && <Medal className="w-6 h-6 text-slate-400" />}
                            {isThird && <Medal className="w-6 h-6 text-amber-700" />}
                            {!isFirst && !isSecond && !isThird && <span className="text-muted-foreground w-6 text-center">{entry.rank}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-foreground text-base">
                          {entry.team_name}
                        </td>
                        <td className="px-6 py-4 font-bold text-right text-green-600 dark:text-green-400 text-lg">
                          {entry.total_score}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            {entry.stage_scores?.map((ss) => (
                              <Badge key={ss.stage_id} variant="secondary" className="font-medium bg-muted" title={ss.stage_name}>
                                {ss.stage_name}: <span className="ml-1 font-bold">{ss.score}</span>
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {hasBrackets && (
        <div className="space-y-6 pt-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Target className="text-blue-600" />
            Результаты турниров
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {bracketStages.map((stage) => (
              <BracketStandingsCard key={stage.id} eventId={eventId} stage={stage} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BracketStandingsCard({ eventId, stage }: { eventId: number; stage: any }) {
  const { data: standings, isLoading } = useQuery({
    queryKey: ["bracket_standings", stage.id],
    queryFn: () => apiBracket.getStandings(eventId, stage.id),
  })

  if (isLoading) {
    return (
      <Card className="p-6 border-border flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </Card>
    )
  }

  const entries = standings?.entries || [];

  return (
    <Card className="border-border overflow-hidden bg-card flex flex-col">
      <div className="bg-muted/40 p-4 border-b border-border">
        <h4 className="font-bold text-lg text-foreground line-clamp-1">{stage.stage_name}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">Турнирная сетка</p>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground flex-1 flex flex-col items-center justify-center">
          <Target className="w-8 h-8 opacity-20 mb-2" />
          <p>Турнир еще не завершен</p>
        </div>
      ) : (
        <div className="p-0 flex-1">
          <div className="divide-y divide-border">
            {entries.slice(0, 3).map((entry: any, idx: number) => {
              const position = idx + 1;
              const isFirst = position === 1;
              const isSecond = position === 2;
              const isThird = position === 3;
              return (
                <div key={entry.team_id} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center">
                      {isFirst && <Medal className="w-6 h-6 text-yellow-500" />}
                      {isSecond && <Medal className="w-6 h-6 text-slate-400" />}
                      {isThird && <Medal className="w-6 h-6 text-amber-700" />}
                    </div>
                    <span className="font-bold text-foreground">{entry.team_name}</span>
                  </div>
                  {entry.points !== undefined && (
                    <Badge variant="outline" className="font-bold">{entry.points} очков</Badge>
                  )}
                </div>
              )
            })}
          </div>
          {entries.length > 3 && (
            <div className="p-3 text-center border-t border-border bg-muted/20">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                + еще {entries.length - 3} команд
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
