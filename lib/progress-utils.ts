import { type Achievement, type UserStats, achievements } from "./progress-data"

export const updateUserStats = (
  stats: UserStats,
  activity: "prayer" | "ablution" | "lesson",
  timeSpent = 0,
): UserStats => {
  const today = new Date().toISOString().split("T")[0]
  const lastActivity = new Date(stats.lastActivityDate)
  const todayDate = new Date(today)
  const daysDiff = Math.floor((todayDate.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))

  let newStreak = stats.currentStreak
  if (daysDiff === 1) {
    // Consecutive day
    newStreak = stats.currentStreak + 1
  } else if (daysDiff > 1) {
    // Streak broken
    newStreak = 1
  } else if (daysDiff === 0) {
    // Same day, maintain streak
    newStreak = stats.currentStreak
  }

  const updatedStats: UserStats = {
    ...stats,
    totalTimeSpent: stats.totalTimeSpent + timeSpent,
    currentStreak: newStreak,
    longestStreak: Math.max(stats.longestStreak, newStreak),
    lastActivityDate: today,
  }

  switch (activity) {
    case "prayer":
      updatedStats.totalPrayersCompleted += 1
      break
    case "ablution":
      updatedStats.ablutionsCompleted += 1
      break
    case "lesson":
      updatedStats.lessonsCompleted += 1
      break
  }

  return updatedStats
}

export const checkAchievements = (stats: UserStats): Achievement[] => {
  return achievements.map((achievement) => {
    let progress = 0
    let unlocked = false

    switch (achievement.id) {
      case "first-ablution":
        progress = Math.min(stats.ablutionsCompleted, achievement.requirement)
        unlocked = stats.ablutionsCompleted >= achievement.requirement
        break
      case "ablution-master":
        progress = Math.min(stats.ablutionsCompleted, achievement.requirement)
        unlocked = stats.ablutionsCompleted >= achievement.requirement
        break
      case "first-prayer":
        progress = Math.min(stats.totalPrayersCompleted, achievement.requirement)
        unlocked = stats.totalPrayersCompleted >= achievement.requirement
        break
      case "prayer-dedication":
        progress = Math.min(stats.currentStreak, achievement.requirement)
        unlocked = stats.currentStreak >= achievement.requirement
        break
      case "prayer-warrior":
        progress = Math.min(stats.totalPrayersCompleted, achievement.requirement)
        unlocked = stats.totalPrayersCompleted >= achievement.requirement
        break
      case "eager-learner":
        progress = Math.min(stats.lessonsCompleted, achievement.requirement)
        unlocked = stats.lessonsCompleted >= achievement.requirement
        break
      case "consistent-learner":
        progress = Math.min(stats.longestStreak, achievement.requirement)
        unlocked = stats.longestStreak >= achievement.requirement
        break
    }

    return {
      ...achievement,
      progress,
      unlocked,
    }
  })
}

export const getProgressPercentage = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100)
}
