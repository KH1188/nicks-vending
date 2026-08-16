type Props = {
  size?: 'sm' | 'lg'
  className?: string
}

export default function NightlifeWordmark({ size = 'sm', className = '' }: Props) {
  const textSize = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-lg'
  return (
    <span className={`font-brand font-black tracking-tight text-white ${textSize} ${className}`}>
      Nick's <span className="bg-neon-gradient-text bg-clip-text text-transparent">Vending</span>
    </span>
  )
}
