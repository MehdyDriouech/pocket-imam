"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Calendar, Clock } from "lucide-react"
import { type UserProgress, getProgressPercentage } from "@/lib/ablutions-data"

interface AblutionsProgressProps {
  progress: UserProgress
}

export function AblutionsProgress({ progress }: AblutionsProgressProps) {
  const progressPercentage = getProgressPercentage(progress)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Your Ablution Progress
        </CardTitle>
        <CardDescription>Track your learning journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-primary">{progress.completedSteps.length}</span>
            </div>
            <p className="text-xs text-muted-foreground">Steps Completed</p>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-accent" />
              <span className="text-lg font-bold text-accent">{progress.totalSessions}</span>
            </div>
            <p className="text-xs text-muted-foreground">Practice Sessions</p>
          </div>
        </div>

        {/* Current Status */}
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <div>
            <p className="text-sm font-medium">Current Step</p>
            <p className="text-xs text-muted-foreground">Step {progress.currentStep} of 10</p>
          </div>
          <Badge variant="secondary">{progressPercentage === 100 ? "Completed!" : "In Progress"}</Badge>
        </div>

        {/* Average Time */}
        {progress.averageTime > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Average session: {Math.round(progress.averageTime / 60)} minutes</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
