"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface TimelineEvent {
  year: string
  title: string
  description: string
  side: "left" | "right"
  image?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2018",
    title: "TEAM FORMATION",
    description: "OUR JOURNEY BEGAN WHEN FOUR PASSIONATE DEVELOPERS JOINED FORCES TO CREATE INNOVATIVE SOLUTIONS.",
    side: "left",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2019",
    title: "FIRST PROJECT",
    description: "LAUNCHED OUR FIRST COLLABORATIVE PROJECT, A WEB APPLICATION FOR EVENT MANAGEMENT.",
    side: "right",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2020",
    title: "EXPANDED SKILLS",
    description: "MASTERED NEW TECHNOLOGIES INCLUDING REACT, NODE.JS, AND CLOUD PLATFORMS.",
    side: "left",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2021",
    title: "AWARD WINNING",
    description: "RECEIVED RECOGNITION FOR OUR INNOVATIVE APPROACH TO PROBLEM SOLVING IN TECH COMPETITIONS.",
    side: "right",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2022",
    title: "GLOBAL CLIENTS",
    description: "EXPANDED OUR REACH TO WORK WITH CLIENTS FROM DIFFERENT PARTS OF THE WORLD.",
    side: "left",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2023",
    title: "NEW HORIZONS",
    description: "EXPLORING CUTTING-EDGE TECHNOLOGIES LIKE AI, AR/VR, AND BLOCKCHAIN.",
    side: "right",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [snakeProgress, setSnakeProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)

          // Start snake animation
          let progress = 0
          const interval = setInterval(() => {
            progress += 1
            setSnakeProgress(progress)

            if (progress >= 100) {
              clearInterval(interval)
            }
          }, 50)
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
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="pixel-heading mb-4">ABOUT US</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className={`${isVisible ? "pixel-slide-in" : "opacity-0"}`}>
            <div className="pixel-card relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20 pointer-events-none">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-game-primary" />
                ))}
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Team Photo"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className={`${isVisible ? "pixel-slide-in" : "opacity-0"} delay-300`}>
            <div className="pixel-card h-full">
              <h3 className="pixel-subheading mb-6">OUR STORY</h3>
              <div className="space-y-4 text-sm">
                <p className="font-sans">
                  WE ARE A DYNAMIC TEAM OF DEVELOPERS PASSIONATE ABOUT TECHNOLOGY AND INNOVATION. OUR COMBINED EXPERTISE
                  SPANS TECHNICAL AND NON-TECHNICAL DOMAINS, MAKING US VERSATILE PROBLEM SOLVERS.
                </p>
                <p className="font-sans">
                  WE HAVE EXPERIENCE IN DATA STRUCTURES, OPERATING SYSTEMS, OBJECT-ORIENTED PROGRAMMING, AND DATABASE
                  MANAGEMENT SYSTEMS. OUR TEAM ALSO EXCELS IN LEADERSHIP, PUBLIC SPEAKING, CONTENT WRITING, TEAM
                  MANAGEMENT, AND COMMUNICATION.
                </p>
                <p className="font-sans">
                  TOGETHER, WE AIM TO DELIVER IMPACTFUL PROJECTS AND SOLUTIONS THAT SHOWCASE OUR DIVERSE SKILL SET. WE
                  BELIEVE IN CONTINUOUS LEARNING AND PUSHING THE BOUNDARIES OF WHAT'S POSSIBLE WITH TECHNOLOGY.
                </p>
              </div>

              {/* Health bar */}
              <div className="mt-6">
                <div className="text-xs mb-1 font-pixel">TEAM POWER</div>
                <div className="w-full h-4 bg-black border-2 border-white">
                  <div className="h-full bg-game-primary" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section with Fixed Spacing and Alignment */}
        <div className="relative py-16">
          {/* Add clear margin to the heading and wrap it in a positioned div */}
          <div className="relative z-20 mb-24">
            <h3 className="pixel-subheading text-center">OUR JOURNEY</h3>
          </div>

          {/* Timeline container with positioning that won't overlap the heading */}
          <div className="relative">
            {/* Main snake line - positioned to start below the heading */}
            <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-black border-2 border-game-primary transform -translate-x-1/2 overflow-hidden">
              <div
                className="absolute top-0 w-full bg-game-primary"
                style={{
                  height: `${snakeProgress}%`,
                  boxShadow: "0 0 10px hsl(var(--game-primary))",
                  transition: "height 0.5s ease-out",
                }}
              ></div>

              {/* Snake head */}
              {snakeProgress < 100 && (
                <div
                  className="absolute w-4 h-4 bg-game-primary rounded-full left-1/2 transform -translate-x-1/2 z-10"
                  style={{
                    top: `${snakeProgress}%`,
                    boxShadow: "0 0 10px hsl(var(--game-primary))",
                    transition: "top 0.5s ease-out",
                  }}
                ></div>
              )}
            </div>

            {/* Timeline events with preserved original layout */}
            <div className="relative flex flex-col">
              {timelineEvents.map((event, index) => {
                const eventPosition = (index / (timelineEvents.length - 1)) * 100
                const isVisible = snakeProgress >= eventPosition

                return (
                  <div key={index} className="relative mb-32" style={{ marginTop: index === 0 ? "0" : "60px" }}>
                    <div className="flex items-center justify-center">
                      {/* Left side content */}
                      <div
                        className={`w-1/2 pr-8 ${event.side === "left" ? "block" : "invisible"}`}
                        style={{
                          opacity: isVisible && event.side === "left" ? 1 : 0,
                          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: "0.4s",
                        }}
                      >
                        <div className="pixel-card text-right">
                          <div className="text-game-primary font-bold mb-1 font-pixel">{event.year}</div>
                          <h4 className="text-sm font-bold mb-2 font-pixel">{event.title}</h4>
                          {event.image && (
                            <div className="mb-3">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                width={400}
                                height={200}
                                className="ml-auto rounded-md w-full max-w-sm object-cover"
                              />
                            </div>
                          )}
                          <p className="text-xs font-sans">{event.description}</p>
                        </div>
                      </div>

                      {/* Center marker */}
                      <div
                        className={`w-8 h-8 bg-black border-2 border-game-primary rounded-full z-10 relative ${isVisible ? "pixel-pulse" : ""}`}
                        style={{
                          opacity: isVisible ? 1 : 0.3,
                          transition: "opacity 0.3s ease-out",
                        }}
                      >
                        {/* Horizontal connector line */}
                        <div
                          className={`absolute top-1/2 ${event.side === "left" ? "right-full" : "left-full"} h-2 bg-game-primary transform -translate-y-1/2`}
                          style={{
                            width: isVisible ? "2rem" : "0",
                            transition: "width 0.5s ease-out",
                            transitionDelay: "0.2s",
                          }}
                        ></div>
                      </div>

                      {/* Right side content */}
                      <div
                        className={`w-1/2 pl-8 ${event.side === "right" ? "block" : "invisible"}`}
                        style={{
                          opacity: isVisible && event.side === "right" ? 1 : 0,
                          transform: isVisible ? "translateX(0)" : "translateX(30px)",
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: "0.4s",
                        }}
                      >
                        <div className="pixel-card">
                          <div className="text-game-primary font-bold mb-1 font-pixel">{event.year}</div>
                          <h4 className="text-sm font-bold mb-2 font-pixel">{event.title}</h4>
                          {event.image && (
                            <div className="mb-3">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                width={400}
                                height={200}
                                className="rounded-md w-full max-w-sm object-cover"
                              />
                            </div>
                          )}
                          <p className="text-xs font-sans">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
