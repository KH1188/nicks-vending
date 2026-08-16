import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from '../../components/Lightbox'
import { CARDS_MACHINES, CardsMachine } from '../machines'

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
      className="relative bg-paper aspect-[4/3] overflow-hidden group"
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
          bg-white/80 hover:bg-white shadow flex items-center justify-center
          sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
          bg-white/80 hover:bg-white shadow flex items-center justify-center
          sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24"
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
              i === index ? 'bg-neon-violet scale-125' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
    {lightbox && <Lightbox images={images} initialIndex={index} name={name} onClose={() => setLightbox(false)} />}
    </>
  )
}

function MachineCard({ machine }: { machine: CardsMachine }) {
  return (
    <article className="overflow-hidden rounded-2xl flex flex-col border border-paper-border bg-paper-elevated
      hover:border-neon-violet/30 hover:shadow-neon-soft transition-all duration-200">
      <Carousel images={machine.images} name={machine.name} />

      <div className="p-7 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-violet">
          Smart Machine
        </p>
        <h3 className="text-xl font-bold text-ink">{machine.name}</h3>
        <p className="text-sm font-medium text-ink/50 italic">{machine.tagline}</p>
        <p className="text-sm text-ink/60 leading-relaxed mt-1">{machine.description}</p>
        <Link to={`/cards/machines/${machine.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold
            text-neon-violet hover:text-neon-magenta transition-colors">
          View Details
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default function CardsMachines() {
  return (
    <section id="machines" className="py-24 bg-paper-elevated">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">Our machines</p>
          <h2 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight">
            Built for foot traffic.<br />Built to perform.
          </h2>
          <p className="text-lg text-ink/60 leading-relaxed mt-4 max-w-xl">
            Every machine we place is a smart unit — cashless, touchscreen, and
            always connected. Here's the lineup.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {CARDS_MACHINES.map((machine) => (
            <MachineCard key={machine.slug} machine={machine} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-ink/40 mb-4">
            Not sure which machine is right for your venue?
          </p>
          <a href="/cards#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold
              text-white bg-neon-gradient hover:shadow-neon-soft transition-all duration-200">
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  )
}
