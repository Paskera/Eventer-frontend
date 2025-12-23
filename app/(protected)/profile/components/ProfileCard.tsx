"use client"

import { Copy, Cpu, Shield } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { apiUsers, type TopCategoriesResponse } from "@/app/api/http/users/users"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileInfo {
  label: string
  value: string
  displayValue?: string
  accent?: "badge" | "mono"
}

export function ProfileCard() {
  const { data: session } = useSession()
  const { data: categories, isPending } = useQuery<TopCategoriesResponse>({
    queryKey: ["top-categories"],
    queryFn: () => apiUsers.getTopCategories(),
  })

  const shortId = session?.user_id ? `${session.user_id.substring(0, 8)}…` : "Нет ID"

  const handleCopyId = () => {
    if (!session?.user_id) return

    navigator.clipboard.writeText(session.user_id)
    toast("ID скопирован в буфер обмена", {
      description: `ID: ${session.user_id}`,
    })
  }

  if (!session) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <p className="text-muted-foreground">Пользователь не авторизован</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600/15 via-purple-500/10 to-slate-600/5 dark:from-indigo-500/20 dark:via-purple-500/15 dark:to-slate-700/10 p-6 sm:p-8 border-b border-border/40">
        <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_15%_25%,#6366f1_0,transparent_40%),radial-gradient(circle_at_85%_15%,#8b5cf6_0,transparent_35%)]" />

        <div className="relative flex flex-col sm:flex-row gap-5 sm:items-center">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-3 border-white/50 dark:border-slate-950/50 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 shadow-lg flex-shrink-0">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "")}&background=random`}
              alt="Аватар профиля"
            />
          </Avatar>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-start gap-2">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                  {session.user?.name || "Пользователь"}
                </h2>
              </div>
              <Badge className="gap-1.5 flex-shrink-0 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50">
                <Shield className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{session.role || "Роль"}</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{session.user?.email || "Email не указан"}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyId}
                className="gap-1.5 text-xs h-8 border-border/60 hover:bg-accent/50 bg-transparent"
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">ID</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold text-foreground">Топ категории</h3>
            </div>
            {isPending && (
              <Badge variant="secondary" className="text-xs">
                Загрузка...
              </Badge>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {isPending &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border/40 bg-muted/30 p-4 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}

            {!isPending && categories?.["top-categories"]?.length
              ? categories["top-categories"].map((stat, index) => (
                  <div
                    key={index}
                    className="group rounded-lg border border-border/50 bg-gradient-to-br from-indigo-50/40 to-purple-50/40 dark:from-indigo-950/30 dark:to-purple-950/20 p-4 hover:border-indigo-300/50 dark:hover:border-indigo-700/50 transition-all duration-200 hover:shadow-md cursor-pointer"
                  >
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {stat.category.name}
                    </p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {stat.count}
                    </p>
                  </div>
                ))
              : !isPending && (
                  <div className="sm:col-span-3 rounded-lg border border-dashed border-border/40 bg-muted/20 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Нет данных по категориям</p>
                  </div>
                )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
