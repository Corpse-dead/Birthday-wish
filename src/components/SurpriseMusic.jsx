import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BackgroundMusic = () => {
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const sourceRef = useRef(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [showStartButton, setShowStartButton] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [visualizerData, setVisualizerData] = useState(new Array(8).fill(0))

  // Audio visualizer setup
  const setupAudioContext = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return

    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      
      // Configure analyser
      analyserRef.current.fftSize = 64
      analyserRef.current.smoothingTimeConstant = 0.8
      
      // Create source and connect
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
      
      // Setup data array
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount)
      
    } catch (error) {
      console.log('Audio context setup failed:', error)
    }
  }, [])

  // Visualizer animation loop
  const updateVisualizer = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !isPlaying) return

    analyserRef.current.getByteFrequencyData(dataArrayRef.current)
    
    // Process frequency data into 8 bars
    const barCount = 8
    const dataPerBar = Math.floor(dataArrayRef.current.length / barCount)
    const newVisualizerData = []
    
    for (let i = 0; i < barCount; i++) {
      let sum = 0
      for (let j = 0; j < dataPerBar; j++) {
        sum += dataArrayRef.current[i * dataPerBar + j]
      }
      const average = sum / dataPerBar
      newVisualizerData.push(average / 255) // Normalize to 0-1
    }
    
    setVisualizerData(newVisualizerData)
  }, [isPlaying])

  // Animation frame for visualizer
  useEffect(() => {
    let animationFrame
    
    if (isPlaying && analyserRef.current) {
      const animate = () => {
        updateVisualizer()
        animationFrame = requestAnimationFrame(animate)
      }
      animate()
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, updateVisualizer])

  // Start surprise function
  const startSurprise = useCallback(async () => {
    if (!audioRef.current) return
    
    setIsLoading(true)
    
    try {
      // Setup audio context on user interaction
      if (!hasUserInteracted) {
        setupAudioContext()
        setHasUserInteracted(true)
      }
      
      // Resume audio context if suspended
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      
      await audioRef.current.play()
      setIsPlaying(true)
      setShowStartButton(false)
      setAudioError(false)
    } catch (error) {
      console.log('Start surprise failed:', error)
      setAudioError(true)
    } finally {
      setIsLoading(false)
    }
  }, [hasUserInteracted, setupAudioContext])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set audio properties for surprise playback
    audio.volume = 0.3 // Gentle volume for surprise
    audio.loop = true
    audio.preload = 'auto'

    // Function to attempt silent autoplay
    const attemptAutoplay = async () => {
      try {
        setupAudioContext()
        
        // Resume audio context if needed
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        
        await audio.play()
        setIsPlaying(true)
        setHasUserInteracted(true)
        setAudioError(false)
      } catch (error) {
        // Autoplay blocked - show start surprise button
        console.log('Autoplay blocked, showing start surprise button')
        setShowStartButton(true)
        setAudioError(false)
      }
    }

    // Audio event listeners
    const handlePlay = () => {
      setIsPlaying(true)
      setShowStartButton(false)
      setAudioError(false)
    }
    
    const handlePause = () => setIsPlaying(false)
    
    const handleEnded = () => {
      // Restart the surprise
      audio.currentTime = 0
      audio.play().catch(() => setAudioError(true))
    }
    
    const handleError = () => {
      console.log('Audio error occurred')
      setAudioError(true)
      setIsPlaying(false)
      setIsLoading(false)
    }

    const handleCanPlay = () => {
      setAudioError(false)
      // Try autoplay when audio is ready
      attemptAutoplay()
    }

    // Add audio event listeners
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplaythrough', handleCanPlay)

    // Cleanup
    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplaythrough', handleCanPlay)
      
      // Cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [setupAudioContext])

  // Gracefully fail if there's a persistent error
  if (audioError && !showStartButton) {
    return null
  }

  return (
    <>
      {/* Hidden audio element for surprise playback */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        playsInline
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      >
        <source src="/janam-janam.mp3" type="audio/mpeg" />
        <source src="/janam-janam.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Start Surprise Button - Only shows if autoplay fails */}
      <AnimatePresence>
        {showStartButton && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSurprise}
              className="bg-gradient-to-r from-brown-chocolate to-brown-espresso backdrop-blur-sm rounded-3xl px-8 py-6 text-brown-warm-cream hover:from-brown-cocoa hover:to-brown-chocolate transition-all duration-300 border-2 border-brown-rose-gold/60 shadow-2xl max-w-sm mx-4"
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🎁
                </motion.div>
                <div className="text-center">
                  <div className="font-romantic text-2xl font-bold mb-2">
                    {isLoading ? 'Starting...' : 'Start Surprise'}
                  </div>
                  <div className="font-love text-sm opacity-90">
                    For Tanni 🧡
                  </div>
                </div>
                {isLoading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-2xl"
                  >
                    ⏳
                  </motion.div>
                )}
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Audio Visualizer - Hidden until music plays */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40"
          >
            {/* Floating Hearts Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex space-x-2">
                {['💖', '💕', '🧡'].map((heart, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                    className="text-lg filter drop-shadow-lg"
                  >
                    {heart}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Audio Visualizer Bars */}
            <div className="bg-brown-warm-cream/20 backdrop-blur-md rounded-2xl p-4 border border-brown-rose-gold/30 shadow-lg">
              <div className="flex items-end justify-center space-x-1 h-12">
                {visualizerData.map((value, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scaleY: Math.max(0.1, value * 2 + 0.3),
                      opacity: 0.7 + value * 0.3
                    }}
                    transition={{
                      duration: 0.1,
                      ease: "easeOut"
                    }}
                    className="w-2 bg-gradient-to-t from-brown-chocolate via-brown-caramel to-brown-rose-gold rounded-full"
                    style={{
                      height: '100%',
                      transformOrigin: 'bottom'
                    }}
                  />
                ))}
              </div>
              
              {/* Subtle indicator */}
              <div className="text-center mt-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-brown-cocoa text-xs font-love"
                >
                  🎵 Playing for Tanni
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Music Particles - Subtle background effect */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 800,
                  y: Math.random() * 600
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1, 0.5],
                  x: Math.random() * 700,
                  y: Math.random() * 500
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
                className="absolute text-brown-rose-gold/30 text-xl"
              >
                {['🎵', '🎶', '💫', '✨', '💖', '🧡'][i]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BackgroundMusic
