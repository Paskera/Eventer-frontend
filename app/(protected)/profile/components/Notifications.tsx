"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { AlertCircle, BellRing, Check, Clock, RefreshCcw, X } from "lucide-react"
import { toast } from "sonner"

import { apiInvites } from "@/app/api/http/invites/invites"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function parseDate(dateStr: string) {
  const date = new Date(dateStr)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()

  return new Date(year, month - 1, day, hours, minutes, seconds)
}

function formatTimeDifference(startDateStr: string): string {
  const startDate = parseDate(startDateStr)
  const now = new Date()
  const diffMs = startDate.getTime() - now.getTime()

  if (isNaN(diffMs)) return "Некорректная дата"
  if (diffMs <= 0) return "Истекло"

  const diffSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(diffSeconds / (60 * 60 * 24))
  const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / 3600)
  const minutes = Math.floor((diffSeconds % 3600) / 60)

  if (days > 0) return `${days}д ${hours}ч`
  if (hours > 0) return `${hours}ч ${minutes}м`
  return `${minutes}м`
}

export function Notifications() {
  const {
    data: invites,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invites"],
    queryFn: () => apiInvites.getInvites(),
  })

  const acceptInvite = useMutation({
    mutationFn: apiInvites.acceptInvite,
    onSuccess: () => {
      toast.success("Приглашение принято")
      refetch()
    },
    onError: () => {
      toast.error("Ошибка при принятии приглашения")
    },
  })

  const rejectInvite = useMutation({
    mutationFn: apiInvites.rejectInvite,
    onSuccess: () => {
      toast.success("Приглашение отклонено")
      refetch()
    },
    onError: () => {
      toast.error("Ошибка при отклонении приглашения")
    },
  })

  return (
    <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <BellRing className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Приглашения
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5 h-8 text-xs hover:bg-accent/50"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Обновить</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-3">
        {isPending &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border/40 p-4 bg-muted/20">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2 min-w-0">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}

        {!isPending && !invites?.length && (
          <div className="rounded-lg border border-dashed border-border/40 bg-muted/20 p-6 text-center space-y-2">
            <AlertCircle className="mx-auto h-5 w-5 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">Приглашений нет</p>
          </div>
        )}

        {!isPending &&
          invites?.map((notification) => (
            <div
              key={notification.code}
              className="group rounded-lg border border-border/40 bg-gradient-to-r from-amber-50/40 to-orange-50/40 dark:from-amber-950/20 dark:to-orange-950/10 p-4 hover:border-amber-300/50 dark:hover:border-amber-700/50 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Приглашение</p>
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                    {notification.team.team_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">от {notification.inviter.firstname}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span>{formatTimeDifference(notification.expired_at)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-950/40"
                        title="Принять"
                        disabled={acceptInvite.isPending || rejectInvite.isPending}
                      >
                        <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Принять приглашение?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Вы будете добавлены в команду {notification.team.team_name}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => acceptInvite.mutate(notification.code)}
                          disabled={acceptInvite.isPending}
                        >
                          Принять
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-950/40"
                        title="Отклонить"
                        disabled={acceptInvite.isPending || rejectInvite.isPending}
                      >
                        <X className="h-4 w-4 text-red-600 dark:text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Отклонить приглашение?</AlertDialogTitle>
                        <AlertDialogDescription>Приглашение будет отклонено и удалено</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => rejectInvite.mutate(notification.code)}
                          disabled={rejectInvite.isPending}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Отклонить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}
