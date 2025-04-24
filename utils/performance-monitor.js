// Simple performance monitoring utility

export const monitorPerformance = (componentName) => {
  if (process.env.NODE_ENV !== "production") {
    console.time(`${componentName} render time`)

    return () => {
      console.timeEnd(`${componentName} render time`)
    }
  }

  return () => {}
}

// Helper to detect low-end devices
export const isLowEndDevice = () => {
  if (typeof window === "undefined") return false

  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Check for low memory (if available)
  const hasLowMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4

  // Check for low CPU cores (if available)
  const hasLowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4

  return isMobile || hasLowMemory || hasLowCPU
}

// Helper to detect reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
