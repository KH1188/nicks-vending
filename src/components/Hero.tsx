import { useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
import installPhoto from '../assets/Background Photos/vtm-vape-vending-machine-alp-delta8-bar-installation.avif'
import heroSlim from '../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-486251.webp'
import heroMega from '../assets/Mega Wall/mega-wall-20-vape-machine-with-led-lights-electronic-lock-vtm-vapetm-260076.webp'
import heroTower from '../assets/Slim Tower/vapetm-slim-tower-20-front-view-smart-vape-vending-machine-touchscreen.webp'
import heroMini from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vape-vending-machine-vtm-vapetm-256986.webp'
import heroWeather from '../assets/WeatherWall/1.webp'

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
      className="relative rounded-2xl overflow-hidden shadow-2xl"
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

      {/* Label pill */}
      <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
        {HERO_IMAGES[index].label}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-white scale-125' : 'bg-white/50'
            }`} />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px] bg-cover bg-center"
      style={{ backgroundImage: `url(${installPhoto})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left column */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="Nick's Vending"
              className="h-14 sm:h-16 w-auto object-contain mb-10"
            />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white
              tracking-tight leading-[1.1] mb-6">
              Smart nightlife vending,<br />
              <span className="text-brand-200">more revenue.</span><br />
              <span className="text-white/50 font-light">Zero effort.</span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-md mb-10">
              We place, stock, and maintain nightlife vending machines in adult
              venues — fully managed, fully compliant, zero hassle for you and your business.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary text-base py-3.5 px-8">
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#locations"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5
                  border-2 border-white text-white font-semibold rounded-lg text-base
                  hover:bg-white hover:text-slate-900 active:scale-[0.98]
                  transition-all duration-200">
                See Locations
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-brand-100 rounded-3xl blur-2xl opacity-40 scale-95" />
              <div className="relative">
                <HeroCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-1 text-white/40
          hover:text-white/70 transition-colors duration-200 animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
