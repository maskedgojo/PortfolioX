"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section
      const sections = ["home", "about", "team", "tech-stack", "projects", "video-editing", "graphic-design", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "TEAM", href: "#team" },
    { name: "TECH", href: "#tech-stack" },
    { name: "PROJECTS", href: "#projects" },
    { name: "VIDEOS", href: "#video-editing" },
    { name: "GRAPHICS", href: "#graphic-design" },
    { name: "CONTACT", href: "#contact" },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      // Add retro transition effect
      document.body.classList.add("screen-transition")

      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        })

        setTimeout(() => {
          document.body.classList.remove("screen-transition")
        }, 500)
      }, 300)
    }
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-game-bg/90 backdrop-blur-md border-b-2 border-black" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="#home"
              className="text-xl neon-text uppercase tracking-widest font-pixel"
              onClick={(e) => handleLinkClick(e, "#home")}
            >
              TEAM.EXE
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`navbar-link px-2 py-1 transition-all duration-300 ${
                  activeSection === link.href.replace("#", "") ? "neon-text pixel-bounce" : "hover:neon-text"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-game-text hover:neon-text"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-game-bg/95 backdrop-blur-md border-b-2 border-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`navbar-link block px-3 py-2 ${
                  activeSection === link.href.replace("#", "") ? "neon-text" : "hover:neon-text"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
