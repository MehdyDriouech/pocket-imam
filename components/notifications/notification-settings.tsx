"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Volume2, Vibrate, Award, Droplets, Heart } from "lucide-react"
import {
  type NotificationSettings,
  defaultNotificationSettings,
  requestNotificationPermission,
} from "@/lib/notifications"

interface NotificationSettingsProps {
  onSettingsChange: (settings: NotificationSettings) => void
}

export function NotificationSettingsComponent({ onSettingsChange }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>(defaultNotificationSettings)
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem("notificationSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Check notification permission
    setPermissionGranted(Notification.permission === "granted")
  }, [])

  const updateSetting = <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("notificationSettings", JSON.stringify(newSettings))
    onSettingsChange(newSettings)
  }

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission()
    setPermissionGranted(granted)
    if (!granted) {
      alert(
        "Les notifications sont nécessaires pour les rappels de prière. Veuillez les activer dans les paramètres de votre navigateur.",
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Permission Status */}
      <Card
        className={`border-2 ${permissionGranted ? "border-emerald-200 bg-emerald-50" : "border-orange-200 bg-orange-50"}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Statut des Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {permissionGranted ? (
            <div className="flex items-center gap-2 text-emerald-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Notifications activées</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Notifications désactivées</span>
              </div>
              <Button onClick={handleRequestPermission} className="w-full">
                Activer les Notifications
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prayer Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-cyan-600" />
            Rappels de Prière
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Rappels de prière</div>
              <div className="text-sm text-muted-foreground">Recevoir des notifications avant chaque prière</div>
            </div>
            <Switch
              checked={settings.prayerReminders}
              onCheckedChange={(checked) => updateSetting("prayerReminders", checked)}
            />
          </div>

          {settings.prayerReminders && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Temps d'avance</label>
              <Select
                value={settings.reminderMinutes.toString()}
                onValueChange={(value) => updateSetting("reminderMinutes", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Other Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Autres Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Droplets className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium">Rappels d'ablutions</div>
                <div className="text-sm text-muted-foreground">Rappels pour faire les ablutions</div>
              </div>
            </div>
            <Switch
              checked={settings.ablutionReminders}
              onCheckedChange={(checked) => updateSetting("ablutionReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-4 w-4 text-pink-600" />
              <div>
                <div className="font-medium">Motivation quotidienne</div>
                <div className="text-sm text-muted-foreground">Messages inspirants quotidiens</div>
              </div>
            </div>
            <Switch
              checked={settings.dailyMotivation}
              onCheckedChange={(checked) => updateSetting("dailyMotivation", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="font-medium">Notifications de succès</div>
                <div className="text-sm text-muted-foreground">Alertes pour nouveaux accomplissements</div>
              </div>
            </div>
            <Switch
              checked={settings.achievementNotifications}
              onCheckedChange={(checked) => updateSetting("achievementNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sound & Vibration */}
      <Card>
        <CardHeader>
          <CardTitle>Son et Vibration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 text-purple-600" />
              <div>
                <div className="font-medium">Son activé</div>
                <div className="text-sm text-muted-foreground">Jouer un son avec les notifications</div>
              </div>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vibrate className="h-4 w-4 text-indigo-600" />
              <div>
                <div className="font-medium">Vibration activée</div>
                <div className="text-sm text-muted-foreground">Vibrer lors des notifications</div>
              </div>
            </div>
            <Switch
              checked={settings.vibrationEnabled}
              onCheckedChange={(checked) => updateSetting("vibrationEnabled", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
