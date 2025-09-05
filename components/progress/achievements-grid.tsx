"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Achievement } from "@/lib/progress-data"

interface AchievementsGridProps {
  achievements: Achievement[]
}

export function AchievementsGrid({ achievements }: AchievementsGridProps) {
  const getCategoryColor = (category: Achievement["category"]) => {
    switch (category) {
      case "ablutions":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "prayer":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "consistency":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "learning":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryLabel = (category: Achievement["category"]) => {
    switch (category) {
      case "ablutions":
        return "Ablutions"
      case "prayer":
        return "Prière"
      case "consistency":
        return "Constance"
      case "learning":
        return "Apprentissage"
      default:
        return "Général"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={`transition-all duration-200 ${
            achievement.unlocked
              ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300 shadow-md"
              : "bg-gray-50 border-gray-200 opacity-75"
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="text-2xl">{achievement.icon}</div>
              <Badge className={getCategoryColor(achievement.category)}>{getCategoryLabel(achievement.category)}</Badge>
            </div>
            <CardTitle className={`text-lg ${achievement.unlocked ? "text-yellow-900" : "text-gray-700"}`}>
              {achievement.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm mb-3 ${achievement.unlocked ? "text-yellow-800" : "text-gray-600"}`}>
              {achievement.description}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={achievement.unlocked ? "text-yellow-800" : "text-gray-600"}>Progrès</span>
                <span className={`font-medium ${achievement.unlocked ? "text-yellow-900" : "text-gray-700"}`}>
                  {achievement.progress}/{achievement.requirement}
                </span>
              </div>
              <Progress value={(achievement.progress / achievement.requirement) * 100} className="h-2" />
            </div>
            {achievement.unlocked && (
              <div className="mt-3 text-center">
                <Badge className="bg-yellow-500 text-yellow-50 border-yellow-600">🏆 Débloqué !</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
