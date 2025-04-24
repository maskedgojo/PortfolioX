"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "WELCOME TO THE WORLD OF US"
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      setIsTypingComplete(true)
    }
  }, [typedText, fullText])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-game-bg">
      {/* Pixelated background grid */}
      <div className="absolute inset-0 grid grid-cols-16 grid-rows-16 opacity-10">
        {Array.from({ length: 256 }).map((_, i) => (
          <div
            key={i}
            className="border border-game-primary"
            style={{
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating pixel elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-game-primary"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
            animation: `pixelFloat ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="mb-8 inline-block">
          <div className="pixel-card inline-block p-6 mb-6">
            <h1 className="hero-title neon-text mb-2">
              {typedText}
              <span className={`${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
            </h1>
          </div>
        </div>

        <p className="hero-subtitle mb-8 max-w-3xl mx-auto text-xs sm:text-sm">
          JUST LIKE EVERY GREAT CO-OP GAME, WE'RE BETTER TOGETHER. FROM PIXELS TO PROJECTS, OUR TEAM BLENDS CREATIVITY,
          CODE, AND CHAOS TO CRAFT MEMORABLE DIGITAL EXPERIENCES. SCROLL ON TO MEET THE SQUAD, EXPLORE OUR JOURNEY, AND
          DIVE INTO THE ADVENTURES WE'VE CREATED—TOGETHER. GAME ON.
        </p>

        <div className={`${isTypingComplete ? "pixel-fade-in" : "opacity-0"}`}>
          <Link href="#about" className="pixel-btn">
            GAME ON
          </Link>
        </div>

        <div className="mt-16 pixel-bounce">
          <span className="text-xs font-pixel">PRESS START TO CONTINUE</span>
        </div>
      </div>

      {/* Game console frame */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black"></div>
      <div className="absolute top-0 left-0 right-0 h-16 bg-black"></div>
      <div className="absolute top-16 bottom-16 left-0 w-16 bg-black"></div>
      <div className="absolute top-16 bottom-16 right-0 w-16 bg-black"></div>
    </section>
  )
}

export default Hero
