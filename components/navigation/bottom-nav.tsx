"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, Clock, Droplets, BookOpen, TrendingUp, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: Clock, label: "Prières", path: "/prayer-times" },
    { icon: Droplets, label: "Ablutions", path: "/ablutions" },
    { icon: BookOpen, label: "Salât", path: "/prayer" },
    { icon: TrendingUp, label: "Progrès", path: "/progress" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? "text-cyan-600 bg-cyan-50" : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
              }`}
              onClick={() => router.push(item.path)}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
