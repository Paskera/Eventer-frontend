"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { apiEvents } from "../../../api/http/event/events"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  CheckIcon,
  TrophyIcon,
  ClipboardListIcon,
  LandmarkIcon,
} from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { apiEventTeams } from "@/app/api/http/EventTeams/event_teams"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { apiStages } from "@/app/api/http/stages/stages"
import { apiStageCriteria } from "@/app/api/http/stage-criteria/stage_criteria"
import { StageFileUpload } from "./components/StageFileUpload"
import { StageResources } from "./components/StageResources"
import { BarChart3, Target } from "lucide-react"

export default function EventDetailsPage() {
  const params = useParams()
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
        <Card className="relative z-10 w-full max-w-lg bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/90 border border-white/15 rounded-2xl shadow-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
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
    queryKey: ["stages"],
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-500 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">
            Активный
          </Badge>
        )
      case "upcoming":
        return (
          <Badge className="bg-cyan-500 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">
            Скоро
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-slate-600 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">
            Завершено
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getFormatBadge = (format: string) => {
    switch (format) {
      case "online":
        return (
          <Badge className="border border-cyan-500 text-cyan-300 bg-cyan-500/10 rounded-full px-4 py-1 text-base font-medium shadow-none">
            Онлайн
          </Badge>
        )
      case "offline":
        return (
          <Badge className="border border-indigo-500 text-indigo-300 bg-indigo-500/10 rounded-full px-4 py-1 text-base font-medium shadow-none">
            Офлайн
          </Badge>
        )
      case "hybrid":
        return (
          <Badge className="border border-amber-500 text-amber-300 bg-amber-500/10 rounded-full px-4 py-1 text-base font-medium shadow-none">
            Гибрид
          </Badge>
        )
      default:
        return (
          <Badge className="bg-slate-700 text-white rounded-full px-4 py-1 text-base font-medium shadow-none">
            {format}
          </Badge>
        )
    }
  }

  function parseEventDate(dateStr: string): Date | null {
    if (!dateStr) return null
    const isoDate = new Date(dateStr)
    if (!isNaN(isoDate.getTime())) return isoDate
    const [datePart, timePart] = dateStr.split(" ")
    if (!datePart || !timePart) return null
    const [day, month, year] = datePart.split(".").map(Number)
    const [hours, minutes, seconds] = timePart.split(":").map(Number)
    const customDate = new Date(year, month - 1, day, hours, minutes, seconds)
    if (!isNaN(customDate.getTime())) return customDate
    return null
  }

  function formatEventDate(dateStr: string) {
    const date = parseEventDate(dateStr)
    if (!date) return ""
    return format(date, "d MMMM yyyy, HH:mm", { locale: ru })
  }

  if (stages) {
    console.log("Stages data:", stages)
    stages.forEach((stage: any) => {
      if (stage.resources && stage.resources.length > 0) {
        console.log(`Stage ${stage.id} (${stage.stage_name}) has ${stage.resources.length} resources:`, stage.resources)
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 pb-[160px] text-slate-900 dark:text-slate-100">
      {event && (
        <div className="space-y-6 md:space-y-8">
          <Card className="overflow-hidden border border-gray-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="relative h-[280px] sm:h-[320px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden">
              <Image 
                src={event.image_url || "/placeholder.svg"} 
                alt={event.event_name || "Изображение мероприятия"} 
                fill 
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  {getStatusBadge(event.event_status)}
                  {getFormatBadge(event.format)}
                </div>
                <div>
                  <CardTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-2">
                    {event.event_name}
                  </CardTitle>
                  {event.description && (
                    <p className="text-sm md:text-base text-white/85 max-w-3xl line-clamp-2">{event.description}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-full min-h-[110px] flex flex-col">
              <CardContent className="p-4 md:p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Старт</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 break-words">{formatEventDate(event.start_date)}</p>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-full min-h-[110px] flex flex-col">
              <CardContent className="p-4 md:p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <ClockIcon className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Формат</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 capitalize">{event.format}</p>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-full min-h-[110px] flex flex-col">
              <CardContent className="p-4 md:p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <UsersIcon className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Участники</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">{event.users_count}</p>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-full min-h-[110px] flex flex-col">
              <CardContent className="p-4 md:p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Локация</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 break-words">{event.venue}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="relative w-full h-auto bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-1 mb-8 flex gap-2 flex-wrap md:flex-nowrap">
              <TabsTrigger
                value="details"
                className="relative px-4 py-2.5 text-sm md:text-base font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50 text-slate-600 dark:text-slate-300 border border-transparent"
              >
                <LandmarkIcon className="h-4 w-4 mr-2 inline" />
                Детали
              </TabsTrigger>
              <TabsTrigger
                value="stages"
                className="relative px-4 py-2.5 text-sm md:text-base font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50 text-slate-600 dark:text-slate-300 border border-transparent"
              >
                <ClipboardListIcon className="h-4 w-4 mr-2 inline" />
                Этапы
              </TabsTrigger>
              <TabsTrigger
                value="criteria"
                className="relative px-4 py-2.5 text-sm md:text-base font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50 text-slate-600 dark:text-slate-300 border border-transparent"
              >
                <BarChart3 className="h-4 w-4 mr-2 inline" />
                Критерии оценивания
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="relative px-4 py-2.5 text-sm md:text-base font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50 text-slate-600 dark:text-slate-300 border border-transparent"
              >
                <TrophyIcon className="h-4 w-4 mr-2 inline" />
                Итоги
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  {/* About Section */}
                  <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <CardTitle className="p-5 md:p-6 pb-3 md:pb-4 flex items-center gap-3 text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-600 dark:text-cyan-200 flex items-center justify-center">
                        <LandmarkIcon className="w-5 h-5" />
                      </div>
                      О мероприятии
                    </CardTitle>
                    <CardContent className="p-5 md:p-6 pt-0">
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>

                  {/* Stages Section */}
                  <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <CardTitle className="p-5 md:p-6 pb-3 md:pb-4 flex items-center gap-3 text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-100 flex items-center justify-center">
                        <ClipboardListIcon className="w-5 h-5" />
                      </div>
                      Этапы мероприятия
                    </CardTitle>
                    <CardContent className="p-5 md:p-6 pt-0 space-y-6">
                      {event.stages && event.stages.length > 0 ? (
                        event.stages.map((stage, index) => (
                          <div key={stage.id} className="flex items-start gap-4">
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              {index < event.stages.length - 1 && <div className="w-0.5 h-20 bg-slate-700 mt-2"></div>}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                                {stage.stage_name}
                                <span className="text-slate-500 dark:text-slate-400 font-normal text-sm ml-2">
                                  {formatEventDate(stage.start_date)} — {formatEventDate(stage.end_date)}
                                </span>
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{stage.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 dark:text-slate-400">Этапы будут добавлены позже</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Goals Section */}
                  <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <CardTitle className="p-5 md:p-6 pb-3 md:pb-4 flex items-center gap-3 text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-700 dark:text-emerald-100 flex items-center justify-center">
                        <TrophyIcon className="w-5 h-5" />
                      </div>
                      Основные цели
                    </CardTitle>
                    <CardContent className="p-5 md:p-6 pt-0 space-y-4">
                      <ul className="list-none space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-300 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">Развитие навыков в области инновационных технологий</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-300 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">Создание командного взаимодействия и сотрудничества</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-300 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">Представление и демонстрация творческих решений</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4 md:space-y-6">
                  <Card className="sticky top-20 border border-gray-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                    <CardTitle className="p-5 md:p-6 pb-3 md:pb-4 text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-700 dark:text-emerald-100 flex items-center justify-center">
                        <UsersIcon className="w-5 h-5" />
                      </div>
                      Регистрация
                    </CardTitle>
                    <CardContent className="p-5 md:p-6 pt-0 space-y-4">
                      {team ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 text-center dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-100">
                          <p className="text-sm font-semibold">Вы уже участник</p>
                          <p className="text-xs mt-1">Команда: {team.team?.name}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 rounded-lg font-semibold text-white transition-all"
                        >
                          Подать заявку
                        </button>
                      )}

                      <button className="w-full py-3 px-4 border border-gray-300 text-slate-800 hover:bg-gray-100 rounded-lg font-semibold transition-all dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">
                        Поделиться событием
                      </button>

                      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        {showSuccess && (
                          <div
                            style={{
                              position: "fixed",
                              top: 20,
                              right: 20,
                              background: "#10b981",
                              color: "white",
                              padding: "12px 20px",
                              borderRadius: "8px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                              zIndex: 9999,
                            }}
                          >
                            ✅ Заявка успешно подана!
                          </div>
                        )}

                        {token == null ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-white mb-2">Название команды *</label>
                              <input
                                type="text"
                                value={createTeamName}
                                onChange={(e) => setCreateTeamName(e.target.value)}
                                placeholder="Введите название команды"
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-white mb-2">Согласие *</label>
                              <input
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files.length > 0) {
                                    setAgree(e.target.files[0])
                                  }
                                }}
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-slate-300 text-sm focus:outline-none focus:border-emerald-500"
                              />
                              {agree && <p className="text-xs text-emerald-400 mt-2">✓ {agree.name}</p>}
                            </div>
                            <button
                              onClick={handleClick}
                              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 rounded-lg font-semibold text-white transition-all"
                            >
                              Подать заявку
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p className="text-white font-semibold mb-4">
                              Вас пригласили участвовать в ивенте в составе команды{" "}
                              <span className="text-emerald-400">{team_name}</span>
                            </p>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-semibold text-white mb-2">Согласие *</label>
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                      setAgree(e.target.files[0])
                                    }
                                  }}
                                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-slate-300 text-sm focus:outline-none focus:border-emerald-500"
                                />
                                {agree && <p className="text-xs text-emerald-400 mt-2">✓ {agree.name}</p>}
                              </div>
                              <button
                                onClick={handleClick}
                                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 rounded-lg font-semibold text-white transition-all"
                              >
                                Присоединиться к команде
                              </button>
                            </div>
                          </div>
                        )}
                      </Modal>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stages" className="space-y-6">
              <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <CardTitle className="p-5 md:p-6 pb-3 md:pb-4 flex items-center gap-3 text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-100 flex items-center justify-center">
                    <ClipboardListIcon className="w-5 h-5" />
                  </div>
                  Детальное расписание
                </CardTitle>
                <CardContent className="p-5 md:p-6 pt-0 space-y-6">
                  {stages && stages.length > 0 ? (
                    stages.map((stage: any) => (
                      <div
                        key={stage.id}
                        className="border-l-4 border-cyan-500/70 pl-6 py-4 bg-gray-50 rounded-r-lg p-4 -ml-4 pl-6 dark:bg-neutral-900 dark:border-cyan-500/60"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{stage.stage_name}</h3>
                          <Badge
                            className={`${stage.stage_status === "active" ? "bg-emerald-500 text-white" : stage.stage_status === "upcoming" ? "bg-cyan-500 text-white" : "bg-slate-600 text-white"}`}
                          >
                            {stage.stage_status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                          <span>
                            {formatEventDate(stage.start_date)} - {formatEventDate(stage.end_date)}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">{stage.description}</p>
                        {stage.stage_type === "submission" && stage.requirements && stage.requirements.length > 0 && (
                          <StageFileUpload stageId={stage.id} requirements={stage.requirements} />
                        )}
                        {(stage as any).resources && Array.isArray((stage as any).resources) && (stage as any).resources.length > 0 && (
                          <StageResources 
                            stageId={stage.id} 
                            resources={(stage as any).resources} 
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">Этапы будут добавлены позже</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="criteria" className="space-y-6">
              {stages && stages.length > 0 ? (
                stages.map((stage: any) => {
                  const stageCriteria = allStageCriteria?.[stage.id] || []
                  return (
                    <Card key={stage.id} className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                      <CardTitle className="p-5 md:p-6 pb-3 md:pb-4 flex items-center gap-3 text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-100 flex items-center justify-center">
                          <Target className="w-5 h-5" />
                        </div>
                        {stage.stage_name}
                        <Badge
                          className={`ml-auto ${stage.stage_status === "active" ? "bg-emerald-500 text-white" : stage.stage_status === "upcoming" ? "bg-cyan-500 text-white" : "bg-slate-600 text-white"}`}
                        >
                          {stage.stage_status}
                        </Badge>
                      </CardTitle>
                      <CardContent className="p-5 md:p-6 pt-0">
                        <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium">Период:</span> {formatEventDate(stage.start_date)} — {formatEventDate(stage.end_date)}
                        </div>
                        {stageCriteria.length > 0 ? (
                          <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {stageCriteria
                                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                                .map((criterion: any) => (
                                  <div
                                    key={criterion.id}
                                    className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4 bg-gray-50 dark:bg-neutral-800/50 hover:shadow-md transition-shadow"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                                        {criterion.criteria_name}
                                      </h4>
                                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                                        {criterion.max_score} балл{criterion.max_score > 1 && criterion.max_score < 5 ? 'а' : criterion.max_score >= 5 ? 'ов' : ''}
                                      </Badge>
                                    </div>
                                    {criterion.description && (
                                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                        {criterion.description}
                                      </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                                      {criterion.weight && criterion.weight !== 1 && (
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                          Вес: {criterion.weight}
                                        </span>
                                      )}
                                      {criterion.order !== undefined && (
                                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                                          Порядок: {criterion.order}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-2 text-sm text-blue-900 dark:text-blue-100">
                                <BarChart3 className="w-4 h-4" />
                                <span className="font-medium">
                                  Всего критериев: {stageCriteria.length} | 
                                  Максимальный балл: {stageCriteria.reduce((sum: number, c: any) => sum + (c.max_score || 0), 0)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Критерии оценивания для этого этапа еще не добавлены</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card className="border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                  <CardContent className="p-8 text-center">
                    <p className="text-slate-500 dark:text-slate-400">Этапы мероприятия еще не созданы</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-emerald-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.25),transparent_40%)] blur-3xl" />
                <div className="relative p-6 md:p-8 space-y-6 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm uppercase tracking-wide text-white/70">Финал</p>
                      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <TrophyIcon className="h-6 w-6 text-white" />
                        </div>
                        Итоговые результаты
                      </h2>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">Live</Badge>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner">
                      <p className="text-xs uppercase tracking-wide text-white/70">Всего участников</p>
                      <p className="text-3xl font-bold mt-2">{event.users_count || 0}</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner">
                      <p className="text-xs uppercase tracking-wide text-white/70">Команд</p>
                      <p className="text-3xl font-bold mt-2">{Math.max(Math.floor((event.users_count || 0) / 5), 1)}</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner">
                      <p className="text-xs uppercase tracking-wide text-white/70">Формат</p>
                      <p className="text-xl font-semibold mt-2 capitalize">{event.format}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-sm text-white/80 text-center">
                      Результаты будут объявлены после завершения мероприятия
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      {/* Mobile fixed block */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-card border-t border-border px-5 py-3 flex flex-col items-center gap-3 md:hidden">
        {/* Mobile navigation or actions can be added here */}
      </div>
    </div>
  )
}
