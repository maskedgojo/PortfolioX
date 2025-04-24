"use client"

import { useState, useEffect, useRef } from "react"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-COMMERCE PLATFORM",
    description: "A FULL-STACK E-COMMERCE PLATFORM WITH USER AUTHENTICATION, PRODUCT CATALOG, AND PAYMENT INTEGRATION.",
    image: "/placeholder.svg?height=600&width=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["REACT", "NODE.JS", "MONGODB"],
  },
  {
    id: 2,
    title: "TASK MANAGEMENT APP",
    description: "A COLLABORATIVE TASK MANAGEMENT APPLICATION WITH REAL-TIME UPDATES AND TEAM COLLABORATION FEATURES.",
    image: "/placeholder.svg?height=600&width=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["REACT", "FIREBASE", "TAILWIND"],
  },
  {
    id: 3,
    title: "PORTFOLIO WEBSITE",
    description: "A RESPONSIVE PORTFOLIO WEBSITE BUILT WITH REACT AND NEXT.JS TO SHOWCASE PROJECTS AND SKILLS.",
    image: "/placeholder.svg?height=600&width=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["NEXT.JS", "FRAMER", "TAILWIND"],
  },
  {
    id: 4,
    title: "WEATHER DASHBOARD",
    description: "A WEATHER DASHBOARD THAT DISPLAYS CURRENT AND FORECASTED WEATHER DATA USING A THIRD-PARTY API.",
    image: "/placeholder.svg?height=600&width=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["REACT", "API", "CHART.JS"],
  },
  {
    id: 5,
    title: "SOCIAL MEDIA APP",
    description: "A SOCIAL MEDIA APPLICATION WITH USER PROFILES, POSTS, COMMENTS, AND REAL-TIME NOTIFICATIONS.",
    image: "/placeholder.svg?height=600&width=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["REACT NATIVE", "FIREBASE", "REDUX"],
  },
  {
    id: 6,
    title: "RECIPE FINDER",
    description:
      "A RECIPE FINDER APPLICATION THAT ALLOWS USERS TO SEARCH FOR RECIPES BASED ON INGREDIENTS AND DIETARY RESTRICTIONS.",
    image: "/placeholder.svg?height=600&width=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["JAVASCRIPT", "API", "CSS GRID"],
  },
]

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const projectsPerPage = 3
  const totalPages = Math.ceil(projects.length / projectsPerPage)

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

  const visibleProjects = projects.slice(currentIndex * projectsPerPage, (currentIndex + 1) * projectsPerPage)

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4">QUEST LOG</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm">
            CHECK OUT SOME OF OUR RECENT PROJECTS THAT SHOWCASE OUR SKILLS AND EXPERTISE.
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
                <div className="relative h-48 w-full overflow-hidden mb-4">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20 pointer-events-none z-10">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-game-primary" />
                    ))}
                  </div>
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>

                <h3 className="text-sm font-bold mb-2 neon-text">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-black border border-game-primary text-game-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs mb-4">{project.description}</p>

                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs hover:neon-text transition-all duration-300"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    GITHUB
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs hover:neon-text transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    DEMO
                  </a>
                </div>
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
      </div>
    </section>
  )
}

export default ProjectsSection
