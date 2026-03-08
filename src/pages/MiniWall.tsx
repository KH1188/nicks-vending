import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import miniWall1 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vape-vending-machine-vtm-vapetm-256986.webp'
import miniWall2 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-306534.webp'
import miniWall3 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-456147.webp'
import miniWall4 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-655851.webp'
import miniWall5 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-850501.webp'

const IMAGES = [miniWall1, miniWall2, miniWall5, miniWall3, miniWall4]

const SPECS = [
  { label: 'Height',    value: '33.3"' },
  { label: 'Width',     value: '21.6"' },
  { label: 'Depth',     value: '8.7"' },
  { label: 'Display',   value: '21.5" Touchscreen' },
  { label: 'Aisles',    value: '8 (4 trays × 2 aisles per tray)' },
  { label: 'Mounting',  value: 'Wall or pedestal stand' },
  { label: 'Payment',   value: 'Cashless via Nayax VPOS Touch Card Reader' },
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
              <img src={img} alt={`Mini Wall ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
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
    {lightbox && <Lightbox images={IMAGES} initialIndex={index} name="Mini Wall" onClose={() => setLightbox(false)} />}
    </>
  )
}

export default function MiniWall() {
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
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Mini Wall</h1>
                <p className="text-lg font-medium text-slate-500 italic mb-6">
                  Compact footprint. Big results.
                </p>
                <p className="text-slate-500 leading-relaxed mb-8">
                  The Mini Wall fits where other machines can't. At just 8.7" deep, it's our most
                  compact unit — designed for smaller bars, lounges, or tight spaces that still see
                  consistent foot traffic. It mounts flush to the wall or sits on a pedestal stand,
                  giving you flexibility in any layout. Don't let the size fool you — it moves
                  product. Touchscreen, cashless, and always connected.
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
                  <a
                    href="https://go.vizbl.com/en/object/s8NB7hIOQLC_Aw2YHdwPxQ#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center text-sm py-3 px-6"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    View in AR
                  </a>
                  <a href="/#contact" className="btn-secondary justify-center text-sm py-3 px-6">
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
