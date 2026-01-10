'use client'

import { useQuery } from "@tanstack/react-query"
import { apiEvents, Events } from "@/app/api/http/event/events"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon, CalendarCheck2 } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function MyEventsPage() {
    const { data, isPending, error } = useQuery({
        queryKey: ["myEvents", { page: 1, page_size: 12 }],
        queryFn: () => apiEvents.getParticipationsEvents({ page: 1, page_size: 12 }),
    })

    const events: Events[] = data?.events ?? []

    function parseDate(dateStr: string) {
        const date = new Date(dateStr)
        const year = date.getUTCFullYear()
        const month = date.toLocaleString('default', { month: 'long' })
        const day = date.getUTCDate()
        
        return `${day} ${month} ${year}`
    }

    if (isPending) {
        return (
            <div className="p-4 sm:p-6">
                <div className="mb-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-64 mt-2" />
                </div>
                <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <Card key={idx} className="h-full overflow-hidden flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
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
        return (
            <div className="p-6">
                <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center">
                    <p className="text-red-500 dark:text-red-400">Ошибка при загрузке мероприятий</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                <div className="relative flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                        <CalendarCheck2 className="h-4 w-4" />
                        Мои мероприятия
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">События, в которых я участвую</h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-slate-700 dark:text-slate-300">
                            Всего: {events.length}
                        </Badge>
                        {data && (
                            <Badge className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-slate-700 dark:text-slate-300">
                                Страница {data.offset / (data.count || 1) + 1}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {events.length === 0 ? (
                <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                    <CardContent className="p-12 text-center">
                        <CalendarCheck2 className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            У вас пока нет мероприятий
                        </h3>
                        <p className="text-muted-foreground">
                            Найдите интересные события и присоединитесь к участию
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/events/my/${event.id}`}
                            className="block h-full group"
                            aria-label={`Перейти к событию ${event.event_name}`}
                        >
                            <Card className="relative h-full overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                                <div className="relative h-44 sm:h-52 overflow-hidden">
                                    <img
                                        src={event.image_url || "/placeholder.svg"}
                                        alt={event.event_name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>
                                <CardContent className="p-5 flex flex-col gap-3 min-h-[180px]">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-gray-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border-gray-300 dark:border-neutral-700 font-semibold">
                                            {event.format}
                                        </Badge>
                                        {event.event_status && (
                                            <Badge variant="secondary" className="bg-gray-800 dark:bg-neutral-700 text-white border-gray-700 dark:border-neutral-600 font-semibold">
                                                {event.event_status}
                                            </Badge>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                        {event.event_name}
                                    </h3>
                                    <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300 font-medium flex-grow">
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                                            <span className="truncate break-words line-clamp-2">{event.venue}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                                            <span className="break-words">{parseDate(event.start_date)} — {parseDate(event.end_date)}</span>
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
            )}
        </div>
    )
}
