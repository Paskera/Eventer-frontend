"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  ChevronDown,
  ChevronUp,
  Ban,
  ArrowLeft,
  ArrowRight,
  FileText,
  Star,
  Trash2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { apiEvents } from "@/app/api/http/event/events";
import { apiEventTeams, Team, TeamMember } from "@/app/api/http/EventTeams/event_teams";
import { apiStages, Stages } from "@/app/api/http/stages/stages";
import { apiResources } from "@/app/api/http/stages/resources";
import { StatusControl } from "@/app/(protected)/events/create/components/StatusControl";
import { StageModal, ResourceFile } from "@/app/(protected)/events/dashboard/components/StageModal";
import { NotificationModal } from "@/app/(protected)/events/dashboard/components/NotificationModal";
import { EventSettingsModal } from "@/app/(protected)/events/dashboard/components/EventSettingsModal";
import { ArchiveConfirmationModal } from "@/app/(protected)/events/dashboard/components/ArchiveConfirmationModal";
import { StageCriteriaModal } from "@/app/(protected)/events/dashboard/components/StageCriteriaModal";
import { TeamScoresModal } from "@/app/(protected)/events/dashboard/components/TeamScoresModal";
import { EventAnalytics } from "@/app/(protected)/events/dashboard/components/EventAnalytics";
import { toast } from "sonner";
import { restAxios } from "@/app/api/http/api";

// Тип для перехода
interface StageTransition {
  id: number;
  team_id: number;
  from_stage_id: number;
  to_stage_id: number;
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
  const router = useRouter();

