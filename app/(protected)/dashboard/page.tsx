'use client'

import { RoleGuard } from "@/components/role-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  MessageCircle,
  Plus,
  Clock
} from "lucide-react"
import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"
import { apiStages } from "@/app/api/http/stages/stages"
import { apiResources } from "@/app/api/http/stages/resources"
import { useSession } from "next-auth/react"
import { StatusBadge, FormatBadge } from "@/app/(protected)/events/[id]/components/Badges"
import { StageModal, ResourceFile } from "@/app/(protected)/events/dashboard/components/StageModal"

type Team = {
  id: string
  name: string
  members: Array<{
    id: string
    name: string
    email: string
    age?: number
    isMinor?: boolean
  }>
  status: 'pending' | 'approved' | 'rejected'
  parentConsents: Array<{
    memberId: string
    status: 'pending' | 'approved' | 'rejected'
    document?: string
  }>
}

type Event = {
  id: number
  event_name: string
  description: string
  start_date: string
  venue: string
  users_count: number
  event_status: string
  format: string
  teams?: Team[]
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [events, setEvents] = useState<Event[]>([])
  const [isStageModalOpen, setIsStageModalOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['organizerEvents'],
    queryFn: async () => {
      const response = await apiEvents.getMyCreatedEvents()
      return response.events
    },
    refetchInterval: 30000, 
  })

  useEffect(() => {
    if (data) {
      setEvents(data)
    }
  }, [data])

  const openStageModal = (eventId: number) => {
    setSelectedEventId(eventId)
    setIsStageModalOpen(true)
  }

  const handleSaveStage = async (stageData: any, resourceFiles?: ResourceFile[]) => {
    if (!selectedEventId) return
    try {
      const created = await apiStages.createStage(selectedEventId, stageData)

      // Загружаем ресурсы-файлы после создания этапа
      if (resourceFiles?.length && created.id) {
        await Promise.all(
          resourceFiles.map(rf => apiResources.uploadResource(created.id, rf))
        )
      }

      queryClient.invalidateQueries({ queryKey: ['organizerEvents'] })
      setIsStageModalOpen(false)
      setSelectedEventId(null)
    } catch (error) {
      console.error('Ошибка при создании этапа:', error)
    }
  }

  if (error) {
    return (
      <RoleGuard>
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-bold">Дашборд организатора</h1>
            </div>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-red-500">Ошибка загрузки данных: {error.message}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </RoleGuard>
    )
  }

  return (
    <RoleGuard>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Дашборд организатора</h1>
              <p className="text-muted-foreground mt-1">
                Управление событиями, командами и участниками
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать событие
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-6">
              {[...Array(3)].map((_, idx) => (
                <Card key={idx} className="p-6 animate-pulse">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="h-10 bg-muted rounded w-full sm:w-32"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {events.length === 0 ? (
                <Card className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Нет событий</h3>
                  <p className="text-muted-foreground mb-4">У вас пока нет событий, в которых вы являетесь организатором</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Создать первое событие
                  </Button>
                </Card>
              ) : (
                events.map(event => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="flex items-center gap-2 flex-wrap">
                                {event.event_name}
                                <Badge variant="outline" className="text-xs">
                                  {event.users_count} участников
                                </Badge>
                                <StatusBadge status={event.event_status} />
                                <FormatBadge format={event.format} />
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {event.description}
                              </p>
                              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(event.start_date).toLocaleDateString('ru-RU')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.venue}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/events/dashboard/${event.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Управление
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openStageModal(event.id)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить этап
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Чат
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Команды на мероприятии
                          </h3>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            Обновлено только что
                          </Badge>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg h-full min-h-[100px] flex flex-col justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="font-medium">Одобрено</span>
                            </div>
                            <p className="text-2xl font-bold mt-2 text-green-500">12</p>
                          </div>
                          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg h-full min-h-[100px] flex flex-col justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                              <span className="font-medium">На рассмотрении</span>
                            </div>
                            <p className="text-2xl font-bold mt-2 text-yellow-500">5</p>
                          </div>
                          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg h-full min-h-[100px] flex flex-col justify-between">
                            <div className="flex items-center gap-2">
                              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                              <span className="font-medium">Отклонено</span>
                            </div>
                            <p className="text-2xl font-bold mt-2 text-red-500">3</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <StageModal
        isOpen={isStageModalOpen}
        onOpenChange={(open) => {
          setIsStageModalOpen(open)
          if (!open) setSelectedEventId(null)
        }}
        onSave={handleSaveStage}
      />
    </RoleGuard>
  )
}