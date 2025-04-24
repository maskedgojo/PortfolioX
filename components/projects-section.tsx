"use client"

import { useState, useEffect, useRef } from "react"
import { Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "ECOTRAFFIC-AI-DELHI-HACKATHON",
    description:
      "EcoTraffic AI is an AI-powered smart system designed to optimize traffic flow and reduce pollution levels in Delhi through real-time data analysis and adaptive signal control.",
    image: "/images/ecotraffic ai delhi hackathon.png?height=600&width=800",
    githubUrl: "https://github.com/maskedgojo/Ecotraffic-AI---Delhi-Hackthon",
    liveUrl: "v0-delhi-hackthon.vercel.app/",
    tags: ["TYPESCRIPT", "CSS", "JAVASCRIPT"],
  },
  {
    id: 2,
    title: "PACMAN",
    description:
      "A classic arcade-style Pacman Game where players navigate mazes, eat pellets, and evade ghosts for high scores and endless fun.",
    image: "/images/pacman.png?height=600&width=800",
    githubUrl: "https://github.com/maskedgojo/Pacman",
    tags: ["JAVA"],
  },
  {
    id: 3,
    title: "MOVIE-RECOMMENDER-SYSTEM",
    description:
      "An intelligent Movie Recommender System that suggests personalized films using machine learning and vectorization based on user preferences.",
    image: "/images/movie recommender preview.png?height=600&width=800",
    githubUrl: "https://github.com/maskedgojo/MOVIE-RECOMMENDER-SYSTEM",
    tags: ["PYTHON"],
  },
  {
    id: 4,
    title: "MEMORY CARD GAME",
    description:
      "A fun and interactive Memory Card Game where players match pairs of cards using concentration and visual recall skills.",
    image: "/images/memory game.png?height=600&width=800",
    githubUrl: "https://github.com/maskedgojo/Memory-cards-game",
    tags: ["JAVA"],
  },
  {
    id: 5,
    title: "CALCULATOR",
    description:
      "A simple and efficient Calculator app for performing basic arithmetic operations with a clean and user-friendly interface.",
    image: "/images/calculator.png?height=600&width=800",
    githubUrl: "https://github.com/ANMOLJENA/calculator-project",
    tags: ["CSS", "JAVASCRIPT", "HTML"],
  },
  {
    id: 6,
    title: "NETFLIX CLONE",
    description:
      "A static Netflix Clone built with only HTML and CSS, replicating the visual layout and design of the original platform.",
    image: "/images/netflix clone.png?height=600&width=800",
    githubUrl: "https://github.com/maskedgojo/Netflix-Clone",
    tags: ["HTML", "CSS"],
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
                  {/* Grid overlay removed */}
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
