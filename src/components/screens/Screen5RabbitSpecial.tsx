import { RabbitCardLayout } from '../RabbitCardLayout'

interface Screen5RabbitSpecialProps {
  onNext: () => void
}

export function Screen5RabbitSpecial({ onNext }: Screen5RabbitSpecialProps) {
  return (
    <RabbitCardLayout
      buttonText="Let's Go!"
      progressIndex={3}
      onNext={onNext}
    >
      <p className="text-white/80 text-lg leading-relaxed">
        I made something special
        <br />
        just for you...
      </p>
    </RabbitCardLayout>
  )
}
