"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Calendar, Clock, BookOpen } from "lucide-react"
import { type PrayerProgress, prayerLessons, getPrayerProgressPercentage } from "@/lib/prayer-data"

interface PrayerProgressSidebarProps {
  progress: PrayerProgress
  currentLessonId?: string
}

export function PrayerProgressSidebar({ progress, currentLessonId }: PrayerProgressSidebarProps) {
  const currentLesson = currentLessonId ? prayerLessons.find((l) => l.id === currentLessonId) : null
  const currentLessonProgress = currentLessonId ? getPrayerProgressPercentage(progress, currentLessonId) : 0
  const overallProgress = Math.round((progress.completedLessons.length / prayerLessons.length) * 100)

  return (
    <div className="space-y-4">
      {/* Current Lesson Progress */}
      {currentLesson && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-4 w-4 text-primary" />
              Current Lesson
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-medium">{currentLesson.name}</h3>
              <p className="text-sm text-muted-foreground font-arabic text-right">{currentLesson.arabicName}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">{currentLessonProgress}%</span>
              </div>
              <Progress value={currentLessonProgress} className="h-2" />
            </div>
            <div className="text-xs text-muted-foreground">
              Rakah {progress.currentRakah} of {currentLesson.rakahs.length}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-4 w-4 text-accent" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lessons Completed</span>
              <span className="text-sm text-muted-foreground">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="h-3 w-3 text-primary" />
                <span className="text-lg font-bold text-primary">{progress.completedLessons.length}</span>
              </div>
              <p className="text-xs text-muted-foreground">Lessons Done</p>
            </div>

            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="h-3 w-3 text-accent" />
                <span className="text-lg font-bold text-accent">{progress.totalPracticeSessions}</span>
              </div>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
          </div>

          {/* Average Time */}
          {progress.averageSessionTime > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Avg: {Math.round(progress.averageSessionTime / 60)}min</span>
            </div>
          )}

          {/* Completed Lessons */}
          {progress.completedLessons.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Completed Lessons</h4>
              <div className="space-y-1">
                {progress.completedLessons.map((lessonId) => {
                  const lesson = prayerLessons.find((l) => l.id === lessonId)
                  return lesson ? (
                    <Badge key={lessonId} variant="secondary" className="text-xs">
                      {lesson.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
