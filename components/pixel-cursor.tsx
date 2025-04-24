"use client"

import { useEffect, useState } from "react"

const PixelCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }) // Start offscreen
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const updatePosition = (e) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Add event listeners
    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Handle hover states for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    
    const handleMouseEnterInteractive = () => setIsHovering(true)
    const handleMouseLeaveInteractive = () => setIsHovering(false)

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive)
      el.addEventListener("mouseleave", handleMouseLeaveInteractive)
    })

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive)
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive)
      })
    }
  }, [isVisible])

  // Don't render anything during SSR
  if (!isClient) return null

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .pixel-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          background-color: transparent;
          box-shadow: 
            /* Create pixel art cursor */
            0 0 0 2px rgba(255, 215, 0, 1),
            4px 0 0 2px rgba(255, 215, 0, 1),
            8px 0 0 2px rgba(255, 215, 0, 1),
            12px 0 0 2px rgba(255, 215, 0, 1),
            0 4px 0 2px rgba(255, 215, 0, 1),
            12px 4px 0 2px rgba(255, 215, 0, 1),
            0 8px 0 2px rgba(255, 215, 0, 1),
            12px 8px 0 2px rgba(255, 215, 0, 1),
            0 12px 0 2px rgba(255, 215, 0, 1),
            4px 12px 0 2px rgba(255, 215, 0, 1),
            8px 12px 0 2px rgba(255, 215, 0, 1),
            12px 12px 0 2px rgba(255, 215, 0, 1);
          pointer-events: none;
          z-index: 9997;
          transition: opacity 0.2s ease;
          will-change: transform;
        }
        
        .pixel-cursor-active {
          box-shadow: 
            /* Create pixel art cursor (active state) */
            0 0 0 2px #ffffff,
            4px 0 0 2px #ffffff,
            8px 0 0 2px #ffffff,
            12px 0 0 2px #ffffff,
            0 4px 0 2px #ffffff,
            12px 4px 0 2px #ffffff,
            0 8px 0 2px #ffffff,
            12px 8px 0 2px #ffffff,
            0 12px 0 2px #ffffff,
            4px 12px 0 2px #ffffff,
            8px 12px 0 2px #ffffff,
            12px 12px 0 2px #ffffff;
        }
        
        .pixel-cursor-hover {
          transform: scale(1.2);
        }
      `}</style>

      <div
        className={`pixel-cursor ${isActive ? "pixel-cursor-active" : ""} ${isHovering ? "pixel-cursor-hover" : ""}`}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

export default PixelCursor

// CursorManager.tsx (New component to manage both cursors)
"use client"

import { useState, useEffect } from "react"
import CustomCursor from "./CustomCursor"
import PixelCursor from "./PixelCursor"

const CursorManager = ({ cursorType = "custom" }) => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    
    // Disable default cursor on the entire document
    document.documentElement.style.cursor = "none"
    
    return () => {
      // Restore default cursor when component unmounts
      document.documentElement.style.cursor = ""
    }
  }, [])
  
  // Don't render anything during SSR
  if (!isClient) return null
  
  // Render chosen cursor type
  return (
    <>
      {cursorType === "custom" && <CustomCursor />}
      {cursorType === "pixel" && <PixelCursor />}
    </>
  )
}

export default CursorManager
