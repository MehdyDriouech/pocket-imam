"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Save } from "lucide-react"
import { type PrayerPlaylist, sourates } from "@/lib/sourates-data"

interface PlaylistCustomizerProps {
  playlist: PrayerPlaylist
  onSave: (playlist: PrayerPlaylist) => void
  onCancel: () => void
}

export function PlaylistCustomizer({ playlist, onSave, onCancel }: PlaylistCustomizerProps) {
  const [customPlaylist, setCustomPlaylist] = useState<PrayerPlaylist>({
    ...playlist,
    sourates: [...playlist.sourates],
  })

  const addSourate = (rakahNumber: number) => {
    const newSourate = {
      rakahNumber,
      sourate: sourates[0], // Default to Al-Fatiha
      isCustom: true,
    }
    setCustomPlaylist((prev) => ({
      ...prev,
      sourates: [...prev.sourates, newSourate],
    }))
  }

  const removeSourate = (index: number) => {
    setCustomPlaylist((prev) => ({
      ...prev,
      sourates: prev.sourates.filter((_, i) => i !== index),
    }))
  }

  const updateSourate = (index: number, newSourateId: number) => {
    const newSourate = sourates.find((s) => s.id === newSourateId)
    if (newSourate) {
      setCustomPlaylist((prev) => ({
        ...prev,
        sourates: prev.sourates.map((item, i) =>
          i === index ? { ...item, sourate: newSourate, isCustom: true } : item,
        ),
      }))
    }
  }

  const updateRakah = (index: number, rakahNumber: number) => {
    setCustomPlaylist((prev) => ({
      ...prev,
      sourates: prev.sourates.map((item, i) => (i === index ? { ...item, rakahNumber } : item)),
    }))
  }

  const getRakahOptions = () => {
    const rakahCount = playlist.id === "fajr" ? 2 : playlist.id === "maghrib" ? 3 : 4
    return Array.from({ length: rakahCount }, (_, i) => i + 1)
  }

  const handleSave = () => {
    const savedPlaylists = JSON.parse(localStorage.getItem("customPlaylists") || "{}")
    savedPlaylists[playlist.id] = customPlaylist
    localStorage.setItem("customPlaylists", JSON.stringify(savedPlaylists))
    onSave(customPlaylist)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Personnaliser {playlist.prayerName} - {playlist.arabicName}
            </CardTitle>
            <div className="space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuration des sourates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customPlaylist.sourates.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Rakah:</span>
                <Select
                  value={item.rakahNumber.toString()}
                  onValueChange={(value) => updateRakah(index, Number.parseInt(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getRakahOptions().map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select
                  value={item.sourate.id.toString()}
                  onValueChange={(value) => updateSourate(index, Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sourates.map((sourate) => (
                      <SelectItem key={sourate.id} value={sourate.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{sourate.name}</span>
                          <span className="text-xs text-muted-foreground font-arabic ml-2">{sourate.arabicName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Badge variant="secondary">{item.sourate.verses} v.</Badge>

              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSourate(index)}
                disabled={customPlaylist.sourates.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex justify-center pt-4">
            <Select onValueChange={(value) => addSourate(Number.parseInt(value))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ajouter une sourate" />
              </SelectTrigger>
              <SelectContent>
                {getRakahOptions().map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Rakah {num}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aperçu de la playlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {customPlaylist.sourates.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">R{item.rakahNumber}</Badge>
                  <div>
                    <p className="font-medium text-sm">{item.sourate.name}</p>
                    <p className="text-xs text-muted-foreground font-arabic">{item.sourate.arabicName}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{item.sourate.verses} versets</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
