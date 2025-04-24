import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Inter } from "next/font/google"
import "./globals.css"
import "./tech-animations.css"
import "./font-loading.css"
import "../styles/crt-effects.css"

// Import Press Start 2P font for retro elements
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
})

// Import Inter for modern elements
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Team Portfolio - 8-bit Retro Style",
  description: "A retro-themed portfolio for our team of developers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-game-bg text-game-text">{children}</body>
    </html>
  )
}
