import { birthdayData } from '../../config/birthdayData'
import { RabbitCardLayout } from '../RabbitCardLayout'

interface Screen4RabbitBirthdayProps {
  onNext: () => void
}

export function Screen4RabbitBirthday({ onNext }: Screen4RabbitBirthdayProps) {
  return (
    <RabbitCardLayout
      buttonText="Next"
      progressIndex={2}
      onNext={onNext}
    >
      <p className="font-heading text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
        Happy Birthday, {birthdayData.friendName}!
      </p>
    </RabbitCardLayout>
  )
}
