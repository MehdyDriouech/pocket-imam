"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Droplets, Settings, Bell, ArrowRight, TrendingUp } from "lucide-react"
import { PrayerTimesCard } from "@/components/prayer-times/prayer-times-card"
import { type UserProgress as AblutionsProgress, getProgressPercentage } from "@/lib/ablutions-data"
import { type PrayerProgress, prayerLessons } from "@/lib/prayer-data"
import { type UserStats, getDefaultStats } from "@/lib/progress-data"
import { checkAchievements } from "@/lib/progress-utils"
import type { Location } from "@/lib/prayer-times"

export default function HomePage() {
  const [currentTime] = useState(new Date())
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false)
  const [location, setLocation] = useState<Location | undefined>()
  const [ablutionsProgress, setAblutionsProgress] = useState<AblutionsProgress>({
    completedSteps: [],
    currentStep: 1,
    totalSessions: 0,
    averageTime: 0,
  })
  const [prayerProgress, setPrayerProgress] = useState<PrayerProgress>({
    completedLessons: [],
    currentLesson: "",
    currentRakah: 1,
    currentPosition: 0,
    totalPracticeSessions: 0,
    averageSessionTime: 0,
  })
  const [userStats, setUserStats] = useState<UserStats>(getDefaultStats())
  const [achievements, setAchievements] = useState(checkAchievements(getDefaultStats()))
  const router = useRouter()

  useEffect(() => {
    // Check if onboarding is completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (!onboardingCompleted) {
      router.push("/onboarding")
    } else {
      setIsOnboardingCompleted(true)

      // Get location from onboarding data
      const onboardingData = localStorage.getItem("onboardingData")
      if (onboardingData) {
        const data = JSON.parse(onboardingData)
        if (data.location) {
          setLocation(data.location)
        }
      }

      // Load ablutions progress
      const savedAblutionsProgress = localStorage.getItem("ablutionsProgress")
      if (savedAblutionsProgress) {
        setAblutionsProgress(JSON.parse(savedAblutionsProgress))
      }

      // Load prayer progress
      const savedPrayerProgress = localStorage.getItem("prayerProgress")
      if (savedPrayerProgress) {
        setPrayerProgress(JSON.parse(savedPrayerProgress))
      }

      const savedStats = localStorage.getItem("userStats")
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats)
        setUserStats(parsedStats)
        setAchievements(checkAchievements(parsedStats))
      }
    }
  }, [router])

  // Don't render main content until onboarding check is complete
  if (!isOnboardingCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const progress = {
    ablutions: getProgressPercentage(ablutionsProgress),
    prayers: Math.round((prayerProgress.completedLessons.length / prayerLessons.length) * 100),
    overall: Math.round(
      (getProgressPercentage(ablutionsProgress) +
        (prayerProgress.completedLessons.length / prayerLessons.length) * 100) /
        2,
    ),
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-serif">السلام عليكم</h1>
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Prayer Times Card with link to detailed view */}
        <div className="relative">
          <PrayerTimesCard location={location} />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => router.push("/prayer-times")}
          >
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-900">{userStats.currentStreak}</div>
                <div className="text-xs text-cyan-600">Série de jours</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900">{userStats.totalPrayersCompleted}</div>
                <div className="text-xs text-orange-600">Prières</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-900">{userStats.ablutionsCompleted}</div>
                <div className="text-xs text-emerald-600">Ablutions</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-900">{unlockedAchievements}</div>
                <div className="text-xs text-yellow-600">Succès</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Modules */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/ablutions")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Learn Ablutions (Wudû)
              </CardTitle>
              <CardDescription>Step-by-step guidance for proper ablution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{progress.ablutions}%</span>
                </div>
                <Progress value={progress.ablutions} className="h-2" />
                <Button className="w-full">{progress.ablutions === 0 ? "Start Learning" : "Continue Learning"}</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/prayer")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Learn Prayer (Salât)
              </CardTitle>
              <CardDescription>Guided prayers with positions and recitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{progress.prayers}%</span>
                </div>
                <Progress value={progress.prayers} className="h-2" />
                <Button className="w-full">{progress.prayers === 0 ? "Start Learning" : "Continue Learning"}</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/progress")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Your Progress
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Track your spiritual learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{progress.overall}%</span>
              </div>
              <Progress value={progress.overall} className="h-3" />

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.totalTimeSpent}</div>
                  <div className="text-xs text-muted-foreground">Minutes d'étude</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{userStats.lessonsCompleted}</div>
                  <div className="text-xs text-muted-foreground">Leçons terminées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{userStats.longestStreak}</div>
                  <div className="text-xs text-muted-foreground">Record de série</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
