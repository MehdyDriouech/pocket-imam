"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Loader2 } from "lucide-react"

interface LocationSetupProps {
  onLocationSet: (location: { city: string; country: string }) => void
  onSkip: () => void
}

export function LocationSetup({ onLocationSet, onSkip }: LocationSetupProps) {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [isDetecting, setIsDetecting] = useState(false)

  const handleAutoDetect = async () => {
    setIsDetecting(true)
    // Simulate location detection
    setTimeout(() => {
      setCity("Paris")
      setCountry("France")
      setIsDetecting(false)
    }, 2000)
  }

  const handleContinue = () => {
    if (city && country) {
      onLocationSet({ city, country })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">Set Your Location</CardTitle>
          <CardDescription>We need your location to provide accurate prayer times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full bg-transparent" onClick={handleAutoDetect} disabled={isDetecting}>
            {isDetecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Auto-detect Location
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onSkip}>
              Skip for now
            </Button>
            <Button className="flex-1" onClick={handleContinue} disabled={!city || !country}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
