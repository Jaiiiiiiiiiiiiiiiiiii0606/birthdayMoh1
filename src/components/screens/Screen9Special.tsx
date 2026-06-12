import { motion } from 'framer-motion'
import { NeonButton } from '../NeonButton'

interface Screen9SpecialProps {
  onNext: () => void
}

const WORDS = ['You', 'are', 'so', 'special']

export function Screen9Special({ onNext }: Screen9SpecialProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between w-full max-w-sm mb-12 px-2">
        {WORDS.map((word, i) => (
          <motion.span
            key={word}
            className="font-heading text-xl sm:text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25 }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <div className="w-full max-w-sm">
        <NeonButton onClick={onNext}>Decorate the Cake</NeonButton>
      </div>
    </motion.div>
  )
}
