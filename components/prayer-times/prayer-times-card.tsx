"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, RefreshCw } from "lucide-react"
import {
  calculatePrayerTimes,
  getNextPrayer,
  getTimeUntilNextPrayer,
  type PrayerTime,
  type Location,
} from "@/lib/prayer-times"

interface PrayerTimesCardProps {
  location?: Location
}

export function PrayerTimesCard({ location }: PrayerTimesCardProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null)
  const [timeUntilNext, setTimeUntilNext] = useState<string>("")
  const [currentTime, setCurrentTime] = useState(new Date())

  const defaultLocation: Location = {
    city: location?.city || "Paris",
    country: location?.country || "France",
  }

  useEffect(() => {
    const updatePrayerTimes = () => {
      const times = calculatePrayerTimes(defaultLocation)
      setPrayerTimes(times)

      const next = getNextPrayer(times)
      setNextPrayer(next)

      if (next) {
        setTimeUntilNext(getTimeUntilNextPrayer(next))
      }
    }

    updatePrayerTimes()

    // Update every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      updatePrayerTimes()
    }, 60000)

    return () => clearInterval(interval)
  }, [location?.city, location?.country])

  const handleRefresh = () => {
    const times = calculatePrayerTimes(defaultLocation)
    setPrayerTimes(times)
    setCurrentTime(new Date())
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Prayer Times</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {defaultLocation.city}, {defaultLocation.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next Prayer Alert */}
        {nextPrayer && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Next Prayer: {nextPrayer.name}</p>
                <p className="text-xs text-muted-foreground">in {timeUntilNext}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{nextPrayer.time}</p>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-5 gap-2">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.name}
              className={`text-center p-3 rounded-lg border transition-colors ${
                prayer.current
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : prayer.passed
                    ? "bg-muted text-muted-foreground border-border"
                    : "bg-card text-card-foreground border-border hover:bg-muted/50"
              }`}
            >
              <div className="text-sm font-medium mb-1">{prayer.name}</div>
              <div className="text-xs mb-2">{prayer.time}</div>
              {prayer.current && (
                <Badge variant="secondary" className="text-xs py-0">
                  Now
                </Badge>
              )}
              {prayer.passed && !prayer.current && <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>}
            </div>
          ))}
        </div>

        {/* Current Time */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Current time: {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
