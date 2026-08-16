import { useState, useEffect, useRef } from 'react'
import skylineLogo from '../../assets/logos/skyline-logo.webp'
import heroSlim    from '../../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-486251.webp'
import heroMega    from '../../assets/Mega Wall/mega-wall-20-vape-machine-with-led-lights-electronic-lock-vtm-vapetm-260076.webp'
import heroTower   from '../../assets/Slim Tower/vapetm-slim-tower-20-front-view-smart-vape-vending-machine-touchscreen.webp'
import heroMini    from '../../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vape-vending-machine-vtm-vapetm-256986.webp'
import heroWeather from '../../assets/WeatherWall/1.webp'

const HERO_IMAGES = [
  { src: heroSlim,    label: 'Slim Wall' },
  { src: heroMega,    label: 'Mega Wall' },
  { src: heroTower,   label: 'Slim Tower' },
  { src: heroMini,    label: 'Mini Wall' },
  { src: heroWeather, label: 'WeatherWall' },
]

function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)
  const prev = () => setIndex(i => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  const next = () => setIndex(i => (i + 1) % HERO_IMAGES.length)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % HERO_IMAGES.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-ink-border shadow-neon"
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
        style={{ transform: `translateX(-${index * (100 / HERO_IMAGES.length)}%)`, width: `${HERO_IMAGES.length * 100}%` }}
      >
        {HERO_IMAGES.map(({ src, label }, i) => (
          <div key={i} style={{ width: `${100 / HERO_IMAGES.length}%` }}>
            <img src={src} alt={label} className="w-full h-auto object-contain" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 bg-ink/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
        {HERO_IMAGES[index].label}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-neon-violet scale-125' : 'bg-white/40'
            }`} />
        ))}
      </div>
    </div>
  )
}

export default function NightlifeHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-[72px] bg-ink">
      {/* Neon glow backdrop */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-neon-violet/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full bg-neon-blue/20 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left column */}
          <div className="flex flex-col items-start">
            <img src={skylineLogo} alt="Nick's Vending" className="h-36 sm:h-44 lg:h-52 w-auto object-contain mb-8" />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-black text-white tracking-tight leading-[1.1] mb-6">
              We stock it.<br />
              <span className="bg-neon-gradient-text bg-clip-text text-transparent">You profit.</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed max-w-md mb-8">
              Smart nightlife vending for bars, clubs, and casinos — zero cost, zero labor
              to your venue. We install, stock, and service the machine; you collect a
              monthly revenue share.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+15042521125"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  text-white bg-neon-gradient hover:shadow-neon active:scale-[0.98] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call 504-252-1125
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  border border-white/20 text-white hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
              >
                Get a Quote
              </a>
            </div>

            <p className="mt-6 text-sm text-white/40">
              10–12.5% monthly revenue share &middot; no equipment cost &middot; no staff time
            </p>
          </div>

          {/* Right column — machine carousel */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-neon-gradient rounded-3xl blur-2xl opacity-25 scale-95" />
              <div className="relative">
                <HeroCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#how-it-works"
        aria-label="Scroll to how it works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          text-white/40 hover:text-white/70 transition-colors duration-200 animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
