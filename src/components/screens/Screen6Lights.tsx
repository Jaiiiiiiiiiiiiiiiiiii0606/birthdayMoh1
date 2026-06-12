import { motion } from 'framer-motion'
import { NeonButton } from '../NeonButton'

interface Screen6LightsProps {
  onLightsOn: () => void
}

export function Screen6Lights({ onLightsOn }: Screen6LightsProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card p-8 w-full max-w-sm mx-auto text-center">
        <motion.h2
          className="font-heading text-3xl font-bold mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Let&apos;s Celebrate!
        </motion.h2>
        <motion.p
          className="text-white/60 text-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Tap the buttons to decorate
        </motion.p>

        <NeonButton onClick={onLightsOn}>Turn On the Lights</NeonButton>
      </div>
    </motion.div>
  )
}
