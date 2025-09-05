"use client"

import { useState, useEffect } from "react"
import { NotificationSettingsComponent } from "@/components/notifications/notification-settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, TestTube } from "lucide-react"
import { type NotificationSettings, defaultNotificationSettings, motivationalMessages } from "@/lib/notifications"

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultNotificationSettings)

  useEffect(() => {
    const savedSettings = localStorage.getItem("notificationSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingsChange = (newSettings: NotificationSettings) => {
    setSettings(newSettings)
  }

  const testNotification = () => {
    if (Notification.permission === "granted") {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]

      const notification = new Notification(randomMessage.title, {
        body: randomMessage.message,
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
      })

      setTimeout(() => notification.close(), 5000)
    } else {
      alert("Veuillez d'abord activer les notifications")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Bell className="h-8 w-8 text-cyan-600" />
            Notifications
          </h1>
          <p className="text-gray-600">Configurez vos rappels et notifications</p>
        </div>

        {/* Test Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-orange-600" />
              Test de Notification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Testez vos paramètres de notification avec un message d'exemple
                </p>
              </div>
              <Button onClick={testNotification} variant="outline">
                Tester Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <NotificationSettingsComponent onSettingsChange={handleSettingsChange} />

        {/* Information */}
        <Card className="bg-gradient-to-r from-cyan-50 to-orange-50 border-cyan-200">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-gray-900">À propos des Notifications</h3>
              <p className="text-sm text-gray-600">
                Les notifications vous aident à maintenir une pratique spirituelle régulière. Elles sont programmées
                localement sur votre appareil et respectent votre vie privée.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
