import { motion } from 'framer-motion'
import { RainbowHeading } from '../RainbowHeading'
import { GalaxyCake } from '../GalaxyCake'
import { NeonButton } from '../NeonButton'

interface Screen12CutCakeProps {
  onNext: () => void
}

export function Screen12CutCake({ onNext }: Screen12CutCakeProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RainbowHeading />
      <GalaxyCake candlesLit={false} sliced={true} />
      <div className="w-full max-w-sm mt-6">
        <NeonButton onClick={onNext}>
          I Have a Special Message For You
        </NeonButton>
      </div>
    </motion.div>
  )
}
