import { RabbitCardLayout } from '../RabbitCardLayout'

interface Screen3RabbitVibeProps {
  onNext: () => void
}

export function Screen3RabbitVibe({ onNext }: Screen3RabbitVibeProps) {
  return (
    <RabbitCardLayout
      buttonText="Next"
      progressIndex={1}
      onNext={onNext}
    >
      <p className="text-white/80 text-base mb-4">The vibe between us?</p>
      <p className="font-heading text-3xl font-bold bg-gradient-to-r from-pink-300 to-orange-200 bg-clip-text text-transparent">
        Sweet &amp; Warm
      </p>
    </RabbitCardLayout>
  )
}
