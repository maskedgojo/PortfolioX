"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

interface TechItemProps {
  tech: {
    name: string
    icon: string
    color?: string
  }
  delay: number
}

const TechItemLite = ({ tech, delay }: TechItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const pixelsRef = useRef<HTMLDivElement>(null)

  // Generate pixel divs on mount
  useEffect(() => {
    if (!pixelsRef.current) return

    // Clear existing pixels
    pixelsRef.current.innerHTML = ""

    // Create pixels
    const pixelCount = 30
    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement("div")
      pixel.className = "absolute w-2 h-2 opacity-0"
      pixel.style.backgroundColor = tech.color || "#ffffff"
      pixel.style.top = "50%"
      pixel.style.left = "50%"
      pixel.style.transform = "translate(-50%, -50%)"
      pixelsRef.current.appendChild(pixel)
    }
  }, [tech.color])

  // Handle hover animations
  const handleMouseEnter = () => {
    if (!itemRef.current || !pixelsRef.current) return

    setIsHovered(true)

    // Hide the original item
    gsap.to(itemRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    })

    // Animate pixels
    const pixels = pixelsRef.current.children
    for (let i = 0; i < pixels.length; i++) {
      const pixel = pixels[i] as HTMLElement

      // Random position within the container
      const randomX = (Math.random() - 0.5) * 100
      const randomY = (Math.random() - 0.5) * 100

      gsap.fromTo(
        pixel,
        {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0,
        },
        {
          opacity: 1,
          x: randomX,
          y: randomY,
          scale: 1 + Math.random(),
          duration: 0.5 + Math.random() * 0.5,
          ease: "power2.out",
          delay: Math.random() * 0.2,
        },
      )
    }
  }

  const handleMouseLeave = () => {
    if (!itemRef.current || !pixelsRef.current) return

    setIsHovered(false)

    // Show the original item
    gsap.to(itemRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })

    // Animate pixels back
    const pixels = pixelsRef.current.children
    for (let i = 0; i < pixels.length; i++) {
      const pixel = pixels[i] as HTMLElement

      gsap.to(pixel, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0,
        duration: 0.5 + Math.random() * 0.5,
        ease: "power2.in",
      })
    }
  }

  // Initial animation on mount
  useEffect(() => {
    if (itemRef.current) {
      gsap.from(itemRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
      })
    }
  }, [delay])

  return (
    <div
      className="relative w-24 h-24 flex flex-col items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Original tech item */}
      <div
        ref={itemRef}
        className="pixel-tech-box w-full h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
      >
        <div className="relative w-12 h-12 mb-2">
          <Image
            src={tech.icon || "/placeholder.svg"}
            alt={tech.name}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <span className="text-xs text-center font-pixel">{tech.name}</span>
      </div>

      {/* Pixel container */}
      <div ref={pixelsRef} className="absolute inset-0 pointer-events-none overflow-hidden"></div>
    </div>
  )
}

export default TechItemLite
