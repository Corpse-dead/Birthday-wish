import { motion } from 'framer-motion'

const MessageCard = ({ name, message }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      {/* Main Birthday Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg"
      >
        <span className="inline-block animate-bounce mr-2">🎉</span>
        <span className="font-elegant bg-gradient-to-r from-birthday-yellow to-birthday-green bg-clip-text text-transparent">
          Happy Birthday,
        </span>
        <br />
        <motion.span
          className="text-birthday-yellow font-elegant"
          animate={{ 
            textShadow: [
              '0 0 10px rgba(255, 167, 38, 0.5)',
              '0 0 20px rgba(255, 167, 38, 0.8)',
              '0 0 10px rgba(255, 167, 38, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {name}!
        </motion.span>
        <span className="inline-block animate-bounce ml-2">🎂</span>
      </motion.h1>

      {/* Message Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 mx-auto max-w-2xl shadow-2xl border-4 border-birthday-yellow/30"
      >
        <motion.p
          className="text-xl sm:text-3xl text-gray-800 font-medium leading-relaxed"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {message}
        </motion.p>
        
        {/* Decorative elements */}
        <div className="flex justify-center mt-8 space-x-4">
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎈
          </motion.span>
          <motion.span
            className="text-4xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            🎁
          </motion.span>
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          >
            🍰
          </motion.span>
        </div>
      </motion.div>

      {/* Additional animated elements */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex justify-center space-x-6"
      >
        <motion.div
          className="text-6xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 0.5 
          }}
        >
          🌟
        </motion.div>
        <motion.div
          className="text-6xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0] 
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            delay: 1 
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="text-6xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 1.5 
          }}
        >
          🎊
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MessageCard
