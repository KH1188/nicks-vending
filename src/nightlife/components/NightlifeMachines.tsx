import { useState, useRef } from 'react'
import Lightbox from '../../components/Lightbox'
import slimWall1 from '../../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-486251.webp'
import slimWall2 from '../../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-769781.webp'
import slimWall3 from '../../assets/Slim Wall/slim-wall-vape-vending-machine-ad-banner-id-scanner.webp'
import slimWall4 from '../../assets/Slim Wall/slim-wall-vape-vending-machine-on-pedestal-stand.webp'
import slimWall5 from '../../assets/Slim Wall/slim-wall-vape-vending-machine-open-10-aisles-touchscreen.webp'
import megaWall1 from '../../assets/Mega Wall/mega-wall-2-0-open-interior-15-sku-capacity.webp'
import megaWall2 from '../../assets/Mega Wall/mega-wall-2-0-vape-vending-machine-alp-nicotine-pouch-ad.webp'
import megaWall3 from '../../assets/Mega Wall/mega-wall-2-0-vape-vending-machine-side-view-depth-alp-ad.webp'
import megaWall4 from '../../assets/Mega Wall/mega-wall-20-vape-machine-with-led-lights-electronic-lock-vtm-vapetm-260076.webp'
import miniWall1 from '../../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vape-vending-machine-vtm-vapetm-256986.webp'
import miniWall2 from '../../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-306534.webp'
import miniWall3 from '../../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-456147.webp'
import miniWall4 from '../../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-655851.webp'
import miniWall5 from '../../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-850501.webp'
import slimTower1 from '../../assets/Slim Tower/slim-tower-2-0-smart-vape-vending-machine-specs.webp'
import slimTower2 from '../../assets/Slim Tower/touchscreen-vape-vending-machine-slim-tower-2-0.webp'
import slimTower3 from '../../assets/Slim Tower/vapetm-slim-tower-2-0-smart-vending-kiosk-touchscreen.webp'
import slimTower4 from '../../assets/Slim Tower/vapetm-slim-tower-20-front-view-smart-vape-vending-machine-touchscreen.webp'
import tinLift1 from '../../assets/Slim Wall - Tin Lift/alp-vapetm-vape-vending-machine-a-better-time-nicotine-pouches.webp'
import tinLift2 from '../../assets/Slim Wall - Tin Lift/nicotine-pouch-vending-machine-zyn.webp'
import tinLift3 from '../../assets/Slim Wall - Tin Lift/slim-wall-tin-lift-nicotine-pouch-only-vending-machine-angled-touchscreen.webp'
import tinLift4 from '../../assets/Slim Wall - Tin Lift/slim-wall-tin-lift-nicotine-pouch-vending-machine-dimensions.webp'
import tinLift5 from '../../assets/Slim Wall - Tin Lift/the-pouch-stacker-mega-americas-first-pouch-only-vending-machine-pre-order-now-pouch-vending-vapetm-109417.webp'
import tinLift6 from '../../assets/Slim Wall - Tin Lift/vapetm-slim-wall-tin-lift-nicotine-pouch-vending-machine.webp'
import weatherWall1 from '../../assets/WeatherWall/1.webp'
import weatherWall2 from '../../assets/WeatherWall/2.webp'
import weatherWall3 from '../../assets/WeatherWall/3.webp'
import weatherWall4 from '../../assets/WeatherWall/4.webp'
import weatherWall5 from '../../assets/WeatherWall/5.webp'

type Machine = {
  name: string
  tagline: string
  description: string
  images?: string[]
  detailUrl?: string
}

