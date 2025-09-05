"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserStats } from "@/lib/progress-data"

interface WeeklyCalendarProps {
  stats: UserStats
}

export function WeeklyCalendar({ stats }: WeeklyCalendarProps) {
  const getDaysOfWeek = () => {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
    const today = new Date()
    const currentDay = today.getDay()

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - currentDay + i)
      return {
        label: days[i],
        date: date.getDate(),
        isToday: i === currentDay,
        isActive: i <= currentDay && stats.currentStreak > currentDay - i,
      }
    })
  }

  const weekDays = getDaysOfWeek()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Activité de la Semaine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-1">{day.label}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  day.isActive
                    ? "bg-emerald-500 text-white"
                    : day.isToday
                      ? "bg-gray-200 text-gray-700 border-2 border-emerald-500"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {day.date}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Série actuelle: <span className="font-semibold text-emerald-600">{stats.currentStreak} jours</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Record: {stats.longestStreak} jours</p>
        </div>
      </CardContent>
    </Card>
  )
}
