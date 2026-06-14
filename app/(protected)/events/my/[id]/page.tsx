'use client';

import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { apiEventTeams } from '@/app/api/http/EventTeams/event_teams';
import { apiStages } from '@/app/api/http/stages/stages';
import { apiStageCriteria } from '@/app/api/http/stage-criteria/stage_criteria';
import { Target, BarChart3, LockIcon } from 'lucide-react';

const team = [
    { name: 'Сергей Орлов', email: 'olivia.martin@email.com', role: 'Тимлид', avatar: '/avatars/01.png' },
    { name: 'Андрей Петров', email: 'jackson.lee@email.com', role: 'Участник', avatar: '/avatars/02.png' },
    { name: 'Анастасия Петрова', email: 'isabella.nguyen@email.com', role: 'Участник', avatar: '/avatars/03.png' },
    { name: 'Анна Ковалева', email: 'will@email.com', role: 'Участник', avatar: '/avatars/04.png' },
    { name: 'Ирина Колесова', email: 'sofia.davis@email.com', role: 'Участник', avatar: '/avatars/05.png' },
];


export default function MyEventDetailsPage() {
    const params = useParams();
    const eventId = Number(params.id);

    // Загружаем данные команды
    const { data: teamData, isLoading: isTeamLoading } = useQuery({
        queryKey: ['team', eventId],
        queryFn: () => apiEventTeams.getEventTeam(eventId),
    });

    // Загружаем этапы события
    const { data: stages, isLoading: isStagesLoading } = useQuery({
        queryKey: ['stages', eventId],
        queryFn: () => apiStages.getAllStages(eventId),
    });

    // Загружаем критерии для всех этапов
    const { data: allStageCriteria, isLoading: isCriteriaLoading } = useQuery({
        queryKey: ['allStageCriteria', eventId],
        queryFn: async () => {
            if (!stages || stages.length === 0) return {};
            const criteriaMap: Record<number, any[]> = {};
            for (const stage of stages) {
                try {
                    const criteria = await apiStageCriteria.getStageCriteriaByStage(stage.id);
                    criteriaMap[stage.id] = criteria;
                } catch (error) {
                    criteriaMap[stage.id] = [];
                }
            }
            return criteriaMap;
        },
        enabled: !!stages && stages.length > 0,
    });

    // Преобразуем данные команды для отображения
    const teamMembers = teamData?.members?.map((member: any) => ({
        name: `${member.firstname} ${member.lastname}`,
        email: member.email || '',
        role: member.is_event_leader ? 'Тимлид' : 'Участник',
        avatar: '/avatars/01.png', // Можно добавить реальные аватары позже
    })) || [];

    return (
        <div className="w-full flex flex-col items-center px-2 sm:px-4 py-4 sm:py-8">
            <div className="w-full max-w-xl">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Мое мероприятие</h1>
                <div className="flex items-center text-muted-foreground text-sm mb-6 gap-2">
                    <span>ID события: {eventId}</span>
                </div>
                <Tabs defaultValue="team" className="w-full">
                    <TabsList className="flex w-full min-w-0 max-w-full overflow-x-auto whitespace-nowrap gap-2 py-1 scrollbar-none snap-x snap-mandatory">
                        <TabsTrigger value="team" className="pl-4 snap-start">Команда</TabsTrigger>
                        <TabsTrigger value="criteria" className="pr-4 snap-end">Критерии оценивания</TabsTrigger>
                    </TabsList>
                    <TabsContent value="team">
                        <Card className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
                            <CardHeader><CardTitle className="text-slate-900 dark:text-slate-100">Моя команда</CardTitle></CardHeader>
                            <CardContent>
                                {isTeamLoading ? (
                                    <div className="text-center py-4 text-muted-foreground">Загрузка данных команды...</div>
                                ) : teamMembers.length > 0 ? (
                                    <>
                                        <div className="text-muted-foreground mb-2 text-sm">Участников - {teamMembers.length}</div>
                                        <div className="flex flex-col gap-3">
                                            {teamMembers.map((member, index) => (
                                                <div key={index} className="flex items-center justify-between gap-2 flex-wrap">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={member.avatar} alt={member.name} />
                                                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="font-medium truncate">{member.name}</span>
                                                            {member.email && (
                                                                <span className="text-xs text-muted-foreground truncate">{member.email}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">{member.role}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-4 text-muted-foreground">Вы не состоите в команде</div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="criteria" className="space-y-4">
                        {isStagesLoading || isCriteriaLoading ? (
                            <Card className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    Загрузка критериев оценивания...
                                </CardContent>
                            </Card>
                        ) : stages && stages.length > 0 ? (
                            stages.map((stage: any) => {
                                const stageCriteria = allStageCriteria?.[stage.id] || [];
                                const isUpcoming = stage.start_date && new Date() < new Date(stage.start_date);
                                return (
                                    <Card key={stage.id} className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                    <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                                    {stage.stage_name}
                                                </CardTitle>
                                                <Badge
                                                    className={`${isUpcoming
                                                            ? "bg-slate-500 text-white"
                                                            : stage.stage_status === "active"
                                                                ? "bg-emerald-500 text-white"
                                                                : stage.stage_status === "waiting"
                                                                    ? "bg-cyan-500 text-white"
                                                                    : "bg-slate-600 text-white"
                                                        }`}
                                                >
                                                    {isUpcoming ? "ожидается" : stage.stage_status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {isUpcoming ? (
                                                <div className="text-center py-6 text-muted-foreground">
                                                    <LockIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                                    <p className="text-sm">Критерии скрыты до начала этапа</p>
                                                </div>
                                            ) : stageCriteria.length > 0 ? (
                                                <div className="space-y-4">
                                                    <div className="grid gap-3">
                                                        {stageCriteria
                                                            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                                                            .map((criterion: any) => (
                                                                <div
                                                                    key={criterion.id}
                                                                    className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4 bg-gray-50 dark:bg-neutral-800/50"
                                                                >
                                                                    <div className="flex items-start justify-between mb-2">
                                                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                                            {criterion.criteria_name}
                                                                        </h4>
                                                                        <Badge variant="outline" className="ml-2 flex-shrink-0 text-xs">
                                                                            {criterion.max_score} балл{criterion.max_score > 1 && criterion.max_score < 5 ? 'а' : criterion.max_score >= 5 ? 'ов' : ''}
                                                                        </Badge>
                                                                    </div>
                                                                    {criterion.description && (
                                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                                                                            {criterion.description}
                                                                        </p>
                                                                    )}
                                                                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                                                                        {criterion.weight && criterion.weight !== 1 && (
                                                                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                                                                Вес: {criterion.weight}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                                        <div className="flex items-center gap-2 text-xs text-blue-900 dark:text-blue-100">
                                                            <BarChart3 className="w-4 h-4" />
                                                            <span className="font-medium">
                                                                Критериев: {stageCriteria.length} |
                                                                Макс. балл: {stageCriteria.reduce((sum: number, c: any) => sum + (c.max_score || 0), 0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 text-muted-foreground">
                                                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                    <p className="text-sm">Критерии оценивания для этого этапа еще не добавлены</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <Card className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    Этапы мероприятия еще не созданы
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 