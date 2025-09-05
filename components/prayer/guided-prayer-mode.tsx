"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, Settings, Volume2, VolumeX, SkipForward } from "lucide-react"
import Image from "next/image"
import { completePrayerLessons } from "@/lib/prayer-data"
import { sourates } from "@/lib/sourates-data"

interface GuidedPrayerModeProps {
  selectedPrayer: string
  onCustomizePlaylist: () => void
}

export function GuidedPrayerMode({ selectedPrayer, onCustomizePlaylist }: GuidedPrayerModeProps) {
  const [currentRakahIndex, setCurrentRakahIndex] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [autoMode, setAutoMode] = useState(false)
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  const prayerLesson = completePrayerLessons.find((lesson) => lesson.id === selectedPrayer) || completePrayerLessons[0]
  const currentRakah = prayerLesson.rakahs[currentRakahIndex]
  const currentStep = currentRakah.steps[currentStepIndex]
  const totalSteps = prayerLesson.rakahs.reduce((sum, rakah) => sum + rakah.steps.length, 0)
  const completedSteps =
    prayerLesson.rakahs.slice(0, currentRakahIndex).reduce((sum, rakah) => sum + rakah.steps.length, 0) +
    currentStepIndex

  const getCurrentSourate = () => {
    if (currentStep.name === "Al-Fatiha") {
      return sourates.find((s) => s.id === 1) // Al-Fatiha
    } else if (currentStep.name === "Additional Surah") {
      return sourates.find((s) => s.id === currentRakah.sourates.additional)
    }
    return null
  }

  const currentSourate = getCurrentSourate()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (autoMode) {
              handleNext()
            } else {
              setIsPlaying(false)
            }
            return 0
          }
          return prev + 100 / (currentStep.duration * 10) // Progress based on step duration
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStepIndex, currentRakahIndex, autoMode, currentStep.duration])

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (currentUtterance) {
        speechSynthesis.cancel()
        setCurrentUtterance(null)
      }
    } else {
      if (!isMuted) {
        let textToSpeak = currentStep.recitation.arabic
        if (currentSourate && (currentStep.name === "Al-Fatiha" || currentStep.name === "Additional Surah")) {
          textToSpeak = currentSourate.text.arabic
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak)
        utterance.lang = "ar-SA"
        utterance.rate = 0.5
        utterance.pitch = 1.0
        utterance.volume = 1.0

        utterance.onstart = () => {
          setIsPlaying(true)
          console.log("[v0] Started speech synthesis for:", currentStep.name)
        }

        utterance.onend = () => {
          setIsPlaying(false)
          setCurrentUtterance(null)
          setProgress(100)
          console.log("[v0] Finished speech synthesis")

          if (autoMode) {
            setTimeout(() => handleNext(), 1000)
          }
        }

        utterance.onerror = (event) => {
          console.log("[v0] Speech synthesis error:", event.error)
          setIsPlaying(false)
          setCurrentUtterance(null)
        }

        setCurrentUtterance(utterance)
        speechSynthesis.speak(utterance)
      } else {
        setIsPlaying(true)
      }
    }
  }

  const handleNext = () => {
    if (currentStepIndex < currentRakah.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else if (currentRakahIndex < prayerLesson.rakahs.length - 1) {
      setCurrentRakahIndex(currentRakahIndex + 1)
      setCurrentStepIndex(0)
    }
    setProgress(0)
    setIsPlaying(false)
    if (currentUtterance) {
      speechSynthesis.cancel()
      setCurrentUtterance(null)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    } else if (currentRakahIndex > 0) {
      setCurrentRakahIndex(currentRakahIndex - 1)
      setCurrentStepIndex(prayerLesson.rakahs[currentRakahIndex - 1].steps.length - 1)
    }
    setProgress(0)
    setIsPlaying(false)
    if (currentUtterance) {
      speechSynthesis.cancel()
      setCurrentUtterance(null)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted && currentUtterance) {
      speechSynthesis.cancel()
      setCurrentUtterance(null)
      setIsPlaying(false)
    }
  }

  const isLastStep =
    currentRakahIndex === prayerLesson.rakahs.length - 1 && currentStepIndex === currentRakah.steps.length - 1
  const isFirstStep = currentRakahIndex === 0 && currentStepIndex === 0

  return (
    <div className="space-y-6">
      {/* Prayer Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-primary">
                {prayerLesson.name} - {prayerLesson.arabicName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Mode prière guidée • Rakah {currentRakahIndex + 1}/{prayerLesson.rakahs.length} • Étape{" "}
                {currentStepIndex + 1}/{currentRakah.steps.length}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Switch id="auto-mode" checked={autoMode} onCheckedChange={setAutoMode} />
                <label htmlFor="auto-mode" className="text-sm font-medium">
                  Mode auto
                </label>
              </div>
              <Button variant="outline" size="sm" onClick={onCustomizePlaylist}>
                <Settings className="h-4 w-4 mr-2" />
                Personnaliser
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Position Display */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Position de prière</CardTitle>
            <p className="text-sm text-muted-foreground">{currentStep.arabicName}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden border">
              <Image
                src={currentStep.imageUrl || "/placeholder.svg"}
                alt={currentStep.name}
                fill
                className="object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/prayer-position.png"
                }}
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">{currentStep.name}</p>
              <p className="text-xs text-muted-foreground">{currentStep.description}</p>
              {isPlaying && (
                <Badge variant="secondary" className="animate-pulse">
                  En cours de récitation
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Display */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {currentStep.name} - {currentStep.arabicName}
                </CardTitle>
                {currentSourate && (
                  <p className="text-sm text-muted-foreground font-arabic">{currentSourate.arabicName}</p>
                )}
              </div>
              <Badge variant="secondary">
                {currentStep.recitation.repetitions}x répétition{currentStep.recitation.repetitions > 1 ? "s" : ""}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Arabic Text */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-lg font-arabic text-right leading-relaxed">
                {currentSourate ? currentSourate.text.arabic : currentStep.recitation.arabic}
              </p>
            </div>

            {/* Transliteration */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 italic">
                {currentSourate ? currentSourate.text.transliteration : currentStep.recitation.transliteration}
              </p>
            </div>

            {/* Translation */}
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                {currentSourate ? currentSourate.text.translation : currentStep.recitation.translation}
              </p>
            </div>

            {/* Instructions */}
            {currentStep.instructions.length > 0 && (
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">Instructions:</h4>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  {currentStep.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progression de l'étape</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progression totale</span>
                <span>{Math.round((completedSteps / totalSteps) * 100)}%</span>
              </div>
              <Progress value={(completedSteps / totalSteps) * 100} className="h-1" />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <Button variant="outline" size="sm" onClick={handlePrevious} disabled={isFirstStep}>
                Précédent
              </Button>

              <Button size="lg" onClick={handlePlay} className="px-8">
                {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                {isPlaying ? "Pause" : "Réciter"}
              </Button>

              <Button variant="outline" size="sm" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Button variant="outline" size="sm" onClick={handleNext} disabled={isLastStep}>
                {autoMode ? <SkipForward className="h-4 w-4" /> : "Suivant"}
              </Button>
            </div>

            {autoMode && (
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  Mode automatique activé - Progression automatique
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Prayer Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Structure de la prière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prayerLesson.rakahs.map((rakah, rakahIndex) => (
              <div key={rakah.id} className="space-y-2">
                <h4 className="font-medium text-sm flex items-center space-x-2">
                  <Badge variant={rakahIndex === currentRakahIndex ? "default" : "secondary"}>{rakah.name}</Badge>
                  <span className="text-muted-foreground">Al-Fatiha + Sourate {rakah.sourates.additional}</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {rakah.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className={`p-2 rounded text-xs text-center border ${
                        rakahIndex === currentRakahIndex && stepIndex === currentStepIndex
                          ? "bg-primary text-primary-foreground border-primary"
                          : rakahIndex < currentRakahIndex ||
                              (rakahIndex === currentRakahIndex && stepIndex < currentStepIndex)
                            ? "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                            : "bg-muted/30"
                      }`}
                    >
                      {step.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
