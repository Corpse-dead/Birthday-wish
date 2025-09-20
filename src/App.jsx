import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoveMessage from './components/LoveMessage'
import FloatingHearts from './components/FloatingHearts'
import ConfettiTrigger from './components/ConfettiTrigger'
import UnifiedAudioPlayer from './components/UnifiedAudioPlayer'
import BirthdayCard from './components/BirthdayCard'
import InteractiveDiary from './components/InteractiveDiary'
import AudioDebugger from './components/AudioDebugger'

function App() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger content display after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-light via-brown-cream to-brown-beige relative overflow-hidden">
      {/* Unified Audio Player - Reliable cross-platform audio */}
      <UnifiedAudioPlayer />
      
      {/* Audio Debug Info (development only) */}
      <AudioDebugger />
      
      {/* Confetti Effect */}
      <ConfettiTrigger />
      
      {/* Floating Hearts Background */}
      <FloatingHearts />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
      >
        {/* Main Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="font-romantic text-4xl md:text-6xl lg:text-7xl text-brown-espresso drop-shadow-lg mb-4 animate-heartbeat">
            Happy 19th Birthday, Tanni! 💖
          </h1>
          <p className="font-elegant text-xl md:text-2xl text-brown-cocoa drop-shadow-md">
            From Krrish, with all my love
          </p>
          <motion.p 
            className="font-love text-lg md:text-xl text-brown-chocolate mt-4 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            You're the sunshine of my days and the moonlight of my nights ✨
          </motion.p>
        </motion.div>

        {/* Birthday Card */}
        <BirthdayCard />

        {/* Interactive Diary */}
        <InteractiveDiary />

        {/* Love Message */}
        <LoveMessage />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="font-love text-brown-cocoa text-sm md:text-base drop-shadow-md">
            Made with ❤️ by Krrish for Tanni
            <span className="inline-block ml-2 animate-sparkle">✨</span>
          </p>
        </motion.footer>
      </motion.div>

      {/* Romantic overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-brown-rose-gold/5 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default App
