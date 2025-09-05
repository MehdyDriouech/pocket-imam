"use client"

import { useState, useEffect } from "react"
import { StatsOverview } from "@/components/progress/stats-overview"
import { AchievementsGrid } from "@/components/progress/achievements-grid"
import { WeeklyCalendar } from "@/components/progress/weekly-calendar"
import { type UserStats, getDefaultStats } from "@/lib/progress-data"
import { checkAchievements } from "@/lib/progress-utils"

export default function ProgressPage() {
  const [stats, setStats] = useState<UserStats>(getDefaultStats())
  const [achievements, setAchievements] = useState(checkAchievements(getDefaultStats()))

  useEffect(() => {
    // Load user stats from localStorage
    const savedStats = localStorage.getItem("userStats")
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats)
      setStats(parsedStats)
      setAchievements(checkAchievements(parsedStats))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Votre Progression</h1>
          <p className="text-gray-600">Suivez votre parcours spirituel et vos accomplissements</p>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Weekly Calendar and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WeeklyCalendar stats={stats} />
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Accomplissements</h2>
              <AchievementsGrid achievements={achievements} />
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-cyan-500 to-orange-500 rounded-lg p-6 text-center text-white">
          <p className="text-lg font-medium mb-2">
            "Et quiconque fait un effort pour Nous, Nous le guiderons certes sur Nos sentiers."
          </p>
          <p className="text-sm opacity-90">Coran 29:69</p>
        </div>
      </div>
    </div>
  )
}
