import { RabbitCardLayout } from '../RabbitCardLayout'

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
      <p className="text-white/80 text-base mb-3">Our bond in three words —</p>
      <p className="font-heading text-2xl font-bold text-pink-300">Sweet,</p>
      <p className="font-heading text-2xl font-bold text-purple-300">Loyal</p>
      <p className="font-heading text-2xl font-bold text-blue-300">
        &amp; My rock
      </p>
    </RabbitCardLayout>
  )
}
