'use client'

import { Copy, Cpu, Shield, User } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { apiUsers, TopCategoriesResponse } from "@/app/api/http/users/users"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileInfo {
  label: string
  value: string
  displayValue?: string
  accent?: "badge" | "mono"
}

export function ProfileCard() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Card className="w-full bg-card text-card-foreground border-border shadow-sm">
        <CardContent className="p-6">
          <p className="text-muted-foreground">Пользователь не авторизован</p>
        </CardContent>
      </Card>
    )
  }

  const { data: categories, isPending } = useQuery<TopCategoriesResponse>({
    queryKey: ["top-categories"],
    queryFn: () => apiUsers.getTopCategories(),
  })

  const shortId = session.user_id ? `${session.user_id.substring(0, 8)}…` : "Нет ID"

  const info: ProfileInfo[] = [
    { label: "ID", value: session.user_id || "—", displayValue: shortId, accent: "mono" },
    { label: "Роль", value: session.role || "—", accent: "badge" },
    { label: "Email", value: session.user?.email || "—" },
  ]

  const handleCopyId = () => {
    if (!session.user_id) return

    const copyToClipboard = () => {
      navigator.clipboard.writeText(session.user_id)
      toast("ID скопирован", {
        description: `ID: ${session.user_id} скопирован в буфер обмена`,
        action: {
          label: "Скопировать",
          onClick: copyToClipboard,
        },
      })
    }

    copyToClipboard()
  }

  return (
    <Card className="w-full bg-card text-card-foreground border-border shadow-sm overflow-hidden pt-0 pb-6">
      <div className="relative overflow-hidden rounded-b-none rounded-t-2xl border-b border-border bg-gradient-to-r from-indigo-600/10 via-slate-900/40 to-purple-700/10 p-5">
        <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_10%_20%,#6366f1_0,transparent_35%),radial-gradient(circle_at_80%_0%,#8b5cf6_0,transparent_30%)]" />
        <div className="relative flex flex-col sm:flex-row gap-4 sm:items-center">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-white/40 bg-white/30 shadow-md">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "")}&background=random`}
              alt="Profile picture"
            />
          </Avatar>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground truncate">
                {session.user?.name || "Пользователь"}
              </h2>
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-4 w-4" />
                {session.role || "Роль не задана"}
              </Badge>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">{session.user?.email || "Нет email"}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyId} className="gap-2">
                <Copy className="h-4 w-4" />
                Скопировать ID
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Статистика участия
            </h3>
            {isPending && <Badge variant="secondary">Загрузка...</Badge>}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {isPending &&
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/70 bg-gradient-to-br from-slate-900/30 via-slate-800/10 to-indigo-700/10 p-3 shadow-sm"
                >
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}

            {!isPending && categories?.["top-categories"]?.length
              ? categories["top-categories"].map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/70 bg-gradient-to-br from-indigo-600/10 via-slate-900/10 to-cyan-500/10 p-4 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1 truncate">
                      {stat.category.name}
                    </p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                ))
              : !isPending && (
                  <div className="sm:col-span-3 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
                    Нет данных по категориям участия
                  </div>
                )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}