const MACHINES: Machine[] = [
  {
    name: 'Mini Wall',
    tagline: 'Compact footprint. Big results.',
    images: [miniWall1, miniWall2, miniWall5, miniWall3, miniWall4],
    detailUrl: '/machines/mini-wall',
    description:
      'The Mini Wall fits where other machines can\'t. Perfect for smaller bars, lounges, or tight spaces that still see consistent foot traffic. Don\'t let the size fool you — it moves product.',
  },
  {
    name: 'Slim Wall',
    tagline: 'Sleek. Space-saving. Always stocked.',
    images: [slimWall1, slimWall2, slimWall3, slimWall4, slimWall5],
    detailUrl: '/machines/slim-wall',
    description:
      'The Slim Wall mounts flush to the wall with a minimal footprint while carrying an impressive selection of top-selling products. Sleek, modern, and built for upscale venues.',
  },
  {
    name: 'Mega Wall',
    tagline: 'Largest wall unit. Same minimal footprint.',
    images: [megaWall3, megaWall2, megaWall4, megaWall1],
    detailUrl: '/machines/mega-wall',
    description:
      'Our largest wall-mounted machine. Built for high-traffic venues like casinos and nightclubs where floor space is limited but demand is high. LED accent lighting, 32" touchscreen, and cashless payment.',
  },
  {
    name: 'Slim Tower',
    tagline: 'Maximum product. Minimal footprint.',
    images: [slimTower1, slimTower4, slimTower3, slimTower2],
    detailUrl: '/machines/slim-tower',
    description:
      'Our highest-capacity machine. The Slim Tower holds more product than any other unit in our lineup — freestanding, flexible, and built for venues that want maximum selection.',
  },
  {
    name: 'WeatherWall',
    tagline: 'Built for the elements. Built to last.',
    images: [weatherWall1, weatherWall2, weatherWall3, weatherWall4, weatherWall5],
    detailUrl: '/machines/weather-wall',
    description:
      'The WeatherWall is engineered to perform where other machines won\'t. Built to withstand the elements, it\'s ideal for covered outdoor areas, patios, pool decks, and any venue where durability matters as much as performance.',
  },
  {
    name: 'Slim Wall – Tin Lift',
    tagline: 'Purpose-built for nicotine pouches.',
    images: [tinLift3, tinLift6, tinLift4, tinLift2, tinLift1, tinLift5],
    detailUrl: '/machines/slim-wall-tin-lift',
    description:
      'A dedicated nicotine pouch machine. The Slim Wall Tin Lift is specifically designed to carry and dispense tin products like Zyn, Alp, and On! — giving pouch users exactly what they\'re looking for, right at the bar.',
  },
]

function Carousel({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <>
    <div
      className="relative bg-ink-elevated-2 aspect-[4/3] overflow-hidden group"
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
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${index * (100 / images.length)}%)`, width: `${images.length * 100}%` }}
      >
        {images.map((img, i) => (
          <div key={i} className="h-full cursor-zoom-in" style={{ width: `${100 / images.length}%` }} onClick={() => setLightbox(true)}>
            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
          bg-ink/80 hover:bg-ink shadow flex items-center justify-center
          sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
          bg-ink/80 hover:bg-ink shadow flex items-center justify-center
          sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-neon-violet scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
    {lightbox && <Lightbox images={images} initialIndex={index} name={name} onClose={() => setLightbox(false)} />}
    </>
  )
}

function MachineCard({ machine }: { machine: Machine }) {
  return (
    <article className="overflow-hidden rounded-2xl flex flex-col border border-ink-border bg-ink-elevated
      hover:border-neon-violet/40 hover:shadow-neon-soft transition-all duration-200">
      {machine.images?.length && <Carousel images={machine.images} name={machine.name} />}

      <div className="p-7 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-violet">
          Smart Machine
        </p>
        <h3 className="text-xl font-bold text-white">{machine.name}</h3>
        <p className="text-sm font-medium text-white/50 italic">{machine.tagline}</p>
        <p className="text-sm text-white/60 leading-relaxed mt-1">{machine.description}</p>
        {machine.detailUrl && (
          <a href={machine.detailUrl}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold
              text-neon-violet hover:text-neon-magenta transition-colors">
            View Details
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

export default function NightlifeMachines() {
  return (
    <section id="machines" className="py-24 bg-ink-elevated">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">Our machines</p>
          <h2 className="text-3xl md:text-4xl font-brand font-black text-white tracking-tight">
            Built for venues.<br />Built to perform.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mt-4 max-w-xl">
            Every machine we place is a smart unit — cashless, touchscreen, and
            always connected. Here's the lineup.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MACHINES.map((machine) => (
            <MachineCard key={machine.name} machine={machine} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-white/40 mb-4">
            Not sure which machine is right for your venue?
          </p>
          <a href="/nightlife#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold
              text-white bg-neon-gradient hover:shadow-neon transition-all duration-200">
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  )
}
