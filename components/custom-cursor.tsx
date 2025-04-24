"use client"

import { useEffect, useState } from "react"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }) // Start offscreen
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const onMouseMove = (e) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const onMouseEnter = () => setHidden(false)
    const onMouseLeave = () => setHidden(true)
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    // Handle hover states for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setLinkHovered(true))
      el.addEventListener("mouseleave", () => setLinkHovered(false))
    })

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => setLinkHovered(true))
        el.removeEventListener("mouseleave", () => setLinkHovered(false))
      })
    }
  }, [])

  // Don't render anything during SSR
  if (!isClient) return null

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: #ffd700;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 0.2s ease;
          transform-origin: center;
          will-change: transform;
        }
        
        .cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 2px solid #ffd700;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.1s ease, border-color 0.2s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
          will-change: transform, width, height;
        }
        
        .cursor-hover {
          width: 48px;
          height: 48px;
          border-color: rgba(255, 215, 0, 0.5);
          transform: translate(-24px, -24px) !important;
        }
      `}</style>

      <div
        className={`cursor-dot ${clicked ? "bg-white" : ""} ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div
        className={`cursor-outline ${linkHovered ? "cursor-hover" : ""} ${clicked ? "border-white" : ""} ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        }}
      />
    </>
  )
}

export default CustomCursor
