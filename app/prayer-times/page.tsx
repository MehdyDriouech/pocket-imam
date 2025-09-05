"use client"

import { useState, useEffect } from "react"
import { PrayerTimesCard } from "@/components/prayer-times/prayer-times-card"
import { QiblaDirection } from "@/components/prayer-times/qibla-direction"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Location } from "@/lib/prayer-times"

export default function PrayerTimesPage() {
  const [location, setLocation] = useState<Location | undefined>()
  const router = useRouter()

  useEffect(() => {
    // Get location from onboarding data
    const onboardingData = localStorage.getItem("onboardingData")
    if (onboardingData) {
      const data = JSON.parse(onboardingData)
      if (data.location) {
        setLocation(data.location)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Prayer Times</h1>
              <p className="text-sm text-muted-foreground">Today's schedule and Qibla direction</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <PrayerTimesCard location={location} />
        <QiblaDirection location={location} />
      </main>
    </div>
  )
}
