"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  UsersRound,
  Calendar,
  CalendarCheck,
  MapPin,
  Clock,
  CheckCircle,
  Eye,
  Download,
  Search,
  Filter,
  Check,
  X,
  Settings,
  Archive,
  Edit,
  MessageCircle,
  Bell,
  BarChart4,
  Plus,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { apiEvents } from "@/app/api/http/event/events";
import { apiEventTeams } from "@/app/api/http/EventTeams/event_teams";
import { apiStages, Stages } from "@/app/api/http/stages/stages";
import { StatusControl } from "@/app/(protected)/events/create/components/StatusControl";
import { StageModal } from "@/app/(protected)/events/dashboard/components/StageModal";
import { NotificationModal } from "@/app/(protected)/events/dashboard/components/NotificationModal";
import { EventSettingsModal } from "@/app/(protected)/events/dashboard/components/EventSettingsModal";
import { ArchiveConfirmationModal } from "@/app/(protected)/events/dashboard/components/ArchiveConfirmationModal";

// Интерфейсы для типизации данных
interface Event {
  id: number;
  event_name: string;
  description: string;
  start_date: string;
  end_date: string;
  format: string;
  venue: string;
  event_status: string;
  image_url: string;
  users_count: number;
  stages: Stages[];
}

interface Team {
  id: number;
  name: string;
  status: string;
  created_at: string;
  members: TeamMember[];
}

interface TeamMember {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  is_event_leader: boolean;
 isMinor: boolean;
  parentalConsent: string;
}

