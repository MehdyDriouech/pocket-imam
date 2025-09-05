"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { StepCard } from "@/components/ablutions/step-card"
import { AblutionsProgress } from "@/components/ablutions/ablutions-progress"
import { ablutionSteps, type UserProgress } from "@/lib/ablutions-data"

export default function AblutionsPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<UserProgress>({
    completedSteps: [],
    currentStep: 1,
    totalSessions: 0,
    averageTime: 0,
  })

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("ablutionsProgress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress)
    localStorage.setItem("ablutionsProgress", JSON.stringify(newProgress))
  }

  const handleStepComplete = (stepId: number) => {
    const newProgress = {
      ...progress,
      completedSteps: [...new Set([...progress.completedSteps, stepId])],
      lastCompletedDate: new Date(),
    }
    saveProgress(newProgress)
  }

  const handleNextStep = () => {
    if (progress.currentStep < ablutionSteps.length) {
      const newProgress = {
        ...progress,
        currentStep: progress.currentStep + 1,
      }
      saveProgress(newProgress)
    }
  }

  const resetProgress = () => {
    const resetProgress: UserProgress = {
      completedSteps: [],
      currentStep: 1,
      totalSessions: progress.totalSessions + 1,
      averageTime: progress.averageTime,
    }
    saveProgress(resetProgress)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Learn Ablutions (Wudû)</h1>
                <p className="text-sm text-muted-foreground">Step-by-step guidance for proper ablution</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetProgress}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AblutionsProgress progress={progress} />
            </div>
          </div>

          {/* Steps Content */}
          <div className="lg:col-span-2 space-y-6">
            {ablutionSteps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={step.id === progress.currentStep}
                isCompleted={progress.completedSteps.includes(step.id)}
                onComplete={() => handleStepComplete(step.id)}
                onNext={handleNextStep}
              />
            ))}

            {/* Completion Message */}
            {progress.completedSteps.length === ablutionSteps.length && (
              <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h2>
                <p className="text-muted-foreground mb-4">
                  You have completed all ablution steps. May Allah accept your worship.
                </p>
                <Button onClick={resetProgress}>Practice Again</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
