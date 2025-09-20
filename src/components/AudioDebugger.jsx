import { useEffect, useState } from 'react'

const AudioDebugger = () => {
  const [audioSupport, setAudioSupport] = useState({})
  const [userAgent, setUserAgent] = useState('')

  useEffect(() => {
    // Check audio support
    const audio = document.createElement('audio')
    const support = {
      mp3: audio.canPlayType('audio/mpeg'),
      wav: audio.canPlayType('audio/wav'),
      ogg: audio.canPlayType('audio/ogg'),
      autoplay: 'autoplay' in audio,
      loop: 'loop' in audio,
      volume: 'volume' in audio
    }
    setAudioSupport(support)
    setUserAgent(navigator.userAgent)
  }, [])

  return (
    <div className="fixed top-0 right-0 bg-black/80 text-white p-4 text-xs max-w-xs z-[9999] hidden sm:block">
      <h3 className="font-bold mb-2">Audio Debug Info</h3>
      <div className="space-y-1">
        <div>MP3: {audioSupport.mp3 || 'Not supported'}</div>
        <div>WAV: {audioSupport.wav || 'Not supported'}</div>
        <div>Autoplay: {audioSupport.autoplay ? '✓' : '✗'}</div>
        <div>Loop: {audioSupport.loop ? '✓' : '✗'}</div>
        <div>Volume: {audioSupport.volume ? '✓' : '✗'}</div>
        <div className="pt-2 border-t border-gray-600">
          <div>Device: {/Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop'}</div>
          <div>iOS: {/iPhone|iPad/.test(userAgent) ? 'Yes' : 'No'}</div>
          <div>Chrome: {/Chrome/.test(userAgent) ? 'Yes' : 'No'}</div>
        </div>
      </div>
    </div>
  )
}

export default AudioDebugger