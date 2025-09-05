"use client"

import { useState } from "react"
import { LanguageSelection } from "./language-selection"
import { LocationSetup } from "./location-setup"
import { WelcomeScreen } from "./welcome-screen"

interface OnboardingFlowProps {
  onComplete: (data: {
    language: string
    location?: { city: string; country: string }
  }) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState<{
    language: string
    location?: { city: string; country: string }
  }>({
    language: "",
  })

  const handleLanguageSelect = (language: string) => {
    setOnboardingData((prev) => ({ ...prev, language }))
    setCurrentStep(1)
  }

  const handleLocationSet = (location: { city: string; country: string }) => {
    setOnboardingData((prev) => ({ ...prev, location }))
    setCurrentStep(2)
  }

  const handleLocationSkip = () => {
    setCurrentStep(2)
  }

  const handleComplete = () => {
    onComplete(onboardingData)
  }

  switch (currentStep) {
    case 0:
      return <LanguageSelection onLanguageSelect={handleLanguageSelect} />
    case 1:
      return <LocationSetup onLocationSet={handleLocationSet} onSkip={handleLocationSkip} />
    case 2:
      return <WelcomeScreen onComplete={handleComplete} />
    default:
      return null
  }
}
