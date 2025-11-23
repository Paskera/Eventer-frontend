'use client';

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthGuard } from "@/components/auth-guard"
import { usePathname } from "next/navigation"
import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";

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
        "/events/create": "Создать мероприятие",
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
                        <div className="ml-auto flex items-center gap-2 px-4">
                            {status === "unauthenticated" ? <CircleUserRound size={35} color="Gray"/> : <CircleUserRound size={35} color="Green"/>}
                            <span className="font-bold text-xl">{session?.user?.name}</span>
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