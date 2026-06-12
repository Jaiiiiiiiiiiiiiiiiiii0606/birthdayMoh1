import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface StarryBackgroundProps {
  lightsOn?: boolean
}

export function StarryBackground({ lightsOn = false }: StarryBackgroundProps) {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 space-bg"
        animate={{
          filter: lightsOn ? 'brightness(1.35)' : 'brightness(1)',
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {lightsOn && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(255, 200, 100, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          }}
        />
      )}

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
