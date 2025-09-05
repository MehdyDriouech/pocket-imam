"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { UserStats } from "@/lib/progress-data"
import { getProgressPercentage } from "@/lib/progress-utils"

interface StatsOverviewProps {
  stats: UserStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}min`
    }
    return `${mins}min`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-cyan-800">Prières Complétées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyan-900">{stats.totalPrayersCompleted}</div>
          <p className="text-xs text-cyan-600 mt-1">Total des salâts</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">Ablutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">{stats.ablutionsCompleted}</div>
          <p className="text-xs text-orange-600 mt-1">Wudû complétés</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">Série Actuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">{stats.currentStreak}</div>
          <p className="text-xs text-emerald-600 mt-1">jours consécutifs</p>
          <div className="mt-2">
            <Progress value={getProgressPercentage(stats.currentStreak, 30)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Temps d'Étude</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{formatTime(stats.totalTimeSpent)}</div>
          <p className="text-xs text-purple-600 mt-1">temps total</p>
        </CardContent>
      </Card>
    </div>
  )
}
