import { motion } from 'framer-motion'

const BalloonAnimation = () => {
  const balloons = [
    { color: 'bg-birthday-pink', delay: 0, x: '10%', size: 'w-8 h-10' },
    { color: 'bg-birthday-blue', delay: 0.5, x: '85%', size: 'w-6 h-8' },
    { color: 'bg-birthday-yellow', delay: 1, x: '15%', size: 'w-7 h-9' },
    { color: 'bg-birthday-green', delay: 1.5, x: '80%', size: 'w-5 h-7' },
    { color: 'bg-birthday-purple', delay: 2, x: '12%', size: 'w-6 h-8' }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className={`absolute ${balloon.color} ${balloon.size} rounded-full`}
          style={{
            left: balloon.x,
            bottom: '-60px'
          }}
          initial={{ 
            y: 0, 
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            y: -window.innerHeight - 100,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.8]
          }}
          transition={{
            duration: 8,
            delay: balloon.delay,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeOut"
          }}
        >
          {/* Balloon string */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-400"></div>
        </motion.div>
      ))}
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-4xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎈
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 left-1/5 text-3xl"
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
          rotate: [0, -8, 8, 0]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🎈
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/5 text-5xl"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        🎈
      </motion.div>
    </div>
  )
}

export default BalloonAnimation
