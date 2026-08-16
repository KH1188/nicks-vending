type Props = {
  size?: 'sm' | 'lg'
  stacked?: boolean
  className?: string
}

export default function CardsWordmark({ size = 'sm', stacked = false, className = '' }: Props) {
  const textSize = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-lg'
  const tagSize = size === 'lg' ? 'text-xs sm:text-sm' : 'text-[10px]'

  const nameEl = (
    <span className={`font-brand font-black tracking-tight text-ink ${textSize}`}>
      Nick's <span className="bg-neon-gradient-text bg-clip-text text-transparent">Vending</span>
    </span>
  )
  const tagEl = (
    <span className={`font-brand font-bold uppercase tracking-widest text-neon-violet ${tagSize}`}>
      Collectibles
    </span>
  )

  if (stacked) {
    return (
      <span className={`flex flex-col items-start gap-1 ${className}`}>
        {nameEl}
        {tagEl}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      {nameEl}
      {tagEl}
    </span>
  )
}
