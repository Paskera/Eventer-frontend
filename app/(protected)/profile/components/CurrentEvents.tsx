"use client"

import { useQuery } from "@tanstack/react-query"
import { CalendarClock, Layers } from "lucide-react"

import { apiUsers } from "@/app/api/http/users/users"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CurrentEvents() {
  const {
    data: events,
    error,
    isPending,
  } = useQuery({
    queryKey: ["team_events"],
    queryFn: () => apiUsers.getCurrentEventsUser(),
  })

  const isEmpty = !events?.length

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-cyan-500" />
          Мероприятия
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 overflow-x-auto">
        <Table className="min-w-[320px]">
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Мероприятие
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Команда
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Этап
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending &&
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="border-border/20">
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))}

            {!isPending && (error || isEmpty) && (
              <TableRow className="hover:bg-transparent border-border/20">
                <TableCell colSpan={3} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Layers className="h-5 w-5 text-muted-foreground/50" />
                    <span className="text-sm text-muted-foreground">
                      {error ? "Ошибка загрузки" : "Активных мероприятий нет"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isPending &&
              events?.map((event, index) => (
                <TableRow key={index} className="border-border/20 hover:bg-muted/40 transition-colors group">
                  <TableCell className="text-sm font-medium text-foreground truncate py-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {event.event}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50"
                    >
                      {event.team}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate py-3">{event.stage}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
