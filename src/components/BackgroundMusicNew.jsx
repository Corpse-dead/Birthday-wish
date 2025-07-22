import { useRef, useEffect, useState } from 'react'

const BackgroundMusic = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set audio properties
    audio.volume = 0.3
    audio.loop = true

    // Function to start music
    const startMusic = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
        audio.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            // Silently handle autoplay errors
            console.log('Autoplay prevented by browser:', error)
          })
      }
    }

    // Try immediate autoplay (will fail due to browser policies)
    startMusic()

    // Add event listeners for user interaction
    const interactionEvents = ['click', 'keydown', 'touchstart', 'scroll']
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, startMusic, { once: true })
    })

    // Audio event listeners
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      // Restart if somehow the loop fails
      audio.currentTime = 0
      audio.play().catch(() => {})
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    // Cleanup
    return () => {
      interactionEvents.forEach(event => {
        document.removeEventListener(event, startMusic)
      })
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [hasUserInteracted])

  return (
    <>
      {/* Hidden audio element for background music */}
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        style={{ display: 'none' }}
      >
        <source src="/janam-janam.mp3" type="audio/mpeg" />
        <source src="/WhatsApp Audio 2025-07-21 at 16.18.25_a326ffb4.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Optional: Subtle music indicator (you can remove this if you want completely hidden) */}
      {isPlaying && (
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🎵 Janam Janam
        </div>
      )}
    </>
  )
}

export default BackgroundMusic
