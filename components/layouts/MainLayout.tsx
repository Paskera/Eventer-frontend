'use client';

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthGuard } from "@/components/auth-guard"
import { usePathname } from "next/navigation"
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const routeTitles: Record<string, string> = {
        "/profile": "Профиль",
        "/events/dashboard": "Дашборд",
        "/events/all": "Все мероприятия",
        "/events/my": "Мои мероприятия",
        "/certificates": "Сертификаты",
        "/teams": "Команды",
        "/events/create ": "Создать мероприятие",
        "/events": "Детали мероприятия",
    }
    const matchKey = Object.keys(routeTitles).find((key) => pathname === key || pathname.startsWith(key + "/"))
    const pageTitle = matchKey ? routeTitles[matchKey] : "Страница"
    return (
        // <AuthGuard>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <span className="font-extrabold text-3xl">{pageTitle}</span>
                            <Separator orientation="vertical" className="mr-2 h-4" />
                        </div>
                        <div className="ml-auto flex items-center gap-3 px-4">
                            <Avatar className="h-10 w-10 border border-gray-200 bg-gradient-to-br from-slate-100 to-gray-200 text-slate-900 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-700 dark:text-slate-100">
                                {session?.user?.image ? (
                                  <AvatarImage src={session.user.image} alt={session.user.name || "profile"} />
                                ) : null}
                                <AvatarFallback className="bg-transparent text-base font-semibold">
                                  {session?.user?.name
                                    ? session.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .slice(0, 2)
                                    : <UserRound className="h-5 w-5" />}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-xl text-slate-900 dark:text-slate-100">{session?.user?.name || "Гость"}</span>
                            <ThemeToggle />
                        </div>
                    </header>
                    <main className="flex-1 transition-all duration-200 ease-linear">
                        {children}
                        <Toaster />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        // </AuthGuard>
    )
}