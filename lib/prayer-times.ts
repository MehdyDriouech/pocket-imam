// Prayer times calculation utilities
export interface PrayerTime {
  name: string
  time: string
  timestamp: Date
  passed: boolean
  current: boolean
}

export interface Location {
  city: string
  country: string
  latitude?: number
  longitude?: number
}

// Mock prayer times calculation - in real app would use proper Islamic calculation methods
export function calculatePrayerTimes(location: Location, date: Date = new Date()): PrayerTime[] {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour * 60 + currentMinute

  // Base prayer times (would be calculated based on location and date in real app)
  const baseTimes = [
    { name: "Fajr", hour: 5, minute: 30 },
    { name: "Dhuhr", hour: 12, minute: 45 },
    { name: "Asr", hour: 15, minute: 30 },
    { name: "Maghrib", hour: 18, minute: 15 },
    { name: "Isha", hour: 19, minute: 45 },
  ]

  return baseTimes.map((prayer, index) => {
    const prayerTime = prayer.hour * 60 + prayer.minute
    const nextPrayerTime =
      index < baseTimes.length - 1 ? baseTimes[index + 1].hour * 60 + baseTimes[index + 1].minute : 24 * 60 // End of day for Isha

    const timestamp = new Date(date)
    timestamp.setHours(prayer.hour, prayer.minute, 0, 0)

    return {
      name: prayer.name,
      time: `${prayer.hour.toString().padStart(2, "0")}:${prayer.minute.toString().padStart(2, "0")}`,
      timestamp,
      passed: currentTime > prayerTime,
      current: currentTime >= prayerTime && currentTime < nextPrayerTime,
    }
  })
}

export function getNextPrayer(prayerTimes: PrayerTime[]): PrayerTime | null {
  const nextPrayer = prayerTimes.find((prayer) => !prayer.passed)
  return nextPrayer || null
}

export function getCurrentPrayer(prayerTimes: PrayerTime[]): PrayerTime | null {
  return prayerTimes.find((prayer) => prayer.current) || null
}

export function getTimeUntilNextPrayer(nextPrayer: PrayerTime): string {
  const now = new Date()
  const diff = nextPrayer.timestamp.getTime() - now.getTime()

  if (diff <= 0) return "Now"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}
