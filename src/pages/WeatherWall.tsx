import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import img1 from '../assets/WeatherWall/1.webp'
import img2 from '../assets/WeatherWall/2.webp'
import img3 from '../assets/WeatherWall/3.webp'
import img4 from '../assets/WeatherWall/4.webp'
import img5 from '../assets/WeatherWall/5.webp'

const IMAGES = [img1, img2, img3, img4, img5]

const SPECS = [
  { label: 'Height',   value: '49.2"' },
  { label: 'Width',    value: '16.5"' },
  { label: 'Depth',    value: '23.6"' },
  { label: 'Display',  value: '32" Touchscreen' },
  { label: 'Aisles',   value: '12 (6 trays × 2 bays per aisle)' },
  { label: 'Payment',  value: 'Cashless via Nayax VPOS Touch Card Reader' },
]

function Carousel() {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const prev = () => setIndex(i => (i - 1 + IMAGES.length) % IMAGES.length)
  const next = () => setIndex(i => (i + 1) % IMAGES.length)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)

  return (
    <>
    <div
      className="rounded-2xl overflow-hidden bg-slate-100 group"
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
          style={{ transform: `translateX(-${index * (100 / IMAGES.length)}%)`, width: `${IMAGES.length * 100}%` }}
        >
          {IMAGES.map((img, i) => (
            <div key={i} style={{ width: `${100 / IMAGES.length}%` }} className="cursor-zoom-in" onClick={() => setLightbox(true)}>
              <img src={img} alt={`WeatherWall ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>

        <button onClick={prev} aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
            bg-white/80 hover:bg-white shadow flex items-center justify-center
            sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
            bg-white/80 hover:bg-white shadow flex items-center justify-center
            sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {IMAGES.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === index ? 'bg-white scale-125' : 'bg-white/50'
              }`} />
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        {IMAGES.map((img, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`flex-1 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === index ? 'border-brand-700' : 'border-transparent opacity-60 hover:opacity-100'
            }`}>
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
    {lightbox && <Lightbox images={IMAGES} initialIndex={index} name="WeatherWall" onClose={() => setLightbox(false)} />}
    </>
  )
}

export default function WeatherWall() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <a href="/#machines"
              className="inline-flex items-center gap-2 text-sm text-slate-500
                hover:text-brand-700 transition-colors mb-10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Return to Home
            </a>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              <Carousel />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 mb-2">
                  Smart Machine
                </p>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">WeatherWall</h1>
                <p className="text-lg font-medium text-slate-500 italic mb-6">
                  Built for the elements. Built to last.
                </p>
                <p className="text-slate-500 leading-relaxed mb-8">
                  The WeatherWall is engineered to perform where other machines won't. Built to
                  withstand the elements, it's ideal for covered outdoor areas, patios, pool decks,
                  and any venue where durability matters as much as performance. With 12 aisles
                  across 6 trays, a 32" touchscreen, and cashless payment — it brings the full
                  smart vending experience anywhere you need it, rain or shine.
                </p>

                <div className="rounded-xl border border-slate-100 overflow-hidden mb-8">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Specifications
                    </p>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {SPECS.map(({ label, value }) => (
                      <li key={label} className="flex justify-between px-5 py-3.5">
                        <span className="text-sm font-medium text-slate-500">{label}</span>
                        <span className="text-sm font-semibold text-slate-900">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/#contact" className="btn-primary justify-center text-sm py-3 px-6">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
