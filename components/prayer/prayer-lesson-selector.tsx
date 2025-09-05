"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle } from "lucide-react"
import { type PrayerLesson, type PrayerProgress, getPrayerProgressPercentage } from "@/lib/prayer-data"

interface PrayerLessonSelectorProps {
  lessons: PrayerLesson[]
  progress: PrayerProgress
  onSelectLesson: (lessonId: string) => void
}

export function PrayerLessonSelector({ lessons, progress, onSelectLesson }: PrayerLessonSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose a Prayer Lesson</h2>
        <p className="text-muted-foreground">Select a lesson to begin learning prayer positions</p>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => {
          const progressPercentage = getPrayerProgressPercentage(progress, lesson.id)
          const isCompleted = progress.completedLessons.includes(lesson.id)
          const isCurrent = progress.currentLesson === lesson.id

          return (
            <Card
              key={lesson.id}
              className={`cursor-pointer hover:shadow-md transition-all ${isCurrent ? "ring-2 ring-primary" : ""}`}
              onClick={() => onSelectLesson(lesson.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {lesson.name}
                    </CardTitle>
                    <CardDescription className="text-right font-arabic text-lg mt-1">
                      {lesson.arabicName}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isCompleted && (
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {isCurrent && !isCompleted && <Badge variant="secondary">Current</Badge>}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{lesson.description}</p>

                {/* Lesson Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.round(lesson.totalDuration / 60)} min
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {lesson.rakahs.length} Rakah{lesson.rakahs.length > 1 ? "s" : ""}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <Button className="w-full" variant={isCurrent ? "default" : "outline"}>
                  {isCompleted ? "Practice Again" : progressPercentage > 0 ? "Continue" : "Start Lesson"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
