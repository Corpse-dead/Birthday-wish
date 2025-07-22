import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Generate random hearts
    const generateHearts = () => {
      const heartArray = []
      for (let i = 0; i < 25; i++) {
        heartArray.push({
          id: i,
          emoji: ['🤎', '💖', '💕', '💗', '🌰', '🍂', '✨', '🧸'][Math.floor(Math.random() * 8)],
          left: Math.random() * 100,
          animationDelay: Math.random() * 10,
          duration: 8 + Math.random() * 6,
          size: 0.8 + Math.random() * 0.7
        })
      }
      setHearts(heartArray)
    }

    generateHearts()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            y: '100vh', 
            x: `${heart.left}%`,
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: `${heart.left + (Math.random() - 0.5) * 20}%`
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.animationDelay,
            ease: "linear"
          }}
          className="absolute text-2xl"
          style={{
            fontSize: `${heart.size}rem`,
            filter: 'drop-shadow(0 0 10px rgba(255, 182, 193, 0.5))'
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Static romantic elements */}
      <div className="absolute top-10 left-10 text-romantic-rose/30">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-4xl"
        >
          💝
        </motion.div>
      </div>

      <div className="absolute top-20 right-16 text-romantic-coral/40">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
          className="text-3xl"
        >
          🌹
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-20 text-romantic-blush/30">
        <motion.div
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-3xl"
        >
          ✨
        </motion.div>
      </div>

      <div className="absolute bottom-32 right-32 text-romantic-rose/40">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 0.5
          }}
          className="text-4xl"
        >
          💖
        </motion.div>
      </div>

      <div className="absolute top-1/3 left-1/4 text-romantic-gold/50">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2
          }}
          className="text-2xl"
        >
          💫
        </motion.div>
      </div>

      <div className="absolute top-2/3 right-1/4 text-romantic-coral/30">
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1.5
          }}
          className="text-3xl"
        >
          💕
        </motion.div>
      </div>

      {/* Sparkling overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-romantic-lavender/5 to-transparent"></div>
    </div>
  )
}

export default FloatingHearts
