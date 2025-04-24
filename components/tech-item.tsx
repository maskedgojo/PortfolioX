"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Stage, Container as PixiContainer, Sprite } from "@pixi/react"
import * as PIXI from "pixi.js"
import Image from "next/image"

interface TechItemProps {
  tech: {
    name: string
    icon: string
    color?: string
  }
  delay: number
}

const TechItem = ({ tech, delay }: TechItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      alpha: number
      scale: number
      texture: PIXI.Texture
    }>
  >([])

  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const pixiApp = useRef<PIXI.Application | null>(null)
  const animationRef = useRef<number | null>(null)

  // Generate particles on mount
  useEffect(() => {
    if (!containerRef.current) return

    // Create a temporary canvas to generate particle textures
    const canvas = document.createElement("canvas")
    canvas.width = 8
    canvas.height = 8
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Create a pixel texture
      ctx.fillStyle = tech.color || "#ffffff"
      ctx.fillRect(0, 0, 8, 8)

      const texture = PIXI.Texture.from(canvas.toDataURL())

      // Generate particles
      const newParticles = []
      const particleCount = window.innerWidth < 768 ? 30 : 50

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          alpha: 0.8 + Math.random() * 0.2,
          scale: 0.5 + Math.random() * 1.5,
          texture,
        })
      }

      setParticles(newParticles)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [tech.color])

  // Handle hover state
  const handleMouseEnter = () => {
    if (!itemRef.current) return

    setIsHovered(true)
    setIsExploding(true)

    // Hide the original item
    gsap.to(itemRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    if (!itemRef.current) return

    setIsHovered(false)

    // Show the original item
    gsap.to(itemRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })

    // Reset particles after animation completes
    setTimeout(() => {
      setIsExploding(false)
    }, 1000)
  }

  // Animation for particles
  const updateParticles = (delta: number) => {
    if (!isExploding || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setParticles((prevParticles) =>
      prevParticles.map((particle) => {
        if (isHovered) {
          // Explode outward
          return {
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            alpha: Math.max(0, particle.alpha - 0.01),
          }
        } else {
          // Return to center
          const dx = centerX - particle.x
          const dy = centerY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          return {
            ...particle,
            x: particle.x + dx * 0.1,
            y: particle.y + dy * 0.1,
            alpha: Math.min(1, particle.alpha + 0.05),
            vx: distance < 5 ? 0 : particle.vx * 0.95,
            vy: distance < 5 ? 0 : particle.vy * 0.95,
          }
        }
      }),
    )

    animationRef.current = requestAnimationFrame(() => updateParticles(1 / 60))
  }

  useEffect(() => {
    if (isExploding) {
      animationRef.current = requestAnimationFrame(() => updateParticles(1 / 60))
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isExploding, isHovered])

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
      ref={containerRef}
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
          <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
        </div>
        <span className="text-xs text-center font-pixel">{tech.name}</span>
      </div>

      {/* Particle explosion effect */}
      {isExploding && (
        <div className="absolute inset-0 pointer-events-none">
          <Stage
            width={containerRef.current?.offsetWidth || 100}
            height={containerRef.current?.offsetHeight || 100}
            options={{ backgroundAlpha: 0 }}
          >
            <PixiContainer
              position={[
                containerRef.current?.offsetWidth ? containerRef.current.offsetWidth / 2 : 50,
                containerRef.current?.offsetHeight ? containerRef.current.offsetHeight / 2 : 50,
              ]}
            >
              {particles.map((particle, index) => (
                <Sprite
                  key={index}
                  texture={particle.texture}
                  x={particle.x}
                  y={particle.y}
                  alpha={particle.alpha}
                  scale={particle.scale}
                  anchor={0.5}
                />
              ))}
            </PixiContainer>
          </Stage>
        </div>
      )}
    </div>
  )
}

export default TechItem
