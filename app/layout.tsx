import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
/* Added Amiri font import through Next.js font system */
import { Amiri } from "next/font/google"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

/* Added Amiri font configuration for Arabic text */
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "Islamic Prayer Learning App",
  description: "Learn Islamic prayers, ablutions, and track your spiritual progress",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} ${amiri.variable} antialiased`}>
      <body>
        <div className="pb-20">{children}</div>
        <BottomNavigation />
      </body>
    </html>
  )
}
