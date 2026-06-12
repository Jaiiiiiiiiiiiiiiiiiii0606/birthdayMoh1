import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0 text-pink-400"
          style={{
            left: `${h.x}%`,
            fontSize: h.size,
          }}
          animate={{
            y: [0, -window.innerHeight],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
