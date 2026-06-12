import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { RabbitCouple } from './RabbitCouple'
import { NeonButton } from './NeonButton'
import { ProgressDots } from './ProgressDots'

interface RabbitCardLayoutProps {
  children: ReactNode
  buttonText: string
  progressIndex: number
  onNext: () => void
  showRabbit?: boolean
}

export function RabbitCardLayout({
  children,
  buttonText,
  progressIndex,
  onNext,
  showRabbit = true,
}: RabbitCardLayoutProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-4 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-6 sm:p-8 w-full max-w-sm mx-auto">
        {showRabbit && (
          <div className="mb-5">
            <RabbitCouple />
          </div>
        )}

        <div className="text-center mb-6">{children}</div>

        <NeonButton onClick={onNext}>{buttonText}</NeonButton>
        <ProgressDots total={4} current={progressIndex} />
      </div>
    </motion.div>
  )
}
