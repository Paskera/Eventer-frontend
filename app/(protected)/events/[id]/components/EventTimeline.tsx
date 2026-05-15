"use client"

import { ClockIcon, CheckCircleIcon, CalendarClock, NetworkIcon } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { formatEventDate } from "./utils"
import { StageFileUpload } from "./StageFileUpload"
import { StageResources } from "./StageResources"

interface EventTimelineProps {
  stages: any[]
  hasTeam?: boolean
}

export const EventTimeline = ({ stages, hasTeam }: EventTimelineProps) => {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  if (!stages || stages.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground bg-muted/20 border border-dashed border-border rounded-md">
        <CalendarClock className="w-12 h-12 mx-auto mb-3 opacity-20" />
        <p className="text-lg">Этапы турнира формируются.</p>
      </div>
    )
  }

  // Determine the current active stage based on dates (rudimentary check)
  const now = new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Таймлайн этапов</h2>
        <Badge variant="outline" className="hidden sm:inline-flex shadow-sm bg-background border-border text-xs uppercase tracking-wider">{stages.length} этапов</Badge>
      </div>

      <div className="relative border-l-[3px] border-green-500/20 ml-4 md:ml-6 space-y-10 pb-6 pt-4">
        {stages.map((stage, index) => {
          const startDate = stage.start_date ? new Date(stage.start_date) : null;
          const endDate = stage.end_date ? new Date(stage.end_date) : null;

          let statusColor = "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400";
          let isActive = false;
          let isPassed = false;

          if (startDate && endDate) {
            if (now >= startDate && now <= endDate) {
              isActive = true;
              statusColor = "border-green-500 bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]";
            } else if (now > endDate) {
              isPassed = true;
              statusColor = "border-green-500 bg-white dark:bg-zinc-950 text-green-500";
            }
          }

          // Fallback if no dates logic or standard stage statuses
          if (stage.stage_status === "active") {
            isActive = true;
            statusColor = "border-green-500 bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]";
          }

          return (
            <div key={stage.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline dot */}
              <div
                className={`absolute -left-[19px] top-1 w-9 h-9 rounded-full border-[3px] flex items-center justify-center font-bold text-[14px] transition-all duration-300 ${statusColor}`}
              >
                {isPassed ? <CheckCircleIcon className="w-5 h-5" /> : index + 1}
              </div>

              {/* Timeline content card */}
              <div
                className={`flex flex-col gap-4 p-5 md:p-6 rounded-lg border transition-all duration-300 ${isActive
                    ? "bg-green-50/50 dark:bg-green-500/5 border-green-200 dark:border-green-500/30 shadow-sm"
                    : "bg-card border-border hover:border-border/80 hover:shadow-sm"
                  }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {stage.stage_name}
                  </h3>

                  {isActive ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-500/30 shadow-none font-semibold">Активно</Badge>
                  ) : isPassed ? (
                    <Badge variant="outline" className="border-border text-muted-foreground shadow-none">Завершено</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground shadow-none">{stage.stage_status}</Badge>
                  )}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border/60 rounded-md text-sm font-medium text-muted-foreground self-start shadow-sm">
                  <ClockIcon className="w-4 h-4 text-orange-500/70" />
                  <span className="text-foreground tracking-tight">{formatEventDate(stage.start_date)} — {formatEventDate(stage.end_date)}</span>
                </div>

                {stage.description && (
                  <p className="text-[15.5px] text-muted-foreground leading-relaxed mt-1">
                    {stage.description}
                  </p>
                )}

                {/* Subcomponents for Requirements & Resources */}
                {((stage.stage_type === "submission" && stage.requirements && stage.requirements.length > 0) ||
                  (stage.resources && Array.isArray(stage.resources) && stage.resources.length > 0) ||
                  (stage.stage_type === "bracket")) && (
                    <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-border/50">
                      {stage.stage_type === "submission" && stage.requirements && stage.requirements.length > 0 && (
                        <StageFileUpload stageId={stage.id} requirements={stage.requirements} hasTeam={hasTeam} />
                      )}
                      {stage.resources && Array.isArray(stage.resources) && stage.resources.length > 0 && (
                        <StageResources stageId={stage.id} resources={stage.resources} />
                      )}
                      {stage.stage_type === "bracket" && (
                        <div className="pt-2">
                          <button
                            onClick={() => router.push(`/events/${eventId}/stages/${stage.id}/bracket`)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-bold shadow-md transition-all w-fit"
                          >
                            <NetworkIcon className="w-4 h-4" />
                            Смотреть турнирную сетку
                          </button>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
