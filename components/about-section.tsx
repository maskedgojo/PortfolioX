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
    year: "2024",
    title: "BASKETBALL GAME",
    description: "Anmol clinched victory for KIIT in the inter-college basketball tournament with an outstanding performance.",
    side: "left",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2024",
    title: "MUN",
    description: "Kushaagra participated in the Model United Nations, gaining valuable experience in diplomacy, public speaking, and global affairs.",
    side: "right",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2025",
    title: "HACKATHON RELATED TO DIABETIC PREDICTION",
    description: "Kushaagra explored diabetes prediction using Near-Infrared (NIR) technology at Ideathon, contributing to innovative healthcare solutions.",
    side: "left",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2025",
    title: "DELHI HACKATHON",
    description: "Kushaagra qualified among the top 8 teams out of 700+ at the IIT Delhi Energy Hackathon, developing an AI-driven solution to tackle air pollution in Delhi-NCR..",
    side: "right",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    year: "2025",
    title: "SOCIAL SERVICE",
    description: "The team actively participated in a food drive for animals, contributing to the welfare and care of stray and shelter animals.",
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
              <div className="space-y-4 text-sm max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2">
                <p>
                  Our journey kicked off in the lively halls of our college, where four eager tech enthusiasts crossed
                  paths during our second year of B.Tech in Computer Science. Each of us brought our own unique flair to
                  the table: one of us was a whiz with C and Java, another had a knack for web development with HTML,
                  CSS, and JavaScript, while the third was diving headfirst into Python and machine learning. And let's
                  not forget our fourth member, who had a passion for IoT and data analytics, adding a fresh twist to
                  our group dynamic.
                </p>
                <p>
                  As we teamed up on various projects, it quickly became clear that our diverse skills were like pieces
                  of a puzzle that fit together perfectly. Our late-night brainstorming sessions turned into a fun
                  playground of ideas, where we dreamed up everything from sleek web applications to innovative smart
                  systems. With every chat, our bond grew stronger, and we found ourselves not just as teammates but as
                  friends.
                </p>
                <p>
                  But our journey wasn't just about technology. We also dedicated time to community service, believing
                  in the importance of giving back and making a positive impact. Whether it was organizing workshops for
                  local schools or participating in environmental clean-up drives, we found joy in connecting with our
                  community and using our skills for a greater good.
                </p>
                <p>
                  In addition to our tech pursuits, we discovered a shared love for video editing. We spent countless
                  hours creating engaging content, from project showcases to fun vlogs that captured our adventures.
                  This creative outlet allowed us to express ourselves and share our journey with others in a visually
                  appealing way.
                </p>
                <p>
                  And let's not forget our budding public speaking skills! We took every opportunity to present our
                  projects and ideas, honing our ability to communicate effectively and inspire others. Whether it was
                  pitching at hackathons or speaking at college events, we embraced the chance to share our passion for
                  technology and community service.
                </p>
                <p>
                  Together, we're more than just a group of students; we're a team fueled by passion and curiosity,
                  excited to explore the endless possibilities of technology while making a difference in the world
                  around us. As we continue this journey, we can't wait to craft solutions that inspire and uplift our
                  community!
                </p>
              </div>

              {/* Health bar */}
              <div className="mt-6">
                <div className="text-xs mb-1">TEAM POWER</div>
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
                          <div className="text-game-primary font-bold mb-1">{event.year}</div>
                          <h4 className="text-sm font-bold mb-2">{event.title}</h4>
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
                          <p className="text-xs">{event.description}</p>
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
                          <div className="text-game-primary font-bold mb-1">{event.year}</div>
                          <h4 className="text-sm font-bold mb-2">{event.title}</h4>
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
                          <p className="text-xs">{event.description}</p>
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
