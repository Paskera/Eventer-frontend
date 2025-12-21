import { Metadata } from "next"

import { ProfileCard } from "@/app/(protected)/profile/components/ProfileCard"
import { Notifications } from "@/app/(protected)/profile/components/Notifications"
import { CurrentEvents } from "@/app/(protected)/profile/components/CurrentEvents"
import { ProfileTimer } from "@/app/(protected)/profile/components/ProfileTimer"
import { RoleGuard } from "@/components/role-guard"

export const metadata: Metadata = {
  title: "Профиль пользователя",
  description: "Просмотр и управление профилем пользователя",
}

export default function ProfilePage() {
  return (
    <RoleGuard>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-slate-900/10 p-6 shadow-sm">
          <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_35%),radial-gradient(circle_at_80%_0%,#8b5cf6_0,transparent_30%),radial-gradient(circle_at_50%_80%,#22d3ee_0,transparent_35%)]" />
          <div className="relative flex flex-col gap-2">
            <p className="text-sm font-medium text-indigo-500">Профиль</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Личная панель</h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Управляйте своим аккаунтом, приглашениями в команды и актуальными событиями.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <ProfileCard />
          <Notifications />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CurrentEvents />
          <ProfileTimer />
        </div>
      </div>
    </RoleGuard>
  )
}