  const handleDeleteEvent = async () => {
    try {
      await apiEvents.deleteEvent(eventId);
      toast.success("Мероприятие удалено");
      router.push("/events/dashboard");
    } catch (error) {
      toast.error("Ошибка при удалении мероприятия");
      console.error(error);
    }
  };

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
      return apiEvents.updateEvent(eventId, { event_status: status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    }
  });

  // Состояния для модальных окон и управления
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approved" | "rejected" | null>(null);
  const [teamToModify, setTeamToModify] = useState<number | null>(null);
  const [currentEventStatus, setCurrentEventStatus] = useState<string>("");
  // Новые состояния для дополнительных модальных окон
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isEventSettingsModalOpen, setIsEventSettingsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isStageCriteriaModalOpen, setIsStageCriteriaModalOpen] = useState(false);
  const [selectedStageForCriteria, setSelectedStageForCriteria] = useState<any>(null);
  const [editingStage, setEditingStage] = useState<any>(null);

  // Состояния для модального окна баллов
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedScoreTeamId, setSelectedScoreTeamId] = useState<number | null>(null);
  const [selectedScoreStageId, setSelectedScoreStageId] = useState<number | null>(null);
  const [selectedScoreTeamName, setSelectedScoreTeamName] = useState<string>("");
  const [selectedScoreStageName, setSelectedScoreStageName] = useState<string>("");

  useEffect(() => {
    if (event) {
      setCurrentEventStatus(event.event_status);
    }
  }, [event]);

  // Функции для обработки действий с командами
  const handleApproveTeam = async (teamId: number) => {
    setTeamToModify(teamId);
    setApprovalAction("approved");
    setIsApprovalModalOpen(true);
  };

  const handleRejectTeam = async (teamId: number) => {
    setTeamToModify(teamId);
    setApprovalAction("rejected");
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
        await apiEventTeams.updateTeamStatus(eventId, teamToModify, approvalAction);
        // Обновляем данные
        queryClient.invalidateQueries({ queryKey: ["eventTeams", eventId] });
        // Закрываем модальное окно и сбрасываем состояние
        setIsApprovalModalOpen(false);
        setTeamToModify(null);
        setApprovalAction(null);
      } catch (error) {
        console.error("Error updating team status:", error);
      }
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

  const saveStage = async (stageData: any, resourceFiles?: ResourceFile[]) => {
    try {
      let stageId: number;
      if (editingStage?.id) {
        const updated = await apiStages.updateStage(eventId, editingStage.id, stageData);
        stageId = updated.id;
        toast.success("Этап успешно обновлен");
      } else {
        const created = await apiStages.createStage(eventId, stageData);
        stageId = created.id;
        toast.success("Этап успешно создан");
      }

      // Upload resource files
      if (resourceFiles?.length && stageId) {
        try {
          await Promise.all(
            resourceFiles.map(rf => apiResources.uploadResource(stageId, rf))
          );
          toast.success(`Загружено ресурсов: ${resourceFiles.length}`);
        } catch (resourceError) {
          console.error('Error uploading resources:', resourceError);
          toast.error("Ошибка при загрузке ресурсов", {
            description: "Этап сохранен, но некоторые файлы не удалось загрузить."
          });
        }
      }

      queryClient.invalidateQueries({ queryKey: ["eventStages", eventId] });
      closeStageModal();
    } catch (error: any) {
      console.error('Error saving stage:', error);
      const detail = error?.response?.data?.detail;
      toast.error("Ошибка при сохранении этапа", {
        description: typeof detail === 'string' ? detail : "Не удалось сохранить изменения."
      });
    }
  };

  const handleDeleteResource = async (resourceId: number) => {
    if (!editingStage?.id) return;
    try {
      await apiResources.deleteResource(editingStage.id, resourceId);
      toast.success("Ресурс удален");
      // Обновляем локальное состояние, чтобы ресурс исчез из модального окна мгновенно
      setEditingStage((prev: any) => ({
        ...prev,
        resources: prev.resources?.filter((r: any) => r.id !== resourceId) || []
      }));
      // Инвалидируем кэш для обновления данных в фоне
      queryClient.invalidateQueries({ queryKey: ["eventStages", eventId] });
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error("Не удалось удалить ресурс");
    }
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

  const saveEventSettings = async (updatedEvent: any, newImage?: File | null) => {
    try {
      await apiEvents.updateEvent(eventId, updatedEvent);
      if (newImage) {
        await apiEvents.uploadEventImage(eventId, newImage);
      }
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      closeEventSettingsModal();
    } catch (error) {
      console.error('Error saving event settings:', error);
    }
  };

  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };

  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
  };

  const confirmArchiveEvent = async () => {
    try {
      await apiEvents.updateEvent(eventId, { event_status: 'archived' });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      closeArchiveModal();
    } catch (error) {
      console.error('Error archiving event:', error);
    }
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

  // DEV
  // Состояние для раскрытого этапа
  const [expandedStageId, setExpandedStageId] = useState<number | null>(null);

  // Обработчики-заглушки
  // const handleMovePrev = (teamId: number, stageId: number) => alert(`Вернуть команду ${teamId} на предыдущий этап (stage ${stageId})`);
  // const handleMoveNext = (teamId: number, stageId: number) => alert(`Перевести команду ${teamId} на следующий этап (stage ${stageId})`);
  // const handleDisqualify = (teamId: number, stageId: number) => alert(`Исключить команду ${teamId} из этапа ${stageId}`);
  // const handleViewFile = (teamId: number, stageId: number) => alert(`Показать файл ответов команды ${teamId} (этап ${stageId})`);
  // const handleViewScore = (teamId: number, stageId: number) => alert(`Показать баллы команды ${teamId} (этап ${stageId})`);

  const [teamCurrentStageMap, setTeamCurrentStageMap] = useState<Record<number, number>>({});
  const [loadingTeamStage, setLoadingTeamStage] = useState<Record<number, boolean>>({});
  const [transitioningTeam, setTransitioningTeam] = useState<Record<number, boolean>>({});

  // Функция для получения отсортированного списка этапов по дате начала
  const getSortedStages = () => {
    if (!stages) return [];
    return [...stages].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  };

  // Получение текущего этапа команды (через API переходов)
  const fetchTeamCurrentStage = async (teamId: number): Promise<number | null> => {
    try {
      const response = await restAxios.get<StageTransition[]>(`/api/teams/${teamId}/stage-transitions/`);
      const transitions = response.data;
      if (transitions.length === 0) {
        // Нет переходов — команда на первом этапе (по порядку)
        const sortedStages = getSortedStages();
        return sortedStages.length > 0 ? sortedStages[0].id : null;
      }
      // Последний переход по id (или можно по дате, но id монотонен)
      const lastTransition = transitions.reduce((prev, curr) => (curr.id > prev.id ? curr : prev));
      return lastTransition.to_stage_id;
    } catch (error) {
      console.error(`Ошибка получения переходов для команды ${teamId}:`, error);
      return null;
    }
  };

  // Загрузка текущих этапов для всех команд (при раскрытии этапа)
  const loadAllTeamsCurrentStage = async () => {
    if (!teams?.teams) return;
    const newMap: Record<number, number> = {};
    const loadingState: Record<number, boolean> = {};
    for (const team of teams.teams) {
      loadingState[team.id] = true;
    }
    setLoadingTeamStage(loadingState);

    for (const team of teams.teams) {
      const stageId = await fetchTeamCurrentStage(team.id);
      if (stageId !== null) {
        newMap[team.id] = stageId;
      }
      setLoadingTeamStage(prev => ({ ...prev, [team.id]: false }));
    }
    setTeamCurrentStageMap(newMap);
  };

  // Сбрасываем загрузку при закрытии всех этапов
  useEffect(() => {
    if (expandedStageId === null) {
      // По желанию можно очищать, но не обязательно
    }
  }, [expandedStageId]);

  // При раскрытии этапа загружаем текущие этапы, если ещё не загружены
  useEffect(() => {
    if (expandedStageId !== null && teams?.teams && Object.keys(teamCurrentStageMap).length === 0) {
      loadAllTeamsCurrentStage();
    }
  }, [expandedStageId, teams]);

  // Создание перехода
  const createTransition = async (teamId: number, fromStageId: number, toStageId: number) => {
    setTransitioningTeam(prev => ({ ...prev, [teamId]: true }));
    try {
      await restAxios.post(`/api/teams/${teamId}/stage-transitions/`, {
        from_stage_id: fromStageId,
        to_stage_id: toStageId,
      });
      // Обновляем текущий этап команды
      setTeamCurrentStageMap(prev => ({ ...prev, [teamId]: toStageId }));
      // Можно также инвалидировать другие кеши, если нужно
    } catch (error) {
      console.error('Ошибка создания перехода:', error);
      alert('Не удалось перевести команду. Проверьте соединение или попробуйте позже.');
    } finally {
      setTransitioningTeam(prev => ({ ...prev, [teamId]: false }));
    }
  };

  // Обработчики переходов
  const handleMovePrev = async (teamId: number, currentStageId: number) => {
    const sortedStages = getSortedStages();
    const currentIndex = sortedStages.findIndex(s => s.id === currentStageId);
    if (currentIndex <= 0) {
      alert('Это первый этап, нельзя вернуться назад');
      return;
    }
    const prevStage = sortedStages[currentIndex - 1];
    await createTransition(teamId, currentStageId, prevStage.id);
  };

  const handleMoveNext = async (teamId: number, currentStageId: number) => {
    const sortedStages = getSortedStages();
    const currentIndex = sortedStages.findIndex(s => s.id === currentStageId);
    if (currentIndex === -1 || currentIndex === sortedStages.length - 1) {
      alert('Это последний этап, нельзя перейти дальше');
      return;
    }
    const nextStage = sortedStages[currentIndex + 1];
    await createTransition(teamId, currentStageId, nextStage.id);
  };

  // Заглушки для остальных кнопок (оставляем как есть или показываем уведомление)
  const handleDisqualify = (teamId: number, stageId: number) => {
    alert(`Исключить команду ${teamId} из этапа ${stageId}`);
  };
  const handleViewFile = (teamId: number, stageId: number) => {
    alert(`Показать файл ответов команды ${teamId} (этап ${stageId})`);
  };
  const handleViewScore = (teamId: number, stageId: number) => {
    const team = teams?.teams?.find((t: any) => t.id === teamId);
    const stage = stages?.find((s: any) => s.id === stageId);
    setSelectedScoreTeamId(teamId);
    setSelectedScoreStageId(stageId);
    setSelectedScoreTeamName(team?.name || "");
    setSelectedScoreStageName(stage?.stage_name || "");
    setIsScoreModalOpen(true);
  };

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
                      <div className="mt-1">
                        <EventFormatBadge format={event.format} />
                      </div>
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
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Текущий статус</p>
                      <EventStatusBadge status={currentEventStatus || event.event_status} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 text-right">Формат</p>
                      <EventFormatBadge format={event.format} />
                    </div>
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
                          <th className="p-3 text-right font-semibold">Действия</th>
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
                              {(() => {
                                const leader = team.members?.find((m: any) => m.role === "LEADER");
                                return leader ? `${leader.firstname} ${leader.lastname}` : "Не указан";
                              })()}
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
                              <div className="flex items-center justify-end gap-2">
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
                                      open={isApprovalModalOpen && approvalAction === "approved" && teamToModify === team.id}
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
                                      open={isApprovalModalOpen && approvalAction === "rejected" && teamToModify === team.id}
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
                    <Button variant="outline" size="sm" onClick={() => openStageModal()}>
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
                          className="rounded-xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                        >
                          {/* Кликабельный заголовок этапа */}
                          <div
                            className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50"
                            onClick={() => setExpandedStageId(expandedStageId === stage.id ? null : stage.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="rounded-lg bg-slate-100 p-2 text-emerald-700 dark:bg-neutral-800 dark:text-emerald-100">
                                <CheckCircle className="h-5 w-5" />
                              </div>
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
                            <div className="flex items-center gap-2">
                              {/* Кнопки редактирования и критериев (существующие) */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStageForCriteria(stage);
                                  setIsStageCriteriaModalOpen(true);
                                }}
                                title="Критерии оценивания"
                              >
                                <BarChart4 className="h-4 w-4 mr-2" />
                                Критерии
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 w-9 border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openStageModal(stage);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {/* Иконка раскрытия */}
                              {expandedStageId === stage.id ? (
                                <ChevronUp className="h-5 w-5 text-slate-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-slate-500" />
                              )}
                            </div>
                          </div>

                          {/* Раскрывающийся блок с командами (показывается только для выбранного этапа) */}
                          {expandedStageId === stage.id && (
                            <div className="border-t border-gray-200 p-4 dark:border-neutral-800">
                              <h4 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Команды на этапе</h4>
                              <div className="space-y-2">
                                {teams?.teams
                                  .filter((team: Team) => teamCurrentStageMap[team.id] === stage.id)
                                  .map((team: Team) => {
                                    const isLoading = loadingTeamStage[team.id];
                                    const isTransitioning = transitioningTeam[team.id];
                                    const currentStageId = teamCurrentStageMap[team.id];
                                    const sortedStages = getSortedStages();
                                    const currentIndex = sortedStages.findIndex(s => s.id === currentStageId);
                                    const hasPrev = currentIndex > 0;
                                    const hasNext = currentIndex !== -1 && currentIndex < sortedStages.length - 1;

                                    return (
                                      <div
                                        key={team.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
                                      >
                                        <span className="font-medium text-slate-800 dark:text-slate-100">{team.name}</span>
                                        <div className="flex gap-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => handleMovePrev(team.id, currentStageId)}
                                            disabled={!hasPrev || isTransitioning || isLoading}
                                            title="Вернуть на предыдущий этап"
                                          >
                                            <ArrowLeft className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => handleMoveNext(team.id, currentStageId)}
                                            disabled={!hasNext || isTransitioning || isLoading}
                                            title="Перевести на следующий этап"
                                          >
                                            <ArrowRight className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => handleDisqualify(team.id, stage.id)}
                                            title="Исключить"
                                          >
                                            <Ban className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => handleViewFile(team.id, stage.id)}
                                            title="Файл ответов"
                                          >
                                            <FileText className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => handleViewScore(team.id, stage.id)}
                                            title="Баллы"
                                          >
                                            <Star className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                {teams?.teams && teams.teams.filter((team: Team) => teamCurrentStageMap[team.id] === stage.id).length === 0 && (
                                  <div className="py-4 text-center text-sm text-slate-500">На этом этапе нет команд</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-neutral-700 dark:bg-neutral-900">
                      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Этапы будут добавлены позже</p>
                      <Button variant="outline" onClick={() => openStageModal()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Создать первый этап
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <EventAnalytics
                usersCount={event.users_count || 0}
                teamStats={teamStats}
              />
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

                    <div className="pt-4 space-y-3">
                      <Button variant="destructive" className="w-full" onClick={openArchiveModal}>
                        <Archive className="mr-2 h-4 w-4" />
                        Архивировать мероприятие
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Удалить мероприятие
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить мероприятие?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Мероприятие и все связанные с ним данные будут безвозвратно удалены.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteEvent} className="bg-red-600 hover:bg-red-700">
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
          team={teams?.teams?.find((t: any) => t.id === selectedTeam.id) || selectedTeam}
          open={isDetailsModalOpen}
          onOpenChange={handleToggleTeamModal}
          eventId={eventId}
        />
      )}

      {/* Модальное окно для управления этапами */}
      <StageModal
        isOpen={isStageModalOpen}
        onOpenChange={setIsStageModalOpen}
        stageId={editingStage?.id}
        onSave={saveStage}
        onDeleteResource={handleDeleteResource}
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

      {/* Модальное окно управления критериями этапа */}
      <StageCriteriaModal
        isOpen={isStageCriteriaModalOpen}
        onOpenChange={setIsStageCriteriaModalOpen}
        stageId={selectedStageForCriteria?.id || 0}
        stageName={selectedStageForCriteria?.stage_name}
        availableStages={stages?.map((s: any) => ({ id: s.id, stage_name: s.stage_name })) || []}
      />

      {/* Модальное окно баллов команды */}
      <TeamScoresModal
        isOpen={isScoreModalOpen}
        onOpenChange={setIsScoreModalOpen}
        teamId={selectedScoreTeamId}
        stageId={selectedScoreStageId}
        teamName={selectedScoreTeamName}
        stageName={selectedScoreStageName}
        isJudgeOrOrganizer={true} // TODO: validate role if needed
      />
    </div>
  );
};

// Модалка деталей команды: участники + родительские соглашения
const TeamDetailsModal = ({
  team,
  open,
  onOpenChange,
  eventId,
}: {
  team: Team;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: number;
}) => {
  const membersWithConsent = team.members?.filter((member) => member.has_consent_document || member.consent_status !== 'not_required') || [];
  const captain = team.members?.find((member) => member.role === 'LEADER');

  const queryClient = useQueryClient();

  // Мутация для подтверждения родительского согласия
  const updateConsentStatusMutation = useMutation({
    mutationFn: ({ memberId, status }: { memberId: number; status: string }) => {
      return apiEventTeams.updateConsentStatus(eventId, team.id, memberId, status as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventTeams", eventId] });
      toast.success("Статус согласия обновлен");
    },
    onError: () => {
      toast.error("Не удалось обновить статус согласия");
    }
  });

  const handleDownloadConsent = async (memberId: number) => {
    try {
      const { url } = await apiEventTeams.getConsentUrl(eventId, team.id, memberId);
      window.open(url, '_blank');
    } catch (error) {
      toast.error("Не удалось получить ссылку на файл");
    }
  };

  const handleApproveConsent = (memberId: number) => {
    updateConsentStatusMutation.mutate({ memberId, status: 'verified' });
  };

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
                      <th className="p-2.5 text-left text-xs font-semibold whitespace-normal break-words">Роль</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                    {team.members?.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/70">
                        <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.firstname}</td>
                        <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.lastname}</td>
                        <td className="p-2.5">
                          {member.role === 'LEADER' ? (
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">Капитан</span>
                          ) : (
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800 dark:bg-neutral-800 dark:text-slate-200">Участник</span>
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
                {membersWithConsent.length > 0 ? (
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
                      {membersWithConsent.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/70">
                          <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.firstname}</td>
                          <td className="p-2.5 text-slate-900 dark:text-slate-100 whitespace-normal break-words">{member.lastname}</td>
                          <td className="p-2.5">
                            {member.consent_status === "verified" ? (
                              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">Одобрено</span>
                            ) : member.consent_status === "unverified" ? (
                              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100">Ожидает</span>
                            ) : (
                              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800 dark:bg-neutral-800 dark:text-slate-200">Не требуется</span>
                            )}
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center gap-2">
                              {member.has_consent_document && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 text-slate-800 hover:bg-gray-100 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800"
                                  onClick={() => handleDownloadConsent(member.id)}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Скачать
                                </Button>
                              )}
                              {member.consent_status === 'unverified' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700/60 dark:text-emerald-100 dark:hover:bg-emerald-900/30"
                                  onClick={() => handleApproveConsent(member.id)}
                                  disabled={updateConsentStatusMutation.isPending}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  {updateConsentStatusMutation.isPending ? "..." : "Подтвердить"}
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <p className="text-sm text-slate-700 dark:text-slate-300">Нет участников, требующих согласия</p>
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