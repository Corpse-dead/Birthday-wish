import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SurpriseMusic = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasClicked, setHasClicked] = useState(false)
  const [showSurpriseMessage, setShowSurpriseMessage] = useState(false)

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!hasClicked) {
      setHasClicked(true)
      audio.volume = 0.4
      audio.loop = true
      setShowSurpriseMessage(true)
      // Hide surprise message after 3 seconds
      setTimeout(() => setShowSurpriseMessage(false), 3000)
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log('Audio play failed:', error)
        })
    }
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        playsInline
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/janam-janam.mp3" type="audio/mpeg" />
        <source src="./janam-janam.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Surprise Music Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <motion.button
          onClick={toggleMusic}
          className={`
            flex items-center gap-3 px-5 py-3 rounded-full shadow-lg
            transition-all duration-300 backdrop-blur-sm border-2 font-love
            ${!hasClicked 
              ? 'bg-gradient-to-r from-pink-500/90 to-rose-500/90 border-pink-300 text-white hover:from-pink-600/90 hover:to-rose-600/90' 
              : isPlaying 
                ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-300 text-white hover:from-green-600/90 hover:to-emerald-600/90'
                : 'bg-gradient-to-r from-brown-chocolate/90 to-brown-espresso/90 border-brown-caramel text-brown-warm-cream hover:from-brown-espresso/90 hover:to-brown-chocolate/90'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: !hasClicked 
              ? ['0 0 0 0 rgba(236, 72, 153, 0.4)', '0 0 0 15px rgba(236, 72, 153, 0)', '0 0 0 0 rgba(236, 72, 153, 0.4)']
              : ['0 4px 15px rgba(0,0,0,0.2)', '0 4px 20px rgba(0,0,0,0.3)', '0 4px 15px rgba(0,0,0,0.2)']
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: !hasClicked ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
        >
          {/* Icon with rotation animation when playing */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
          >
            {!hasClicked ? (
              <span className="text-xl">🎁</span>
            ) : isPlaying ? (
              <span className="text-xl">⏸️</span>
            ) : (
              <span className="text-xl">▶️</span>
            )}
          </motion.div>

          {/* Button Text */}
          <span className="text-sm font-medium">
            {!hasClicked 
              ? "👉 Click me to hear something" 
              : isPlaying 
                ? "🎵 Janam Janam (Pause)" 
                : "🎵 Play Janam Janam"
            }
          </span>
        </motion.button>

        {/* Surprise Message when first clicked */}
        <AnimatePresence>
          {showSurpriseMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -top-20 left-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-lg shadow-lg whitespace-nowrap"
            >
              <div className="text-sm font-love">
                💕 Surprise! Our song is playing...
              </div>
              <div className="absolute bottom-0 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Hearts Animation when music plays */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: Math.random() * (window.innerWidth || 800),
                  y: (window.innerHeight || 600) + 50,
                  opacity: 0
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                {['💖', '💕', '🧡', '❤️', '💝', '💗', '💘', '💓'][i % 8]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Subtle Music Indicator when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-6 left-6 z-40"
          >
            <div className="bg-brown-warm-cream/90 backdrop-blur-sm rounded-full px-4 py-2 border border-brown-caramel shadow-lg">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-lg"
                >
                  🎵
                </motion.span>
                <span className="font-love text-brown-cocoa text-sm">
                  Janam Janam playing for Tanni
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SurpriseMusic
