"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RotateCcw, BookOpen, Play } from "lucide-react"
import { PrayerLessonSelector } from "@/components/prayer/prayer-lesson-selector"
import { PrayerPositionCard } from "@/components/prayer/prayer-position-card"
import { PrayerProgressSidebar } from "@/components/prayer/prayer-progress-sidebar"
import { GuidedPrayerMode } from "@/components/prayer/guided-prayer-mode"
import { PlaylistCustomizer } from "@/components/prayer/playlist-customizer"
import { prayerLessons, prayerPositions, type PrayerProgress, type PrayerLesson } from "@/lib/prayer-data"
import { defaultPlaylists, type PrayerPlaylist } from "@/lib/sourates-data"

export default function PrayerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("learning")
  const [progress, setProgress] = useState<PrayerProgress>({
    completedLessons: [],
    currentLesson: "",
    currentRakah: 1,
    currentPosition: 0,
    totalPracticeSessions: 0,
    averageSessionTime: 0,
  })
  const [selectedLesson, setSelectedLesson] = useState<PrayerLesson | null>(null)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)

  const [selectedPlaylist, setSelectedPlaylist] = useState<PrayerPlaylist>(defaultPlaylists[0])
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [customPlaylists, setCustomPlaylists] = useState<Record<string, PrayerPlaylist>>({})

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("prayerProgress")
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setProgress(parsed)

      // If there's a current lesson, load it
      if (parsed.currentLesson) {
        const lesson = prayerLessons.find((l) => l.id === parsed.currentLesson)
        if (lesson) {
          setSelectedLesson(lesson)
          setSessionStartTime(new Date())
        }
      }
    }

    const savedPlaylists = localStorage.getItem("customPlaylists")
    if (savedPlaylists) {
      setCustomPlaylists(JSON.parse(savedPlaylists))
    }
  }, [])

  const saveProgress = (newProgress: PrayerProgress) => {
    setProgress(newProgress)
    localStorage.setItem("prayerProgress", JSON.stringify(newProgress))
  }

  const handleSelectLesson = (lessonId: string) => {
    const lesson = prayerLessons.find((l) => l.id === lessonId)
    if (!lesson) return

    setSelectedLesson(lesson)
    setSessionStartTime(new Date())

    const newProgress = {
      ...progress,
      currentLesson: lessonId,
      currentRakah: 1,
      currentPosition: 0,
      totalPracticeSessions: progress.totalPracticeSessions + 1,
    }
    saveProgress(newProgress)
  }

  const handlePositionComplete = () => {
    if (!selectedLesson) return

    const currentRakah = selectedLesson.rakahs[progress.currentRakah - 1]
    const nextPositionIndex = progress.currentPosition + 1

    if (nextPositionIndex >= currentRakah.positions.length) {
      // Move to next rakah or complete lesson
      if (progress.currentRakah >= selectedLesson.rakahs.length) {
        // Lesson completed
        const sessionTime = sessionStartTime ? Date.now() - sessionStartTime.getTime() : 0
        const newAverageTime =
          progress.totalPracticeSessions > 0
            ? (progress.averageSessionTime * (progress.totalPracticeSessions - 1) + sessionTime) /
              progress.totalPracticeSessions
            : sessionTime

        const newProgress = {
          ...progress,
          completedLessons: [...new Set([...progress.completedLessons, selectedLesson.id])],
          currentLesson: "",
          currentRakah: 1,
          currentPosition: 0,
          averageSessionTime: newAverageTime,
          lastPracticeDate: new Date(),
        }
        saveProgress(newProgress)
        setSelectedLesson(null)
      } else {
        // Move to next rakah
        const newProgress = {
          ...progress,
          currentRakah: progress.currentRakah + 1,
          currentPosition: 0,
        }
        saveProgress(newProgress)
      }
    } else {
      // Move to next position
      const newProgress = {
        ...progress,
        currentPosition: nextPositionIndex,
      }
      saveProgress(newProgress)
    }
  }

  const handleNextPosition = () => {
    handlePositionComplete()
  }

  const resetLesson = () => {
    if (!selectedLesson) return

    const newProgress = {
      ...progress,
      currentRakah: 1,
      currentPosition: 0,
    }
    saveProgress(newProgress)
    setSessionStartTime(new Date())
  }

  const backToLessons = () => {
    setSelectedLesson(null)
    const newProgress = {
      ...progress,
      currentLesson: "",
    }
    saveProgress(newProgress)
  }

  const handlePlaylistSave = (playlist: PrayerPlaylist) => {
    setSelectedPlaylist(playlist)
    setShowCustomizer(false)
    const newCustomPlaylists = { ...customPlaylists, [playlist.id]: playlist }
    setCustomPlaylists(newCustomPlaylists)
  }

  const getCurrentPlaylist = (playlistId: string): PrayerPlaylist => {
    return customPlaylists[playlistId] || defaultPlaylists.find((p) => p.id === playlistId) || defaultPlaylists[0]
  }

  if (showCustomizer) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Personnaliser la Playlist</h1>
                <p className="text-sm text-muted-foreground">Configurez vos sourates pour chaque prière</p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <PlaylistCustomizer
            playlist={selectedPlaylist}
            onSave={handlePlaylistSave}
            onCancel={() => setShowCustomizer(false)}
          />
        </main>
      </div>
    )
  }

  if (!selectedLesson && activeTab === "learning") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Learn Prayer (Salât)</h1>
                <p className="text-sm text-muted-foreground">Interactive prayer lessons and guided prayers</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Apprentissage
              </TabsTrigger>
              <TabsTrigger value="guided" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Prière Guidée
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learning">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <PrayerProgressSidebar progress={progress} />
                </div>
                <div className="lg:col-span-2">
                  <PrayerLessonSelector
                    lessons={prayerLessons}
                    progress={progress}
                    onSelectLesson={handleSelectLesson}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guided">
              <div className="space-y-6">
                {/* Prayer Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Choisir une prière</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {defaultPlaylists.map((playlist) => (
                        <Button
                          key={playlist.id}
                          variant={selectedPlaylist.id === playlist.id ? "default" : "outline"}
                          className="h-auto p-4 flex flex-col items-center space-y-2"
                          onClick={() => setSelectedPlaylist(getCurrentPlaylist(playlist.id))}
                        >
                          <span className="font-medium">{playlist.prayerName}</span>
                          <span className="text-xs font-arabic">{playlist.arabicName}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Guided Prayer Mode */}
                <GuidedPrayerMode
                  selectedPlaylist={selectedPlaylist}
                  onCustomizePlaylist={() => setShowCustomizer(true)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  }

  if (activeTab === "guided") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Learn Prayer (Salât)</h1>
                <p className="text-sm text-muted-foreground">Interactive prayer lessons and guided prayers</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Apprentissage
              </TabsTrigger>
              <TabsTrigger value="guided" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Prière Guidée
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guided">
              <div className="space-y-6">
                {/* Prayer Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Choisir une prière</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {defaultPlaylists.map((playlist) => (
                        <Button
                          key={playlist.id}
                          variant={selectedPlaylist.id === playlist.id ? "default" : "outline"}
                          className="h-auto p-4 flex flex-col items-center space-y-2"
                          onClick={() => setSelectedPlaylist(getCurrentPlaylist(playlist.id))}
                        >
                          <span className="font-medium">{playlist.prayerName}</span>
                          <span className="text-xs font-arabic">{playlist.arabicName}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Guided Prayer Mode */}
                <GuidedPrayerMode
                  selectedPlaylist={selectedPlaylist}
                  onCustomizePlaylist={() => setShowCustomizer(true)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  }

  // Get current position data
  const currentRakah = selectedLesson?.rakahs[progress.currentRakah - 1]
  const currentPositionId = currentRakah?.positions[progress.currentPosition]
  const currentPosition = prayerPositions.find((p) => p.id === currentPositionId)

  if (!currentPosition && selectedLesson) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={backToLessons}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{selectedLesson?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Rakah {progress.currentRakah} of {selectedLesson?.rakahs.length}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetLesson}>
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
              <PrayerProgressSidebar progress={progress} currentLessonId={selectedLesson?.id} />
            </div>
          </div>

          {/* Current Position */}
          <div className="lg:col-span-2">
            {currentPosition && (
              <PrayerPositionCard
                position={currentPosition}
                isActive={true}
                isCompleted={false}
                onComplete={handlePositionComplete}
                onNext={handleNextPosition}
              />
            )}

            {/* Completion Message */}
            {selectedLesson && progress.completedLessons.includes(selectedLesson.id) && (
              <div className="mt-6 text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Completed!</h2>
                <p className="text-muted-foreground mb-4">
                  Excellent work! You have completed the {selectedLesson.name} lesson.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={resetLesson} variant="outline">
                    Practice Again
                  </Button>
                  <Button onClick={backToLessons}>Choose Another Lesson</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
