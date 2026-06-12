import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { birthdayData } from '../../config/birthdayData'
import { RabbitCouple } from '../RabbitCouple'
import { NeonButton } from '../NeonButton'

interface Screen13LetterProps {
  onNext: () => void
}

export function Screen13Letter({ onNext }: Screen13LetterProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="paper-card relative w-full max-w-sm p-6 sm:p-8 min-h-[55vh]">
        {/* Heart pin */}
        <motion.div
          className="absolute -top-2 right-6 text-2xl z-10"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          📌
          <span className="absolute -top-1 -right-1 text-pink-500 text-lg">❤️</span>
        </motion.div>

        <div className="min-h-[40vh] max-h-[50vh] overflow-y-auto pr-2 letter-text">
          <p className="font-heading text-lg font-bold mb-4 text-gray-800">
            Dear {birthdayData.friendName},
          </p>
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
            <TypeAnimation
              sequence={[birthdayData.message]}
              speed={80}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
          </p>
        </div>

        <div className="absolute bottom-4 right-4">
          <RabbitCouple size="sm" className="!mx-0" />
        </div>
      </div>

      <div className="w-full max-w-sm mt-6">
        <NeonButton onClick={onNext}>Continue</NeonButton>
      </div>
    </motion.div>
  )
}
