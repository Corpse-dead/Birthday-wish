import { motion } from 'framer-motion'

const BirthdayCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      className="bg-brown-warm-cream/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-4 shadow-2xl border border-brown-caramel/50"
    >
      <div className="text-center">
        {/* Cake Icon */}
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="text-6xl md:text-8xl mb-6"
        >
          🎂
        </motion.div>

        {/* Main Birthday Message */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-elegant text-3xl md:text-4xl text-brown-espresso mb-6 leading-relaxed"
        >
          Another Year of
          <br />
          <span className="text-brown-rose-gold font-romantic text-4xl md:text-5xl">
            Pure Magic! ✨
          </span>
        </motion.h2>

        {/* Personal Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="font-love text-lg md:text-xl text-brown-cocoa leading-relaxed">
            Nineteen candles for nineteen years of beautiful you, Tanni...
          </p>
          <p className="font-love text-lg md:text-xl text-brown-cocoa leading-relaxed">
            It's the day my world became infinitely brighter! 🌟
          </p>
          <p className="font-love text-base md:text-lg text-brown-chocolate leading-relaxed italic">
            Every moment with you feels like a dream I never want to wake from 💫
          </p>
        </motion.div>

        {/* Heart decorations */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex justify-center space-x-4 mt-8"
        >
          {['💖', '💕', '💖'].map((heart, index) => (
            <motion.span
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
              className="text-2xl md:text-3xl"
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BirthdayCard
