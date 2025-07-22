import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const Confetti = () => {
  useEffect(() => {
    // Initial confetti burst
    const initialBurst = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B9D', '#C44569', '#546DE5', '#FFA726', '#26C6DA']
      })
    }

    // Multiple bursts with delays
    const timeouts = []
    
    // First burst immediately
    timeouts.push(setTimeout(initialBurst, 500))
    
    // Second burst
    timeouts.push(setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF6B9D', '#FFA726', '#26C6DA']
      })
    }, 1000))
    
    // Third burst
    timeouts.push(setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#C44569', '#546DE5', '#FFA726']
      })
    }, 1500))

    // Continuous sparkles
    const sparkleInterval = setInterval(() => {
      confetti({
        particleCount: 3,
        spread: 360,
        origin: { 
          x: Math.random(), 
          y: Math.random() * 0.5 
        },
        colors: ['#FFD700', '#FFA726', '#26C6DA'],
        gravity: 0.3,
        scalar: 0.8
      })
    }, 3000)

    // Cleanup function
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
      clearInterval(sparkleInterval)
    }
  }, [])

  // The component doesn't render anything visible
  return null
}

export default Confetti
