"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, X, Globe2Icon, TrendingUpIcon } from "lucide-react"
import { parse, isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { Hackathon, hackathons } from "../data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"

export default function HackathonBoard() {
    const [showFilters, setShowFilters] = useState(false)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-600 hover:bg-green-700">Активный</Badge>
            case "waiting":
                return <Badge className="bg-blue-600 hover:bg-blue-700">Предстоящий</Badge>
            case "closed":
                return <Badge className="bg-gray-600 hover:bg-gray-700">Завершен</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getFormatBadge = (format: string) => {
        switch (format) {
            case "online":
                return (
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                        Онлайн
                    </Badge>
                )
            case "offline":
                return (
                    <Badge variant="outline" className="border-purple-500 text-purple-400">
                        Офлайн
                    </Badge>
                )
            case "hybrid":
                return (
                    <Badge variant="outline" className="border-orange-500 text-orange-400">
                        Гибрид
                    </Badge>
                )
            default:
                return <Badge variant="outline">{format}</Badge>
        }
    }

    // Функция для получения цвета бейджа формата
    const getFormatBadgeStyle = (format: string) => {
        switch (format) {
            case "online":
                return "border-blue-500 text-blue-500";
            case "offline":
                return "border-purple-500 text-purple-500";
            case "hybrid":
                return "border-orange-500 text-orange-500";
            default:
                return "";
        }
    };

    function parseDate(dateStr: string) {
        const date = new Date(dateStr); // автоматически парсит ISO строку
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // месяцы от 0 до 11
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const initialFilters = {
        page: 1,
        page_size: 10,
        venue: '',
        date: '',
        category: '',
        format: '',
        event_status: 'active',
        name: '',
    }

    const [filters, setFilters] = useState({
        page: 1,
        page_size: 10,
        venue: '',
        date: '',
        category: '',
        format: '',
        event_status: '',
        name: '',
    })

    const [tempFilters, setTempFilters] = useState(filters)

    const normalizedFilters = {
        ...filters,
        venue: filters.venue || undefined,
        date: filters.date || undefined,
        category: filters.category || undefined,
        format: filters.format || undefined,
        event_status: filters.event_status || undefined,
        name: filters.name || undefined,
    }

    const { data, isPending, error } = useQuery({
        queryKey: ['Events', normalizedFilters],
        queryFn: () => apiEvents.getAllEvents(normalizedFilters),
        placeholderData: keepPreviousData
    })

    const events = data?.events ?? []


    return (
        <div className="flex flex-col md:flex-row">
            {/* Поиск и фильтры в одну строку на мобильных */}
            <div className="md:hidden flex items-center justify-between gap-2 mt-4 mb-4 px-2 sm:px-4 md:px-6">
                <Button variant="outline" className="ml-2 flex-shrink-0" onClick={() => setShowFilters(true)}>
                    Фильтры
                </Button>
            </div>
            <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogContent showCloseButton={false} className="max-w-xs w-full rounded-2xl p-4 pt-6 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center w-full">Фильтры</DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="absolute right-2 top-2 rounded-full p-2" onClick={() => setShowFilters(false)} aria-label="Закрыть фильтры">
                                <X className="w-6 h-6" />
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                    <div className="space-y-6">
                        <Separator />
                        {/* Venue */}
                        <div className="space-y-2">
                            <Label htmlFor="venue">Место проведения</Label>
                            <Input
                                id="venue"
                                value={tempFilters.venue}
                                onChange={(e) => setTempFilters((prev) => ({ ...prev, venue: e.target.value, page: 1 }))}
                                placeholder="Введите место"
                            />
                        </div>

                        <Separator />

                        {/* Date */}
                        <div className="space-y-2">
                            <Label htmlFor="date">Дата</Label>
                            <div className="relative">
                                <Input
                                    id="date"
                                    type="text"
                                    placeholder="ДД.ММ.ГГГГ"
                                    value={tempFilters.date}
                                    onChange={(e) => setTempFilters((prev) => ({ ...prev, date: e.target.value, page: 1 }))}
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        <Separator />

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category-select">Категория</Label>
                            <Select
                                value={tempFilters.category}
                                onValueChange={(value) => setTempFilters((prev) => ({ ...prev, category: value, page: 1, }))}
                            >
                                <SelectTrigger id="category-select">
                                    <SelectValue placeholder="Все категории" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* <SelectItem value="">Все категории</SelectItem> */}
                                    <SelectItem value="1">Искусство</SelectItem>
                                    <SelectItem value="2">Технологии</SelectItem>
                                    <SelectItem value="3">Образование</SelectItem>
                                    <SelectItem value="4">Киберспорт</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        {/* Format */}
                        <div className="space-y-2">
                            <Label htmlFor="format">Формат</Label>
                            <Select
                                value={tempFilters.format}
                                onValueChange={(value) => setTempFilters((prev) => ({ ...prev, format: value, page: 1 }))}
                            >
                                <SelectTrigger id="format">
                                    <SelectValue placeholder="Выберите формат" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Онлайн</SelectItem>
                                    <SelectItem value="offline">Оффлайн</SelectItem>
                                    <SelectItem value="hybrid">Гибрид</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        {/* Event Status */}
                        <div className="space-y-2">
                            <Label htmlFor="event_status">Статус</Label>
                            <Select
                                value={tempFilters.event_status}
                                onValueChange={(value) => setTempFilters((prev) => ({ ...prev, event_status: value, page: 1 }))}
                            >
                                <SelectTrigger id="event_status">
                                    <SelectValue placeholder="Выберите статус" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Активные</SelectItem>
                                    <SelectItem value="waiting">Предстоящие</SelectItem>
                                    <SelectItem value="closed">Завершённые</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        <div className="flex gap-2">
                            <Button
                                onClick={() => setFilters({ ...tempFilters, page: 1 })}
                                className="flex-1"
                            >
                                Применить
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setFilters(initialFilters)
                                    setTempFilters(initialFilters)
                                }}
                                className="flex-1"
                            >
                                Очистить
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Sidebar with filters PC */}
            <Card className="hidden md:block w-full md:w-80 h-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 rounded-none md:border-r border-border bg-card overflow-y-auto mb-4 md:mb-0">
                <CardHeader>
                    <CardTitle className="text-xl mb-4">Фильтры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Название</Label>
                        <div className="relative">
                            <Input
                                id="date"
                                type="text"
                                placeholder="Название"
                                value={tempFilters.name}
                                onChange={(e) => setTempFilters((prev) => ({ ...prev, name: e.target.value, page: 1 }))}
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <Separator />
                    {/* Venue */}
                    <div className="space-y-2">
                        <Label htmlFor="venue">Место проведения</Label>
                        <Input
                            id="venue"
                            value={tempFilters.venue}
                            onChange={(e) => setTempFilters((prev) => ({ ...prev, venue: e.target.value, page: 1 }))}
                            placeholder="Введите место"
                        />
                    </div>

                    <Separator />

                    {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Дата</Label>
                        <div className="relative">
                            <Input
                                id="date"
                                type="text"
                                placeholder="ДД.ММ.ГГГГ"
                                value={tempFilters.date}
                                onChange={(e) => setTempFilters((prev) => ({ ...prev, date: e.target.value, page: 1 }))}
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <Separator />

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category-select">Категория</Label>
                        <Select
                            value={tempFilters.category}
                            onValueChange={(value) => setTempFilters((prev) => ({ ...prev, category: value, page: 1, }))}
                        >
                            <SelectTrigger id="category-select">
                                <SelectValue placeholder="Все категории" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* <SelectItem value="">Все категории</SelectItem> */}
                                <SelectItem value="1">Искусство</SelectItem>
                                <SelectItem value="2">Технологии</SelectItem>
                                <SelectItem value="3">Образование</SelectItem>
                                <SelectItem value="4">Киберспорт</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Format */}
                    <div className="space-y-2">
                        <Label htmlFor="format">Формат</Label>
                        <Select
                            value={tempFilters.format}
                            onValueChange={(value) => setTempFilters((prev) => ({ ...prev, format: value, page: 1 }))}
                        >
                            <SelectTrigger id="format">
                                <SelectValue placeholder="Выберите формат" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="online">Онлайн</SelectItem>
                                <SelectItem value="offline">Оффлайн</SelectItem>
                                <SelectItem value="hybrid">Гибрид</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Event Status */}
                    <div className="space-y-2">
                        <Label htmlFor="event_status">Статус</Label>
                        <Select
                            value={tempFilters.event_status}
                            onValueChange={(value) => setTempFilters((prev) => ({ ...prev, event_status: value, page: 1 }))}
                        >
                            <SelectTrigger id="event_status">
                                <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Активные</SelectItem>
                                <SelectItem value="waiting">Предстоящие</SelectItem>
                                <SelectItem value="closed">Завершённые</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                        <Button
                            onClick={() => setFilters({ ...tempFilters, page: 1 })}
                            className="flex-1"
                        >
                            Применить
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setFilters(initialFilters)
                                setTempFilters(initialFilters)
                            }}
                            className="flex-1"
                        >
                            Очистить
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Main content */}
            <div className="flex-1 p-2 sm:p-4 md:p-6">
                <div className="w-full max-w-[1200px] mx-auto space-y-6">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-900/80 via-slate-900/70 to-emerald-800/70 p-5 sm:p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_40%)] blur-2xl" />
                        <div className="relative flex flex-col gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70">
                                <Globe2Icon className="h-4 w-4" />
                                Все мероприятия
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-white/15 border-white/25 text-white">Всего: {events.length}</Badge>
                                <Badge className="bg-white/15 border-white/25 text-white">Страница: {filters.page}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/75">
                                <TrendingUpIcon className="h-4 w-4" />
                                Подборка актуальных событий по фильтрам
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 md:gap-6 grid-cols-1">
                        {events?.map((event) => (
                            <Card
                                key={event.id}
                                className="group relative overflow-hidden border border-border bg-card text-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-black/25" />
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.45),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.35),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.35),transparent_35%)]" />
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-64 h-44 md:h-auto flex-shrink-0">
                                        <img
                                            src={event.image_url || "/placeholder.svg"}
                                            alt={event.event_name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                                    </div>

                                    <CardContent className="relative flex-1 p-4 md:p-5 flex flex-col gap-4 z-10">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap gap-2">
                                                {getStatusBadge(event.event_status)}
                                                {getFormatBadge(event.format)}
                                            </div>
                                            <h3 className="text-xl font-bold leading-tight">{event.event_name}</h3>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-muted-foreground">
                                            <div className="rounded-lg border border-border bg-muted/60 px-3 py-2 flex gap-3 items-center">
                                                <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                                                    <ClockIcon className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground/90">Начало</span>
                                                    <span className="font-semibold text-foreground">{parseDate(event.start_date)}</span>
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-border bg-muted/60 px-3 py-2 flex gap-3 items-center">
                                                <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                                                    <CalendarIcon className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground/90">Окончание</span>
                                                    <span className="font-semibold text-foreground">{parseDate(event.end_date)}</span>
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-border bg-muted/60 px-3 py-2 flex gap-3 items-center sm:col-span-2">
                                                <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                                                    <MapPinIcon className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground/90">Место</span>
                                                    <span className="font-semibold text-foreground truncate">{event.venue}</span>
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-border bg-muted/60 px-3 py-2 flex gap-3 items-center sm:col-span-2">
                                                <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                                                    <UsersIcon className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground/90">Участники</span>
                                                    <span className="font-semibold text-foreground">{event.users_count} чел.</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-xs font-semibold text-muted-foreground">Описание</h4>
                                            <p className="text-sm text-foreground/90 line-clamp-2">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button asChild>
                                                <Link href={`/events/${event.id}`}>
                                                    Подробнее
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 