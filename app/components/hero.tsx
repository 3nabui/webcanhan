"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let time = 0

    // TikTok-style floating elements
    class TikTokElement {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      type: "heart" | "music" | "star" | "sparkle"
      color: string
      angle: number
      drift: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 50
        this.size = Math.random() * 20 + 10
        this.speed = Math.random() * 0.5 + 0.3
        this.opacity = Math.random() * 0.6 + 0.2
        this.type = ["heart", "music", "star", "sparkle"][Math.floor(Math.random() * 4)] as any
        this.color = this.getColor()
        this.angle = Math.random() * Math.PI * 2
        this.drift = Math.random() * 0.02 + 0.01
      }

      getColor() {
        switch (this.type) {
          case "heart":
            return "#ff0050" // TikTok red/pink
          case "music":
            return "#25f4ee" // TikTok cyan
          case "star":
            return "#fe2c55" // TikTok pink
          case "sparkle":
            return "#ffffff" // White
          default:
            return "#ff0050"
        }
      }

      update() {
        this.y -= this.speed
        this.x += Math.sin(this.angle) * 0.5
        this.angle += this.drift

        // Gentle fade as it rises
        if (this.y < canvas.height * 0.3) {
          this.opacity *= 0.995
        }

        // Reset when off screen
        if (this.y < -50 || this.opacity < 0.01) {
          this.y = canvas.height + 50
          this.x = Math.random() * canvas.width
          this.opacity = Math.random() * 0.6 + 0.2
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle * 0.1)
        ctx.globalAlpha = this.opacity

        switch (this.type) {
          case "heart":
            this.drawHeart()
            break
          case "music":
            this.drawMusicNote()
            break
          case "star":
            this.drawStar()
            break
          case "sparkle":
            this.drawSparkle()
            break
        }

        ctx.restore()
      }

      drawHeart() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        const size = this.size * 0.5
        ctx.moveTo(0, size * 0.3)
        ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, size * 0.1, 0, size)
        ctx.bezierCurveTo(size, size * 0.1, size * 0.5, -size * 0.3, 0, size * 0.3)
        ctx.fill()
      }

      drawMusicNote() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        const size = this.size * 0.4

        // Note head
        ctx.beginPath()
        ctx.arc(-size * 0.3, size * 0.5, size * 0.3, 0, Math.PI * 2)
        ctx.fill()

        // Note stem
        ctx.beginPath()
        ctx.moveTo(0, size * 0.5)
        ctx.lineTo(0, -size * 0.8)
        ctx.stroke()

        // Note flag
        ctx.beginPath()
        ctx.moveTo(0, -size * 0.8)
        ctx.quadraticCurveTo(size * 0.5, -size * 0.6, size * 0.3, -size * 0.3)
        ctx.stroke()
      }

      drawStar() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        const size = this.size * 0.4
        const spikes = 5
        const outerRadius = size
        const innerRadius = size * 0.4

        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (i * Math.PI) / spikes
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
      }

      drawSparkle() {
        if (!ctx) return
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        const size = this.size * 0.3

        // Cross sparkle
        ctx.beginPath()
        ctx.moveTo(-size, 0)
        ctx.lineTo(size, 0)
        ctx.moveTo(0, -size)
        ctx.lineTo(0, size)
        ctx.stroke()

        // Diagonal lines
        ctx.beginPath()
        ctx.moveTo(-size * 0.7, -size * 0.7)
        ctx.lineTo(size * 0.7, size * 0.7)
        ctx.moveTo(size * 0.7, -size * 0.7)
        ctx.lineTo(-size * 0.7, size * 0.7)
        ctx.stroke()
      }
    }

    // Create floating elements
    const elements: TikTokElement[] = []
    const elementCount = 8 // Keep it minimal

    for (let i = 0; i < elementCount; i++) {
      elements.push(new TikTokElement())
      // Stagger initial positions
      elements[i].y = canvas.height + i * 100
    }

    // Subtle gradient background effect
    let gradientOffset = 0

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle TikTok-inspired gradient background
      gradientOffset += 0.001
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `rgba(37, 244, 238, ${0.03 + Math.sin(gradientOffset) * 0.01})`) // TikTok cyan
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, `rgba(255, 0, 80, ${0.03 + Math.cos(gradientOffset) * 0.01})`) // TikTok pink

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw elements
      elements.forEach((element) => {
        element.update()
        element.draw()
      })

      // Add very subtle scan lines (like phone screen)
      if (time % 60 === 0) {
        // Only occasionally
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"
        ctx.lineWidth = 1
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }
      }

      time += 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden pt-16">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />

      <div className="relative z-10 flex h-full items-center px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
  <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
    <img
      src="/profile.jpg"
      alt="3nabui"
      className="w-full h-full object-cover"
    />
  </div>
  {/* Decorative ring */}
  <div className="absolute -inset-4 rounded-full border border-white/10 animate-pulse"></div>
</div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="mb-6 text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                3na.bui
              </motion.h1>
              <motion.p
                className="mb-8 text-xl text-gray-400 sm:text-2xl max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Freelance Editor & Videographer
              </motion.p>
              <motion.p
                className="text-gray-500 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                
                * I shoot, cut, and vibe. Turning raw clips into 🔥 content that hooks in 3 seconds or less. Trends? Caught. Aesthetic? Always. Engagement? Let the numbers talk. *
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
