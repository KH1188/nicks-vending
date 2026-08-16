import { useState, useEffect, useRef } from 'react'
import circleTransparent from '../../assets/logos/circle-transparent.webp'
import cardEvolvingSkies from '../../assets/Pokemon Cards/evolving-skies.jpg'
import cardPrismatic     from '../../assets/Pokemon Cards/prismatic-evolutions.jpg'
import cardMegaEvolution from '../../assets/Pokemon Cards/mega-evolution-phantasmal-flames.png'
import cardDestinedRivals from '../../assets/Pokemon Cards/destined-rivals.png'
import cardSurgingSparks from '../../assets/Pokemon Cards/surging-sparks.png'

const PACKS = [
  { src: cardEvolvingSkies,  label: 'Evolving Skies' },
  { src: cardPrismatic,      label: 'Prismatic Evolutions' },
  { src: cardDestinedRivals, label: 'Destined Rivals' },
  { src: cardMegaEvolution,  label: 'Mega Evolution: Phantasmal Flames' },
  { src: cardSurgingSparks,  label: 'Surging Sparks' },
]

function PokemonCarousel() {
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)
  const prev = () => setIndex(i => (i - 1 + PACKS.length) % PACKS.length)
  const next = () => setIndex(i => (i + 1) % PACKS.length)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % PACKS.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-paper-border bg-paper-elevated shadow-neon-soft"
      onTouchStart={e => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY }}
      onTouchEnd={e => {
        if (touchX.current === null || touchY.current === null) return
        const deltaX = touchX.current - e.changedTouches[0].clientX
        const deltaY = touchY.current - e.changedTouches[0].clientY
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) deltaX > 0 ? next() : prev()
        touchX.current = null; touchY.current = null
      }}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * (100 / PACKS.length)}%)`, width: `${PACKS.length * 100}%` }}
      >
        {PACKS.map(({ src, label }, i) => (
          <div key={i} style={{ width: `${100 / PACKS.length}%` }} className="p-6">
            <img src={src} alt={label} className="w-full h-auto max-h-96 object-contain mx-auto" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 bg-ink/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
        {PACKS[index].label}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {PACKS.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-neon-violet scale-125' : 'bg-ink/20'
            }`} />
        ))}
      </div>
    </div>
  )
}

export default function CardsHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-[72px] bg-paper">
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-neon-violet/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-neon-blue/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="flex flex-col items-start">
            <img
              src={circleTransparent}
              alt="Nick's Vending Collectibles"
              className="h-40 sm:h-48 lg:h-56 w-auto object-contain mb-8 [filter:drop-shadow(0_0_24px_rgba(139,92,246,0.3))]"
            />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-black text-ink tracking-tight leading-[1.1] mb-6">
              Factory-sealed<br />
              <span className="bg-neon-gradient-text bg-clip-text text-transparent">Pokémon and collectible vending.</span>
            </h1>

            <p className="text-lg text-ink/60 leading-relaxed max-w-md mb-8">
              High-traffic passive revenue for malls, card shops, barcades, and family
              entertainment venues.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  text-white bg-neon-gradient hover:shadow-neon-soft active:scale-[0.98] transition-all duration-200"
              >
                Get in Touch
              </a>
            </div>

            <p className="mt-6 text-sm text-ink/40">
              Revenue-share &middot; no cost to install &middot; family-friendly
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <PokemonCarousel />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#how-it-works"
        aria-label="Scroll to how it works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          text-ink/30 hover:text-ink/60 transition-colors duration-200 animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
