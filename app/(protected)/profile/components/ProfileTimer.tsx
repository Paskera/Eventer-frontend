"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Clock, Timer, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"

import { apiUsers } from "@/app/api/http/users/users"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileTimer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [countdown, setCountdown] = useState<string>("")

  const {
    data: stages,
    error,
    isPending,
  } = useQuery({
    queryKey: ["stages"],
    queryFn: () => apiUsers.getUpcomingStages(),
  })

  const currentStage = stages?.stages[currentIndex]

  useEffect(() => {
    if (!currentStage) return

    // Initial render
    setCountdown(formatTimeDifference(currentStage.start_date))

    const interval = setInterval(() => {
      setCountdown(formatTimeDifference(currentStage.start_date))
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStage])

  function parseDate(dateStr: string): Date {
    const [datePart, timePart] = dateStr.split(" ")
    const [day, month, year] = datePart.split(".").map(Number)
    const [hours, minutes, seconds] = timePart.split(":").map(Number)
    return new Date(year, month - 1, day, hours, minutes, seconds)
  }

  function formatTimeDifference(startDateStr: string): string {
    const startDate = parseDate(startDateStr)
    const now = new Date()
    const diffMs = startDate.getTime() - now.getTime()

    if (isNaN(diffMs)) return "Ошибка даты"
    if (diffMs <= 0) return "Начато"

    const diffSeconds = Math.floor(diffMs / 1000)
    const days = Math.floor(diffSeconds / (60 * 60 * 24))
    const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / 3600)
    const minutes = Math.floor((diffSeconds % 3600) / 60)
    const seconds = diffSeconds % 60

    return [
      days > 0 ? `${days}д` : "",
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":")
  }

  const handleNext = () => {
    if (stages && currentIndex < stages.stages.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  if (isPending) {
    return (
      <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <CardHeader className="border-b border-gray-200 dark:border-neutral-800">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Таймер
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !currentStage) {
    return (
      <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <CardHeader className="border-b border-gray-200 dark:border-neutral-800">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Таймер
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center p-6">
          <AlertTriangle className="h-5 w-5 text-muted-foreground/60" />
          <p className="text-sm text-muted-foreground">{error ? "Ошибка загрузки" : "Этапы не найдены"}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Таймер
          </CardTitle>
          <Badge
            variant="secondary"
            className="text-xs bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border-gray-300 dark:border-neutral-700 whitespace-nowrap"
          >
            Этап {currentIndex + 1} / {stages?.stages.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        <div className="text-center space-y-1.5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Следующий этап</p>
          <p className="text-base font-bold text-foreground truncate px-2 text-balance">{currentStage.title}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-neutral-800 px-4 py-3 border border-gray-200 dark:border-neutral-700 shadow-sm">
            <Timer className="h-4 w-4 text-gray-700 dark:text-gray-300 flex-shrink-0" />
            <span className="text-xl sm:text-2xl font-mono font-bold text-slate-900 dark:text-slate-100">{countdown}</span>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)] flex-shrink-0" />
        </div>

        <p className="text-xs text-center text-muted-foreground">Время до начала</p>

        <div className="flex items-center gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="gap-1.5 h-8 border-border/50 hover:bg-accent/50 flex-1 text-xs bg-transparent"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Назад</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === (stages?.stages.length ?? 0) - 1}
            className="gap-1.5 h-8 border-border/50 hover:bg-accent/50 flex-1 text-xs bg-transparent"
          >
            <span className="hidden sm:inline">Далее</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
