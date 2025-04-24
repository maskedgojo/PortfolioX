"use client"

import { useState } from "react"
import Image from "next/image"

interface TechIconProps {
  icon: string
  name: string
}

export const AnimatedTechIcon = ({ icon, name }: TechIconProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="pixel-tech-box w-full h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-12 h-12 mb-2">
        <Image src={icon || "/placeholder.svg"} alt={name} fill className="object-contain" />
      </div>
      <span className="text-xs text-center font-pixel">{name}</span>
    </div>
  )
}
