import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MatrixBackground } from '../MatrixBackground'
import { birthdayData } from '../../config/birthdayData'

interface Screen0MatrixProps {
  onComplete: () => void
}

type Phase = 'countdown' | 'scanning' | 'reveal'

export function Screen0Matrix({ onComplete }: Screen0MatrixProps) {
  const [count, setCount] = useState(3)
  const [phase, setPhase] = useState<Phase>('countdown')

  useEffect(() => {
    if (phase !== 'countdown') return

    if (count > 1) {
      const t = setTimeout(() => setCount((c) => c - 1), 1000)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setPhase('scanning'), 1000)
    return () => clearTimeout(t)
  }, [count, phase])

  useEffect(() => {
    if (phase !== 'scanning') return
    const t = setTimeout(() => setPhase('reveal'), 2000)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'reveal') return
    const t = setTimeout(() => onComplete(), 2500)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  return (
    <div className="relative h-full w-full">
      <MatrixBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          {phase === 'countdown' && (
            <motion.div
              key={count}
              className="font-mono text-8xl sm:text-9xl font-bold text-green-400"
              style={{
                textShadow:
                  '0 0 20px rgba(74, 222, 128, 0.8), 0 0 40px rgba(74, 222, 128, 0.4)',
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {count}
            </motion.div>
          )}

          {phase === 'scanning' && (
            <motion.p
              key="scan"
              className="font-mono text-lg sm:text-xl text-green-400 tracking-widest px-6 text-center"
              style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Scanning Birthday Recipient...
            </motion.p>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <p
                className="font-mono text-green-400 text-sm mb-3 tracking-widest"
                style={{ textShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }}
              >
                TARGET IDENTIFIED
              </p>
              <h1
                className="font-heading text-5xl sm:text-6xl font-extrabold text-white"
                style={{
                  textShadow:
                    '0 0 30px rgba(74, 222, 128, 0.6), 0 0 60px rgba(74, 222, 128, 0.3)',
                }}
              >
                {birthdayData.friendName}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
