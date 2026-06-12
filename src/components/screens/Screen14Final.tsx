import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { birthdayData } from '../../config/birthdayData'
import { NeonButton } from '../NeonButton'
import { Fireworks } from '../Fireworks'
import { FloatingHearts } from '../FloatingHearts'

interface Screen14FinalProps {
  onReplay: () => void
}

export function Screen14Final({ onReplay }: Screen14FinalProps) {
  const handleShare = async () => {
    const shareData = {
      title: `Happy Birthday ${birthdayData.friendName}!`,
      text: `Wishing ${birthdayData.friendName} a wonderful birthday! 🎉`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-full px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={350}
          recycle={true}
          gravity={0.12}
        />

      <Fireworks />
      <FloatingHearts />

      <motion.div
        className="z-20 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.08, 1] }}
        transition={{ type: 'spring', stiffness: 140 }}
      >
        <motion.h1
          className="font-heading text-2xl sm:text-3xl font-extrabold leading-relaxed"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-yellow-300">🎉</span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            HAPPY BIRTHDAY {birthdayData.friendName.toUpperCase()}
          </span>
          <br />
          <span className="text-yellow-300">🎉</span>
        </motion.h1>
      </motion.div>

      <motion.div
        className="z-20 w-full max-w-sm mt-10 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* <NeonButton onClick={onReplay}>Replay</NeonButton> */}
        {/* <button
          className="w-full py-3.5 px-6 rounded-full font-semibold text-lg text-white/90 ghost-btn"
          onClick={handleShare}
        >
          Share
        </button> */}
      </motion.div>
    </motion.div>
  )
}
