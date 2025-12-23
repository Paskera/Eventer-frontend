import { RoleGuard } from "@/components/role-guard"
import { ProfileCard } from "@/app/(protected)/profile/components/ProfileCard"
import { CurrentEvents } from "@/app/(protected)/profile/components/CurrentEvents"
import { Notifications } from "@/app/(protected)/profile/components/Notifications"
import { ProfileTimer } from "@/app/(protected)/profile/components/ProfileTimer"

export default function ProfilePage() {
  return (
    <RoleGuard>
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 via-indigo-50/30 to-transparent dark:from-slate-950/80 dark:via-indigo-950/30 dark:to-transparent border-b border-border/40">
          <div className="absolute inset-0 opacity-30 blur-3xl bg-[radial-gradient(circle_at_20%_80%,#6366f1_0,transparent_40%),radial-gradient(circle_at_80%_20%,#8b5cf6_0,transparent_40%)]" />
          <div className="relative p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-indigo-500"></div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Профиль пользователя
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
                Личная панель
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Управляйте своим профилем, приглашениями в команды и отслеживайте активные события
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Profile & Events */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <ProfileCard />
              <CurrentEvents />
            </div>

            {/* Right Column - Notifications & Timer */}
            <div className="space-y-6 lg:space-y-8">
              <Notifications />
              <ProfileTimer />
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
