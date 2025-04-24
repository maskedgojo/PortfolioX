"use client"

import { useEffect } from "react"

export default function FontPreload() {
  useEffect(() => {
    // This helps ensure the font is loaded before displaying content
    document.documentElement.classList.add("font-loaded")

    // Add a small delay to allow the font to render properly
    const timer = setTimeout(() => {
      document.documentElement.classList.add("font-ready")
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
