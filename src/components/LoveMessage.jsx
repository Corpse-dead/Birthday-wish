import { motion } from 'framer-motion'
import { useState } from 'react'

const LoveMessage = () => {
  const [currentMessage, setCurrentMessage] = useState(0)

  const loveMessages = [
    {
      title: "You Make My Life Brighter ☀️",
      content: "Every day with you feels like a celebration, Tanni. Your smile lights up my entire world, and your laugh is my favorite sound in the universe."
    },
    {
      title: "Even While Building This... 💻",
      content: "I miss you already! Every line of code I wrote was filled with thoughts of you. I kept thinking about how your eyes light up when you're happy."
    },
    {
      title: "You're My Person 💍",
      content: "My always, my forever, my everything. In a world full of temporary things, you are my constant, my home, my safe place."
    },
    {
      title: "I Can't Wait... 🤗",
      content: "To hug you tight and never let go. To see your beautiful smile when you see this. To spend forever making you as happy as you make me."
    },
    {
      title: "My Clingy Heart Says... 💕",
      content: "You're my home, Tanni. Distance means nothing when someone means everything. I'm always yours, completely and unconditionally."
    }
  ]

  const quotes = [
    "You're my home 🏠",
    "I'm always yours 💖",
    "Forever my favorite person ✨",
    "My heart belongs to you 💝"
  ]

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="max-w-4xl w-full mx-4 mt-8"
    >
      {/* Main Love Messages */}
      <div className="grid gap-6 md:gap-8">
        {loveMessages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 2 + (index * 0.3), 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            className={`bg-brown-warm-cream/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-brown-caramel/30 ${
              index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
            }`}
          >
            <h3 className="font-romantic text-xl md:text-2xl text-brown-rose-gold mb-4 animate-shimmer">
              {message.title}
            </h3>
            <p className="font-love text-base md:text-lg text-brown-cocoa leading-relaxed">
              {message.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Love Quotes Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="mt-12 bg-gradient-to-r from-brown-rose-gold/20 to-brown-caramel/20 backdrop-blur-sm rounded-3xl p-8 border border-brown-caramel/30"
      >
        <h3 className="font-elegant text-2xl md:text-3xl text-center text-brown-espresso mb-8">
          Little Reminders of My Love 💫
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4 + (index * 0.2), duration: 0.5 }}
              className="text-center"
            >
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="font-love text-lg md:text-xl text-brown-cocoa bg-brown-warm-cream/20 rounded-xl p-4 hover:bg-brown-warm-cream/30 transition-all duration-300 cursor-pointer"
              >
                {quote}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Special Promise Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="mt-12 text-center bg-brown-warm-cream/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-brown-rose-gold/30"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-4xl md:text-6xl mb-6"
        >
          💍
        </motion.div>
        
        <h3 className="font-romantic text-2xl md:text-3xl text-brown-rose-gold mb-6">
          My Promise to You
        </h3>
        
        <p className="font-love text-lg md:text-xl text-brown-cocoa leading-relaxed max-w-2xl mx-auto">
          To love you more each day than the day before. To be your biggest supporter, your safe space, 
          and your forever person. Happy 19th Birthday, my beautiful Tanni! 💖
        </p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 5.5, duration: 0.5 }}
          className="mt-8"
        >
          <p className="font-elegant text-xl md:text-2xl text-brown-espresso">
            Forever and Always,
            <br />
            <span className="text-brown-rose-gold font-romantic text-2xl md:text-3xl">
              Your Krrish 💕
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LoveMessage
