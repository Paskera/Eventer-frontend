'use client'

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
import { Badge } from "@/components/ui/badge"
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

  if (days > 0) return `${days} д. ${hours} ч.`
  if (hours > 0) return `${hours} ч. ${minutes} мин.`
  return `${minutes} мин.`
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
      toast.error("Не удалось принять приглашение")
    },
  })

  const rejectInvite = useMutation({
    mutationFn: apiInvites.rejectInvite,
    onSuccess: () => {
      toast.success("Приглашение отклонено")
      refetch()
    },
    onError: () => {
      toast.error("Не удалось отклонить приглашение")
    },
  })

  return (
    <Card className="bg-card text-card-foreground border-border h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <BellRing className="h-6 w-6" />
            Приглашения
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => refetch()} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Обновить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[480px] overflow-y-auto">
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          ))}

        {!isPending && (error || !invites?.length) && (
          <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center space-y-2">
            <AlertCircle className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {error ? "Не удалось загрузить приглашения" : "Пока нет приглашений"}
            </p>
          </div>
        )}

        {!isPending &&
          invites?.map((notification) => (
            <div
              key={notification.code}
              className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4"
            >
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm text-muted-foreground">Приглашение в команду</p>
                <p className="text-base font-semibold text-foreground truncate">
                  {notification.team.team_name}
                </p>
                <p className="text-sm text-foreground">
                  {notification.inviter.firstname} {notification.inviter.lastname}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Истекает через {formatTimeDifference(notification.expired_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      disabled={acceptInvite.isPending || rejectInvite.isPending}
                    >
                      <Check className="h-5 w-5 text-green-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Подтвердить принятие</AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите принять приглашение в команду?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col md:flex-row gap-2">
                      <AlertDialogAction
                        onClick={() => acceptInvite.mutate(notification.code)}
                        disabled={acceptInvite.isPending}
                      >
                        Принять
                      </AlertDialogAction>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      disabled={acceptInvite.isPending || rejectInvite.isPending}
                    >
                      <X className="h-5 w-5 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Отклонить приглашение?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Приглашение будет помечено как отклонённое.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col md:flex-row gap-2">
                      <AlertDialogAction
                        onClick={() => rejectInvite.mutate(notification.code)}
                        disabled={rejectInvite.isPending}
                      >
                        Отклонить
                      </AlertDialogAction>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Badge variant="outline" className="hidden sm:inline-flex">
                  {formatTimeDifference(notification.expired_at)}
                </Badge>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}