export const detectLowPerformanceDevice = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return false

  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Check for low memory (if available)
  const hasLowMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4

  // Check for low CPU cores (if available)
  const hasLowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4

  // Check for Safari on iOS (which often has performance issues with WebGL)
  const isSafariIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream &&
    /Safari/i.test(navigator.userAgent) &&
    !/Chrome/i.test(navigator.userAgent)

  return isMobile || hasLowMemory || hasLowCPU || isSafariIOS
}
