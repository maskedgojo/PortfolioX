"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import TechItem from "./tech-item"
import TechItemLite from "./tech-item-lite"
import { categorizedTechStack } from "@/data/tech-stack"
import { detectLowPerformanceDevice } from "@/utils/performance-utils"

const TechStackSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [useLiteVersion, setUseLiteVersion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Detect if we should use the lite version
    setUseLiteVersion(detectLowPerformanceDevice())

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

  // Choose the appropriate component based on performance
  const TechItemComponent = useLiteVersion ? TechItemLite : TechItem

  return (
    <section id="tech-stack" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4 font-pixel">TECH INVENTORY</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm font-pixel">OUR ARSENAL OF TECHNOLOGIES AND TOOLS</p>
        </div>

        <div className="space-y-16">
          {Object.entries(categorizedTechStack).map(([category, technologies], categoryIndex) => (
            <div key={category} className="tech-category">
              <h3 className="text-xl font-pixel neon-text mb-8 text-center">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
                {technologies.map((tech, techIndex) => (
                  <TechItemComponent key={tech.name} tech={tech} delay={techIndex * 0.1 + categoryIndex * 0.3} />
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
