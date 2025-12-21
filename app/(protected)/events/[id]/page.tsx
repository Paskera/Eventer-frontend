'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { apiEvents, Event } from '../../../api/http/event/events';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, Share2Icon, CheckIcon, MailIcon, UserPlusIcon, TrophyIcon, ClipboardListIcon, MessageCircleQuestionIcon, UsersRoundIcon, LandmarkIcon, Contact, Bold } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { bg, ru } from 'date-fns/locale';
import { apiEventTeams } from '@/app/api/http/EventTeams/event_teams';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useSession } from 'next-auth/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { apiStages } from '@/app/api/http/stages/stages';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function EventDetailsPage() {
    const params = useParams();
    const eventId = params.id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team_name, setTeam_name] = useState<string | null>(null);
    const [createTeamName, setCreateTeamName] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [agree, setAgree] = useState<File | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const open = searchParams.get("openModal");
        const team_name = searchParams.get("team_name");
        const token = searchParams.get("token");
    
        if (open === "true") {
          setIsModalOpen(true);
        }
        if (team_name) {
          setTeam_name(decodeURIComponent(team_name));
        }
        if (token) {
          setToken(decodeURIComponent(token));
        }
      }, []);

    const CreateTeamMutation = useMutation<unknown, Error, {event_id: number; agree: File, name: string}>({
        mutationFn: ({ event_id, agree, name }) => apiEventTeams.createTeam(event_id, agree, name),
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (error) => {
            console.log(error)
          }
    })

    const JoinTeamMutation = useMutation<unknown, Error, {event_id: number; invite_token: string}>({
        mutationFn: ({ event_id, invite_token }) => apiEventTeams.joinTeam(event_id, invite_token),
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
        },
        onError: (error) => {
            console.log(error)
          }
    })

    const handleClick = () => {
        if (token != null) {
            JoinTeamMutation.mutate({event_id: Number(eventId), invite_token: token});
        } else {
            if (createTeamName !== "" && agree ) {
                CreateTeamMutation.mutate({event_id: Number(eventId), agree: agree, name: createTeamName})
            }
        }
      };

    function Modal({ 
        isOpen, 
        onClose, 
        children 
    }: { 
        isOpen: boolean; 
        onClose: () => void; 
        children: React.ReactNode }) {
        const router = useRouter();
        const { status } = useSession(); 

        useEffect(() => {
            if (isOpen && status === 'unauthenticated') {
            router.push('/');
            }
        }, [isOpen, status, router]);
        if (!isOpen) return null;

      
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 backdrop-blur-sm"
                    onClick={onClose}
                ></div>
                <Card className="relative z-10 w-full max-w-lg text-white rounded-2xl shadow-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-6 h-6 text-white" />
                            <h2 className="text-2xl font-semibold">Форма регистрации</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-3xl leading-none"
                            aria-label="Закрыть"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="space-y-4">
                        {children}
                    </div>
                </Card>
            </div>
        );
      }

    const {data: team, isPending: isTeamPending } = useQuery({
        queryKey: ['team'],
        queryFn: () => apiEventTeams.getEventTeam(Number(eventId))
    })

    const {data: event, isPending: isEventPending } = useQuery({
        queryKey: ['events', eventId],
        queryFn: () => apiEvents.getEventDetail(Number(eventId))
    })

    const {data: stages, isPending: isStagePending } = useQuery({
        queryKey: ['stages'],
        queryFn: () => apiStages.getAllStages(Number(eventId))
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active": return <Badge className="bg-green-500 text-black rounded-full px-4 py-1 text-base font-medium shadow-none border-none">Активный</Badge>;
            case "upcoming": return <Badge className="bg-blue-500 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">Скоро</Badge>;
            case "completed": return <Badge className="bg-gray-500 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">Завершено</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getFormatBadge = (format: string) => {
        switch (format) {
            case "online":
                return <Badge className="border border-blue-500 text-blue-500 bg-transparent rounded-full px-4 py-1 text-base font-medium shadow-none">Онлайн</Badge>;
            case "offline":
                return <Badge className="border border-purple-500 text-purple-500 bg-transparent rounded-full px-4 py-1 text-base font-medium shadow-none">Офлайн</Badge>;
            case "hybrid":
                return <Badge className="border border-orange-500 text-orange-500 bg-transparent rounded-full px-4 py-1 text-base font-medium shadow-none">Гибрид</Badge>;
            default:
                return <Badge className="bg-muted text-white rounded-full px-4 py-1 text-base font-medium shadow-none">{format}</Badge>;
        }
    };

    // Универсальный парсер даты (ISO и дд.мм.гггг чч:мм:cc)
    function parseEventDate(dateStr: string): Date | null {
        if (!dateStr) return null;
        // ISO формат
        const isoDate = new Date(dateStr);
        if (!isNaN(isoDate.getTime())) return isoDate;
        // Формат дд.мм.гггг чч:мм:cc
        const [datePart, timePart] = dateStr.split(' ');
        if (!datePart || !timePart) return null;
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        const customDate = new Date(year, month - 1, day, hours, minutes, seconds);
        if (!isNaN(customDate.getTime())) return customDate;
        return null;
    }
    // Функция для красивого форматирования дат
    function formatEventDate(dateStr: string) {
        const date = parseEventDate(dateStr);
        if (!date) return '';
        return format(date, 'd MMMM yyyy, HH:mm', { locale: ru });
    }

    if (stages) {
        console.log(stages)
    }

    return (
        <div className="container mx-auto px-4 py-4 md:py-8 pb-[160px]">
            {event && (
            <div className="space-y-6 md:space-y-8">
                <Card className="overflow-hidden border-none shadow-none">
                    <div className="relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden">
                        <Image src={event.image_url} alt={event.event_name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 md:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                {getStatusBadge(event.event_status)}
                                {getFormatBadge(event.format)}
                            </div>
                            <CardTitle className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                                {event.event_name}
                            </CardTitle>
                            {event.description && (
                                <p className="text-sm md:text-base text-white/85 max-w-3xl line-clamp-3">
                                    {event.description}
                                </p>
                            )}
                        </div>
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-slate-900/50 via-slate-900/30 to-slate-800/40 border-border/60">
                        <CardContent className="p-4 md:p-5 space-y-1">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Старт</p>
                            <p className="text-lg font-semibold text-foreground">{formatEventDate(event.start_date)}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-indigo-600/20 via-indigo-500/10 to-cyan-500/10 border-border/60">
                        <CardContent className="p-4 md:p-5 space-y-1">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Формат</p>
                            <p className="text-lg font-semibold text-foreground capitalize">{event.format}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-lime-500/10 border-border/60">
                        <CardContent className="p-4 md:p-5 space-y-1">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Участники</p>
                            <p className="text-lg font-semibold text-foreground">{event.users_count}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-pink-500/10 border-border/60">
                        <CardContent className="p-4 md:p-5 space-y-1">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Локация</p>
                            <p className="text-lg font-semibold text-foreground truncate">{event.venue}</p>
                        </CardContent>
                    </Card>
                </div>
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="relative grid w-full grid-cols-4 bg-gradient-to-r from-slate-900/70 via-indigo-900/60 to-emerald-900/60 text-white h-12 items-center rounded-2xl p-1 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(45,212,191,0.12),transparent_30%)]" />
                        <TabsTrigger
                            value="details"
                            className="relative z-10 data-[state=active]:bg-white data-[state=active]:text-emerald-800 text-sm font-semibold rounded-xl transition-all px-3 py-2 flex items-center justify-center gap-2 shadow-none data-[state=active]:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                        >
                            <LandmarkIcon className="h-4 w-4" />
                            Детали
                        </TabsTrigger>
                        <TabsTrigger
                            value="stages"
                            className="relative z-10 data-[state=active]:bg-white data-[state=active]:text-emerald-800 text-sm font-semibold rounded-xl transition-all px-3 py-2 flex items-center justify-center gap-2 shadow-none data-[state=active]:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                        >
                            <ClipboardListIcon className="h-4 w-4" />
                            Этапы
                        </TabsTrigger>
                        <TabsTrigger
                            value="rules"
                            className="relative z-10 data-[state=active]:bg-white data-[state=active]:text-emerald-800 text-sm font-semibold rounded-xl transition-all px-3 py-2 flex items-center justify-center gap-2 shadow-none data-[state=active]:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                        >
                            <CheckIcon className="h-4 w-4" />
                            Регламент
                        </TabsTrigger>
                        <TabsTrigger
                            value="results"
                            className="relative z-10 data-[state=active]:bg-white data-[state=active]:text-emerald-800 text-sm font-semibold rounded-xl transition-all px-3 py-2 flex items-center justify-center gap-2 shadow-none data-[state=active]:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                        >
                            <TrophyIcon className="h-4 w-4" />
                            Итоговая таблица
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            <div className="lg:col-span-2 space-y-6 md:space-y-8">
                                {/* About Section */}
                                <Card>
                                    <CardHeader className="p-5 md:p-6 pb-3 md:pb-4"><CardTitle className="flex items-center gap-2"><LandmarkIcon className="w-6 h-6" /> О мероприятии</CardTitle></CardHeader>
                                    <CardContent className="p-5 md:p-6 pt-0">
                                        <p className="text-muted-foreground whitespace-pre-line">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Card>
                                {/* Theses Section */}
                                <Card>
                                    <CardHeader className="p-5 md:p-6 pb-3 md:pb-4"><CardTitle className="flex items-center gap-2"><TrophyIcon className="w-6 h-6" /> Основные цели</CardTitle></CardHeader>
                                    <CardContent className="p-5 md:p-6 pt-0 space-y-4">
                                        <ul className="list-none space-y-3">
                                                {/* MOCK */}
                                                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /><span className="text-muted-foreground">Дополнительная информация</span></li>                  
                                        </ul>
                                    </CardContent>
                                </Card>
                                {/* Stages Section */}
                                <Card>
                                    <CardHeader className="p-5 md:p-6 pb-3 md:pb-4"><CardTitle className="flex items-center gap-2"><ClipboardListIcon className="w-6 h-6" /> Этапы мероприятия</CardTitle></CardHeader>
                                    <CardContent className="p-5 md:p-6 pt-0 space-y-6">
                                        {event.stages.map((stage, index) => (
                                            <div key={stage.id} className="flex items-start gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div>
                                                    {index < event.stages.length - 1 && <div className="w-0.5 h-16 bg-border"></div>}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{stage.stage_name} - <span className="text-muted-foreground font-normal">{formatEventDate(stage.start_date)} — {formatEventDate(stage.end_date)}</span></p>
                                                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {team && (
                                    <Card className="border border-border rounded-xl overflow-hidden">
                                        <CardHeader className="flex items-start justify-between gap-2">
                                            <div className="flex flex-col">
                                                <CardTitle className="text-xl">Команда {team?.team?.name}</CardTitle>
                                                <p className="text-sm text-muted-foreground">Состав и приглашение</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border/60">
                                                        <span className="text-lg leading-none">⋮</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem disabled>
                                                        Расформировать команду
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        Скопировать ссылку
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardHeader>
                                        <CardContent className="space-y-5">
                                            <div className="space-y-2">
                                                <span className="text-sm text-muted-foreground">Ссылка для приглашения</span>
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                                                    <Badge variant="secondary" className="text-xs px-2 py-1 truncate max-w-[220px] bg-muted text-foreground">
                                                        {`Приглашение: ${team?.team?.name || ''}`}
                                                    </Badge>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full sm:w-auto gap-2"
                                                        onClick={() => {
                                                            const link = `http://localhost:3000/eventdetails/${eventId}?openModal=true&team_name=${encodeURIComponent(team.team.name)}&token=${team.team.invite_token}`;
                                                            navigator.clipboard.writeText(link)
                                                                .then(() => console.log("Ссылка скопирована!"))
                                                                .catch((err) => console.error("Ошибка при копировании:", err));
                                                        }}
                                                    >
                                                        <Share2Icon className="h-4 w-4" />
                                                        Скопировать
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-muted-foreground">Ссылка скопируется в буфер, её не нужно видеть целиком.</p>
                                            </div>

                                            <Separator />

                                                <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-semibold text-foreground">Участники</h4>
                                                    <Badge variant="secondary" className="text-xs px-2 py-1 bg-muted text-foreground">
                                                        {team?.members.length || 0} чел.
                                                    </Badge>
                                                </div>
                                                <div className="space-y-3">
                                                    {team?.members.map((member, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 bg-muted/50">
                                                            <span className="text-lg">{member.is_event_leader ? "👑" : "👤"}</span>
                                                            <div className="flex-1 flex flex-col gap-0.5">
                                                                <span className="font-medium text-foreground leading-tight">{member.firstname} {member.lastname}</span>
                                                                <div className="flex items-center gap-2 text-xs">
                                                                    <Badge variant="secondary" className="px-2 py-0 h-5 text-[10px] bg-primary/10 text-foreground">
                                                                        {member.is_event_leader ? "Лидер" : "Участник"}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                            {!member.is_event_leader && (
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border/60">
                                                                            <span className="text-lg leading-none">⋮</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end" className="w-44">
                                                                        <DropdownMenuItem disabled>
                                                                            Удалить из команды
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Contacts Section */}
                                <Card>
                                    <CardHeader className="p-5 md:p-6 pb-3 md:pb-4"><CardTitle className="flex items-center gap-2"><MessageCircleQuestionIcon className="w-6 h-6" /> Остались вопросы?</CardTitle></CardHeader>
                                    <CardContent className="p-5 md:p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                                                <Avatar className="h-12 w-12"><AvatarFallback><MailIcon /></AvatarFallback></Avatar>
                                                <div>
                                                    <p className="font-semibold">Контакты</p>
                                                    <p className="text-sm text-muted-foreground">Роль</p>
                                                    <a className="text-sm text-primary hover:underline">email</a>
                                                </div>
                                            </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-1 space-y-4 md:space-y-6">
                                <Card className="hidden md:block bg-gradient-to-br from-emerald-600 via-emerald-500 to-cyan-500 border border-white/15 text-white shadow-lg sticky top-20 z-20">
                                    <CardHeader className="space-y-2">
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
                                            <UserPlusIcon className="w-5 h-5" />
                                            Регистрация
                                        </CardTitle>
                                        <p className="text-sm text-white/85">Присоединяйтесь или создайте команду</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {team ? (
                                            <Button size="lg" variant="secondary" className="w-full text-lg font-bold h-[56px] rounded-lg flex items-center justify-center bg-white text-emerald-700 hover:bg-white/90">
                                                <UserPlusIcon className="w-6 h-6 mr-2" />
                                                Вы уже участник
                                            </Button>
                                        ) : (
                                            <Button onClick={() => setIsModalOpen(true)} size="lg" className="w-full text-lg font-bold bg-emerald-700 hover:bg-emerald-800 text-white h-[56px] rounded-lg flex items-center justify-center">
                                                <UserPlusIcon className="w-6 h-6 mr-2" />
                                                Подать заявку
                                            </Button>
                                        )}

                                        <Button size="lg" variant="outline" className="w-full rounded-lg border-white/40 text-white hover:bg-white/10">
                                            <Share2Icon className="w-5 h-5 mr-2" /> Поделиться
                                        </Button>
                                        
                                        {/* Модалка */}
                                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                                {/* Create team */}
                                                {showSuccess && (
                                                <div style={{
                                                    position: 'fixed',
                                                    top: 20,
                                                    right: 20,
                                                    background: '#4BB543',
                                                    color: 'white',
                                                    padding: '12px 20px',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                                    zIndex: 9999
                                                }}>
                                                    ✅ Вы подали заявку на ивент!
                                                </div>
                                                )}
                                                
                                                {token == null ? 
                                                ( <>
                                                {/* Название команды */}
                                                <div className="space-y-2">
                                                    <Label >Название команды *</Label>
                                                    <Input
                                                        // name="CreateTeamName"
                                                        // type="text"
                                                        value={createTeamName}
                                                        onChange={(e) => setCreateTeamName(e.target.value)}
                                                        placeholder="Введите название команды"
                                                        // required
                                                    />
                                                </div>
                                                </>) : (
                                                    <div className="text-xl font-bold mb-4">Вас пригласили участвовать в ивенте в составе команды {team?.team?.name}</div>
                                                )}
                                                {/* Согласие */}
                                                <div className="space-y-2 flex justify-end">
                                                    <Label >Согласие</Label>
                                                    <Input
                                                        name="agree"
                                                        type="file"
                                                        // value={teamData.team_name}
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files.length > 0) {
                                                            setAgree(e.target.files[0]);
                                                            }
                                                        }}
                                                        placeholder="Загрузите согласие"
                                                        required
                                                    />
                                                    {agree && (
                                                    <p className="text-sm text-gray-500 mt-2">Вы выбрали: {agree.name}</p>
                                                    )}
                                                </div>
                                                <Button onClick={handleClick}>
                                                    подать заявку
                                                </Button>
                                            {/* <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button> */}
                                        </Modal>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="stages" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Этапы мероприятия</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="stage1" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                    {stages?.map((stage) => (
                                        <TabsTrigger key={stage.id} value={`stage${stage.id}`}>{stage.stage_name}</TabsTrigger>
                                    ))}
                                    </TabsList>

                                    {stages?.map((stage) => (
                                    <TabsContent key={stage.id} value={`stage${stage.id}`} className="space-y-4 mt-6">
                                        <div className="border-l-4 border-blue-500 pl-6 py-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-semibold">{stage.stage_name}</h3>
                                                <Badge className="bg-blue-100 text-blue-800">{stage.stage_status}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>Срок: {formatEventDate(stage.start_date)} - {formatEventDate(stage.end_date)}</span>
                                                <span>{stage.type}</span>
                                            </div>
                                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                                <h4 className="font-semibold text-blue-800 mb-2">{stage.description}</h4>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    ))}
{/* 
                                    <TabsContent value="stage2" className="space-y-4 mt-6">
                                        <div className="border-l-4 border-purple-500 pl-6 py-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-semibold">Основной этап</h3>
                                                <Badge className="bg-purple-100 text-purple-800">Скоро</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-3">
                                                Команды работают над проектами, решают задачи и готовят презентации.
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>Срок: {formatEventDate(event.start_date)} - {formatEventDate(event.end_date)}</span>
                                                <span>Формат: {event.format === 'online' ? 'Онлайн' : event.format === 'offline' ? 'Офлайн' : 'Гибрид'}</span>
                                            </div>
                                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                                <h4 className="font-semibold text-purple-800 mb-2">Задачи этапа:</h4>
                                                <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                                                    <li>Изучение технического задания</li>
                                                    <li>Разработка концепции проекта</li>
                                                    <li>Создание прототипа</li>
                                                    <li>Подготовка презентации</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    
                                    <TabsContent value="stage3" className="space-y-4 mt-6">
                                        <div className="border-l-4 border-green-500 pl-6 py-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-semibold">Финальная защита</h3>
                                                <Badge className="bg-green-100 text-green-800">Запланирован</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-3">
                                                Презентация проектов перед жюри, защита решений и определение победителей.
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>Срок: {formatEventDate(event.end_date)}</span>
                                                <span>Формат: {event.format === 'online' ? 'Онлайн' : event.format === 'offline' ? 'Офлайн' : 'Гибрид'}</span>
                                            </div>
                                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                                <h4 className="font-semibold text-green-800 mb-2">Финальные требования:</h4>
                                                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                                    <li>Готовая презентация проекта</li>
                                                    <li>Демонстрация работающего прототипа</li>
                                                    <li>Ответы на вопросы жюри</li>
                                                    <li>Презентация команды</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent> */}
                                </Tabs>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="rules" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Регламент мероприятия</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-lg max-w-none">
                                    <h3 className="text-xl font-semibold mb-4">Общие правила</h3>
                                    <ul className="space-y-3 list-disc list-inside">
                                        <li>К участию допускаются команды от 3 до 5 человек</li>
                                        <li>Все участники должны быть зарегистрированы на платформе</li>
                                        <li>Запрещено использование чужого кода без указания авторства</li>
                                        <li>Решения должны быть представлены в виде работающего прототипа</li>
                                        <li>Решения, нарушающие законодательство РФ, не принимаются</li>
                                        <li>Команды обязаны соблюдать временные рамки каждого этапа</li>
                                        <li>При нарушении правил команда может быть дисквалифицирована</li>
                                    </ul>
                                    
                                    <Separator className="my-6" />
                                    
                                    <h3 className="text-xl font-semibold mb-4">Критерии оценки</h3>
                                    <ul className="space-y-3 list-disc list-inside">
                                        <li>Оригинальность идеи и инновационность подхода</li>
                                        <li>Техническая реализация и качество кода</li>
                                        <li>Полнота решения и соответствие требованиям</li>
                                        <li>Качество презентации проекта</li>
                                        <li>Эффективность работы в команде</li>
                                        <li>Практическая применимость решения</li>
                                    </ul>
                                    
                                    <Separator className="my-6" />
                                    
                                    <h3 className="text-xl font-semibold mb-4">Призы и награды</h3>
                                    <p className="mb-3">
                                        Победители получат ценные призы, сертификаты и возможность дальнейшего развития проекта.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Дополнительная информация о призах будет объявлена ближе к финалу мероприятия.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="results" className="space-y-6">
                        <Card className="overflow-hidden border-0 shadow-none bg-transparent p-0">
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-900">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.25),transparent_40%)] blur-3xl" />
                                <div className="relative p-6 md:p-8 space-y-6 text-white">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="space-y-1">
                                            <p className="text-sm uppercase tracking-wide text-white/70">Финал</p>
                                            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                                <TrophyIcon className="h-6 w-6 text-amber-300 drop-shadow" />
                                                Итоговая таблица
                                            </h2>
                                        </div>
                                        <Badge className="bg-white/20 text-white border-white/30">Live</Badge>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner">
                                            <p className="text-xs uppercase tracking-wide text-white/70">Всего участников</p>
                                            <p className="text-3xl font-bold">{event.users_count}</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner">
                                            <p className="text-xs uppercase tracking-wide text-white/70">Команд</p>
                                            <p className="text-3xl font-bold">{Math.max(Math.floor(event.users_count / 5), 1)}</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner">
                                            <p className="text-xs uppercase tracking-wide text-white/70">Формат</p>
                                            <p className="text-xl font-semibold capitalize">{event.format}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Card className="border-white/15 bg-white/5 text-white">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <UsersRoundIcon className="h-5 w-5 text-emerald-300" />
                                                    Ваш статус
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {team ? (
                                                    <>
                                                        <div className="flex items-center gap-3">
                                                            <Badge className="bg-emerald-500 text-emerald-950">Участник</Badge>
                                                            <span className="text-sm text-white/80">{team.team.name}</span>
                                                        </div>
                                                        <p className="text-sm text-white/70">Вы уже в команде. Ожидайте результатов.</p>
                                                    </>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <p className="text-sm text-white/80">Присоединяйтесь к команде или создайте свою для участия.</p>
                                                        <Button 
                                                            size="sm" 
                                                            className="bg-white text-emerald-700 hover:bg-white/90"
                                                            onClick={() => setIsModalOpen(true)}
                                                        >
                                                            <UserPlusIcon className="h-4 w-4 mr-2" />
                                                            Подать заявку
                                                        </Button>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>

                                        <Card className="border-white/15 bg-white/5 text-white">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <ClipboardListIcon className="h-5 w-5 text-cyan-300" />
                                                    Топ-метрики
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-2 gap-3">
                                                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                                                    <p className="text-xs text-white/70">Формат</p>
                                                    <p className="text-sm font-semibold capitalize">{event.format}</p>
                                                </div>
                                                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                                                    <p className="text-xs text-white/70">Участники</p>
                                                    <p className="text-sm font-semibold">{event.users_count}</p>
                                                </div>
                                                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                                                    <p className="text-xs text-white/70">Команд</p>
                                                    <p className="text-sm font-semibold">{Math.max(Math.floor(event.users_count / 5), 1)}</p>
                                                </div>
                                                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                                                    <p className="text-xs text-white/70">Статус</p>
                                                    <p className="text-sm font-semibold">{event.event_status}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            )}
            {/* Мобильный фиксированный блок регистрации */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-card border-t border-border px-5 py-3 flex flex-col items-center gap-3 md:hidden">
                {/* {timeLeft !== 'Регистрация завершена' ? (
                    <>
                        <Button size="lg" className="w-full text-lg font-bold bg-green-600 hover:bg-green-700 text-white h-[56px] rounded-lg flex items-center justify-center"><UserPlusIcon className="w-6 h-6 mr-2" /> Подать заявку</Button>
                        <div className="text-center w-full">
                            <p className="text-xs text-muted-foreground leading-tight">Регистрация закроется<br /><span className='font-bold'>{timeLeft}</span></p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full bg-muted rounded-lg py-3 text-center text-lg font-bold text-white">Регистрация закрыта</div>
                        <div className="text-center w-full">
                            <p className="text-xs text-muted-foreground">Регистрация на мероприятие</p>
                            <p className="text-xs text-muted-foreground">больше не доступна</p>
                        </div>
                    </>
                )} */}
            </div>
        </div>
    );
}
