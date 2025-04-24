"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Mail, Phone, User, Send } from "lucide-react"

const ContactSection = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  // Animation states
  const [fireIntensity, setFireIntensity] = useState(3)
  const [showShooting, setShowShooting] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const requestRef = useRef<number>()
  const starPositions = useRef(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    })),
  )

  // Visibility observer for animations
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

  // Set up random shooting stars
  useEffect(() => {
    const showRandomStar = () => {
      setShowShooting(true)
      setTimeout(() => setShowShooting(false), 1000)

      // Set next random star
      const randomDelay = Math.random() * 8000 + 4000
      setTimeout(showRandomStar, randomDelay)
    }

    // Start the sequence
    const initialDelay = Math.random() * 3000 + 2000
    const timerId = setTimeout(showRandomStar, initialDelay)

    return () => clearTimeout(timerId)
  }, [])

  // Fire animation effect
  useEffect(() => {
    // Random fire intensity change
    const fireAnimation = () => {
      const randomChange = (Math.random() - 0.5) * 0.5
      setFireIntensity((prev) => {
        const newValue = prev + randomChange
        return Math.max(2.5, Math.min(4, newValue))
      })
    }

    const fireAnimationInterval = setInterval(fireAnimation, 200)

    return () => clearInterval(fireAnimationInterval)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "NAME IS REQUIRED"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "EMAIL IS REQUIRED"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "EMAIL IS INVALID"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "PHONE IS REQUIRED"
      isValid = false
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "PHONE MUST BE AT LEAST 10 DIGITS"
      isValid = false
    }

    if (!formData.purpose) {
      newErrors.purpose = "PURPOSE IS REQUIRED"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "MESSAGE IS REQUIRED"
      isValid = false
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "MESSAGE MUST BE AT LEAST 10 CHARACTERS"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Send data to PHP backend
      const response = await fetch("http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=portfolio_x&table=cform/contact-submit.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: "",
          message: "",
        })
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        setSubmitError(result.error || "Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to handle fire interaction
  const handleFireClick = () => {
    // Boost fire intensity temporarily
    setFireIntensity(4.5)
    setTimeout(() => setFireIntensity(3), 300)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden bg-game-bg">
      {/* Background gradient for night sky effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0028] to-[#1a0b4a] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl pixel-heading mb-4 font-pixel">CONTACT US</h2>
          <div className="w-16 h-2 bg-game-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm">
            HAVE A QUESTION OR WANT TO WORK WITH US? FILL OUT THE FORM BELOW AND WE'LL GET BACK TO YOU AS SOON AS
            POSSIBLE.
          </p>
        </div>

        {/* Content container */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            {/* Contact Form */}
            <div className={`w-full md:w-1/2 ${isVisible ? "pixel-fade-in" : "opacity-0"}`}>
              <div className="pixel-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-xs mb-2">NAME</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-game-text/50" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="YOUR NAME"
                          className="pixel-input w-full pl-10 text-xs"
                        />
                      </div>
                      {errors.name && <p className="text-xs text-game-primary mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs mb-2">EMAIL</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-game-text/50" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="YOUR EMAIL"
                          className="pixel-input w-full pl-10 text-xs"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-game-primary mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs mb-2">PHONE NUMBER</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-game-text/50" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="YOUR PHONE NUMBER"
                          className="pixel-input w-full pl-10 text-xs"
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-game-primary mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs mb-2">PURPOSE</label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="pixel-input w-full text-xs"
                      >
                        <option value="">SELECT PURPOSE</option>
                        <option value="general">GENERAL INQUIRY</option>
                        <option value="project">PROJECT PROPOSAL</option>
                        <option value="collaboration">COLLABORATION</option>
                        <option value="other">OTHER</option>
                      </select>
                      {errors.purpose && <p className="text-xs text-game-primary mt-1">{errors.purpose}</p>}
                    </div>

                    <div>
                      <label className="block text-xs mb-2">MESSAGE</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="YOUR MESSAGE"
                        className="pixel-input w-full min-h-32 text-xs"
                        rows={5}
                      ></textarea>
                      {errors.message && <p className="text-xs text-game-primary mt-1">{errors.message}</p>}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button type="submit" disabled={isSubmitting} className="pixel-btn">
                      {isSubmitting ? (
                        <span className="flex items-center">SENDING...</span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          SEND MESSAGE
                        </span>
                      )}
                    </button>
                  </div>

                  {submitError && (
                    <div className="p-4 border-2 border-game-primary bg-game-primary/20 text-game-primary text-center text-xs">
                      {submitError}
                    </div>
                  )}

                  {isSuccess && (
                    <div className="p-4 border-2 border-game-secondary bg-game-secondary/20 text-game-secondary text-center text-xs">
                      THANK YOU FOR YOUR MESSAGE! WE'LL GET BACK TO YOU SOON.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Interactive Forest Scene */}
            <div
              className={`w-full md:w-1/2 h-[500px] relative rounded-lg overflow-hidden ${isVisible ? "pixel-fade-in delay-300" : "opacity-0"}`}
            >
              {/* Night sky background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0028] to-[#1a124a]"></div>

              {/* Moon */}
              <div
                className="absolute w-24 h-24 rounded-full bg-[#f8f8d9]"
                style={{
                  top: "10%",
                  right: "15%",
                  boxShadow: "0 0 20px rgba(248, 248, 217, 0.5)",
                }}
              >
                <div className="absolute w-4 h-4 rounded-full bg-[#e8e8c9] top-4 left-6"></div>
                <div className="absolute w-6 h-6 rounded-full bg-[#e8e8c9] top-10 right-6"></div>
                <div className="absolute w-3 h-3 rounded-full bg-[#e8e8c9] bottom-8 left-10"></div>
              </div>

              {/* Stars */}
              {starPositions.current.map((star, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${star.y}%`,
                    left: `${star.x}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    animation: `twinkle ${star.twinkleSpeed}s infinite ease-in-out ${star.twinkleDelay}s`,
                  }}
                ></div>
              ))}

              {/* Shooting star (appears randomly) */}
              {showShooting && (
                <div
                  className="absolute bg-white w-1 h-1 rounded-full"
                  style={{
                    top: "20%",
                    left: "70%",
                    boxShadow: "0 0 4px 2px rgba(255, 255, 255, 0.7)",
                    animation: "shootingStar 1s linear forwards",
                  }}
                ></div>
              )}

              {/* Far background mountains */}
              <div className="absolute bottom-[40%] left-0 right-0 h-[100px]">
                <div
                  className="absolute w-full h-full"
                  style={{
                    background: "linear-gradient(to top, #2a0a4a, transparent)",
                    clipPath: "polygon(0% 100%, 20% 40%, 35% 60%, 55% 20%, 75% 50%, 100% 10%, 100% 100%)",
                  }}
                ></div>
              </div>

              {/* Blue spruce trees */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-[25%]"
                  style={{
                    left: `${i * 12 + 4}%`,
                    zIndex: 10 + i,
                  }}
                >
                  <div
                    className="w-12 h-32 bg-[#1a3a8a]"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                  <div
                    className="w-16 h-24 bg-[#2a4a9a] -mt-16 ml-[-8px]"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                  <div
                    className="w-20 h-20 bg-[#3a5aaa] -mt-16 ml-[-10px]"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                </div>
              ))}

              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-[#2a0a4a]"></div>

              {/* Foreground dirt */}
              <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#4a1a6a] z-30"></div>

              {/* Interactive campfire - clickable */}
              <div
                className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 z-40 cursor-pointer"
                onClick={handleFireClick}
              >
                {/* Fire logs */}
                <div className="w-16 h-4 bg-[#5a3a2a] rounded-full"></div>
                <div className="w-4 h-12 bg-[#5a3a2a] absolute bottom-0 left-3 transform rotate-45"></div>
                <div className="w-4 h-10 bg-[#5a3a2a] absolute bottom-0 right-3 transform -rotate-45"></div>

                {/* Fire embers - small particles floating up */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#ff4500]"
                    style={{
                      left: `${Math.random() * 14 + 1}px`,
                      bottom: `${Math.random() * 10 + 5}px`,
                      opacity: Math.random() * 0.7 + 0.3,
                      animation: `fireEmber 1.5s infinite ease-out ${Math.random() * 1.5}s`,
                    }}
                  ></div>
                ))}

                {/* Fire */}
                <div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-16"
                  style={{
                    background: "linear-gradient(to top, #ff4500, #ffcc00)",
                    clipPath: "polygon(50% 0%, 25% 50%, 0% 100%, 100% 100%, 75% 50%)",
                    animation: "fire 0.5s infinite alternate",
                    filter: `brightness(${fireIntensity})`,
                    transition: "filter 0.2s ease",
                  }}
                ></div>

                {/* Light glow */}
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,204,0,0.3) 0%, rgba(255,69,0,0.1) 40%, rgba(255,69,0,0) 70%)",
                    filter: `brightness(${fireIntensity * 0.8})`,
                    transition: "filter 0.2s ease",
                  }}
                ></div>
              </div>

              {/* Character */}
              <div className="absolute bottom-[40px] left-[30%] z-30">
                <div className="w-12 h-12 bg-[#3a5a8a] rounded"></div>
                <div className="w-8 h-4 bg-[#ffcc00] absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-t-md"></div>
                <div className="w-6 h-2 bg-[#fff] absolute top-4 left-1/2 transform -translate-x-1/2"></div>
                <div className="w-2 h-2 bg-[#000] absolute top-4 left-3 rounded-full"></div>
                <div className="w-2 h-2 bg-[#000] absolute top-4 right-3 rounded-full"></div>
              </div>

              {/* Companion creature */}
              <div className="absolute bottom-[35px] right-[30%] z-30">
                <div className="w-10 h-8 bg-[#8a3a2a] rounded-lg"></div>
                <div className="w-6 h-6 bg-[#8a3a2a] absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full"></div>
                <div className="w-3 h-4 bg-[#8a3a2a] absolute -top-1 left-0 rounded"></div>
                <div className="w-3 h-4 bg-[#8a3a2a] absolute -top-1 right-0 rounded"></div>
                <div className="w-1 h-1 bg-[#000] absolute -top-2 left-2 rounded-full"></div>
                <div className="w-1 h-1 bg-[#000] absolute -top-2 right-2 rounded-full"></div>
              </div>

              {/* Help text for interaction */}
              <p className="absolute bottom-4 left-0 right-0 text-center text-white text-xs animate-pulse">CLICK THE FIRE</p>

              {/* Castle silhouette in background */}
              <div className="absolute bottom-[42%] left-[10%] h-[80px] w-[60px] bg-[#0a0028]">
                <div
                  className="absolute w-full h-[20px] bottom-full bg-[#0a0028]"
                  style={{
                    clipPath:
                      "polygon(0 0, 20% 0, 20% 100%, 40% 0, 40% 100%, 60% 0, 60% 100%, 80% 0, 80% 100%, 100% 0, 100% 100%, 0 100%)",
                  }}
                ></div>
                <div className="absolute top-[10px] right-[-30px] w-[30px] h-[50px] bg-[#0a0028]">
                  <div
                    className="absolute w-full h-[15px] bottom-full bg-[#0a0028]"
                    style={{ clipPath: "polygon(0 0, 33% 0, 33% 100%, 66% 0, 66% 100%, 100% 0, 100% 100%, 0 100%)" }}
                  ></div>
                </div>
                <div className="absolute w-[10px] h-[20px] bottom-[10px] left-[10px] bg-[#ffec8a] opacity-40"></div>
                <div className="absolute w-[10px] h-[10px] bottom-[30px] right-[15px] bg-[#ffec8a] opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes fire {
          0% { transform: scaleX(0.95) translateX(-50%); }
          100% { transform: scaleX(1.05) translateX(-48%); }
        }
        
        @keyframes fireEmber {
          0% { 
            transform: translate(0, 0);
            opacity: 1;
          }
          100% { 
            transform: translate(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 20 + 10}px, -40px);
            opacity: 0;
          }
        }
        
        @keyframes shootingStar {
          0% { 
            transform: translate(0, 0); 
            opacity: 1;
          }
          100% { 
            transform: translate(-100px, 100px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

export default ContactSection