// Компонент для отображения статуса события
const EventStatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "rounded-full px-4 py-1.5 text-sm font-semibold border flex items-center gap-2 bg-white text-slate-800 dark:bg-neutral-900 dark:text-slate-100 border-gray-300 dark:border-neutral-700";

  const dot = (color: string) => <span className={`h-2 w-2 rounded-full ${color}`} />;

  switch (status) {
    case "active":
      return (
        <Badge className={baseClasses}>
          {dot("bg-emerald-500")}
          Активно
        </Badge>
      );
    case "upcoming":
      return (
        <Badge className={baseClasses}>
          {dot("bg-cyan-500")}
          Скоро
        </Badge>
      );
    case "completed":
      return (
        <Badge className={baseClasses}>
          {dot("bg-slate-500")}
          Завершено
        </Badge>
      );
    case "draft":
      return (
        <Badge className={baseClasses}>
          {dot("bg-amber-500")}
          Черновик
        </Badge>
      );
    case "archived":
      return (
        <Badge className={baseClasses}>
          {dot("bg-slate-600")}
          Архив
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

// Компонент для отображения формата события
const EventFormatBadge = ({ format }: { format: string }) => {
  const baseClasses =
    "rounded-full px-4 py-1.5 text-sm font-semibold border bg-white text-slate-800 dark:bg-neutral-900 dark:text-slate-100 border-gray-300 dark:border-neutral-700";

  switch (format) {
    case "online":
      return (
        <Badge className={baseClasses}>
          <span className="h-2 w-2 rounded-full bg-cyan-500" />
          Онлайн
        </Badge>
      );
    case "offline":
      return (
        <Badge className={baseClasses}>
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Офлайн
        </Badge>
      );
    case "hybrid":
      return (
        <Badge className={baseClasses}>
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Гибрид
        </Badge>
      );
    default:
      return (
        <Badge className={baseClasses}>
          <span className="h-2 w-2 rounded-full bg-slate-500" />
          {format}
        </Badge>
      );
  }
};

// Форматирование даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Компонент для детального отображения события
const EventDetailDashboard = () => {
  const { id } = useParams();
  const eventId = Array.isArray(id) ? parseInt(id[0], 10) : id ? parseInt(id, 10) : 0;
  const queryClient = useQueryClient();

  // Запросы к API
  const { data: event, isLoading: eventLoading } = useQuery<any>({
    queryKey: ["event", eventId],
    queryFn: () => apiEvents.getEventDetail(eventId),
  });

 const { data: teams, isLoading: teamsLoading } = useQuery<any>({
    queryKey: ["eventTeams", eventId],
    queryFn: () => apiEventTeams.getEventTeams(eventId),
  });

  const { data: stages, isLoading: stagesLoading } = useQuery<any>({
    queryKey: ["eventStages", eventId],
    queryFn: () => apiStages.getAllStages(eventId),
  });

  // Мутация для обновления статуса мероприятия
  const updateEventStatusMutation = useMutation({
    mutationFn: ({ eventId, status }: { eventId: number; status: string }) => {
      // Здесь должна быть реализация API вызова для обновления статуса
      // return apiEvents.updateEventStatus(eventId, status);
      // Временная реализация для демонстрации
      return Promise.resolve({ id: eventId, event_status: status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    }
  });

  // Состояния для модальных окон и управления
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null);
  const [teamToModify, setTeamToModify] = useState<number | null>(null);
  const [currentEventStatus, setCurrentEventStatus] = useState<string>("");
  // Новые состояния для дополнительных модальных окон
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isEventSettingsModalOpen, setIsEventSettingsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<any>(null);

  useEffect(() => {
    if (event) {
      setCurrentEventStatus(event.event_status);
    }
 }, [event]);

  // Функции для обработки действий с командами
  const handleApproveTeam = async (teamId: number) => {
    setTeamToModify(teamId);
    setApprovalAction("approve");
    setIsApprovalModalOpen(true);
  };

  const handleRejectTeam = async (teamId: number) => {
    setTeamToModify(teamId);
    setApprovalAction("reject");
    setIsApprovalModalOpen(true);
  };

  const handleViewTeamDetails = (team: Team) => {
    setSelectedTeam(team);
    setIsDetailsModalOpen(true);
  };

  const handleToggleTeamModal = (open: boolean) => {
    setIsDetailsModalOpen(open);
    if (!open) {
      setSelectedTeam(null);
    }
  };

  // Функция для подтверждения действия с командой
 const confirmAction = async () => {
    if (teamToModify && approvalAction) {
      try {
        if (approvalAction === "approve") {
          // Логика для одобрения команды
          console.log(`Approving team ${teamToModify}`);
          // Здесь можно добавить вызов API для одобрения команды
        } else if (approvalAction === "reject") {
          // Логика для отклонения команды
          console.log(`Rejecting team ${teamToModify}`);
          // Здесь можно добавить вызов API для отклонения команды
        }
        
        // Обновляем данные
        queryClient.invalidateQueries({ queryKey: ["eventTeams", eventId] });
      } catch (error) {
        console.error("Error updating team status:", error);
      }
      
      // Закрываем модальное окно и сбрасываем состояние
      setIsApprovalModalOpen(false);
      setTeamToModify(null);
      setApprovalAction(null);
    }
  };

  // Обработчик изменения статуса мероприятия
  const handleStatusChange = (status: string) => {
    setCurrentEventStatus(status);
    updateEventStatusMutation.mutate({ eventId, status });
  };

  // Функции для работы с модальными окнами
  const openStageModal = (stage: any = null) => {
    setEditingStage(stage);
    setIsStageModalOpen(true);
  };

  const closeStageModal = () => {
    setIsStageModalOpen(false);
    setEditingStage(null);
  };

  const saveStage = async (stageData: any) => {
    // Заглушка для сохранения этапа - в реальном приложении здесь будет API вызов
    console.log('Saving stage:', stageData);
    // Для демонстрации работы, просто обновим данные на клиенте
    queryClient.invalidateQueries({ queryKey: ["eventStages", eventId] });
    closeStageModal();
  };

  const openNotificationModal = () => {
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  const sendNotification = async (notificationData: any) => {
    // Заглушка для отправки уведомления - в реальном приложении здесь будет API вызов
    console.log('Sending notification:', notificationData);
    // Для демонстрации работы, просто покажем сообщение
    closeNotificationModal();
  };

  const openEventSettingsModal = () => {
    setIsEventSettingsModalOpen(true);
  };

  const closeEventSettingsModal = () => {
    setIsEventSettingsModalOpen(false);
  };

  const saveEventSettings = async (updatedEvent: any) => {
    // Заглушка для сохранения настроек мероприятия - в реальном приложении здесь будет API вызов
    console.log('Saving event settings:', updatedEvent);
    // Для демонстрации работы, просто обновим данные на клиенте
    queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    closeEventSettingsModal();
  };

  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };

  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
  };

  const confirmArchiveEvent = async () => {
    // Заглушка для архивации мероприятия - в реальном приложении здесь будет API вызов
    console.log('Archiving event');
    // Для демонстрации работы, просто обновим данные на клиенте
    queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    closeArchiveModal();
  };

  // Статистика команд
  const teamStats = {
    total: teams?.teams?.length || 0,
    approved: teams?.teams?.filter((team: any) => team.status === "approved").length || 0,
    pending: teams?.teams?.filter((team: any) => team.status === "pending").length || 0,
    rejected: teams?.teams?.filter((team: any) => team.status === "rejected").length || 0,
    totalParticipants: teams?.teams?.reduce((sum: number, team: any) => sum + (team.members?.length || 0), 0) || 0,
  };

  const summaryCards = event
    ? [
      {
        label: "Старт",
        value: formatDate(event.start_date),
        icon: Calendar,
        iconBg: "bg-gray-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-300",
      },
      {
        label: "Финиш",
        value: formatDate(event.end_date),
        icon: CalendarCheck,
        iconBg: "bg-gray-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-300",
      },
      {
        label: "Участники",
        value: event.users_count || 0,
        icon: Users,
        iconBg: "bg-gray-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-300",
      },
      {
        label: "Команды",
        value: teamStats.total,
        icon: UsersRound,
        iconBg: "bg-gray-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-300",
      },
    ]
    : [];

  if (eventLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6 animate-pulse">
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-700" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {event && (
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${event.image_url || "/placeholder.svg"})` }}
              />
              <div className="absolute inset-0 bg-white/90 dark:bg-neutral-900/90" />
              <div className="relative z-10 flex min-h-[320px] flex-col justify-between gap-6 p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <EventStatusBadge status={event.event_status} />
                  <EventFormatBadge format={event.format} />
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-slate-50 md:text-4xl">
                    {event.event_name}
                  </h1>
                  <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {event.description}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                     <div className="rounded-lg bg-slate-100 p-2 text-slate-700 dark:bg-neutral-800 dark:text-slate-100">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Даты</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-50">{formatDate(event.start_date)}</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-50">{formatDate(event.end_date)}</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                     <div className="rounded-lg bg-slate-100 p-2 text-slate-700 dark:bg-neutral-800 dark:text-slate-100">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Локация</p>
                      <p className="font-semibold text-slate-900 line-clamp-2 dark:text-slate-50">{event.venue}</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                     <div className="rounded-lg bg-slate-100 p-2 text-slate-700 dark:bg-neutral-800 dark:text-slate-100">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Формат</p>
                      <p className="font-semibold text-slate-900 capitalize dark:text-slate-50">{event.format}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              <Card className="h-full border-gray-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Settings className="h-5 w-5" />
                  Управление мероприятием
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatusControl
                  currentStatus={currentEventStatus}
                  onStatusChange={handleStatusChange}
                />

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-300 text-slate-800 hover:bg-slate-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                    onClick={openEventSettingsModal}
                  >
                    <Edit className="h-4 w-4" />
                    Настроить событие
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-300 text-slate-800 hover:bg-slate-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                    onClick={() => openStageModal()}
                  >
                    <Plus className="h-4 w-4" />
                    Добавить этап
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-300 text-slate-800 hover:bg-slate-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                    onClick={openNotificationModal}
                  >
                    <Bell className="h-4 w-4" />
                    Уведомления
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={openArchiveModal}
                  >
                    <Archive className="h-4 w-4" />
                    Архивировать
                  </Button>
                </div>

                 <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Текущий статус</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {currentEventStatus || event.event_status}
                      </p>
                    </div>
                     <Badge className="rounded-full border border-gray-200 bg-white px-3 py-1 text-slate-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-100">
                      {event.format}
                    </Badge>
                  </div>
                   <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span>{event.users_count || 0} участников</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersRound className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span>{teamStats.total} команд</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
               <Card
                 key={card.label}
                 className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-full min-h-[100px] flex flex-col"
               >
                <CardContent className="flex items-center gap-3 p-4 flex-1">
                  <div className={`rounded-lg p-2 flex-shrink-0 ${card.iconBg}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{card.label}</p>
                    <p className="text-lg font-semibold leading-tight text-slate-900 dark:text-slate-100 break-words">{card.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Вкладки */}
          <Tabs defaultValue="teams" className="w-full space-y-4">
            <TabsList className="flex w-full flex-wrap justify-start gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-neutral-800 dark:bg-neutral-900">
              <TabsTrigger value="teams" className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50">
                <Users className="h-4 w-4" />
                Команды
              </TabsTrigger>
              <TabsTrigger value="stages" className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50">
                <CheckCircle className="h-4 w-4" />
                Этапы
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50">
                <BarChart4 className="h-4 w-4" />
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50">
                <Bell className="h-4 w-4" />
                Уведомления
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50">
                <Settings className="h-4 w-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teams" className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { label: "Всего", value: teamStats.total },
                  { label: "Одобрено", value: teamStats.approved },
                  { label: "Ожидает", value: teamStats.pending },
                  { label: "Отклонено", value: teamStats.rejected },
                  { label: "Участники", value: teamStats.totalParticipants },
                ].map((stat) => (
                  <Card key={stat.label} className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-full min-h-[90px] flex flex-col">
                    <CardContent className="p-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <CardHeader>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Команды события</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Работайте с заявками и статусами участников</p>
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        <Input
                          placeholder="Поиск по командам"
                          className="w-full border-gray-300 bg-white pl-9 text-slate-900 placeholder:text-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">
                        <Filter className="mr-2 h-4 w-4" />
                        Фильтр
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">
                        <Download className="mr-2 h-4 w-4" />
                        Экспорт
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-slate-600 dark:bg-neutral-900 dark:text-slate-300">
                        <tr>
                          <th className="p-3 text-left font-semibold">Команда</th>
                          <th className="p-3 text-left font-semibold">Капитан</th>
                          <th className="p-3 text-left font-semibold">Участники</th>
                          <th className="p-3 text-left font-semibold">Статус</th>
                          <th className="p-3 text-left font-semibold">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams?.teams?.map((team: any) => (
                           <tr
                             key={team.id}
                             className="border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-900/70"
                           >
                            <td className="p-3 text-sm font-medium text-slate-900 dark:text-slate-100">{team.name}</td>
                            <td className="p-3 text-sm text-slate-700 dark:text-slate-200">
                              {team.members?.find((m: any) => m.is_event_leader)?.firstname || "Не указан"}
                            </td>
                            <td className="p-3 text-sm text-slate-700 dark:text-slate-200">{team.members?.length || 0}</td>
                            <td className="p-3 text-sm">
                              {team.status === "approved" ? (
                                <Badge className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100">
                                  Одобрено
                                </Badge>
                              ) : team.status === "pending" ? (
                                <Badge className="rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1 text-xs text-amber-50">
                                  Ожидает
                                </Badge>
                              ) : (
                                <Badge className="rounded-full border border-red-400/40 bg-red-500/20 px-3 py-1 text-xs text-red-50">
                                  Отклонено
                                </Badge>
                              )}
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-9 w-9 border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                                  onClick={() => handleViewTeamDetails(team)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-9 w-9 border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">
                                  <Download className="h-4 w-4" />
                                </Button>
                                {team.status === "pending" && (
                                  <>
                                    <AlertDialog
                                      open={isApprovalModalOpen && approvalAction === "approve" && teamToModify === team.id}
                                    >
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-9 w-9 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700/60 dark:text-emerald-100 dark:hover:bg-emerald-900/30"
                                          onClick={() => handleApproveTeam(team.id)}
                                        >
                                          <Check className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Вы уверены, что хотите одобрить команду {team.name}?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel onClick={() => setIsApprovalModalOpen(false)}>Отмена</AlertDialogCancel>
                                          <AlertDialogAction onClick={confirmAction}>Одобрить</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog
                                      open={isApprovalModalOpen && approvalAction === "reject" && teamToModify === team.id}
                                    >
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-9 w-9 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700/60 dark:text-red-100 dark:hover:bg-red-900/30"
                                          onClick={() => handleRejectTeam(team.id)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Вы уверены, что хотите отклонить команду {team.name}?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel onClick={() => setIsApprovalModalOpen(false)}>Отмена</AlertDialogCancel>
                                          <AlertDialogAction onClick={confirmAction}>Отклонить</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stages" className="space-y-4">
               <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Этапы события</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800" onClick={() => openStageModal()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Добавить этап
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {stages && stages.length > 0 ? (
                    <div className="space-y-3">
                      {stages.map((stage: any) => (
                         <div
                           key={stage.id}
                           className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
                         >
                           <div className="rounded-lg bg-slate-100 p-2 text-emerald-700 dark:bg-neutral-800 dark:text-emerald-100">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{stage.stage_name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  {formatDate(stage.start_date)} — {formatDate(stage.end_date)}
                                </p>
                              </div>
                              <Badge
                                className={
                                  stage.stage_status === "active"
                                    ? "rounded-full border border-emerald-400/40 bg-emerald-500/20 text-xs text-emerald-100"
                                    : stage.stage_status === "upcoming"
                                      ? "rounded-full border border-cyan-400/40 bg-cyan-500/20 text-xs text-cyan-100"
                                      : "rounded-full border border-slate-400/40 bg-slate-600/40 text-xs text-white"
                                }
                              >
                                {stage.stage_status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-200">{stage.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                             className="h-9 w-9 border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                            onClick={() => openStageModal(stage)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-neutral-700 dark:bg-neutral-900">
                       <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Этапы будут добавлены позже</p>
                       <Button variant="outline" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800" onClick={() => openStageModal()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Создать первый этап
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Статистика участников</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700/50 dark:bg-emerald-900/30">
                        <p className="text-sm text-emerald-700 dark:text-emerald-100">Зарегистрировано</p>
                        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{event.users_count || 0}</p>
                      </div>
                      <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-700/50 dark:bg-cyan-900/30">
                        <p className="text-sm text-cyan-700 dark:text-cyan-100">Команд</p>
                        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{teamStats.total}</p>
                      </div>
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700/50 dark:bg-amber-900/30">
                        <p className="text-sm text-amber-700 dark:text-amber-100">Одобрено</p>
                        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{teamStats.approved}</p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                        <p className="text-sm text-slate-700 dark:text-slate-200">Ожидает</p>
                        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{teamStats.pending}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900">
                      <p className="text-sm text-slate-600 dark:text-slate-300">График участников по дням (макет)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Сводка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Статус мероприятия</span>
                        <EventStatusBadge status={event.event_status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Формат</span>
                        <EventFormatBadge format={event.format} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Место проведения</span>
                        <span className="text-slate-900 dark:text-slate-100">{event.venue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Дата начала</span>
                        <span className="text-slate-900 dark:text-slate-100">{formatDate(event.start_date)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Дата окончания</span>
                        <span className="text-slate-900 dark:text-slate-100">{formatDate(event.end_date)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Управление уведомлениями</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Новые заявки</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Отправить уведомление при поступлении новых заявок</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">Настроить</Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Одобрение команд</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Отправить уведомление при одобрении команды</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">Настроить</Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Начало этапа</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Отправить уведомление о начале следующего этапа</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800">Настроить</Button>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full" onClick={openNotificationModal}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Отправить массовое уведомление
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Настройки мероприятия</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Регистрация</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Управление регистрацией участников</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800" onClick={openEventSettingsModal}>Настроить</Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Этапы</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Управление этапами мероприятия</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800" onClick={() => openStageModal()}>Настроить</Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Правила</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Управление правилами мероприятия</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800" onClick={openEventSettingsModal}>Настроить</Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Награды</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Управление наградами и призами</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800" onClick={openEventSettingsModal}>Настроить</Button>
                    </div>

                    <div className="pt-4">
                      <Button variant="destructive" className="w-full" onClick={openArchiveModal}>
                        <Archive className="mr-2 h-4 w-4" />
                        Архивировать мероприятие
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {/* Модальное окно для просмотра деталей команды */}
      {selectedTeam && (
        <TeamDetailsModal
          team={selectedTeam}
          open={isDetailsModalOpen}
          onOpenChange={handleToggleTeamModal}
        />
      )}
      
      {/* Модальное окно для управления этапами */}
      <StageModal
        isOpen={isStageModalOpen}
        onOpenChange={setIsStageModalOpen}
        stageId={editingStage?.id}
        onSave={saveStage}
        stageData={editingStage}
      />
      
      {/* Модальное окно для отправки уведомлений */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onOpenChange={setIsNotificationModalOpen}
        onSave={sendNotification}
      />
      
      {/* Модальное окно для настройки параметров мероприятия */}
      <EventSettingsModal
        isOpen={isEventSettingsModalOpen}
        onOpenChange={setIsEventSettingsModalOpen}
        event={event}
        onSave={saveEventSettings}
      />
      
      {/* Модальное окно подтверждения архивации мероприятия */}
      <ArchiveConfirmationModal
        isOpen={isArchiveModalOpen}
        onOpenChange={setIsArchiveModalOpen}
        onConfirm={confirmArchiveEvent}
        eventName={event?.event_name || ""}
      />
    </div>
  );
};

// Модалка деталей команды: участники + родительские соглашения
const TeamDetailsModal = ({
  team,
  open,
  onOpenChange,
}: {
  team: Team;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const minorMembers = team.members?.filter((member) => member.isMinor) || [];
  const captain = team.members?.find((member) => member.is_event_leader);

  const statusBadge = (status: string) => {
    const map: Record<string, { text: string; className: string }> = {
      approved: { text: "Одобрена", className: "border border-emerald-400/40 bg-emerald-500/20 text-emerald-900 dark:text-emerald-100" },
      pending: { text: "На рассмотрении", className: "border border-amber-400/40 bg-amber-500/20 text-amber-900 dark:text-amber-100" },
      rejected: { text: "Отклонена", className: "border border-red-400/40 bg-red-500/20 text-red-900 dark:text-red-100" },
    };
    const { text, className } = map[status] || { text: status, className: "border border-slate-300 bg-slate-200 text-slate-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-100" };
    return (
      <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
        {text}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60vw] sm:max-w-[1100px] lg:max-w-[1200px] max-h-[82vh] overflow-y-auto overflow-x-hidden bg-white text-slate-900 dark:bg-neutral-950 dark:text-slate-100">
        <DialogHeader className="gap-2 pb-1">
          <DialogTitle className="text-xl font-semibold">Детали команды {team.name}</DialogTitle>
          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">Состав, статусы и соглашения</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4 border-b border-gray-200 pb-2 text-slate-600 dark:border-neutral-800 dark:text-slate-300">
                    <span>Статус</span>
                    {statusBadge(team.status)}
                  </div>
                  <div className="flex justify-between gap-4 border-b border-gray-200 pb-2 text-slate-600 dark:border-neutral-800 dark:text-slate-300">
                    <span>Участников</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{team.members?.length ?? 0}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-slate-600 dark:text-slate-300">
                    <span>Создана</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {team.created_at ? new Date(team.created_at).toLocaleDateString("ru-RU") : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Капитан команды</h3>
              {captain ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4 border-b border-gray-200 pb-2 text-slate-600 dark:border-neutral-800 dark:text-slate-300">
                    <span>Имя</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{captain.firstname}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-slate-600 dark:text-slate-300">
                    <span>Фамилия</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{captain.lastname}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">Капитан не назначен</p>
              )}
            </div>
          </div>

          <Tabs defaultValue="members" className="space-y-4">
            <TabsList className="flex w-full flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-neutral-800 dark:bg-neutral-900">
              <TabsTrigger
                value="members"
                className="rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50"
              >
                Участники
              </TabsTrigger>
              <TabsTrigger
                value="agreements"
                className="rounded-lg px-4 py-2 text-slate-700 data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-slate-50"
              >
                Родительские соглашения
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-3">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-gray-50 text-slate-600 dark:bg-neutral-900 dark:text-slate-300">
                    <tr>
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Имя</th>
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Фамилия</th>
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Email</th>
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Телефон</th>
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Капитан</th>
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Несовершеннолетний</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                    {team.members?.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/70">
                        <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.firstname}</td>
                        <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.lastname}</td>
                        <td className="p-2.5 text-slate-700 dark:text-slate-200 whitespace-normal break-words">{member.email}</td>
                        <td className="p-2.5 text-slate-700 dark:text-slate-200 whitespace-normal break-words">{member.phone}</td>
                        <td className="p-2.5">
                          {member.is_event_leader ? (
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">Да</span>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-2.5">
                          {member.isMinor ? (
                            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100">Да</span>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="agreements" className="space-y-3">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                {minorMembers.length > 0 ? (
                  <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-50 text-slate-600 dark:bg-neutral-900 dark:text-slate-300">
                      <tr>
                        <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Имя</th>
                        <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Фамилия</th>
                        <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Статус соглашения</th>
                        <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                      {minorMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/70">
                          <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.firstname}</td>
                          <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.lastname}</td>
                          <td className="p-2.5">
                            {member.parentalConsent === "approved" ? (
                              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">Одобрено</span>
                            ) : member.parentalConsent === "rejected" ? (
                              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800 dark:bg-red-900/40 dark:text-red-100">Отклонено</span>
                            ) : (
                              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100">Ожидает</span>
                            )}
                          </td>
                          <td className="p-2.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Скачать
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <p className="text-sm text-slate-700 dark:text-slate-300">Нет несовершеннолетних участников</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Добавьте участников, чтобы увидеть соглашения</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDashboard;