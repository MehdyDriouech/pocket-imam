"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, CheckCircle, Clock, Lightbulb } from "lucide-react"
import type { AblutionStep } from "@/lib/ablutions-data"
import Image from "next/image"

interface StepCardProps {
  step: AblutionStep
  isActive: boolean
  isCompleted: boolean
  onComplete: () => void
  onNext: () => void
}

export function StepCard({ step, isActive, isCompleted, onComplete, onNext }: StepCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(step.duration)
  const [showTips, setShowTips] = useState(false)

  const startTimer = () => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetTimer = () => {
    setIsPlaying(false)
    setTimeLeft(step.duration)
  }

  const progressPercentage = ((step.duration - timeLeft) / step.duration) * 100

  return (
    <Card
      className={`transition-all duration-300 ${
        isActive ? "ring-2 ring-primary shadow-lg" : isCompleted ? "bg-muted/50" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {isCompleted ? <CheckCircle className="h-4 w-4" /> : step.id}
            </div>
            <div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <CardDescription className="text-right font-arabic text-lg">{step.arabicTitle}</CardDescription>
            </div>
          </div>
          {isActive && <Badge variant="default">Current</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Step Image */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
          <Image src={step.imageUrl || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{step.description}</p>

        {/* Arabic Text & Translation */}
        {step.arabicText && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-right font-arabic text-lg leading-relaxed">{step.arabicText}</p>
            {step.transliteration && <p className="text-sm italic text-muted-foreground">{step.transliteration}</p>}
            {step.translation && <p className="text-sm text-foreground">"{step.translation}"</p>}
          </div>
        )}

        {/* Timer Section */}
        {isActive && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Practice Time</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={startTimer} className="flex-1 bg-transparent">
                {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {isPlaying ? "Pause" : "Start"}
              </Button>
              <Button variant="outline" size="sm" onClick={resetTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="space-y-2">
          <Button variant="ghost" size="sm" onClick={() => setShowTips(!showTips)} className="w-full justify-start">
            <Lightbulb className="h-4 w-4 mr-2" />
            {showTips ? "Hide Tips" : "Show Tips"}
          </Button>
          {showTips && (
            <div className="bg-accent/10 p-3 rounded-lg">
              <ul className="space-y-1">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isActive && (
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onComplete}>
              Mark Complete
            </Button>
            <Button className="flex-1" onClick={onNext}>
              Next Step
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
