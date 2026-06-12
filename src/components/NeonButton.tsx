import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface NeonButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function NeonButton({
  children,
  onClick,
  disabled = false,
  className = '',
}: NeonButtonProps) {
  return (
    <motion.button
      className={`neon-btn w-full py-3.5 px-6 rounded-full text-white font-bold text-lg tracking-wide ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {children}
    </motion.button>
  )
}
