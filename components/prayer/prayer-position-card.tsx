"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle, Volume2, VolumeX } from "lucide-react"
import type { PrayerPosition } from "@/lib/prayer-data"
import Image from "next/image"

interface PrayerPositionCardProps {
  position: PrayerPosition
  isActive: boolean
  isCompleted: boolean
  onComplete: () => void
  onNext: () => void
}

export function PrayerPositionCard({ position, isActive, isCompleted, onComplete, onNext }: PrayerPositionCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(position.duration)
  const [isMuted, setIsMuted] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (position.recitation && typeof window !== "undefined") {
      // Create audio element with text-to-speech for Arabic recitation
      const utterance = new SpeechSynthesisUtterance(position.recitation.arabic)
      utterance.lang = "ar-SA" // Arabic (Saudi Arabia)
      utterance.rate = 0.7 // Slower rate for prayer recitation
      utterance.pitch = 1

      // Store utterance reference for later use
      audioRef.current = utterance as any
    }
  }, [position.recitation])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, timeLeft])

  const startTimer = () => {
    setIsPlaying(!isPlaying)
  }

  const resetTimer = () => {
    setIsPlaying(false)
    setTimeLeft(position.duration)
  }

  const toggleAudio = () => {
    if (!position.recitation || isMuted) return

    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isAudioPlaying) {
        window.speechSynthesis.cancel()
        setIsAudioPlaying(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(position.recitation.arabic)
        utterance.lang = "ar-SA"
        utterance.rate = 0.7
        utterance.pitch = 1

        utterance.onstart = () => setIsAudioPlaying(true)
        utterance.onend = () => setIsAudioPlaying(false)
        utterance.onerror = () => setIsAudioPlaying(false)

        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const progressPercentage = ((position.duration - timeLeft) / position.duration) * 100

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
              {isCompleted ? <CheckCircle className="h-4 w-4" /> : position.id}
            </div>
            <div>
              <CardTitle className="text-lg">{position.name}</CardTitle>
              <CardDescription className="text-right font-arabic text-lg">{position.arabicName}</CardDescription>
            </div>
          </div>
          {isActive && <Badge variant="default">Current</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Position Image */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
          <Image src={position.imageUrl || "/placeholder.svg"} alt={position.name} fill className="object-cover" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{position.description}</p>

        {/* Instructions */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Instructions:</h4>
          <ul className="space-y-1">
            {position.instructions.map((instruction, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {instruction}
              </li>
            ))}
          </ul>
        </div>

        {/* Recitation */}
        {position.recitation && (
          <div className="bg-primary/10 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Recitation:</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className={isMuted ? "text-muted-foreground" : "text-foreground"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAudio}
                  disabled={isMuted}
                  className={`${isAudioPlaying ? "text-primary" : ""} ${isMuted ? "opacity-50" : ""}`}
                >
                  {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Badge variant="secondary">{position.recitation.repetitions}x</Badge>
              </div>
            </div>
            <p className="text-right font-arabic text-lg leading-relaxed">{position.recitation.arabic}</p>
            <p className="text-sm italic text-muted-foreground">{position.recitation.transliteration}</p>
            <p className="text-sm text-foreground">"{position.recitation.translation}"</p>
          </div>
        )}

        {/* Timer Section */}
        {isActive && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Hold Position</span>
              <span className="text-sm text-muted-foreground">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
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

        {/* Action Buttons */}
        {isActive && (
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onComplete}>
              Mark Complete
            </Button>
            <Button className="flex-1" onClick={onNext}>
              Next Position
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
