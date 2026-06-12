import { useEffect, useRef } from 'react'
import { birthdayData } from '../config/birthdayData'

interface AudioPlayerProps {
  playing: boolean
}

export function AudioPlayer({ playing }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !birthdayData.music) return

    if (playing) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [playing])

  if (!birthdayData.music) return null

  return (
    <audio ref={audioRef} src={birthdayData.music} loop preload="auto" />
  )
}
