"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Compass, Navigation } from "lucide-react"
import type { Location } from "@/lib/prayer-times"

interface QiblaDirectionProps {
  location?: Location
}

export function QiblaDirection({ location }: QiblaDirectionProps) {
  const [qiblaDirection, setQiblaDirection] = useState<number>(0)
  const [deviceHeading, setDeviceHeading] = useState<number>(0)
  const [isCompassSupported, setIsCompassSupported] = useState(false)

  useEffect(() => {
    // Check if device orientation is supported
    if ("DeviceOrientationEvent" in window) {
      setIsCompassSupported(true)
    }

    // Calculate Qibla direction (simplified calculation)
    // In real app, would use proper geographic calculations
    const calculateQiblaDirection = () => {
      // Mock calculation - Kaaba is approximately 120° from Paris
      setQiblaDirection(120)
    }

    calculateQiblaDirection()
  }, [location])

  const handleCompassCalibration = () => {
    if ("DeviceOrientationEvent" in window) {
      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        ;(DeviceOrientationEvent as any).requestPermission().then((response: string) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation)
          }
        })
      } else {
        window.addEventListener("deviceorientation", handleOrientation)
      }
    }
  }

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setDeviceHeading(360 - event.alpha)
    }
  }

  const relativeQiblaDirection = (qiblaDirection - deviceHeading + 360) % 360

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          Qibla Direction
        </CardTitle>
        <CardDescription>Direction to Kaaba in Mecca from {location?.city || "your location"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compass Display */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Compass Circle */}
          <div className="absolute inset-0 border-4 border-border rounded-full bg-card">
            {/* Cardinal Directions */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-foreground">
              N
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-muted-foreground">
              S
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-muted-foreground">
              W
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-muted-foreground">
              E
            </div>
          </div>

          {/* Qibla Direction Arrow */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${isCompassSupported ? relativeQiblaDirection : qiblaDirection}deg)`,
              transition: "transform 0.3s ease",
            }}
          >
            <div className="w-1 bg-primary h-20 rounded-full relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <Navigation className="h-4 w-4 text-primary fill-primary" />
              </div>
            </div>
          </div>

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
        </div>

        {/* Direction Info */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-primary">{qiblaDirection}°</div>
          <p className="text-sm text-muted-foreground">Qibla direction from {location?.city || "your location"}</p>
        </div>

        {/* Compass Calibration */}
        {isCompassSupported ? (
          <Button variant="outline" className="w-full bg-transparent" onClick={handleCompassCalibration}>
            <Compass className="mr-2 h-4 w-4" />
            Calibrate Compass
          </Button>
        ) : (
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Compass not supported on this device. Direction shown relative to North.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
