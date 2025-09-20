import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const InteractiveDiary = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const diaryPages = [
    // Original romantic pages
    {
      date: "The Day We Met",
      message: "Remember our first call? I knew you were special from the moment I heard your voice. Something in my heart whispered, 'This is her.' 💖",
      emoji: "🌟"
    },
    {
      date: "Your Beautiful Soul",
      message: "Your smile heals parts of me I didn't know were broken. Every time you laugh, my world becomes a little brighter, a little more magical. ✨",
      emoji: "😊"
    },
    {
      date: "My Promise",
      message: "Forever isn't enough with you, Tanni ❤️ I want to love you through every sunrise, every storm, every quiet moment in between.",
      emoji: "💕"
    },
    {
      date: "Your 19th Year",
      message: "This is the year you become even more amazing than you already are. I'm so grateful I get to witness your beautiful journey. 🎂",
      emoji: "🎉"
    },
    {
      date: "Always Yours",
      message: "You're the sunshine of my days and the moonlight of my nights. In every dream, in every breath, it's always you, my love. 🌙",
      emoji: "🌅"
    },
    {
      date: "My Heart's Truth",
      message: "Every moment with you feels like a dream I never want to wake from. You make ordinary days feel like fairy tales. 💫",
      emoji: "💝"
    },
    
    // Our special memories timeline
    {
      date: "2 Dec 2024 - The Diary Begins",
      message: "Iss din sab kuch start hua. Ek diary thi... aur us diary mein tu. Jaise kisi kahani ki shuruaat, jiska har word sirf tere liye tha.",
      emoji: "💌"
    },
    {
      date: "5 Dec 2024 - Butterflies Ka Ehsaas",
      message: "Tu ignore kar rahi thi, par main feel kar raha tha butterflies. Tere silent treatment mein bhi kuch toh pyaar chhupa tha na, Tanni? 🥹",
      emoji: "🦋"
    },
    {
      date: "19 Dec 2024 - Our Confession",
      message: "Jab humne 'I love you' feel kiya... bina bole sab keh diya. Tu meri thi us din se, aur main sirf tera.",
      emoji: "💬"
    },
    {
      date: "24 Dec 2024 - Pehla Haath Thaamne Ka Pal",
      message: "Tere haathon ka woh pehla touch... jaise kisi sukoon ka ehsaas. Us din se duniya kuch zyada hi pyaari lagne lagi. 😭❤️",
      emoji: "🤝"
    },
    {
      date: "27 Dec 2024 - First Hug",
      message: "Jab tu meri baahon mein aayi, laga sab kuch theek ho gaya. Tera warmth, tera perfume, sab yaad hai mujhe.",
      emoji: "🤗"
    },
    {
      date: "28 Dec 2024 - Maine Kaha 'I Love You'",
      message: "Main pehle bola 'I love you'... aur tera reaction dekh kar laga jaise dil mein fireworks ho rahe hon. 🥺",
      emoji: "💖"
    },
    {
      date: "1 Jan 2025 - First Date + Tera 'I Love You'",
      message: "New Year, new us. Tu boli 'I love you' face to face... aur mujhe laga jaise dil overload ho gaya ho pyaar se.",
      emoji: "🥺"
    },
    {
      date: "17 Jan 2025 - Most Unexpected ILY",
      message: "Tu achanak boli 'I love you'. Mujhe laga system crash ho gaya. Par woh moment reboot tha mere dil ka.",
      emoji: "😳"
    },
    {
      date: "18 Jan 2025 - First Cheek Kiss",
      message: "Bangla Sahib ke paas, tere soft lips ka touch meri cheek pe... Tanni, tu toh meri jaan chura le gayi thi. 😭💖",
      emoji: "😚"
    },
    {
      date: "21 Jan 2025 - Real Kiss",
      message: "Hum class mein the, sab kuch ekdum filmy lag raha tha. Tere lips ka woh surprise wala touch... abhi tak feel karta hoon. 😳",
      emoji: "💋"
    },
    {
      date: "4 Feb 2025 - 2nd Cheek Kiss",
      message: "Phir se woh pyara sa cheek kiss. Har baar tu karti hai aur main aur bhi deewana ban jaata hoon. 🥰",
      emoji: "😘"
    },
    {
      date: "6 Feb 2025 - Tight Hug",
      message: "Woh hug jisme tu chhup gayi thi meri chest mein... tu har stress ka solution ban gayi uss din.",
      emoji: "🤗"
    },
    {
      date: "8 Feb 2025 - 3rd Kiss at Ice Cream",
      message: "Ice cream thi thandi, par tera kiss tha hottest surprise. Tu always unexpected hoti hai... and I love that. 🍦💋",
      emoji: "🍦"
    },
    {
      date: "11 Feb 2025 - Baby Boli Tu Pehli Baar",
      message: "Tu boli 'baby'... aur meri spine tak goosebumps gaye. Tera har lafz mere liye poetry ban jaata hai. 🥹",
      emoji: "💖"
    },
    {
      date: "11 Feb 2025 - Tight Hug + Cheek Kiss",
      message: "Main thoda mess up kar gaya tha cheek kiss mein, par tu has rahi thi... teri hasi mein meri sari galtiyan chup jaati hain.",
      emoji: "🥰"
    },
    {
      date: "13 Feb 2025 - 4th Kiss + Cute Fight",
      message: "Tu boli 'I'm already missing you' while I was still with you. Aur phir woh cute wala fight. Aise hi toh cute lagti hai meri Jhalli. 😘",
      emoji: "😚"
    },
    {
      date: "18 Feb 2025 - 5th Kiss + Letters & Gifts",
      message: "Tere haathon se mile gifts aur handwritten letters... priceless. Har word mein tera pyaar, har line mein teri yaadein. 🥺❤️",
      emoji: "💌"
    }
  ]

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % diaryPages.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + diaryPages.length) % diaryPages.length)
  }

  const goToPage = (index) => {
    setCurrentPage(index)
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="max-w-2xl mx-auto mt-12 mb-8"
    >
      {/* Diary Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="font-romantic text-3xl md:text-4xl text-brown-espresso mb-2">
          Our Love Diary 📖
        </h2>
        <p className="font-love text-brown-cocoa text-lg">
          Pages from my heart to yours
        </p>
      </motion.div>

      {/* Diary Book */}
      <div className="relative bg-brown-light rounded-2xl shadow-2xl p-1 border-4 border-brown-caramel">
        {/* Book Spine Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-brown-chocolate rounded-l-2xl border-r-2 border-brown-espresso">
          <div className="flex flex-col justify-center h-full space-y-2 items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-6 bg-brown-rose-gold rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="ml-8 bg-brown-warm-cream rounded-r-2xl rounded-l-lg min-h-[400px] relative overflow-hidden">
          {/* Page Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="border-b border-brown-beige/30 h-6"
                style={{ marginTop: `${i * 24 + 60}px` }}
              ></div>
            ))}
          </div>

          {/* Red Margin Line */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-brown-rose-gold/60"></div>

          {/* Page Content */}
          <div className="relative z-10 p-8 pt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Date Header */}
                <div className="flex items-center justify-between">
                  <motion.h3 
                    className="font-elegant text-2xl md:text-3xl text-brown-espresso"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {diaryPages[currentPage].date}
                  </motion.h3>
                  <motion.span 
                    className="text-3xl"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {diaryPages[currentPage].emoji}
                  </motion.span>
                </div>

                {/* Message */}
                <motion.p 
                  className="font-love text-lg md:text-xl text-brown-cocoa leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {diaryPages[currentPage].message}
                </motion.p>

                {/* Signature */}
                <motion.div 
                  className="text-right mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-romantic text-xl text-brown-chocolate">
                    Love always,
                    <br />
                    <span className="text-brown-rose-gold text-2xl">Krrish 💖</span>
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page Number */}
          <div className="absolute bottom-4 right-6 text-brown-caramel font-love text-sm">
            Page {currentPage + 1} of {diaryPages.length}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <motion.button
          onClick={prevPage}
          className="bg-brown-chocolate text-brown-warm-cream px-4 py-2 rounded-full hover:bg-brown-espresso transition-colors duration-300 font-love"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Previous
        </motion.button>

        {/* Page Dots */}
        <div className="flex space-x-2">
          {diaryPages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? 'bg-brown-chocolate scale-125' 
                  : 'bg-brown-beige hover:bg-brown-caramel'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextPage}
          className="bg-brown-chocolate text-brown-warm-cream px-4 py-2 rounded-full hover:bg-brown-espresso transition-colors duration-300 font-love"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next →
        </motion.button>
      </div>
    </motion.div>
  )
}

export default InteractiveDiary
