import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { StarryBackground } from './components/StarryBackground'
import { AudioPlayer } from './components/AudioPlayer'
import { Screen0Matrix } from './components/screens/Screen0Matrix'
import { Screen1Countdown } from './components/screens/Screen1Countdown'
import { Screen2RabbitBond } from './components/screens/Screen2RabbitBond'
import { Screen3RabbitVibe } from './components/screens/Screen3RabbitVibe'
import { Screen4RabbitBirthday } from './components/screens/Screen4RabbitBirthday'
import { Screen5RabbitSpecial } from './components/screens/Screen5RabbitSpecial'
import { Screen6Lights } from './components/screens/Screen6Lights'
import { Screen7Music } from './components/screens/Screen7Music'
import { Screen8Balloons } from './components/screens/Screen8Balloons'
import { Screen9Special } from './components/screens/Screen9Special'
import { Screen10Cake } from './components/screens/Screen10Cake'
import { Screen11BlowCandles } from './components/screens/Screen11BlowCandles'
import { Screen12CutCake } from './components/screens/Screen12CutCake'
import { Screen13Letter } from './components/screens/Screen13Letter'
import { Screen14Final } from './components/screens/Screen14Final'

export default function App() {
  const [screen, setScreen] = useState(0)
  const [lightsOn, setLightsOn] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  const goNext = () => setScreen((s) => s + 1)
  const goReplay = () => {
    setLightsOn(false)
    setMusicPlaying(false)
    setScreen(0)
  }

  const showSpaceBg = screen >= 1

  return (
    <div className="relative h-full w-full overflow-hidden">
      {showSpaceBg && <StarryBackground lightsOn={lightsOn} />}
      <AudioPlayer playing={musicPlaying} />

      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {screen === 0 && (
            <Screen0Matrix key="s0" onComplete={goNext} />
          )}
          {screen === 1 && (
            <Screen1Countdown key="s1" onSkip={() => setScreen(2)} />
          )}
          {screen === 2 && (
            <Screen2RabbitBond key="s2" onNext={goNext} />
          )}
          {screen === 3 && (
            <Screen3RabbitVibe key="s3" onNext={goNext} />
          )}
          {screen === 4 && (
            <Screen4RabbitBirthday key="s4" onNext={goNext} />
          )}
          {screen === 5 && (
            <Screen5RabbitSpecial key="s5" onNext={goNext} />
          )}
          {screen === 6 && (
            <Screen6Lights
              key="s6"
              onLightsOn={() => {
                setLightsOn(true)
                setTimeout(() => goNext(), 1200)
              }}
            />
          )}
          {screen === 7 && (
            <Screen7Music
              key="s7"
              onPlayMusic={() => {
                setMusicPlaying(true)
                goNext()
              }}
            />
          )}
          {screen === 8 && (
            <Screen8Balloons key="s8" onComplete={goNext} />
          )}
          {screen === 9 && (
            <Screen9Special key="s9" onNext={goNext} />
          )}
          {screen === 10 && (
            <Screen10Cake key="s10" onBlow={goNext} />
          )}
          {screen === 11 && (
            <Screen11BlowCandles key="s11" onCut={goNext} />
          )}
          {screen === 12 && (
            <Screen12CutCake key="s12" onNext={goNext} />
          )}
          {screen === 13 && (
            <Screen13Letter key="s13" onNext={goNext} />
          )}
          {screen === 14 && (
            <Screen14Final key="s14" onReplay={goReplay} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
