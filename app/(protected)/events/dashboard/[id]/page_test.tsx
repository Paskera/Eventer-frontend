"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  Trophy,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Download,
  Search,
  Filter,
  Check,
  X
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { apiEvents } from "@/app/api/http/event/events";
import { apiEventTeams } from "@/app/api/http/EventTeams/event_teams";
import { apiStages, Stages } from "@/app/api/http/stages/stages";

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
  switch (status) {
    case "active":
      return (
        <Badge className="bg-emerald-500 text-white rounded-full px-4 py-1 text-base font-medium">
          Активный
        </Badge>
      );
    case "upcoming":
      return (
        <Badge className="bg-cyan-500 text-white rounded-full px-4 py-1 text-base font-medium">
          Скоро
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-slate-600 text-white rounded-full px-4 py-1 text-base font-medium">
          Завершено
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

// Компонент для отображения формата события
const EventFormatBadge = ({ format }: { format: string }) => {
  switch (format) {
    case "online":
      return (
        <Badge className="border border-cyan-500 text-cyan-300 bg-cyan-50/10 rounded-full px-4 py-1 text-base font-medium">
          Онлайн
        </Badge>
      );
    case "offline":
      return (
        <Badge className="border border-indigo-500 text-indigo-300 bg-indigo-50/10 rounded-full px-4 py-1 text-base font-medium">
          Офлайн
        </Badge>
      );
    case "hybrid":
      return (
        <Badge className="border border-amber-500 text-amber-300 bg-amber-500/10 rounded-full px-4 py-1 text-base font-medium">
          Гибрид
        </Badge>
      );
    default:
      return (
        <Badge className="bg-slate-700 text-white rounded-full px-4 py-1 text-base font-medium">
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

  // Состояния для модальных окон
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null);
  const [teamToModify, setTeamToModify] = useState<number | null>(null);

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

  // Функция для подтверждения действия
  const confirmAction = async () => {
    if (teamToModify && approvalAction) {
      if (approvalAction === "approve") {
        // Логика для одобрения команды
        console.log(`Approving team ${teamToModify}`);
        // Здесь можно добавить вызов API для одобрения команды
      } else if (approvalAction === "reject") {
        // Логика для отклонения команды
        console.log(`Rejecting team ${teamToModify}`);
        // Здесь можно добавить вызов API для отклонения команды
      }
      
      // Закрываем модальное окно и сбрасываем состояние
      setIsApprovalModalOpen(false);
      setTeamToModify(null);
      setApprovalAction(null);
      
      // Обновляем данные (можно реализовать через рефреш данных)
    }
  };

  // Функция для просмотра деталей команды
  const handleViewTeamDetails = (team: any) => {
    setSelectedTeam(team);
    setIsDetailsModalOpen(true);
  };

  // Статистика команд
  const teamStats = {
    total: teams?.teams?.length || 0,
    approved: teams?.teams?.filter((team: any) => team.status === "approved").length || 0,
    pending: teams?.teams?.filter((team: any) => team.status === "pending").length || 0,
    rejected: teams?.teams?.filter((team: any) => team.status === "rejected").length || 0,
    totalParticipants: teams?.teams?.reduce((sum: number, team: any) => sum + (team.members?.length || 0), 0) || 0,
  };

  if (eventLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-gray-300 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {event && (
        <div className="space-y-6">
          {/* Заголовок события */}
          <div className="relative rounded-xl overflow-hidden h-64">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image_url || "/placeholder.svg"})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 flex-col justify-end p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <EventStatusBadge status={event.event_status} />
                <EventFormatBadge format={event.format} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {event.event_name}
              </h1>
              <p className="text-white/80 max-w-3xl">
                {event.description}
              </p>
            </div>
          </div>

          {/* Статистика события */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-80/50 border-white/10">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Старт</p>
                </div>
                <p className="text-base font-semibold text-white">{formatDate(event.start_date)}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-cyan-600/20 via-cyan-500/10 to-blue-500/15 border-cyan-500/30">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2 text-cyan-40">
                  <Clock className="w-4 h-4" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Формат</p>
                </div>
                <p className="text-base font-semibold text-white capitalize">{event.format}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-teal-500/15 border border-emerald-500/30">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Users className="w-4 h-4" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Участники</p>
                </div>
                <p className="text-base font-semibold text-white">{event.users_count}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-600/20 via-amber-500/10 to-orange-500/15 border border-amber-500/30">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2 text-amber-400">
                  <MapPin className="w-4 h-4" />
                  <p className="text-xs uppercase tracking-wide font-semibold">Локация</p>
                </div>
                <p className="text-base font-semibold text-white truncate">{event.venue}</p>
              </CardContent>
            </Card>
          </div>

          {/* Вкладки */}
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Команды
              </TabsTrigger>
              <TabsTrigger value="stages" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Этапы
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Детали
              </TabsTrigger>
            </TabsList>

            {/* Вкладка команд */}
            <TabsContent value="teams" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <Card className="p-3">
                  <CardTitle className="text-center text-sm">Всего</CardTitle>
                  <p className="text-xl font-bold text-center text-blue-500">{teamStats.total}</p>
                </Card>
                <Card className="p-3">
                  <CardTitle className="text-center text-sm">Одобрено</CardTitle>
                  <p className="text-xl font-bold text-center text-green-500">{teamStats.approved}</p>
                </Card>
                <Card className="p-3">
                  <CardTitle className="text-center text-sm">Ожидает</CardTitle>
                  <p className="text-xl font-bold text-center text-yellow-500">{teamStats.pending}</p>
                </Card>
                <Card className="p-3">
                  <CardTitle className="text-center text-sm">Отклонено</CardTitle>
                  <p className="text-xl font-bold text-center text-red-500">{teamStats.rejected}</p>
                </Card>
                <Card className="p-3">
                  <CardTitle className="text-center text-sm">Участники</CardTitle>
                  <p className="text-xl font-bold text-center text-purple-500">{teamStats.totalParticipants}</p>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Команды события</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Фильтр
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Команда</th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Капитан</th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Участники</th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Статус</th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams?.teams?.map((team: any) => (
                          <tr key={team.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                            <td className="p-3 font-medium text-sm">{team.name}</td>
                            <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                              {team.members?.find((m: any) => m.is_event_leader)?.firstname || "Не указан"}
                            </td>
                            <td className="p-3 text-sm text-gray-60 dark:text-gray-400">{team.members?.length || 0}</td>
                            <td className="p-3 text-sm">
                              {team.status === "approved" ? (
                                <Badge className="bg-green-500 text-xs">Одобрено</Badge>
                              ) : team.status === "pending" ? (
                                <Badge variant="secondary" className="text-xs">Ожидает</Badge>
                              ) : (
                                <Badge variant="destructive" className="text-xs">Отклонено</Badge>
                              )}
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewTeamDetails(team)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Download className="w-4 h-4" />
                                </Button>
                                {team.status === "pending" && (
                                  <>
                                    <AlertDialog open={isApprovalModalOpen && approvalAction === "approve" && teamToModify === team.id}>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-8 w-8 p-0 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                          onClick={() => handleApproveTeam(team.id)}
                                        >
                                          <Check className="w-4 h-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Вы уверены, что хотите одобрить команду {selectedTeam?.name || team.name}?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel onClick={() => setIsApprovalModalOpen(false)}>Отмена</AlertDialogCancel>
                                          <AlertDialogAction onClick={confirmAction}>Одобрить</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog open={isApprovalModalOpen && approvalAction === "reject" && teamToModify === team.id}>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-8 w-8 p-0 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                          onClick={() => handleRejectTeam(team.id)}
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Вы уверены, что хотите отклонить команду {selectedTeam?.name || team.name}?
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

            {/* Вкладка этапов */}
            <TabsContent value="stages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Этапы события</CardTitle>
                </CardHeader>
                <CardContent>
                  {stages && stages.length > 0 ? (
                    <div className="space-y-4">
                      {stages.map((stage: any) => (
                        <div 
                          key={stage.id} 
                          className="border-l-4 border-cyan-50 pl-4 py-3 bg-white/5 rounded-r-lg -ml-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{stage.stage_name}</h3>
                            <Badge
                              className={
                                stage.stage_status === "active" 
                                  ? "bg-emerald-500 text-xs" 
                                  : stage.stage_status === "upcoming" 
                                    ? "bg-cyan-500 text-xs" 
                                    : "bg-slate-600 text-xs"
                              }
                            >
                              {stage.stage_status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                            <span>
                              {formatDate(stage.start_date)} - {formatDate(stage.end_date)}
                            </span>
                          </div>
                          <p className="text-slate-700 text-sm">{stage.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">Этапы будут добавлены позже</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Вкладка деталей */}
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">О событии</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{event.description}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Этапы события</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {event.stages?.map((stage: any, index: number) => (
                        <div key={stage.id} className="flex items-start gap-3">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            {index < event.stages.length - 1 && <div className="w-0.5 h-12 bg-slate-700 mt-1"></div>}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="font-semibold">
                              {stage.stage_name}
                              <span className="text-slate-500 font-normal text-sm ml-2">
                                {formatDate(stage.start_date)} — {formatDate(stage.end_date)}
                              </span>
                            </p>
                            <p className="text-slate-600 text-sm mt-1">{stage.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

// Компонент модального окна с деталями команды
const TeamDetailsModal = () => {
  if (!selectedTeam) return null;

  const minorMembers = selectedTeam.members?.filter((member: any) => member.isMinor) || [];
  
  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Детали команды {selectedTeam.name}</DialogTitle>
          <DialogDescription>
            Информация о команде и её участниках
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Информация о команде</h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Название:</span>
                <span>{selectedTeam.name}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Статус:</span>
                <span>
                  {selectedTeam.status === "approved" ? "Одобрена" : 
                   selectedTeam.status === "pending" ? "На рассмотрении" : 
                   "Отклонена"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Количество участников:</span>
                <span>{selectedTeam.members?.length || 0}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Дата создания:</span>
                <span>{new Date(selectedTeam.created_at).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Капитан команды</h3>
            <div className="space-y-2">
              {selectedTeam.members?.find((member: any) => member.is_event_leader) ? (
                <>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium">Имя:</span>
                    <span>{selectedTeam.members.find((member: any) => member.is_event_leader).firstname}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium">Фамилия:</span>
                    <span>{selectedTeam.members.find((member: any) => member.is_event_leader).lastname}</span>
                  </div>
                </>
              ) : (
                <p>Капитан не назначен</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Участники команды</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">Имя</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">Фамилия</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">Телефон</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">Капитан</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">Несовершеннолетний</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedTeam.members?.map((member: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 text-sm">{member.firstname}</td>
                    <td className="p-3 text-sm">{member.lastname}</td>
                    <td className="p-3 text-sm">{member.email}</td>
                    <td className="p-3 text-sm">{member.phone}</td>
                    <td className="p-3 text-sm">
                      {member.is_event_leader ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Да</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {member.isMinor ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Да</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {minorMembers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Родительские соглашения</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Имя</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Фамилия</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Статус соглашения</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {minorMembers.map((member: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 text-sm">{member.firstname}</td>
                      <td className="p-3 text-sm">{member.lastname}</td>
                      <td className="p-3 text-sm">
                        {member.parentalConsent === "approved" ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Одобрено</span>
                        ) : member.parentalConsent === "rejected" ? (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Отклонено</span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Ожидает</span>
                        )}
                      </td>
                      <td className="p-3 text-sm">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDashboard;