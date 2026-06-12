import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

const BALLOONS = [
  { id: 0, color: '#ff2d95', label: 'Pink', x: 15, y: 20 },
  { id: 1, color: '#ffd700', label: 'Yellow', x: 55, y: 35 },
  { id: 2, color: '#4ade80', label: 'Green', x: 75, y: 15 },
  { id: 3, color: '#38bdf8', label: 'Blue', x: 40, y: 55 },
]

const POP_SOUND =
  'https://cdn.jsdelivr.net/gh/sanishkr/react-floating-balloons@master/public/pop.mp3'

interface Screen8BalloonsProps {
  onComplete: () => void
}

export function Screen8Balloons({ onComplete }: Screen8BalloonsProps) {
  const [popped, setPopped] = useState<Set<number>>(new Set())
  const [confetti, setConfetti] = useState(false)

  const handlePop = useCallback(
    (id: number) => {
      if (popped.has(id)) return

      try {
        const audio = new Audio(POP_SOUND)
        audio.volume = 0.5
        audio.play().catch(() => {})
      } catch {
        /* ignore */
      }

      setConfetti(true)
      setTimeout(() => setConfetti(false), 600)

      setPopped((prev) => {
        const next = new Set(prev)
        next.add(id)
        if (next.size >= BALLOONS.length) {
          setTimeout(() => onComplete(), 1200)
        }
        return next
      })
    },
    [onComplete],
  )

  return (
    <motion.div
      className="relative flex flex-col items-center min-h-full px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={50}
          recycle={false}
          gravity={0.4}
        />
      )}

      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 z-10">
        Pop the Balloons!
      </h2>

      <div className="relative w-full max-w-md h-[60vh]">
        <AnimatePresence>
          {BALLOONS.filter((b) => !popped.has(b.id)).map((balloon) => (
            <motion.button
              key={balloon.id}
              className="absolute cursor-pointer touch-manipulation"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                width: 70,
                height: 84,
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: [0, -12, 0],
                x: [0, 8, -8, 0],
              }}
              exit={{ scale: [1, 1.4, 0], opacity: 0 }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
              onClick={() => handlePop(balloon.id)}
              aria-label={`Pop ${balloon.label} balloon`}
            >
              <svg viewBox="0 0 60 72" className="w-full h-full drop-shadow-lg">
                <ellipse
                  cx="30"
                  cy="28"
                  rx="26"
                  ry="28"
                  fill={balloon.color}
                />
                <ellipse
                  cx="22"
                  cy="20"
                  rx="8"
                  ry="10"
                  fill="white"
                  opacity="0.25"
                />
                <line
                  x1="30"
                  y1="56"
                  x2="30"
                  y2="72"
                  stroke={balloon.color}
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              </svg>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-white/40 text-sm mt-4 z-10">
        {popped.size} / {BALLOONS.length} popped
      </p>
    </motion.div>
  )
}
