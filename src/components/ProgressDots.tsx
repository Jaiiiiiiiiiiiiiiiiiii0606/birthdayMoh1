interface ProgressDotsProps {
  total: number
  current: number
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="text-lg leading-none"
          style={{
            color: i === current ? '#ff2d95' : 'rgba(255,255,255,0.25)',
            textShadow:
              i === current ? '0 0 12px rgba(255,45,149,0.8)' : 'none',
          }}
        >
          {i === current ? '●' : '○'}
        </span>
      ))}
    </div>
  )
}
