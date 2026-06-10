"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AlertCircle, BellRing, Check, RefreshCcw } from "lucide-react"

import { apiNotifications, Notification } from "@/app/api/http/notifications/notifications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function Notifications() {
  const queryClient = useQueryClient()

  const {
    data: notifications,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiNotifications.getMyNotifications(),
  })

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiNotifications.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      queryClient.invalidateQueries({ queryKey: ["notificationsCount"] })
    },
  })

  const markAllMutation = useMutation({
    mutationFn: () => apiNotifications.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      queryClient.invalidateQueries({ queryKey: ["notificationsCount"] })
    },
  })

  const hasUnread = notifications?.some((n) => !n.is_read)

  return (
    <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <BellRing className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Уведомления
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasUnread && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAllMutation.mutate()}
                disabled={markAllMutation.isPending}
                className="h-8 text-xs text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Check className="mr-1 h-3.5 w-3.5" />
                Прочитать все
              </Button>
            )}
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
        </div>
      </CardHeader>

      <CardContent className="p-0 max-h-[500px] overflow-y-auto divide-y divide-border/50">
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 sm:px-6 bg-muted/5">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2 min-w-0">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}

        {!isPending && !notifications?.length && (
          <div className="p-8 sm:p-12 text-center space-y-2">
            <AlertCircle className="mx-auto h-6 w-6 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Нет уведомлений</p>
          </div>
        )}

        {!isPending &&
          notifications?.map((notification: Notification) => (
            <div
              key={notification.id}
              onClick={() => !notification.is_read && markAsReadMutation.mutate(notification.id)}
              className={cn(
                "group relative p-4 sm:px-6 transition-colors duration-200 cursor-pointer",
                notification.is_read
                  ? "bg-transparent hover:bg-muted/40"
                  : "bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20"
              )}
            >
              {!notification.is_read && (
                <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
              )}
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                  notification.is_read 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)] dark:shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                )}>
                  <BellRing className={cn("h-5 w-5", !notification.is_read && "animate-pulse")} />
                </div>
                
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <p className={cn(
                      "text-sm font-bold leading-none tracking-tight transition-colors",
                      notification.is_read 
                        ? "text-foreground/80 group-hover:text-primary" 
                        : "text-foreground"
                    )}>
                      {notification.title}
                    </p>
                    <p className="text-[11px] font-medium text-muted-foreground/70 flex-shrink-0 whitespace-nowrap">
                      {new Date(notification.created_at).toLocaleString("ru", {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).replace(',', '')}
                    </p>
                  </div>
                  <p className={cn(
                    "text-sm leading-relaxed break-words",
                    notification.is_read ? "text-muted-foreground/80" : "text-muted-foreground"
                  )}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}
