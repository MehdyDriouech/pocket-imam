export interface NotificationSettings {
  prayerReminders: boolean
  reminderMinutes: number // minutes before prayer time
  ablutionReminders: boolean
  dailyMotivation: boolean
  achievementNotifications: boolean
  soundEnabled: boolean
  vibrationEnabled: boolean
}

export interface PrayerNotification {
  id: string
  type: "prayer-reminder" | "prayer-time" | "ablution-reminder" | "motivation" | "achievement"
  title: string
  message: string
  scheduledTime: Date
  prayerName?: string
  isActive: boolean
}

export const defaultNotificationSettings: NotificationSettings = {
  prayerReminders: true,
  reminderMinutes: 15,
  ablutionReminders: true,
  dailyMotivation: true,
  achievementNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
}

export const motivationalMessages = [
  {
    title: "Rappel Spirituel",
    message: "La prière est le pilier de la religion. Qu'Allah accepte vos adorations.",
    verse: "Et accomplis la Salât pour te souvenir de Moi. (Coran 20:14)",
  },
  {
    title: "Moment de Paix",
    message: "Prenez un moment pour vous connecter avec Allah aujourd'hui.",
    verse: "C'est dans le rappel d'Allah que les cœurs se tranquillisent. (Coran 13:28)",
  },
  {
    title: "Purification",
    message: "N'oubliez pas de faire vos ablutions avec intention et présence.",
    verse: "Allah aime ceux qui se repentent et Il aime ceux qui se purifient. (Coran 2:222)",
  },
]

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications")
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  return false
}

export const scheduleNotification = (notification: PrayerNotification) => {
  if (!("Notification" in window)) return

  const now = new Date()
  const timeUntilNotification = notification.scheduledTime.getTime() - now.getTime()

  if (timeUntilNotification > 0) {
    setTimeout(() => {
      if (Notification.permission === "granted") {
        const notif = new Notification(notification.title, {
          body: notification.message,
          icon: "/icon-192x192.png",
          badge: "/icon-192x192.png",
          tag: notification.id,
          requireInteraction: notification.type === "prayer-time",
        })

        notif.onclick = () => {
          window.focus()
          notif.close()
        }

        // Auto close after 10 seconds for non-prayer notifications
        if (notification.type !== "prayer-time") {
          setTimeout(() => notif.close(), 10000)
        }
      }
    }, timeUntilNotification)
  }
}

export const generatePrayerNotifications = (
  prayerTimes: { [key: string]: Date },
  settings: NotificationSettings,
): PrayerNotification[] => {
  const notifications: PrayerNotification[] = []
  const prayerNames = {
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
  }

  Object.entries(prayerTimes).forEach(([prayer, time]) => {
    const prayerName = prayerNames[prayer as keyof typeof prayerNames]

    if (settings.prayerReminders) {
      // Reminder notification
      const reminderTime = new Date(time.getTime() - settings.reminderMinutes * 60000)
      notifications.push({
        id: `${prayer}-reminder-${time.getTime()}`,
        type: "prayer-reminder",
        title: `Rappel de Prière`,
        message: `${prayerName} dans ${settings.reminderMinutes} minutes`,
        scheduledTime: reminderTime,
        prayerName,
        isActive: true,
      })
    }

    // Prayer time notification
    notifications.push({
      id: `${prayer}-time-${time.getTime()}`,
      type: "prayer-time",
      title: `Temps de Prière - ${prayerName}`,
      message: `Il est temps pour la prière de ${prayerName}`,
      scheduledTime: time,
      prayerName,
      isActive: true,
    })
  })

  return notifications
}
