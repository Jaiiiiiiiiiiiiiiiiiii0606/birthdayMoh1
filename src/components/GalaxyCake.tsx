import { motion } from 'framer-motion'

interface GalaxyCakeProps {
  candlesLit?: boolean
  showSmoke?: boolean
  sliced?: boolean
}

const CONSTELLATIONS = [
  { cx: 55, cy: 95, r: 1.5 },
  { cx: 65, cy: 88, r: 1 },
  { cx: 72, cy: 95, r: 1.2 },
  { cx: 40, cy: 100, r: 1 },
  { cx: 48, cy: 92, r: 1.3 },
  { cx: 80, cy: 100, r: 1 },
]

export function GalaxyCake({
  candlesLit = true,
  showSmoke = false,
  sliced = false,
}: GalaxyCakeProps) {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 200 }}>
      {showSmoke &&
        [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-400/40"
            style={{
              left: `${35 + i * 12}%`,
              top: '8%',
              width: 12,
              height: 12,
            }}
            initial={{ opacity: 0.8, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -40, scale: 2.5 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}

      <svg viewBox="0 0 220 200" className="w-full h-full">
        {/* Plate */}
        <ellipse cx="110" cy="185" rx="90" ry="12" fill="#2a2a4a" opacity="0.6" />

        {/* Main cake body - bottom layer */}
        <g>
          <rect x="45" y="110" width="130" height="55" rx="8" fill="#1a1040" />
          <rect x="45" y="110" width="130" height="55" rx="8" fill="url(#galaxyGrad)" opacity="0.9" />
          {/* Stars on bottom layer */}
          {CONSTELLATIONS.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff" opacity="0.8" />
          ))}
        </g>

        {/* Top layer */}
        <g>
          <rect x="60" y="75" width="100" height="40" rx="6" fill="#2d1b69" />
          <rect x="60" y="75" width="100" height="40" rx="6" fill="url(#galaxyGrad2)" opacity="0.85" />
          <circle cx="80" cy="90" r="1" fill="#fff" opacity="0.7" />
          <circle cx="95" cy="85" r="1.2" fill="#fff" opacity="0.8" />
          <circle cx="110" cy="92" r="0.8" fill="#fff" opacity="0.6" />
          <circle cx="125" cy="87" r="1" fill="#fff" opacity="0.7" />
          <circle cx="140" cy="93" r="1.1" fill="#fff" opacity="0.8" />
        </g>

        {/* Frosting drip */}
        <path
          d="M60 75 Q65 85 70 75 Q75 88 80 75 Q85 86 90 75 Q95 88 100 75 Q105 86 110 75 Q115 88 120 75 Q125 86 130 75 Q135 88 140 75 Q145 86 150 75 L160 75 L160 75 Z"
          fill="#a855f7"
          opacity="0.7"
        />

        {/* Candles */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const cx = 72 + i * 14
          return (
            <g key={i}>
              <rect x={cx - 2} y="52" width="4" height="24" rx="1" fill="#ffd700" />
              {candlesLit && (
                <ellipse
                  cx={cx}
                  cy="48"
                  rx="4"
                  ry="6"
                  fill="#ff6b35"
                  className="candle-flame"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              )}
            </g>
          )
        })}

        {/* Slice (when cut) */}
        {sliced && (
          <motion.g
            initial={{ x: 0, y: 0 }}
            animate={{ x: 30, y: -10, rotate: 5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <path
              d="M110 75 L110 165 L85 165 Q80 140 85 110 Q90 85 110 75Z"
              fill="#3d2b7a"
            />
            <path
              d="M110 110 L110 165 L95 165 L95 110Z"
              fill="#f5c6d0"
              opacity="0.6"
            />
            <path
              d="M110 75 L110 110 L95 110 Q92 95 95 85 Q98 78 110 75Z"
              fill="#a855f7"
              opacity="0.5"
            />
          </motion.g>
        )}

        <defs>
          <linearGradient id="galaxyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="50%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="galaxyGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
