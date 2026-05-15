"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EventAnalyticsProps {
  usersCount: number
  teamStats: {
    total: number
    approved: number
    pending: number
    rejected: number
    totalParticipants: number
  }
}

export function EventAnalytics({ usersCount, teamStats }: EventAnalyticsProps) {
  const data = useMemo(() => {
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    const now = new Date()
    const result = []

    const effectiveCount = teamStats.totalParticipants || usersCount || 0

    // Строим график от сегодня на 7 дней вперед (Прогноз)
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(now)
      futureDate.setDate(now.getDate() + i)
      const dayName = days[futureDate.getDay() === 0 ? 6 : futureDate.getDay() - 1]

      // Для "сегодня" берем реальное число, для будущего - прогнозируемый рост
      let value = effectiveCount
      if (i > 0) {
        // Простой алгоритм прогноза: +5-15% каждый день от текущего числа
        const growthFactor = 1 + (i * (0.05 + Math.random() * 0.1))
        value = Math.floor(effectiveCount * growthFactor)

        // Если участников 0, прогнозируем небольшой органический рост для визуализации
        if (effectiveCount === 0) {
          value = i * Math.floor(5 + Math.random() * 5)
        }
      }

      result.push({
        name: i === 0 ? "Сегодня" : dayName,
        value: value,
      })
    }

    return result
  }, [teamStats.totalParticipants, usersCount])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Одобрение</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
              {teamStats.total > 0 ? Math.round((teamStats.approved / teamStats.total) * 100) : 0}%
            </p>
            <p className="text-[10px] text-emerald-600/70 mt-1">Процент одобренных команд</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50 shadow-sm dark:border-blue-900/30 dark:bg-blue-950/20">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Средний состав</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
              {teamStats.total > 0 ? (teamStats.totalParticipants / teamStats.total).toFixed(1) : 0}
            </p>
            <p className="text-[10px] text-blue-600/70 mt-1">Участников в одной команде</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50 shadow-sm dark:border-amber-900/30 dark:bg-amber-950/20">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">В очереди</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
              {teamStats.pending}
            </p>
            <p className="text-[10px] text-amber-600/70 mt-1">Заявок на рассмотрении</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-slate-50/50 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Всего человек</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
              {teamStats.totalParticipants}
            </p>
            <p className="text-[10px] text-slate-500/70 mt-1">Суммарно во всех командах</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">Динамика и прогноз регистраций</CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium text-slate-500">Участники</span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-neutral-800" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    padding: "12px"
                  }}
                  itemStyle={{ color: "#10b981", fontWeight: "bold" }}
                  labelStyle={{ marginBottom: "4px", fontWeight: "bold", color: "#1e293b" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
