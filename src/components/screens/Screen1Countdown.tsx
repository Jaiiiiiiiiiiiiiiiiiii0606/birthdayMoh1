import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { birthdayData } from '../../config/birthdayData'

interface Screen1CountdownProps {
  onSkip: () => void
}

function getBirthdayMidnight(): Date {
  const now = new Date()
  const target = new Date(
    now.getFullYear(),
    birthdayData.countdownMonth - 1,
    birthdayData.countdownDay,
    0,
    0,
    0,
    0,
  )

  if (now >= target) {
    target.setFullYear(target.getFullYear() + 1)
  }

  return target
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { hours, minutes, seconds, totalMs: diff }
}

export function Screen1Countdown({ onSkip }: Screen1CountdownProps) {
  const target = getBirthdayMidnight()
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  const tick = useCallback(() => {
    setTimeLeft(getTimeLeft(target))
  }, [target])

  useEffect(() => {
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-full px-6 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.p
        className="text-white/70 text-xs sm:text-sm tracking-[0.25em] uppercase mb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        SOMEONE CRAFTED SOMETHING MAGICAL
      </motion.p>
      <motion.p
        className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        FOR
      </motion.p>

      <motion.h1
        className="font-heading text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent leading-tight"
        style={{ textShadow: '0 0 40px rgba(255,45,149,0.3)' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.4 }}
      >
        {birthdayData.friendName}
      </motion.h1>

      <motion.p
        className="text-white/40 text-xs mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {birthdayData.birthDate}
      </motion.p>

      <motion.p
        className="text-white/60 text-xs tracking-[0.2em] uppercase mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        THE MAGIC BEGINS IN
      </motion.p>

      <motion.div
        className="flex items-center gap-4 sm:gap-6 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center">
          <p className="font-heading text-4xl sm:text-5xl font-bold tabular-nums">
            {pad(timeLeft.hours)}
          </p>
          <p className="text-white/40 text-[10px] tracking-widest mt-1">HRS</p>
        </div>
        <span className="text-2xl text-white/30 font-light">:</span>
        <div className="text-center">
          <p className="font-heading text-4xl sm:text-5xl font-bold tabular-nums">
            {pad(timeLeft.minutes)}
          </p>
          <p className="text-white/40 text-[10px] tracking-widest mt-1">MIN</p>
        </div>
        <span className="text-2xl text-white/30 font-light">:</span>
        <div className="text-center">
          <p className="font-heading text-4xl sm:text-5xl font-bold tabular-nums">
            {pad(timeLeft.seconds)}
          </p>
          <p className="text-white/40 text-[10px] tracking-widest mt-1">SEC</p>
        </div>
      </motion.div>

      <motion.button
        className="mt-10 py-3 px-8 rounded-full ghost-btn text-white/80 text-sm font-medium tracking-wide"
        onClick={onSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.97 }}
      >
        Can&apos;t wait? Peek now
      </motion.button>
    </motion.div>
  )
}
