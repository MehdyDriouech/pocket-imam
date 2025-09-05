"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Droplets, Clock, Star } from "lucide-react"

interface WelcomeScreenProps {
  onComplete: () => void
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const features = [
    {
      icon: Clock,
      title: "Prayer Times",
      description: "Get accurate prayer times based on your location",
    },
    {
      icon: Droplets,
      title: "Learn Ablutions",
      description: "Step-by-step guidance for proper wudû",
    },
    {
      icon: BookOpen,
      title: "Prayer Learning",
      description: "Interactive lessons for salât with audio guidance",
    },
    {
      icon: Star,
      title: "Track Progress",
      description: "Monitor your spiritual learning journey",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif mb-2">بسم الله الرحمن الرحيم</CardTitle>
          <CardTitle className="text-2xl">Welcome to Your Spiritual Journey</CardTitle>
          <CardDescription className="text-base">
            Learn Islamic prayers and ablutions with guided tutorials and track your progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                <div className="mx-auto mb-2 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground italic">
              "And whoever relies upon Allah - then He is sufficient for him."
            </p>
            <p className="text-xs text-muted-foreground">- Quran 65:3</p>
          </div>

          <Button className="w-full h-12 text-base" onClick={onComplete}>
            Begin Your Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
