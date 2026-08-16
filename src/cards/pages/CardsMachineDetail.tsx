import { useState, useRef } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import Lightbox from '../../components/Lightbox'
import CardsNavbar from '../components/CardsNavbar'
import CardsFooter from '../components/CardsFooter'
import { CARDS_MACHINES } from '../machines'

function Carousel({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)

  return (
    <>
    <div
      className="rounded-2xl overflow-hidden bg-paper-elevated border border-paper-border group"
      onTouchStart={e => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY }}
      onTouchEnd={e => {
        if (touchX.current === null || touchY.current === null) return
        const deltaX = touchX.current - e.changedTouches[0].clientX
        const deltaY = touchY.current - e.changedTouches[0].clientY
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) deltaX > 0 ? next() : prev()
        touchX.current = null; touchY.current = null
      }}
    >
      <div className="relative">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / images.length)}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((img, i) => (
            <div key={i} style={{ width: `${100 / images.length}%` }} className="cursor-zoom-in" onClick={() => setLightbox(true)}>
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>

        <button onClick={prev} aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
            bg-white/80 hover:bg-white shadow flex items-center justify-center
            sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
            bg-white/80 hover:bg-white shadow flex items-center justify-center
            sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === index ? 'bg-neon-violet scale-125' : 'bg-white/60'
              }`} />
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-3 p-3 pt-0">
        {images.map((img, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`flex-1 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === index ? 'border-neon-violet' : 'border-transparent opacity-60 hover:opacity-100'
            }`}>
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
    {lightbox && <Lightbox images={images} initialIndex={index} name={name} onClose={() => setLightbox(false)} />}
    </>
  )
}

export default function CardsMachineDetail() {
  const { slug } = useParams<{ slug: string }>()
  const machine = CARDS_MACHINES.find(m => m.slug === slug)

  if (!machine) return <Navigate to="/cards" replace />

  return (
    <div className="bg-paper">
      <Seo
        title={`${machine.name} — Collectible Card Vending Machine | Nick's Vending Collectibles`}
        description={`${machine.tagline} ${machine.description}`}
        path={`/cards/machines/${machine.slug}`}
        image="/og/cards-og.png"
      />
      <CardsNavbar />
      <main className="pt-[72px]">
        <section className="py-16 bg-paper">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <Link to="/cards"
              className="inline-flex items-center gap-2 text-sm text-ink/50
                hover:text-neon-violet transition-colors mb-10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Collectibles Vending
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              <Carousel images={machine.images} name={machine.name} />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neon-violet mb-2">
                  Smart Machine
                </p>
                <h1 className="text-4xl font-brand font-black text-ink mb-2">{machine.name}</h1>
                <p className="text-lg font-medium text-ink/50 italic mb-6">
                  {machine.tagline}
                </p>
                <p className="text-ink/60 leading-relaxed mb-8">
                  {machine.description}
                </p>

                <div className="rounded-xl border border-paper-border overflow-hidden mb-8">
                  <div className="bg-paper px-5 py-3 border-b border-paper-border">
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">
                      Specifications
                    </p>
                  </div>
                  <ul className="divide-y divide-paper-border bg-paper-elevated">
                    {machine.specs.map(({ label, value }) => (
                      <li key={label} className="flex justify-between px-5 py-3.5 gap-4">
                        <span className="text-sm font-medium text-ink/50">{label}</span>
                        <span className="text-sm font-semibold text-ink text-right">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="/cards#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold
                    text-white bg-neon-gradient hover:shadow-neon-soft transition-all duration-200">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <CardsFooter />
    </div>
  )
}
