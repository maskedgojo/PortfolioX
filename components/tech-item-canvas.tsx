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

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
}

const TechItemCanvas = ({ tech, delay }: TechItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMounted, setIsMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Generate particles - only run on client side
  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    // Safely determine if we're on mobile
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false
    const particleCount = isMobile ? 30 : 50
    const color = tech.color || "#ffffff"
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: 2 + Math.random() * 4,
        color,
        alpha: 0.8 + Math.random() * 0.2,
      })
    }

    setParticles(newParticles)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [tech.color, isMounted])

  // Handle hover state
  const handleMouseEnter = () => {
    if (!itemRef.current || !isMounted) return

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
    if (!itemRef.current || !isMounted) return

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

  // Draw particles on canvas
  const drawParticles = () => {
    if (!canvasRef.current || !containerRef.current || !isExploding || !isMounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw each particle
    particles.forEach((particle) => {
      ctx.globalAlpha = particle.alpha
      ctx.fillStyle = particle.color
      ctx.fillRect(particle.x + canvas.width / 2, particle.y + canvas.height / 2, particle.size, particle.size)
    })
  }

  // Animation for particles
  const updateParticles = () => {
    if (!isExploding || !containerRef.current || !isMounted) return

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
          const dx = 0 - particle.x
          const dy = 0 - particle.y
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

    drawParticles()
    animationRef.current = requestAnimationFrame(updateParticles)
  }

  // Set up canvas and animation - only run on client side
  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    // Set canvas size
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight

    // Handle resize
    const handleResize = () => {
      if (canvas && container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMounted])

  // Start/stop animation based on exploding state
  useEffect(() => {
    if (!isMounted) return

    if (isExploding) {
      animationRef.current = requestAnimationFrame(updateParticles)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isExploding, isHovered, particles, isMounted])

  // Initial animation on mount
  useEffect(() => {
    if (!isMounted || !itemRef.current) return

    gsap.from(itemRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
    })
  }, [delay, isMounted])

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

      {/* Canvas for particle explosion - only render on client side */}
      {isMounted && isExploding && <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />}
    </div>
  )
}

export default TechItemCanvas
