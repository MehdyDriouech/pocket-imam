"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void
}

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">Welcome</CardTitle>
          <CardDescription>Choose your preferred language to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="outline"
              className="w-full h-14 text-left justify-start bg-transparent"
              onClick={() => onLanguageSelect(language.code)}
            >
              <div>
                <div className="font-medium">{language.name}</div>
                <div className="text-sm text-muted-foreground">{language.nativeName}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
