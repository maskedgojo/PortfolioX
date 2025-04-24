"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { categorizedTechStack } from "@/data/tech-stack"
import Image from "next/image"

const TechStackSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)

          // Animate section elements when they become visible
          gsap.fromTo(
            ".tech-category",
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
            },
          )
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

  return (
    <section id="tech-stack" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">TECH INVENTORY</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm">OUR ARSENAL OF TECHNOLOGIES AND TOOLS</p>
        </div>

        <div className="space-y-16">
          {Object.entries(categorizedTechStack).map(([category, technologies], categoryIndex) => (
            <div key={category} className="tech-category">
              <h3 className="text-xl font-bold mb-8 text-center">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
                {technologies.map((tech, techIndex) => (
                  <div key={tech.name} className="tech-item">
                    <div className="pixel-tech-box w-full h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                      <div className="relative w-12 h-12 mb-2">
                        <Image
                          src={tech.icon || "/placeholder.svg"}
                          alt={tech.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs text-center">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
