import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BackgroundMusic = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showStartButton, setShowStartButton] = useState(false)
  const [visualizerBars, setVisualizerBars] = useState([0.2, 0.4, 0.1, 0.6, 0.3, 0.5, 0.2, 0.4])

  // Simulate visualizer animation
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setVisualizerBars(prev => 
          prev.map(() => Math.random() * 0.8 + 0.2)
        )
      }, 150)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const startSurprise = async () => {
    if (!audioRef.current) return
    
    try {
      await audioRef.current.play()
      setIsPlaying(true)
      setShowStartButton(false)
    } catch (error) {
      console.log('Play failed:', error)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.3
    audio.loop = true

    const attemptAutoplay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('Autoplay blocked, showing button')
        setShowStartButton(true)
      }
    }

    const handleCanPlay = () => attemptAutoplay()
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto" loop style={{ display: 'none' }}>
        <source src="/janam-janam.mp3" type="audio/mpeg" />
      </audio>

      {/* Start Surprise Button */}
      <AnimatePresence>
        {showStartButton && !isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSurprise}
              className="bg-gradient-to-r from-brown-chocolate to-brown-espresso rounded-3xl px-8 py-6 text-brown-warm-cream hover:from-brown-cocoa hover:to-brown-chocolate transition-all duration-300 border-2 border-brown-rose-gold/60 shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🎁
                </motion.div>
                <div className="text-center">
                  <div className="font-romantic text-2xl font-bold">Start Surprise</div>
                  <div className="font-love text-sm opacity-90">For Tanni 🧡</div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Visualizer */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40"
          >
            {/* Floating Hearts */}
            <motion.div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
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

            {/* Visualizer Container */}
            <div className="bg-brown-warm-cream/20 backdrop-blur-md rounded-2xl p-4 border border-brown-rose-gold/30 shadow-lg">
              <div className="flex items-end justify-center space-x-1 h-12">
                {visualizerBars.map((height, index) => (
                  <motion.div
                    key={index}
                    animate={{ scaleY: height + 0.3 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="w-2 bg-gradient-to-t from-brown-chocolate via-brown-caramel to-brown-rose-gold rounded-full"
                    style={{ height: '100%', transformOrigin: 'bottom' }}
                  />
                ))}
              </div>
              
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

      {/* Ambient Particles */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: Math.random() * 800, y: Math.random() * 600 }}
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
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1, 0.5],
                  x: Math.random() * (window.innerWidth - 100),
                  y: Math.random() * (window.innerHeight - 100)
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
        setAudioError(false)
      } catch (error) {
        // Autoplay was blocked - show the play button
        console.log('Autoplay blocked, showing play button')
        setShowPlayButton(true)
        setAudioError(false)
      }
    }

    // Function to start music on user interaction
    const startMusicOnInteraction = async () => {
      if (!hasUserInteracted && !isPlaying && !audioError) {
        try {
          await audio.play()
          setIsPlaying(true)
          setHasUserInteracted(true)
          setShowPlayButton(false)
          setAudioError(false)
        } catch (error) {
          console.log('Could not start music:', error)
          setAudioError(true)
        }
      }
    }

    // Audio event listeners
    const handlePlay = () => {
      setIsPlaying(true)
      setShowPlayButton(false)
      setAudioError(false)
    }
    
    const handlePause = () => setIsPlaying(false)
    
    const handleEnded = () => {
      // Restart if somehow the loop fails
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

    // Add event listeners for user interaction (only if autoplay failed)
    const interactionEvents = ['click', 'keydown', 'touchstart']
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, startMusicOnInteraction, { once: true })
    })

    // Add audio event listeners
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplaythrough', handleCanPlay)

    // Cleanup
    return () => {
      interactionEvents.forEach(event => {
        document.removeEventListener(event, startMusicOnInteraction)
      })
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [hasUserInteracted, isPlaying, audioError])

  // Prevent component from crashing the app
  if (audioError && !showPlayButton) {
    return null // Gracefully fail - don't render anything if there's a persistent error
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Audio element with error handling */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        playsInline
        crossOrigin="anonymous"
      >
        <source src="/janam-janam.mp3" type="audio/mpeg" />
        <source src="/janam-janam.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Cute "Tap to Play" button when autoplay is blocked */}
      <AnimatePresence>
        {(showPlayButton || audioError) && !isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="bg-gradient-to-r from-brown-chocolate to-brown-espresso backdrop-blur-sm rounded-2xl px-6 py-4 text-brown-warm-cream hover:from-brown-cocoa hover:to-brown-chocolate transition-all duration-300 border-2 border-brown-rose-gold/50 shadow-xl max-w-xs"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🎵
              </motion.div>
              <div className="text-center">
                <div className="font-bold text-lg font-romantic">
                  {audioError ? 'Try Again' : 'Tap to Play'}
                </div>
                <div className="text-sm opacity-90 font-love">
                  Janam Janam for Tanni 🧡
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Music Control Button - Only show after interaction */}
      <AnimatePresence>
        {(isPlaying || (hasUserInteracted && !showPlayButton)) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="bg-gradient-to-r from-brown-chocolate/95 to-brown-espresso/95 backdrop-blur-sm rounded-full p-4 text-brown-warm-cream hover:from-brown-cocoa/95 hover:to-brown-chocolate/95 transition-all duration-300 border-2 border-brown-rose-gold/60 shadow-lg"
            title={isPlaying ? 'Pause Music' : 'Play Janam Janam'}
          >
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="animate-spin text-2xl"
                  >
                    ⏳
                  </motion.div>
                ) : (
                  <motion.div
                    key={isPlaying ? 'pause' : 'play'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl"
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Beautiful Pulsing Hearts Visualizer */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex space-x-3">
              {['💖', '🎵', '💕', '🎶', '🧡'].map((emoji, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.4, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                  className="text-3xl filter drop-shadow-lg"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equalizer Bars Visualizer */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -left-20 top-1/2 transform -translate-y-1/2"
          >
            <div className="flex items-end space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, 3, 0.5, 2.5, 1],
                    opacity: [0.7, 1, 0.6, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-6 bg-gradient-to-t from-brown-chocolate via-brown-rose-gold to-brown-caramel rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Romantic Song Info Tooltip */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute -top-24 right-0 bg-brown-warm-cream/98 backdrop-blur-sm rounded-xl px-4 py-3 text-brown-espresso shadow-xl border-2 border-brown-caramel/40"
          >
            <div className="text-center min-w-[140px]">
              <p className="font-romantic text-base font-bold flex items-center justify-center gap-2">
                🎵 Janam Janam
              </p>
              <p className="font-love text-sm text-brown-cocoa mt-1">
                Playing for Tanni 🧡
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BackgroundMusic