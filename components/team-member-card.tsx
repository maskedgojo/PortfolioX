"use client"

import { useState } from "react"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

interface Stats {
  strength: number
  intelligence: number
  speed: number
  creativity: number
}

interface Social {
  platform: string
  url: string
}

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  stats: Stats
  socials: Social[]
}

interface TeamMemberCardProps {
  member: TeamMember
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />
      case "GitHub":
        return <Github className="h-5 w-5" />
      case "Twitter":
        return <Twitter className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div
      className="pixel-card h-full transition-all duration-300 hover:neon-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden mb-4">
        {/* Grid overlay removed */}
        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-2">
          <div className="text-sm font-bold">{member.name}</div>
          <div className="text-xs text-game-primary">{member.role}</div>
        </div>
      </div>

      <div className="p-2">
        <p className="text-xs mb-4">{member.bio}</p>

        {/* Character stats */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="mb-1">REACT</div>
              <div className="w-full h-3 bg-black border border-white">
                <div className="h-full bg-game-primary" style={{ width: `${member.stats.strength}%` }}></div>
              </div>
            </div>
            <div>
              <div className="mb-1">JAVA</div>
              <div className="w-full h-3 bg-black border border-white">
                <div className="h-full bg-game-secondary" style={{ width: `${member.stats.intelligence}%` }}></div>
              </div>
            </div>
            <div>
              <div className="mb-1">C/C++</div>
              <div className="w-full h-3 bg-black border border-white">
                <div className="h-full bg-game-accent" style={{ width: `${member.stats.speed}%` }}></div>
              </div>
            </div>
            <div>
              <div className="mb-1">PYTHON</div>
              <div className="w-full h-3 bg-black border border-white">
                <div className="h-full bg-game-primary" style={{ width: `${member.stats.creativity}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          {member.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-game-text hover:neon-text transition-all duration-300 ${isHovered ? "pixel-bounce" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`${member.name}'s ${social.platform}`}
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamMemberCard
