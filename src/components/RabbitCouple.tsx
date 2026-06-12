import { motion } from 'framer-motion'
import { birthdayData } from '../config/birthdayData'

interface RabbitCoupleProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function RabbitCouple({ size = 'md', className = '' }: RabbitCoupleProps) {
  const sizeClass =
    size === 'sm' ? 'w-20 h-20' : size === 'lg' ? 'w-36 h-36' : 'w-28 h-28'

  if (birthdayData.rabbitCoupleImage) {
    return (
      <motion.img
        src={birthdayData.rabbitCoupleImage}
        alt="Rabbit couple"
        className={`${sizeClass} rounded-full object-cover rabbit-frame mx-auto ${className}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      />
    )
  }

  return (
    <motion.div
      className={`${sizeClass} mx-auto rabbit-frame rounded-full overflow-hidden bg-pink-100/20 ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect width="120" height="120" fill="#1a0a2e" />
        {/* Left bunny */}
        <ellipse cx="42" cy="78" rx="22" ry="20" fill="#f5c6d0" />
        <ellipse cx="35" cy="38" rx="7" ry="20" fill="#f5c6d0" transform="rotate(-12 35 38)" />
        <ellipse cx="49" cy="38" rx="7" ry="20" fill="#f5c6d0" transform="rotate(8 49 38)" />
        <circle cx="38" cy="72" r="3.5" fill="#333" />
        <circle cx="39" cy="71" r="1.2" fill="#fff" />
        <ellipse cx="35" cy="78" rx="5" ry="4" fill="rgba(255,143,171,0.4)" />
        {/* Right bunny */}
        <ellipse cx="78" cy="78" rx="22" ry="20" fill="#e8b4d0" />
        <ellipse cx="71" cy="38" rx="7" ry="20" fill="#e8b4d0" transform="rotate(-8 71 38)" />
        <ellipse cx="85" cy="38" rx="7" ry="20" fill="#e8b4d0" transform="rotate(12 85 38)" />
        <circle cx="82" cy="72" r="3.5" fill="#333" />
        <circle cx="83" cy="71" r="1.2" fill="#fff" />
        <ellipse cx="85" cy="78" rx="5" ry="4" fill="rgba(255,143,171,0.4)" />
        {/* Heart between */}
        <path
          d="M60 65 C60 60 55 55 52 55 C48 55 45 58 45 62 C45 68 60 78 60 78 C60 78 75 68 75 62 C75 58 72 55 68 55 C65 55 60 60 60 65Z"
          fill="#ff6b9d"
          opacity="0.9"
        />
      </svg>
    </motion.div>
  )
}
