"use client"

import { useEffect, useState, useRef } from "react"

const ForestScene = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [moonPhase, setMoonPhase] = useState(0)
  const [fireIntensity, setFireIntensity] = useState(0.5)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Animate moon phases
  useEffect(() => {
    if (!isVisible) return

    const moonInterval = setInterval(() => {
      setMoonPhase((prev) => (prev + 0.01) % 1)
    }, 200)

    return () => clearInterval(moonInterval)
  }, [isVisible])

  // Animate fire
  useEffect(() => {
    if (!isVisible) return

    const fireInterval = setInterval(() => {
      setFireIntensity(0.5 + Math.random() * 0.5)
    }, 150)

    return () => clearInterval(fireInterval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-[#1a0b4a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4 font-pixel">OUR WORLD</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
        </div>

        <div className={`relative h-[500px] pixel-card overflow-hidden ${isVisible ? "pixel-fade-in" : "opacity-0"}`}>
          {/* Sky background */}
          <div className="absolute inset-0 bg-[#1a0b4a]"></div>

          {/* Stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
              }}
            ></div>
          ))}

          {/* Moon */}
          <div
            className="absolute w-32 h-32 rounded-full bg-[#f8f8d9]"
            style={{
              top: "15%",
              right: "15%",
              boxShadow: "0 0 20px rgba(248, 248, 217, 0.5)",
              clipPath: `polygon(
                0 0,
                ${100 * (0.5 + 0.5 * Math.sin(moonPhase * Math.PI * 2))}% 0,
                100% 0,
                100% 100%,
                ${100 * (0.5 + 0.5 * Math.sin((moonPhase + 0.5) * Math.PI * 2))}% 100%,
                0 100%
              )`,
            }}
          >
            <div className="absolute w-6 h-6 rounded-full bg-[#e8e8c9] top-5 left-8"></div>
            <div className="absolute w-8 h-8 rounded-full bg-[#e8e8c9] top-12 right-8"></div>
            <div className="absolute w-4 h-4 rounded-full bg-[#e8e8c9] bottom-10 left-12"></div>
          </div>

          {/* Distant castle */}
          <div className="absolute left-[15%] top-[20%] w-32 h-64">
            <div className="absolute bottom-0 w-full h-40 bg-[#0a0520]"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-[#0a0520]"></div>
            <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#0a0520]"></div>

            {/* Castle windows */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#ffcc00]"
                style={{
                  bottom: `${10 + (i % 3) * 10}px`,
                  left: `${10 + Math.floor(i / 3) * 20}px`,
                  animation: `flicker ${Math.random() * 2 + 1}s infinite ease-in-out ${Math.random()}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Background trees */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${i * 12 + 5}%`,
                zIndex: 10 + i,
              }}
            >
              <div
                className="w-20 h-40 bg-[#1a3a8a]"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              ></div>
              <div
                className="w-20 h-32 bg-[#1a3a8a] -mt-20"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              ></div>
              <div
                className="w-20 h-24 bg-[#1a3a8a] -mt-16"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              ></div>
            </div>
          ))}

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#2a0a4a]"></div>

          {/* Foreground elements */}
          <div className="absolute bottom-20 left-0 right-0 h-4 bg-[#4a1a6a] z-30"></div>

          {/* Campfire */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40">
            {/* Fire logs */}
            <div className="w-16 h-4 bg-[#5a3a2a] rounded-full"></div>
            <div className="w-4 h-12 bg-[#5a3a2a] absolute bottom-0 left-2 transform rotate-45"></div>
            <div className="w-4 h-12 bg-[#5a3a2a] absolute bottom-0 right-2 transform -rotate-45"></div>

            {/* Fire */}
            <div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-16"
              style={{
                background: "linear-gradient(to top, #ff4500, #ffcc00)",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                animation: "fire 0.5s infinite alternate",
                opacity: fireIntensity,
              }}
            ></div>

            {/* Light glow */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,204,0,0.3) 0%, rgba(255,204,0,0) 70%)",
                opacity: fireIntensity,
              }}
            ></div>
          </div>

          {/* Character */}
          <div className="absolute bottom-24 left-[35%] z-30">
            <div className="w-12 h-12 bg-[#3a5a8a] rounded-md"></div>
            <div className="w-8 h-4 bg-[#ffcc00] absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-t-md"></div>
          </div>

          {/* Pixel grid overlay */}
          <div className="absolute inset-0 grid grid-cols-64 grid-rows-64 opacity-5 pointer-events-none z-50">
            {Array.from({ length: 4096 }).map((_, i) => (
              <div key={i} className="border border-white"></div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm font-pixel">EXPLORE OUR DIGITAL WORLD</p>
        </div>
      </div>
    </section>
  )
}

export default ForestScene
