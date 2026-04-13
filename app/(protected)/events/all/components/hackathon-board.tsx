"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, X, Globe2Icon, TrendingUpIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"

export default function HackathonBoard() {
    const [showFilters, setShowFilters] = useState(false)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="text-[13px] leading-none h-[26px] px-3 py-0 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-500/30 shadow-none">Активный</Badge>
            case "waiting":
                return <Badge className="text-[13px] leading-none h-[26px] px-3 py-0 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 shadow-none">Предстоящий</Badge>
            case "closed":
                return <Badge className="text-[13px] leading-none h-[26px] px-3 py-0 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-none">Завершен</Badge>
            default:
                return <Badge variant="secondary" className="text-[13px] leading-none h-[26px] px-3 py-0 shadow-none">{status}</Badge>
        }
    }

    const getFormatBadge = (format: string) => {
        switch (format) {
            case "online":
                return (
                    <Badge variant="outline" className="text-[13px] leading-none h-[26px] px-3 py-0 border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-900/30 shadow-none">
                        Онлайн
                    </Badge>
                )
            case "offline":
                return (
                    <Badge variant="outline" className="text-[13px] leading-none h-[26px] px-3 py-0 border-purple-300 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:bg-purple-900/30 shadow-none">
                        Офлайн
                    </Badge>
                )
            case "hybrid":
                return (
                    <Badge variant="outline" className="text-[13px] leading-none h-[26px] px-3 py-0 border-orange-300 text-orange-700 bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:bg-orange-900/30 shadow-none">
                        Гибрид
                    </Badge>
                )
            default:
                return <Badge variant="outline" className="text-[13px] leading-none h-[26px] px-3 py-0 shadow-none">{format}</Badge>
        }
    }


    function parseDate(dateStr: string) {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            const datePart = new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(date).replace(' г.', '');
            const timePart = new Intl.DateTimeFormat('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
            return `${datePart} в ${timePart}`;
        } catch {
            return dateStr;
        }
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
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
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
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 mb-2 border-b border-border">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Globe2Icon className="h-6 w-6 text-green-600 dark:text-green-500" />
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">Все мероприятия</h1>
                            </div>
                            <p className="text-muted-foreground text-[15px] flex items-center gap-2">
                                <TrendingUpIcon className="h-4 w-4 text-green-600/70" />
                                Подборка актуальных событий по вашим фильтрам
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className="border-green-600/30 text-green-700 bg-green-50 dark:bg-green-600/10 dark:text-green-400 px-3 py-1 font-medium text-sm rounded-md">
                                Найдено: {events.length}
                            </Badge>
                            <Badge variant="outline" className="border-border text-foreground px-3 py-1 text-sm font-medium rounded-md">
                                Страница: {filters.page}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid gap-6 grid-cols-1">
                        {events?.map((event) => (
                            <Card
                                key={event.id}
                                className="group flex flex-col md:flex-row relative overflow-hidden border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:shadow-md"
                            >
                                {/* Header Image */}
                                <div className="relative w-full md:w-[350px] lg:w-[400px] h-48 md:h-auto flex-shrink-0 bg-muted border-r border-border block overflow-hidden rounded-r-md">
                                    <img
                                        src={event.image_url || "/placeholder.svg"}
                                        alt={event.event_name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <CardContent className="flex flex-col flex-1 p-5 md:p-6 gap-4">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <Link href={`/events/${event.id}`}>
                                                <h3 className="text-2xl md:text-[26px] font-bold leading-tight group-hover:text-green-600 transition-colors line-clamp-2 break-words">
                                                    {event.event_name}
                                                </h3>
                                            </Link>
                                            <div className="flex flex-wrap gap-2">
                                                {getStatusBadge(event.event_status)}
                                                {getFormatBadge(event.format)}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] md:text-base text-muted-foreground mt-3">
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                                                <span>{parseDate(event.start_date)} - {parseDate(event.end_date)}</span>
                                            </div>

                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                                                <span className="line-clamp-1">{event.venue}</span>
                                            </div>

                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <UsersIcon className="h-5 w-5 text-muted-foreground" />
                                                <span>{event.users_count} чел.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 mt-2">
                                        <h4 className="text-lg font-semibold text-foreground">Описание</h4>
                                        <p className="text-[16px] leading-relaxed text-muted-foreground/90 line-clamp-3 md:line-clamp-4 break-words group-hover:text-white">
                                            {event.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex justify-end pt-2">
                                        <Button asChild className="text-[14px] bg-green-600 hover:bg-green-700 text-white min-w-[140px] shadow-sm">
                                            <Link href={`/events/${event.id}`}>
                                                Подробнее
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 