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
        <div className="relative overflow-hidden bg-white border-b border-gray-200 dark:bg-neutral-900 dark:border-neutral-800">
          <div className="relative p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Сертификаты и достижения
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 text-balance leading-tight">
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
                <Badge className="gap-2 bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border-gray-300 dark:border-neutral-700 px-3 py-1">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-semibold">Всего: {certificates.length}</span>
                </Badge>
                <Badge className="gap-2 bg-gray-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border-gray-300 dark:border-neutral-700 px-3 py-1">
                  <span className="text-sm font-semibold">Найдено: {filteredCertificates.length}</span>
                </Badge>
              </div>
              <a href="/certificates/create">
                <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium gap-2 transition-all duration-200">
                  <Award className="h-4 w-4" />
                  Создать сертификат
                </Button>
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeType === tab.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveType(tab.id)}
                    className={`transition-all duration-200 ${
                      activeType === tab.id
                        ? "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100"
                        : "border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
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
