"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react"
import Image from "next/image"

const designProjects = [
  {
    id: 1,
    title: "BRAND NIKE",
    description: "COMPLETE BRAND IDENTITY DESIGN INCLUDING LOGO, COLOR PALETTE, AND TYPOGRAPHY.",
    image: "/images/graphicdesign3.jpg",
    category: "BRANDING",
  },
  {
    id: 2,
    title: "BRAND BURGER KING",
    description: "COMPLETE BRAND IDENTITY DESIGN INCLUDING LOGO, COLOR PALETTE, AND TYPOGRAPHY.",
    image: "/images/graphicdesign4.jpg",
    category: "BRANDING",
  },
  {
    id: 3,
    title: "POSTER DESIGN",
    description: "CREATING DYNAMIC AND IMPACTFUL POSTERS CELEBRATING THE LEGEND OF CRISTIANO RONALDO.",
    image: "/images/graphicdesign5.jpg",
    category: "PRINT",
  },
  {
    id: 4,
    title: "POSTER DESIGN",
    description: "DESIGNING ENERGETIC AND INSPIRATIONAL POSTERS HIGHLIGHTING THE LEGACY OF STEPHEN CURRY.",
    image: "/images/graphicdesign1.jpg",
    category: "PRINT",
  },
  {
    id: 5,
    title: "ILLUSTRATION",
    description: "CREATING CUSTOM DIGITAL ILLUSTRATIONS TO CELEBRATE GANESH CHATURTHI, A JOYOUS INDIAN FESTIVAL.",
    image: "/images/graphicdesign2.jpg",
    category: "ILLUSTRATION",
  },
  {
    id: 6,
    title: "YOUTUBE THUMBNAIL DESIGN",
    description:
      "CREATING EYE-CATCHING YOUTUBE THUMBNAIL DESIGNS THAT CAPTURE THE ESSENCE OF THE VIDEO, WITH A FOCUS ON ENGAGEMENT AND VISUAL APPEAL.",
    image: "/images/graphicdesign6.jpg",
    category: "YOUTUBE THUMBNAIL",
  },
]

const GraphicDesignSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const projectsPerPage = 3
  const totalPages = Math.ceil(designProjects.length / projectsPerPage)

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1))
  }

  const openImageModal = (image: string) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const visibleProjects = designProjects.slice(currentIndex * projectsPerPage, (currentIndex + 1) * projectsPerPage)

  return (
    <section id="graphic-design" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4">GRAPHIC DESIGNING</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm">
            EXPLORE OUR GRAPHIC DESIGN PROJECTS SHOWCASING OUR CREATIVITY, ATTENTION TO DETAIL, AND VISUAL COMMUNICATION
            SKILLS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
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
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openImageModal(project.image)}
                      className="bg-game-primary p-2 border-2 border-black"
                    >
                      <Maximize className="h-5 w-5 text-black" />
                    </button>
                  </div>
                </div>

                <span className="inline-block px-2 py-1 text-xs bg-black border border-game-primary text-game-primary mb-2">
                  {project.category}
                </span>

                <h3 className="text-sm font-bold mb-2 neon-text">{project.title}</h3>
                <p className="text-xs mb-4">{project.description}</p>

                <button onClick={() => openImageModal(project.image)} className="pixel-btn w-full">
                  VIEW PROJECT
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button onClick={prevSlide} className="pixel-btn p-2" aria-label="Previous projects">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 text-xs border-2 border-black ${
                  index === currentIndex ? "bg-game-primary text-black" : "bg-game-muted hover:bg-game-primary/50"
                }`}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button onClick={nextSlide} className="pixel-btn p-2" aria-label="Next projects">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Image Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
            <div className="relative w-full max-w-4xl">
              <button onClick={closeImageModal} className="absolute -top-12 right-0 text-white hover:text-game-primary">
                <X className="h-8 w-8" />
              </button>

              <div className="pixel-card overflow-hidden">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Project preview"
                  width={1200}
                  height={800}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GraphicDesignSection
