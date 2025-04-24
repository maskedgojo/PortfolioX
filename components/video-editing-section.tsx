"use client"

import { useState, useEffect, useRef } from "react"
import { Play, X } from "lucide-react"
import Image from "next/image"

const videoProjects = [
  {
    id: 1,
    title: "VALORANT MONTAGE",
    description: "FAST PACED HIGHLIGHT EDIT OF A FPS GAME",
    thumbnail: "/images/videogallery1.mp4",
    videoUrl: "https://youtu.be/s0GqG-bMb0w?si=uOL0hm6wYpQPaIMz",
  },
  {
    id: 2,
    title: "PODCAST ",
    description: "INTERACTIVE PODCAST FOCUSING ON IDEAS AND METHODS TO IMPROVE YOUR ENTREPRENUAL MINDSET",
    thumbnail: "/images/videogallery2.mp4?height=600&width=800",
    videoUrl: "https://youtu.be/sYucZRuch0M?si=lgAezfhOkGZeHoIm",
  },
  {
    id: 3,
    title: "EVENT BROADCAST",
    description: "BROADCAST VIDEO FOR PROMOTION OF AN OFFLINE EVENT",
    thumbnail: "/images/videogallery3.mp4?height=600&width=800",
    videoUrl: "https://www.instagram.com/reel/DHv5c65zfbu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 4,
    title: "SMART LIGHT SYSTEM",
    description: "IOT BASED LIGHTING SYSTEM THAT CHANGES BRIGHTNESS ACCORDING TO OBJECT DETECTION",
    thumbnail: "/images/videogallery4.mp4?height=600&width=800",
    videoUrl: "https://www.github.com/ramanbuchha",
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
                  {/* Grid overlay removed */}
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
