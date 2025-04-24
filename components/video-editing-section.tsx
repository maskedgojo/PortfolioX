"use client"

import { useState, useEffect, useRef } from "react"
import { Play, X, ExternalLink } from "lucide-react"

const videoProjects = [
  {
    id: 1,
    title: "VALORANT MONTAGE",
    description: "FAST PACED HIGHLIGHT EDIT OF A FPS GAME",
    thumbnail: "/images/videogallery1.mp4",
    videoUrl: "https://youtu.be/s0GqG-bMb0w?si=uOL0hm6wYpQPaIMz",
    embedUrl: "https://www.youtube.com/embed/s0GqG-bMb0w?si=uOL0hm6wYpQPaIMz",
  },
  {
    id: 2,
    title: "PODCAST ",
    description: "INTERACTIVE PODCAST FOCUSING ON IDEAS AND METHODS TO IMPROVE YOUR ENTREPRENUAL MINDSET",
    thumbnail: "/images/videogallery2.mp4",
    videoUrl: "https://youtu.be/sYucZRuch0M?si=lgAezfhOkGZeHoIm",
    embedUrl: "https://www.youtube.com/embed/sYucZRuch0M?si=lgAezfhOkGZeHoIm",
  },
  {
    id: 3,
    title: "EVENT BROADCAST",
    description: "BROADCAST VIDEO FOR PROMOTION OF AN OFFLINE EVENT",
    thumbnail: "/images/videogallery3.mp4",
    videoUrl: "https://www.instagram.com/reel/DHv5c65zfbu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    // Instagram doesn't support direct embedding, so we'll handle this specially
    embedUrl: "",
  },
  {
    id: 4,
    title: "SMART LIGHT SYSTEM",
    description: "IOT BASED LIGHTING SYSTEM THAT CHANGES BRIGHTNESS ACCORDING TO OBJECT DETECTION",
    thumbnail: "/images/videogallery4.mp4",
    videoUrl: "https://www.github.com/ramanbuchha",
    embedUrl: "",
  },
]

const VideoEditingSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [playingVideos, setPlayingVideos] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

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

  const handleVideoHover = (index: number, isEntering: boolean) => {
    const video = videoRefs.current[index]
    if (video) {
      if (isEntering) {
        video.play().catch(err => console.log("Video play failed:", err))
        setPlayingVideos(prev => [...prev, index])
      } else if (!playingVideos.includes(index)) {
        video.pause()
        video.currentTime = 0
      }
    }
  }

  const togglePlayingVideo = (index: number) => {
    const isPlaying = playingVideos.includes(index)
    const video = videoRefs.current[index]
    
    if (isPlaying) {
      // Remove from playing videos
      setPlayingVideos(prev => prev.filter(i => i !== index))
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    } else {
      // Add to playing videos
      setPlayingVideos(prev => [...prev, index])
      if (video) {
        video.play().catch(err => console.log("Video play failed:", err))
      }
    }
  }

  const openExternalUrl = (url: string) => {
    window.open(url, '_blank')
  }

  const getSelectedProject = () => {
    return selectedVideo !== null ? videoProjects.find(p => p.id === selectedVideo) : null
  }

  const renderVideoContent = () => {
    const project = getSelectedProject()
    if (!project) return null

    if (project.embedUrl) {
      return (
        <iframe
          src={project.embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    } else {
      // For videos that can't be embedded (Instagram, GitHub)
      return (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <p className="text-sm mb-4">This video can't be embedded directly.</p>
          <button onClick={() => openExternalUrl(project.videoUrl)} className="pixel-btn">
            OPEN ORIGINAL VIDEO
          </button>
        </div>
      )
    }
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
                <div 
                  className="relative h-48 w-full overflow-hidden group mb-4"
                  onMouseEnter={() => handleVideoHover(index, true)}
                  onMouseLeave={() => handleVideoHover(index, false)}
                >
                  {/* Video element for the thumbnail */}
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={project.thumbnail}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openVideoModal(project.id)}
                        className="bg-game-primary p-3 border-2 border-black"
                        title="Watch Video"
                      >
                        <Play className="h-6 w-6 text-black" />
                      </button>
                      <button
                        onClick={() => togglePlayingVideo(index)}
                        className={`p-3 border-2 border-black ${playingVideos.includes(index) ? "bg-red-500" : "bg-green-500"}`}
                        title={playingVideos.includes(index) ? "Stop Thumbnail" : "Play Thumbnail"}
                      >
                        {playingVideos.includes(index) ? "■" : "▶"}
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-bold mb-2 neon-text">{project.title}</h3>
                <p className="text-xs mb-4">{project.description}</p>

                <div className="flex gap-2">
                  <button onClick={() => openVideoModal(project.id)} className="pixel-btn flex-1">
                    WATCH VIDEO
                  </button>
                  <button 
                    onClick={() => openExternalUrl(project.videoUrl)} 
                    className="pixel-btn bg-green-700 flex items-center justify-center p-2"
                    title="Open Original Link"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
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
                {renderVideoContent()}
              </div>
              
              <div className="mt-4 flex justify-center">
                <a 
                  href={getSelectedProject()?.videoUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pixel-btn"
                >
                  OPEN ORIGINAL LINK
                </a>
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
