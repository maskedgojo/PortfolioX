"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function TechBounce({ tech, delay = 0 }) {
  const [bounce, setBounce] = useState(false)

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(true)

      setTimeout(() => {
        setBounce(false)
      }, 500)
    }, delay * 100)

    return () => clearTimeout(timer)
  }, [delay])

  // Hover animation
  const handleMouseEnter = () => {
    setBounce(true)

    setTimeout(() => {
      setBounce(false)
    }, 500)
  }

  return (
    <div
      className="pixel-tech-box w-full h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
      onMouseEnter={handleMouseEnter}
      style={{
        transform: bounce ? "translateY(-10px)" : "translateY(0)",
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <div className="relative w-12 h-12 mb-2">
        <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
      </div>
      <span className="text-xs text-center font-pixel">{tech.name}</span>
    </div>
  )
}
