'use client'

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

    if (isNaN(diffMs)) return "Некорректная дата"
    if (diffMs <= 0) return "Уже началось"

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
      <Card className="bg-card text-card-foreground border-border h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Таймер
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-14 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !currentStage) {
    return (
      <Card className="bg-card text-card-foreground border-border h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Таймер
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {error ? "Не удалось загрузить ближайшие этапы" : "Ближайшие этапы не найдены"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card text-card-foreground border-border h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Таймер
          </CardTitle>
          <Badge variant="secondary">Этап {currentIndex + 1} / {stages?.stages.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4 py-6">
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">Следующий этап</p>
          <p className="text-lg font-semibold text-foreground">{currentStage.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-3 shadow-inner">
            <Timer className="h-5 w-5 text-indigo-500" />
            <span className="text-2xl md:text-3xl font-mono font-bold">{countdown}</span>
          </div>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        </div>

        <p className="text-xs text-muted-foreground">Время до начала этапа</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Назад
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === (stages?.stages.length ?? 0) - 1}
            className="gap-1"
          >
            Далее
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}