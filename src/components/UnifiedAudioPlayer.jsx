import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const UnifiedAudioPlayer = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [firstClick, setFirstClick] = useState(true)
  const [showSurpriseMessage, setShowSurpriseMessage] = useState(false)

  // Audio control function with proper error handling
  const handleAudioAction = useCallback(async () => {
    if (!audioRef.current) return

    const audio = audioRef.current
    setIsLoading(true)
    setAudioError(false)

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        // Set audio properties for reliable playback
        audio.volume = 0.4
        audio.loop = true
        
        // For mobile compatibility
        audio.muted = false
        audio.preload = 'auto'
        
        await audio.play()
        setIsPlaying(true)
        setHasUserInteracted(true)
        
        // Show surprise message on first click
        if (firstClick) {
          setFirstClick(false)
          setShowSurpriseMessage(true)
          setTimeout(() => setShowSurpriseMessage(false), 4000)
        }
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
      setAudioError(true)
      setIsPlaying(false)
      
      // Show user-friendly error message
      alert('Audio playback failed. Please try again or check your browser settings.')
    } finally {
      setIsLoading(false)
    }
  }, [isPlaying, firstClick])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => {
      setIsPlaying(true)
      setAudioError(false)
      setIsLoading(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }

    const handleError = (e) => {
      console.error('Audio error:', e)
      setAudioError(true)
      setIsPlaying(false)
      setIsLoading(false)
    }

    const handleCanPlay = () => {
      setAudioError(false)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    // Add event listeners
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('loadeddata', handleLoadedData)

    // Cleanup
    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  // Auto-hide button after interaction (optional)
  useEffect(() => {
    if (hasUserInteracted && isPlaying) {
      const timer = setTimeout(() => {
        setShowButton(false)
      }, 5000) // Hide main button after 5 seconds of playing
      
      return () => clearTimeout(timer)
    }
  }, [hasUserInteracted, isPlaying])

  return (
    <>
      {/* Audio element with multiple source fallbacks */}
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      >
        <source src="/janam-janam.mp3" type="audio/mpeg" />
        <source src="/janam-janam.mp3" type="audio/wav" />
        <source src="./janam-janam.mp3" type="audio/mpeg" />
        <source src="./src/components/janam-janam.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Main Audio Control Button - Mobile Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50"
      >
        <motion.button
          onClick={handleAudioAction}
          disabled={isLoading}
          className={`
            flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-5 sm:py-3 
            rounded-full shadow-lg transition-all duration-300 
            backdrop-blur-sm border-2 font-love text-sm sm:text-base
            ${!hasUserInteracted 
              ? 'bg-gradient-to-r from-pink-500/90 to-rose-500/90 border-pink-300 text-white hover:from-pink-600/90 hover:to-rose-600/90' 
              : isPlaying 
                ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-300 text-white hover:from-green-600/90 hover:to-emerald-600/90'
                : 'bg-gradient-to-r from-brown-chocolate/90 to-brown-espresso/90 border-brown-caramel text-brown-warm-cream hover:from-brown-espresso/90 hover:to-brown-chocolate/90'
            }
            ${isLoading ? 'opacity-75 cursor-wait' : 'hover:scale-105'}
            ${audioError ? 'bg-gradient-to-r from-red-500/90 to-red-600/90 border-red-300' : ''}
          `}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
          animate={{
            boxShadow: !hasUserInteracted 
              ? ['0 0 0 0 rgba(236, 72, 153, 0.4)', '0 0 0 15px rgba(236, 72, 153, 0)', '0 0 0 0 rgba(236, 72, 153, 0.4)']
              : ['0 4px 15px rgba(0,0,0,0.2)', '0 4px 20px rgba(0,0,0,0.3)', '0 4px 15px rgba(0,0,0,0.2)']
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: !hasUserInteracted ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
        >
          {/* Icon with proper loading state */}
          <motion.div
            animate={isPlaying && !isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying && !isLoading ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
            className="text-lg sm:text-xl"
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⏳
              </motion.span>
            ) : audioError ? (
              <span>❌</span>
            ) : !hasUserInteracted ? (
              <span>🎁</span>
            ) : isPlaying ? (
              <span>⏸️</span>
            ) : (
              <span>▶️</span>
            )}
          </motion.div>

          {/* Button Text - Responsive */}
          <span className="font-medium hidden sm:inline">
            {isLoading
              ? "Loading..."
              : audioError
                ? "Try Again"
                : !hasUserInteracted 
                  ? "👉 Click me to hear something" 
                  : isPlaying 
                    ? "🎵 Janam Janam (Pause)" 
                    : "🎵 Play Janam Janam"
            }
          </span>
          
          {/* Mobile-only short text */}
          <span className="font-medium sm:hidden">
            {isLoading
              ? "Loading..."
              : audioError
                ? "Retry"
              : !hasUserInteracted 
                ? "Click me!" 
                : isPlaying 
                  ? "Pause" 
                  : "Play"
            }
          </span>
        </motion.button>

        {/* Surprise Message - Mobile Responsive */}
        <AnimatePresence>
          {showSurpriseMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -top-16 sm:-top-20 left-0 right-0 mx-auto w-max max-w-xs sm:max-w-none"
            >
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg text-center">
                <div className="text-xs sm:text-sm font-love">
                  💕 Surprise! Our song is playing...
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Compact Music Indicator when playing - Mobile Responsive */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40"
          >
            <div className="bg-brown-warm-cream/90 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2 border border-brown-caramel shadow-lg">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-base sm:text-lg"
                >
                  🎵
                </motion.span>
                <span className="font-love text-brown-cocoa text-xs sm:text-sm">
                  <span className="hidden sm:inline">Janam Janam playing for Tanni</span>
                  <span className="sm:hidden">Playing for Tanni</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts Animation when music plays - Optimized for mobile */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 pointer-events-none z-30">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg sm:text-2xl"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                  y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 50,
                  opacity: 0
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 180],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                {['💖', '💕', '🧡', '❤️', '💝', '💗'][i % 6]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Minimal Equalizer Bars - Hidden on small screens */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 hidden sm:block"
          >
            <div className="flex items-end space-x-1 bg-brown-warm-cream/20 backdrop-blur-sm rounded-lg p-2 border border-brown-rose-gold/30">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [0.3, 1.5, 0.8, 1.2, 0.6],
                    opacity: [0.7, 1, 0.6, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-6 bg-gradient-to-t from-brown-chocolate via-brown-rose-gold to-brown-caramel rounded-full"
                  style={{ transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default UnifiedAudioPlayer