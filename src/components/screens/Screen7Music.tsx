import { motion } from 'framer-motion'
import { NeonButton } from '../NeonButton'

interface Screen7MusicProps {
  onPlayMusic: () => void
}

export function Screen7Music({ onPlayMusic }: Screen7MusicProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card p-8 w-full max-w-sm mx-auto text-center">
        <motion.div
          className="text-5xl mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎵
        </motion.div>

        <NeonButton onClick={onPlayMusic}>Play the Music</NeonButton>
      </div>
    </motion.div>
  )
}
