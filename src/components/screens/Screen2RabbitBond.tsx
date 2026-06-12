import { birthdayData } from '../../config/birthdayData'
import { RabbitCardLayout } from '../RabbitCardLayout'

const BOND_COLORS = ['text-pink-300', 'text-purple-300', 'text-blue-300']

interface Screen2RabbitBondProps {
  onNext: () => void
}

export function Screen2RabbitBond({ onNext }: Screen2RabbitBondProps) {
  return (
    <RabbitCardLayout
      buttonText="Next"
      progressIndex={0}
      onNext={onNext}
    >
      <p className="text-white/80 text-base mb-3">Our bond —</p>
      {birthdayData.bondWords.map((word, i) => (
        <p
          key={i}
          className={`font-heading text-xl sm:text-2xl font-bold ${BOND_COLORS[i % BOND_COLORS.length]}`}
        >
          {word}
        </p>
      ))}
    </RabbitCardLayout>
  )
}
