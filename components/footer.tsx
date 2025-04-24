"use client"

import type React from "react"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "TEAM", href: "#team" },
    { name: "TECH", href: "#tech-stack" },
    { name: "PROJECTS", href: "#projects" },
    { name: "VIDEOS", href: "#video-editing" },
    { name: "GRAPHICS", href: "#graphic-design" },
    { name: "CONTACT", href: "#contact" },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", label: "YouTube" },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

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
    <footer className="bg-black py-12 border-t-4 border-game-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl neon-text mb-4">TEAM.EXE</h3>
            <p className="mb-4 text-sm text-game-text/70">
              A DYNAMIC TEAM OF DEVELOPERS PASSIONATE ABOUT TECHNOLOGY AND INNOVATION.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-game-text/70 hover:text-game-primary transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm neon-text-secondary mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-xs grid grid-cols-2">
              {footerLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-game-text/70 hover:text-game-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm neon-text-accent mb-4">CONTACT INFO</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-game-primary" />
                <a
                  href="mailto:contact@teamportfolio.com"
                  className="text-game-text/70 hover:text-game-primary transition-colors duration-300"
                >
                  CONTACT@TEAMPORTFOLIO.COM
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-game-primary" />
                <a
                  href="tel:+1234567890"
                  className="text-game-text/70 hover:text-game-primary transition-colors duration-300"
                >
                  +123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-game-muted pt-8 text-center">
          <p className="text-xs text-game-text/50">&copy; {currentYear} TEAM.EXE - ALL RIGHTS RESERVED</p>
          <div className="mt-2 text-xs text-game-text/30 pixel-blink">PRESS START TO CONTINUE</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
