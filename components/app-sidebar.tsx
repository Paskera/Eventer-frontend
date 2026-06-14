"use client";

import Image from "next/image"
import Link from "next/link"
import {
  GalleryVerticalEnd,
  LifeBuoy,
  File,
  GraduationCap,
  Send,
  UserRound,
  PlusCircle,
  ClipboardList,
  Users
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { ROLES } from "@/app/config/roles"

const data = {
  navSecondary: [
    {
      title: "Поддержка",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Обратная связь",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Профиль",
      url: "/profile",
      icon: UserRound,
      allowedRoles: [ROLES.USER, ROLES.ORGANAIZER, ROLES.ADMIN],
    },
    {
      name: "Дашборд",
      url: "/events/dashboard", // Using this for organizer dashboard
      icon: ClipboardList,
      allowedRoles: [ROLES.ORGANAIZER, ROLES.ADMIN],
    },
    {
      name: "Все мероприятия",
      url: "/events/all",
      icon: GalleryVerticalEnd,
      allowedRoles: [ROLES.USER, ROLES.ORGANAIZER, ROLES.ADMIN],
    },
    {
      name: "Мои мероприятия",
      url: "/events/my",
      icon: GraduationCap,
      allowedRoles: [ROLES.USER, ROLES.ORGANAIZER, ROLES.ADMIN],
    },
    {
      name: "Создать мероприятие",
      url: "/events/create",
      icon: PlusCircle,
      allowedRoles: [ROLES.ORGANAIZER, ROLES.ADMIN],
    },
    {
      name: "Сертификаты",
      url: "/certificates",
      icon: File,
      allowedRoles: [ROLES.USER, ROLES.ORGANAIZER, ROLES.ADMIN],
    },
    {
      name: "Модерация ивентов",
      url: "/admin/events",
      icon: ClipboardList,
      allowedRoles: [ROLES.ADMIN],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  
  const userRole = session?.role?.toUpperCase() || ROLES.USER;

  const filteredProjects = data.projects.filter(project => {
    return project.allowedRoles.includes(userRole as keyof typeof ROLES | "ADMIN" | "USER" | "ORGANAIZER");
  });

  return (
    // <Sidebar variant="inset" collapsible="icon" className="transition-all duration-200 ease-linear" {...props}>
    <Sidebar variant="inset" collapsible="icon" className="transition-all duration-200 ease-linear" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center rounded-full bg-gray-200 font-bold text-xl mx-auto my-2 w-10 h-10 min-w-[40px] min-h-[40px] group-data-[state=collapsed]/sidebar:w-6 group-data-[state=collapsed]/sidebar:h-6 group-data-[state=collapsed]/sidebar:min-w-[24px] group-data-[state=collapsed]/sidebar:min-h-[24px] group-data-[state=collapsed]/sidebar:text-base overflow-visible">
                  H
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Horizon</span>
                  <span className="truncate text-xs">Horizon</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={filteredProjects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
