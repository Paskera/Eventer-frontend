"use client"

import { useMemo, useState } from "react"
import Certificates from "./components/certificates"
import { certificates } from "./data"
import { Input } from "@/components/ui/input"
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Search } from "lucide-react"

const TABS = [
  { id: "all", label: "Все" },
  { id: "participation", label: "Участие" },
  { id: "completion", label: "Курс" },
  { id: "achievement", label: "Достижения" },
]

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeType, setActiveType] = useState<string>("all")

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesType = activeType === "all" || cert.type === activeType
      const query = searchQuery.toLowerCase()
      const matchesQuery = cert.title.toLowerCase().includes(query) || cert.description.toLowerCase().includes(query)
      return matchesType && matchesQuery
    })
  }, [searchQuery, activeType])

  return (
    <RoleGuard>
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 via-amber-50/30 to-transparent dark:from-slate-950/80 dark:via-amber-950/30 dark:to-transparent border-b border-border/40">
          <div className="absolute inset-0 opacity-30 blur-3xl bg-[radial-gradient(circle_at_20%_80%,#f59e0b_0,transparent_40%),radial-gradient(circle_at_80%_20%,#d97706_0,transparent_40%)]" />
          <div className="relative p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-amber-500"></div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Сертификаты и достижения
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
                Ваши достижения и сертификаты
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Просмотрите все ваши сертификаты участия, завершения курсов и полученные достижения в одном месте
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <Badge className="gap-2 bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/50 px-3 py-1">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-semibold">Всего: {certificates.length}</span>
                </Badge>
                <Badge className="gap-2 bg-amber-100/70 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/40 px-3 py-1">
                  <span className="text-sm font-semibold">Найдено: {filteredCertificates.length}</span>
                </Badge>
              </div>
              <a href="/certificates/create">
                <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium gap-2 transition-all duration-200">
                  <Award className="h-4 w-4" />
                  Создать сертификат
                </Button>
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-xl border border-border/40 bg-gradient-to-r from-slate-50/50 to-amber-50/30 dark:from-slate-950/30 dark:to-amber-950/20">
              <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeType === tab.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveType(tab.id)}
                    className={`transition-all duration-200 ${
                      activeType === tab.id
                        ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
                        : "border-border/60 hover:bg-muted/50 dark:hover:bg-muted/30"
                    }`}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
              <div className="w-full md:w-[360px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск сертификатов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-2"
                  />
                </div>
              </div>
            </div>

            <Certificates certificates={filteredCertificates} />
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
