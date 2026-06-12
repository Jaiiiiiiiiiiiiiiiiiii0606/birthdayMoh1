import { motion } from 'framer-motion'
import { RainbowHeading } from '../RainbowHeading'
import { GalaxyCake } from '../GalaxyCake'
import { NeonButton } from '../NeonButton'

interface Screen11BlowCandlesProps {
  onCut: () => void
}

export function Screen11BlowCandles({ onCut }: Screen11BlowCandlesProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RainbowHeading />
      <GalaxyCake candlesLit={false} showSmoke={true} />
      <div className="w-full max-w-sm mt-6">
        <NeonButton onClick={onCut}>Cut the Cake</NeonButton>
      </div>
    </motion.div>
  )
}
