import { motion } from 'framer-motion'

const COLORS = ['#ff2d95', '#ffd700', '#4ade80', '#38bdf8', '#fb923c']
const TEXT = 'Happy Birthday'

export function RainbowHeading() {
  return (
    <motion.h1
      className="font-heading text-3xl sm:text-4xl font-extrabold text-center mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {TEXT.split('').map((char, i) => (
        <motion.span
          key={i}
          className="rainbow-letter"
          style={{
            color: COLORS[i % COLORS.length],
            textShadow: `0 0 12px ${COLORS[i % COLORS.length]}88, 0 0 24px ${COLORS[i % COLORS.length]}44`,
          }}
          animate={{
            textShadow: [
              `0 0 8px ${COLORS[i % COLORS.length]}66`,
              `0 0 20px ${COLORS[i % COLORS.length]}aa`,
              `0 0 8px ${COLORS[i % COLORS.length]}66`,
            ],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}
