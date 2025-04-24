"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface TechIconProps {
  tech: {
    name: string
    icon: string
    color?: string
  }
  delay: number
}

const TechIconCRT = ({ tech, delay }: TechIconProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setReducedMotion(mediaQuery.matches)

      const handleChange = () => setReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)

      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 100)

    return () => clearTimeout(timer)
  }, [delay])

  // CRT effects classes
  const getCRTClasses = () => {
    const baseClasses = "tech-icon-crt crt-effect"

    if (reducedMotion) {
      return `${baseClasses} ${isHovered ? "crt-glow" : ""}`
    }

    return `${baseClasses} ${isHovered ? "crt-glow crt-flicker" : ""} ${isVisible ? "crt-turn-on" : ""}`
  }

  return (
    <div
      className="relative w-24 h-24 flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={getCRTClasses()}>
        <div className="pixel-tech-box w-full h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
          <div className="relative w-12 h-12 mb-2">
            <Image
              src={tech.icon || "/placeholder.svg"}
              alt={tech.name}
              width={48}
              height={48}
              className="object-contain"
            />
            {isHovered && !reducedMotion && (
              <>
                <div className="crt-scanlines"></div>
                <div className="crt-noise"></div>
              </>
            )}
          </div>
          <span
            className={`text-xs text-center font-pixel ${isHovered && !reducedMotion ? "crt-jitter crt-rgb-split" : ""}`}
          >
            {tech.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TechIconCRT
