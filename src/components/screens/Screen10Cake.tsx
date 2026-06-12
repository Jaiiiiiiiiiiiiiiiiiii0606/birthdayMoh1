import { motion } from 'framer-motion'
import { RainbowHeading } from '../RainbowHeading'
import { GalaxyCake } from '../GalaxyCake'
import { NeonButton } from '../NeonButton'

interface Screen10CakeProps {
  onBlow: () => void
}

export function Screen10Cake({ onBlow }: Screen10CakeProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <RainbowHeading />
      <GalaxyCake candlesLit={true} />
      <div className="w-full max-w-sm mt-6">
        <NeonButton onClick={onBlow}>Blow the Candles</NeonButton>
      </div>
    </motion.div>
  )
}
