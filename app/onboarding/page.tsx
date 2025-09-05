"use client"

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()

  const handleOnboardingComplete = (data: {
    language: string
    location?: { city: string; country: string }
  }) => {
    // In a real app, save this data to localStorage or database
    localStorage.setItem("onboardingData", JSON.stringify(data))
    localStorage.setItem("onboardingCompleted", "true")

    // Redirect to main app
    router.push("/")
  }

  return <OnboardingFlow onComplete={handleOnboardingComplete} />
}
