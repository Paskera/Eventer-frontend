'use client'

import { useQuery } from "@tanstack/react-query"
import { apiEvents, Events } from "@/app/api/http/event/events"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon, Globe2Icon } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventsPage() {
    const { data, isPending, error } = useQuery({
        queryKey: ["Events", { page: 1, page_size: 12 }],
        queryFn: () => apiEvents.getAllEvents({ page: 1, page_size: 12 }),
    })

    const events: Events[] = data?.events ?? []

    function parseDate(dateStr: string) {
        const date = new Date(dateStr); // автоматически парсит ISO строку
        const year = date.getUTCFullYear();
        // const month = date.getUTCMonth() + 1; // месяцы от 0 до 11
        const month = date.toLocaleString('default', {month: 'long'})
        const day = date.getUTCDate();
        
        return `${day} ${month} ${year}`
    }

    if (isPending) {
        return (
            <div className="p-4 sm:p-6">
                <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-900/70 via-slate-900/60 to-emerald-800/60 p-5 text-white shadow-lg">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-64 mt-2" />
                </div>
                <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <Card key={idx} className="h-full overflow-hidden flex flex-col bg-slate-900/60 border border-white/10">
                            <Skeleton className="w-full h-44 sm:h-52" />
                            <CardContent className="p-4 sm:p-6 space-y-3 flex-1 flex flex-col">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-2/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="p-6 text-destructive">Ошибка при загрузке событий</div>
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-900/80 via-slate-900/70 to-emerald-800/70 p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_40%)] blur-2xl" />
                <div className="relative flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/70">
                        <Globe2Icon className="h-4 w-4" />
                        Дашборд мероприятий
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Обзор активных и будущих событий</h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white/15 border-white/25 text-white">Всего: {events.length}</Badge>
                        <Badge className="bg-white/15 border-white/25 text-white">Страница 1</Badge>
                    </div>
                </div>
            </div>

            <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/eventdashboard/${event.id}`}
                        className="block h-full group"
                        aria-label={`Перейти к событию ${event.event_name}`}
                    >
                        <Card className="relative h-full overflow-hidden border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                            <div className="absolute inset-0">
                                <img
                                    src={event.image_url || "/placeholder.svg"}
                                    alt={event.event_name}
                                    className="w-full h-full object-cover opacity-70"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                            </div>
                            <CardContent className="relative h-full p-5 flex flex-col justify-end gap-3">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-white/90 text-slate-900">
                                        {event.format}
                                    </Badge>
                                    {event.event_status && (
                                        <Badge variant="secondary" className="bg-emerald-500 text-emerald-950">
                                            {event.event_status}
                                        </Badge>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold leading-tight drop-shadow group-hover:text-emerald-200 transition-colors">
                                    {event.event_name}
                                </h3>
                                <div className="space-y-1 text-sm text-white/85">
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">{event.venue}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                                        <span>{parseDate(event.start_date)} — {parseDate(event.end_date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UsersIcon className="h-4 w-4 flex-shrink-0" />
                                        <span>{event.users_count ?? 0} участников</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
} 