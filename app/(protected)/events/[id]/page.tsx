"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { apiEvents } from "../../../api/http/event/events"
import { Card } from "@/components/ui/card"
import {
  UsersIcon,
  TrophyIcon,
  ClipboardListIcon,
  LandmarkIcon,
  Target,
} from "lucide-react"
import { apiEventTeams } from "@/app/api/http/EventTeams/event_teams"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { apiStages } from "@/app/api/http/stages/stages"
import { apiStageCriteria } from "@/app/api/http/stage-criteria/stage_criteria"
import { EventSidebar } from "./components/EventSidebar"
import { EventHeaderBanner } from "./components/EventHeaderBanner"
import { EventTimeline } from "./components/EventTimeline"
import { EventTeamTab } from "./components/EventTeamTab"

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [team_name, setTeam_name] = useState<string | null>(null)
  const [createTeamName, setCreateTeamName] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [agree, setAgree] = useState<File | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const open = searchParams.get("openModal")
    const team_name = searchParams.get("team_name")
    const token = searchParams.get("token")

    if (open === "true") {
      setIsModalOpen(true)
    }
    if (team_name) {
      setTeam_name(decodeURIComponent(team_name))
    }
    if (token) {
      setToken(decodeURIComponent(token))
    }
  }, [])

  const CreateTeamMutation = useMutation<unknown, Error, { event_id: number; agree: File; name: string }>({
    mutationFn: ({ event_id, agree, name }) => apiEventTeams.createTeam(event_id, agree, name),
    onSuccess: () => {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const JoinTeamMutation = useMutation<unknown, Error, { event_id: number; invite_token: string }>({
    mutationFn: ({ event_id, invite_token }) => apiEventTeams.joinTeam(event_id, invite_token),
    onSuccess: () => {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleClick = () => {
    if (token != null) {
      JoinTeamMutation.mutate({ event_id: Number(eventId), invite_token: token })
    } else {
      if (createTeamName !== "" && agree) {
        CreateTeamMutation.mutate({ event_id: Number(eventId), agree: agree, name: createTeamName })
      }
    }
  }

  function Modal({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
  }) {
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
      if (isOpen && status === "unauthenticated") {
        router.push("/")
      }
    }, [isOpen, status, router])
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>
        <Card className="relative z-10 w-full max-w-lg bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/90 border border-white/15 rounded-md shadow-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Регистрация</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl leading-none transition-colors"
              aria-label="Закрыть"
            >
              &times;
            </button>
          </div>
          <div className="space-y-4">{children}</div>
        </Card>
      </div>
    )
  }

  const { data: team, isPending: isTeamPending } = useQuery({
    queryKey: ["team"],
    queryFn: () => apiEventTeams.getEventTeam(Number(eventId)),
  })

  const { data: event, isPending: isEventPending } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => apiEvents.getEventDetail(Number(eventId)),
  })

  const { data: stages, isPending: isStagePending } = useQuery({
    queryKey: ["stages", eventId],
    queryFn: () => apiStages.getAllStages(Number(eventId)),
  })

  // Загружаем критерии для всех этапов
  const { data: allStageCriteria } = useQuery({
    queryKey: ["allStageCriteria", eventId],
    queryFn: async () => {
      if (!stages || stages.length === 0) return {}
      const criteriaMap: Record<number, any[]> = {}
      for (const stage of stages) {
        try {
          const criteria = await apiStageCriteria.getStageCriteriaByStage(stage.id)
          criteriaMap[stage.id] = criteria
        } catch (error) {
          criteriaMap[stage.id] = []
        }
      }
      return criteriaMap
    },
    enabled: !!stages && stages.length > 0,
  })

  if (stages) {
    console.log("Stages data:", stages)
    stages.forEach((stage: any) => {
      if (stage.resources && stage.resources.length > 0) {
        console.log(`Stage ${stage.id} (${stage.stage_name}) has ${stage.resources.length} resources:`, stage.resources)
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 pb-[160px] max-w-7xl animate-in fade-in duration-500 text-slate-900 dark:text-slate-100">
      {event && (
        <div className="flex flex-col gap-8">

          {/* Header Banner - Full Width */}
          <EventHeaderBanner event={event} />



          {/* Main Layout: 2 Columns */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left Column: Content */}
            <div className="w-full lg:w-2/3 space-y-8">
              <Tabs defaultValue={event?.event_status?.toLowerCase() === 'closed' ? 'results' : 'details'} className="w-full">
                <TabsList className="w-full h-auto flex flex-wrap justify-start gap-2 bg-transparent p-0 mb-8 border-b border-border rounded-none">
                  <TabsTrigger
                    value="details"
                    className="relative pb-3 pt-2 px-4 md:px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground text-[15px] md:text-[16px] font-medium transition-colors"
                  >
                    <LandmarkIcon className="h-4 w-4 mr-2 inline" />
                    Детали
                  </TabsTrigger>
                  <TabsTrigger
                    value="stages"
                    className="relative pb-3 pt-2 px-4 md:px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground text-[15px] md:text-[16px] font-medium transition-colors"
                  >
                    <ClipboardListIcon className="h-4 w-4 mr-2 inline" />
                    Расписание
                  </TabsTrigger>
                  <TabsTrigger
                    value="criteria"
                    className="relative pb-3 pt-2 px-4 md:px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground text-[15px] md:text-[16px] font-medium transition-colors"
                  >
                    <Target className="h-4 w-4 mr-2 inline" />
                    Оценивание
                  </TabsTrigger>
                  <TabsTrigger
                    value="results"
                    className="relative pb-3 pt-2 px-4 md:px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground text-[15px] md:text-[16px] font-medium transition-colors"
                  >
                    <TrophyIcon className="h-4 w-4 mr-2 inline" />
                    Итоги
                  </TabsTrigger>
                  <TabsTrigger
                    value="team"
                    className="relative pb-3 pt-2 px-4 md:px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground text-[15px] md:text-[16px] font-medium transition-colors"
                  >
                    <TrophyIcon className="h-4 w-4 mr-2 inline" />
                    Команда
                  </TabsTrigger>

                </TabsList>

                <TabsContent value="details" className="space-y-8 mt-0 focus-visible:outline-none focus:outline-none">
                  {/* About Section */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                      О мероприятии
                    </h2>
                    <p className="text-[16px] md:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                      {event.description || "Описание отсутствует."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="stages" className="space-y-6 mt-0 focus-visible:outline-none focus:outline-none">
                  <div className="w-full">
                    <EventTimeline stages={stages || event.stages || []} hasTeam={!!team} />
                  </div>
                </TabsContent>

                <TabsContent value="criteria" className="space-y-6 mt-0 focus-visible:outline-none focus:outline-none">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-foreground">Критерии оценивания</h2>
                    {stages && stages.length > 0 ? (
                      stages.map((stage: any) => {
                        const stageCriteria = allStageCriteria?.[stage.id] || []
                        return (
                          <div key={stage.id} className="space-y-5 rounded-md border border-border bg-card overflow-hidden">
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/40 p-5 md:px-6 border-b border-border">
                              <h3 className="text-xl font-bold text-foreground">{stage.stage_name}</h3>
                            </div>
                            <div className="p-5 md:p-6 pt-0">
                              {stageCriteria.length > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2">
                                  {stageCriteria.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((criterion: any) => (
                                    <div key={criterion.id} className="border border-border p-5 rounded-md hover:shadow-sm hover:border-green-500/30 transition-all bg-background">
                                      <div className="flex justify-between items-start gap-4 mb-2">
                                        <h4 className="font-semibold text-[16px] text-foreground leading-tight">{criterion.criteria_name}</h4>
                                        <span className="font-bold text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/20 px-2.5 py-1 rounded-md text-sm shrink-0 whitespace-nowrap">Max: {criterion.max_score}</span>
                                      </div>
                                      {criterion.description && <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">{criterion.description}</p>}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-6 text-muted-foreground bg-muted/20 border border-dashed border-border rounded-md">
                                  <Target className="w-10 h-10 mx-auto mb-2 opacity-30" />
                                  <p className="text-[15px]">Для данного этапа нет критериев</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-muted-foreground text-lg">Этапы и критерии еще не сформированы.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-6 mt-0 focus-visible:outline-none focus:outline-none">
                  <div className="p-10 md:p-16 border border-border bg-gradient-to-b from-muted/30 to-background rounded-md text-center space-y-6 shadow-sm">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm border border-green-200 dark:border-green-500/20">
                      <TrophyIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Итоговые результаты</h2>
                    <p className="text-[17px] text-muted-foreground max-w-lg mx-auto leading-relaxed">
                      Результаты будут опубликованы здесь после проведения финального этапа и проверки жюри. Ожидайте уведомления на платформе!
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6 mt-0 focus-visible:outline-none focus:outline-none">
                  <EventTeamTab team={team} isPending={isTeamPending} onRegisterClick={() => setIsModalOpen(true)} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column: Sidebar Sticky CTA */}
            <EventSidebar event={event} team={team} onRegisterClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      )}

      {/* Auth / Reg Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {showSuccess && (
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "#16A34A",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
              zIndex: 9999,
              fontWeight: 600,
            }}
          >
            ✅ Заявка успешно подана!
          </div>
        )}

        {token == null ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Название команды <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={createTeamName}
                onChange={(e) => setCreateTeamName(e.target.value)}
                placeholder="Введите название команды"
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Согласие <span className="text-red-400">*</span></label>
              <label className="cursor-pointer block w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 border-dashed hover:bg-white/20 transition-all text-slate-300 text-sm font-medium text-center">
                {agree ? `✓ ${agree.name}` : '+ Прикрепить документ'}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setAgree(e.target.files[0])
                    }
                  }}
                />
              </label>
            </div>
            <button
              onClick={handleClick}
              className="w-full py-3.5 mt-2 bg-green-600 hover:bg-green-700 rounded-md font-bold text-white transition-all shadow-md flex justify-center items-center"
            >
              Отправить заявку
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-white/10 border border-white/10 rounded-md p-4 mb-5 text-center">
              <p className="text-white text-[15px] font-medium leading-relaxed">
                Вас пригласили участвовать в ивенте в составе команды<br />
                <span className="text-green-400 font-bold text-lg mt-1 inline-block">{team_name}</span>
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Согласие <span className="text-red-400">*</span></label>
                <label className="cursor-pointer block w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 border-dashed hover:bg-white/20 transition-all text-slate-300 text-sm font-medium text-center">
                  {agree ? `✓ ${agree.name}` : '+ Прикрепить документ'}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setAgree(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
              <button
                onClick={handleClick}
                className="w-full py-3.5 mt-2 bg-green-600 hover:bg-green-700 rounded-md font-bold text-white transition-all shadow-md"
              >
                Присоединиться к команде
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* Mobile Header block inside page flow isn't needed anymore as CTA is sticky! */}
    </div>
  )
}
