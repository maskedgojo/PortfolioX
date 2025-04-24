"use client"

import { useEffect, useState, useRef } from "react"
import TeamMemberCard from "./team-member-card"

const teamMembers = [
  {
    id: 1,
    name: "ANMOL",
    role: "FULL STACK DEV",
    image: "/placeholder.svg?height=400&width=400",
    bio: "PASSIONATE ABOUT CREATING SEAMLESS USER EXPERIENCES WITH MODERN WEB TECHNOLOGIES.",
    stats: {
      strength: 85,
      intelligence: 90,
      speed: 75,
      creativity: 80,
    },
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/anmol-jena89/" },
      { platform: "GitHub", url: "https://github.com/ANMOLJENA" },
    ],
  },
  {
    id: 2,
    name: "SHWATI",
    role: "UI/UX DESIGNER",
    image: "/placeholder.svg?height=400&width=400",
    bio: "CRAFTING BEAUTIFUL AND INTUITIVE INTERFACES THAT BRIDGE THE GAP BETWEEN USERS AND TECHNOLOGY.",
    stats: {
      strength: 70,
      intelligence: 85,
      speed: 80,
      creativity: 95,
    },
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/shwati-khilar-019476344/" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
  {
    id: 3,
    name: "RAMAN",
    role: "BACKEND DEV",
    image: "/images/raman.jpg?height=400&width=400",
    bio: "BUILDING ROBUST AND SCALABLE SERVER-SIDE SOLUTIONS TO POWER MODERN APPLICATIONS.",
    stats: {
      strength: 90,
      intelligence: 85,
      speed: 70,
      creativity: 75,
    },
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ramanbuchha/" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
  {
    id: 4,
    name: "KUSHAAGRA",
    role: "AI/ML DEV",
    image: "/placeholder.svg?height=400&width=400",
    bio: "BUILDING INTELLIGENT AND EFFICIENT AI/ML SOLUTIONS WITH A FOCUS ON INNOVATION, SCALABILITY, AND REAL-WORLD IMPACT.",
    stats: {
      strength: 75,
      intelligence: 80,
      speed: 85,
      creativity: 90,
    },
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/kushaagra-singh-1ba142282/" },
      { platform: "GitHub", url: "https://github.com/maskedgojo/maskedgojo" },
    ],
  },
]

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section id="team" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4">SELECT YOUR CHARACTER</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm">
            MEET OUR TALENTED TEAM OF PROFESSIONALS WHO WORK TOGETHER TO DELIVER EXCEPTIONAL RESULTS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`${isVisible ? "pixel-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-game-primary"></div>
      <div className="absolute bottom-10 right-10 w-8 h-8 bg-game-secondary"></div>
      <div className="absolute top-1/2 left-5 w-4 h-4 bg-game-accent"></div>
      <div className="absolute top-1/3 right-5 w-4 h-4 bg-game-primary"></div>
    </section>
  )
}

export default TeamSection
