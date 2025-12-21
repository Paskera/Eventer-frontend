'use client'

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

  const renderSkeleton = (
    <TableBody>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )

  const isEmpty = !events?.length

  return (
    <Card className="bg-card text-card-foreground border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <CalendarClock className="h-6 w-6" />
          Текущие мероприятия
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-x-auto">
        <Table className="min-w-[320px]">
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-xs md:text-sm text-muted-foreground font-medium w-1/3">
                Мероприятие
              </TableHead>
              <TableHead className="text-xs md:text-sm text-muted-foreground font-medium w-1/3">
                Команда
              </TableHead>
              <TableHead className="text-xs md:text-sm text-muted-foreground font-medium w-1/3">
                Этап
              </TableHead>
            </TableRow>
          </TableHeader>
          {isPending
            ? renderSkeleton
            : error || isEmpty
              ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Layers className="h-4 w-4" />
                        {error ? "Не удалось загрузить события" : "Нет активных событий"}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
                )
              : (
                <TableBody>
                  {events?.map((event, index) => (
                    <TableRow key={index} className="border-border hover:bg-accent/40">
                      <TableCell className="text-sm md:text-base font-medium text-foreground truncate">
                        {event.event}
                      </TableCell>
                      <TableCell className="text-sm md:text-base text-muted-foreground">
                        <Badge
                          variant="secondary"
                          className="text-xs md:text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        >
                          {event.team}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm md:text-base text-muted-foreground truncate">
                        {event.stage}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                )}
        </Table>
      </CardContent>
    </Card>
  )
}