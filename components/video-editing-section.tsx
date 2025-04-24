"use client"

import { useState, useEffect, useRef } from "react"
import { Play, X } from "lucide-react"
import Image from "next/image"

const videoProjects = [
  {
    id: 1,
    title: "CORPORATE PROMO",
    description: "A SLEEK CORPORATE PROMOTIONAL VIDEO SHOWCASING COMPANY CULTURE AND VALUES.",
    thumbnail: "/placeholder.svg?height=600&width=800",
    videoUrl: "https://www.example.com/video1",
  },
  {
    id: 2,
    title: "PRODUCT LAUNCH",
    description: "DYNAMIC PRODUCT LAUNCH VIDEO WITH MOTION GRAPHICS AND VISUAL EFFECTS.",
    thumbnail: "/placeholder.svg?height=600&width=800",
    videoUrl: "https://www.example.com/video2",
  },
  {
    id: 3,
    title: "EVENT HIGHLIGHTS",
    description: "CINEMATIC HIGHLIGHTS FROM A TECH CONFERENCE WITH INTERVIEWS AND KEY MOMENTS.",
    thumbnail: "/placeholder.svg?height=600&width=800",
    videoUrl: "https://www.example.com/video3",
  },
  {
    id: 4,
    title: "TUTORIAL SERIES",
    description: "EDUCATIONAL TUTORIAL SERIES WITH ANIMATED EXPLANATIONS AND STEP-BY-STEP GUIDES.",
    thumbnail: "/placeholder.svg?height=600&width=800",
    videoUrl: "https://www.example.com/video4",
  },
]

const VideoEditingSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
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

  const openVideoModal = (id: number) => {
    setSelectedVideo(id)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  return (
    <section id="video-editing" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4">VIDEO GALLERY</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm">
            EXPLORE OUR VIDEO EDITING PROJECTS SHOWCASING OUR CREATIVITY, TECHNICAL SKILLS, AND STORYTELLING ABILITIES.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${isVisible ? "pixel-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="pixel-card h-full">
                <div className="relative h-48 w-full overflow-hidden group mb-4">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20 pointer-events-none z-10">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-game-primary" />
                    ))}
                  </div>
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openVideoModal(project.id)}
                      className="bg-game-primary p-3 border-2 border-black"
                    >
                      <Play className="h-6 w-6 text-black" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold mb-2 neon-text">{project.title}</h3>
                <p className="text-xs mb-4">{project.description}</p>

                <button onClick={() => openVideoModal(project.id)} className="pixel-btn w-full">
                  WATCH VIDEO
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
            <div className="relative w-full max-w-4xl">
              <button onClick={closeVideoModal} className="absolute -top-12 right-0 text-white hover:text-game-primary">
                <X className="h-8 w-8" />
              </button>

              <div className="pixel-card aspect-video bg-black overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm">VIDEO PLAYER WOULD BE EMBEDDED HERE</p>
                  <div className="absolute bottom-4 left-4 right-4 h-2 bg-white">
                    <div className="h-full w-1/3 bg-game-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-4 bg-game-primary"></div>
      <div className="absolute bottom-0 right-0 w-full h-4 bg-game-primary"></div>
    </section>
  )
}

export default VideoEditingSection
