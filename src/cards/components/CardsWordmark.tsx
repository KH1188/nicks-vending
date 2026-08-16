type Props = {
  size?: 'sm' | 'lg'
  className?: string
}

export default function CardsWordmark({ size = 'sm', className = '' }: Props) {
  const textSize = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-lg'
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`font-brand font-black tracking-tight text-ink ${textSize}`}>
        Nick's <span className="bg-neon-gradient-text bg-clip-text text-transparent">Vending</span>
      </span>
      <span className={`font-brand font-bold uppercase tracking-widest text-neon-violet ${size === 'lg' ? 'text-xs sm:text-sm' : 'text-[10px]'}`}>
        Collectibles
      </span>
    </span>
  )
}
