export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: number
  category: "ablutions" | "prayer" | "consistency" | "learning"
  unlocked: boolean
  progress: number
}

export interface UserStats {
  totalPrayersCompleted: number
  ablutionsCompleted: number
  consecutiveDays: number
  currentStreak: number
  longestStreak: number
  lessonsCompleted: number
  totalTimeSpent: number // in minutes
  lastActivityDate: string
}

export const achievements: Achievement[] = [
  // Ablutions achievements
  {
    id: "first-ablution",
    title: "Premier Wudû",
    description: "Complétez votre première ablution guidée",
    icon: "💧",
    requirement: 1,
    category: "ablutions",
    unlocked: false,
    progress: 0,
  },
  {
    id: "ablution-master",
    title: "Maître des Ablutions",
    description: "Complétez 50 ablutions",
    icon: "🌊",
    requirement: 50,
    category: "ablutions",
    unlocked: false,
    progress: 0,
  },

  // Prayer achievements
  {
    id: "first-prayer",
    title: "Première Salât",
    description: "Complétez votre première prière guidée",
    icon: "🤲",
    requirement: 1,
    category: "prayer",
    unlocked: false,
    progress: 0,
  },
  {
    id: "prayer-dedication",
    title: "Dévotion Quotidienne",
    description: "Priez pendant 7 jours consécutifs",
    icon: "📿",
    requirement: 7,
    category: "consistency",
    unlocked: false,
    progress: 0,
  },
  {
    id: "prayer-warrior",
    title: "Guerrier de la Prière",
    description: "Complétez 100 prières",
    icon: "⭐",
    requirement: 100,
    category: "prayer",
    unlocked: false,
    progress: 0,
  },

  // Learning achievements
  {
    id: "eager-learner",
    title: "Apprenant Assidu",
    description: "Complétez toutes les leçons de base",
    icon: "📚",
    requirement: 10,
    category: "learning",
    unlocked: false,
    progress: 0,
  },
  {
    id: "consistent-learner",
    title: "Constance dans l'Apprentissage",
    description: "Maintenez une série de 30 jours",
    icon: "🔥",
    requirement: 30,
    category: "consistency",
    unlocked: false,
    progress: 0,
  },
]

export const getDefaultStats = (): UserStats => ({
  totalPrayersCompleted: 0,
  ablutionsCompleted: 0,
  consecutiveDays: 0,
  currentStreak: 0,
  longestStreak: 0,
  lessonsCompleted: 0,
  totalTimeSpent: 0,
  lastActivityDate: new Date().toISOString().split("T")[0],
})
