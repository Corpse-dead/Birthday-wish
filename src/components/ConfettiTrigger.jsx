import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const ConfettiTrigger = () => {
  useEffect(() => {
    // Initial confetti burst when page loads
    const initialBurst = () => {
      // Brown-themed confetti colors
      const heartColors = ['#8B4513', '#DCC5A7', '#C8A882', '#E8B4B8', '#F5E6D3', '#7B3F00']
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: heartColors,
        shapes: ['circle'],
        scalar: 1.2
      })

      // Second burst with more spread
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.7, x: 0.2 },
          colors: heartColors,
          shapes: ['circle'],
          scalar: 0.8
        })
      }, 300)

      // Third burst from the right
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.7, x: 0.8 },
          colors: heartColors,
          shapes: ['circle'],
          scalar: 0.8
        })
      }, 600)
    }

    // Trigger initial burst after a delay
    const timer = setTimeout(initialBurst, 1000)

    // Continuous celebration - trigger confetti every 10 seconds
    const celebrationInterval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8, x: Math.random() },
        colors: ['#FF69B4', '#FFB6C1', '#FF7F7F', '#FFC0CB', '#FFD700'],
        shapes: ['circle'],
        scalar: 1
      })
    }, 10000)

    // Special romantic confetti pattern
    const romanticBurst = () => {
      const end = Date.now() + 3 * 1000 // 3 seconds
      const colors = ['#FF69B4', '#FFB6C1', '#FF7F7F']

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }

    // Trigger romantic burst after 5 seconds
    const romanticTimer = setTimeout(romanticBurst, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(romanticTimer)
      clearInterval(celebrationInterval)
    }
  }, [])

  // Function to create heart-like confetti effect
  useEffect(() => {
    const createHeartConfetti = () => {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0,
        colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB']
      }

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)
    }

    // Trigger heart confetti after 8 seconds
    const heartTimer = setTimeout(createHeartConfetti, 8000)

    return () => clearTimeout(heartTimer)
  }, [])

  return null // This component doesn't render anything visible
}

export default ConfettiTrigger
