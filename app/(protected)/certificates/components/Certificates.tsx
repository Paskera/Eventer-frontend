"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Award } from "lucide-react"

interface Certificate {
  id: number
  title: string
  description: string
  date: string
  type: string
}

interface CertificatesProps {
  certificates: Certificate[]
}

const typeLabel: Record<string, string> = {
  participation: "Участие",
  completion: "Курс",
  achievement: "Достижение",
}

const typeColors: Record<string, { bg: string; border: string; badge: string; accentGradient: string }> = {
  participation: {
    bg: "from-blue-500/10 via-slate-800/40 to-cyan-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    accentGradient: "from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400",
  },
  completion: {
    bg: "from-emerald-500/10 via-slate-800/40 to-teal-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    accentGradient: "from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400",
  },
  achievement: {
    bg: "from-rose-500/10 via-slate-800/40 to-pink-500/10",
    border: "border-rose-500/20 hover:border-rose-500/40",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/50",
    accentGradient: "from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400",
  },
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  if (certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-dashed border-border/40 bg-muted/20">
        <Award className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-1">Нет сертификатов</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Сертификаты будут отображаться здесь по мере их получения
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {certificates.map((cert) => {
        const colors = typeColors[cert.type] || typeColors.participation

        return (
          <Card
            key={cert.id}
            className={`relative h-full overflow-hidden border ${colors.border} bg-gradient-to-br ${colors.bg} shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] group`}
          >
            <CardContent className="p-5 flex flex-col gap-4 h-full">
              <div
                className={`relative aspect-[16/10] w-full rounded-lg border border-white/10 bg-gradient-to-br ${colors.bg} flex items-center justify-center overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                <div className="relative flex flex-col items-center justify-center gap-2 text-center px-4">
                  <Award className="h-8 w-8 text-muted-foreground/50 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-xs text-muted-foreground/70 font-medium">Сертификат</div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-base font-bold text-foreground truncate group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors"
                    title={cert.title}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium truncate mt-2" title={cert.date}>
                    {new Date(cert.date).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Badge className={`shrink-0 ${colors.badge} border font-semibold`}>
                  {typeLabel[cert.type] ?? cert.type}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-2">{cert.description}</p>

              <div className="flex justify-end mt-auto pt-2">
                <Button
                  className={`gap-2 bg-gradient-to-r ${colors.accentGradient} text-white hover:opacity-90 transition-all duration-200`}
                  onClick={() => window.open("#", "_blank")}
                >
                  <Download className="h-4 w-4" />
                  Скачать
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default Certificates
