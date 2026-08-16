import { useState, useRef } from 'react'
import NightlifeNavbar from '../nightlife/components/NightlifeNavbar'
import NightlifeFooter from '../nightlife/components/NightlifeFooter'
import Lightbox from '../components/Lightbox'
import slimTower1 from '../assets/Slim Tower/slim-tower-2-0-smart-vape-vending-machine-specs.webp'
import slimTower2 from '../assets/Slim Tower/touchscreen-vape-vending-machine-slim-tower-2-0.webp'
import slimTower3 from '../assets/Slim Tower/vapetm-slim-tower-2-0-smart-vending-kiosk-touchscreen.webp'
import slimTower4 from '../assets/Slim Tower/vapetm-slim-tower-20-front-view-smart-vape-vending-machine-touchscreen.webp'

const IMAGES = [slimTower1, slimTower4, slimTower3, slimTower2]

const SPECS = [
  { label: 'Height',    value: '71.1"' },
  { label: 'Width',     value: '27.5"' },
  { label: 'Depth',     value: '13.7"' },
  { label: 'Display',   value: '43" Touchscreen' },
  { label: 'Aisles',    value: '24 (8 trays × 3 aisles per tray)' },
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
      className="rounded-2xl overflow-hidden bg-ink-elevated group"
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
              <img src={img} alt={`Slim Tower ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>

        <button onClick={prev} aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
            bg-ink/80 hover:bg-ink shadow flex items-center justify-center
            sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
            bg-ink/80 hover:bg-ink shadow flex items-center justify-center
            sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
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
              i === index ? 'border-neon-violet' : 'border-transparent opacity-60 hover:opacity-100'
            }`}>
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
    {lightbox && <Lightbox images={IMAGES} initialIndex={index} name="Slim Tower" onClose={() => setLightbox(false)} />}
    </>
  )
}

export default function SlimTower() {
  return (
    <>
      <NightlifeNavbar />
      <main className="pt-[72px] bg-ink">
        <section className="py-16 bg-ink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <a href="/nightlife"
              className="inline-flex items-center gap-2 text-sm text-white/50
                hover:text-neon-violet transition-colors mb-10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Nightlife Vending
            </a>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              <Carousel />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neon-violet mb-2">
                  Smart Machine
                </p>
                <h1 className="text-4xl font-extrabold text-white mb-2">Slim Tower</h1>
                <p className="text-lg font-medium text-white/60 italic mb-6">
                  Maximum product. Minimal footprint.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  The Slim Tower is our highest-capacity machine in the lineup. With 24 aisles
                  across 8 trays, it holds more product than any other unit we offer — giving your
                  venue the widest selection possible. Freestanding and requiring no wall
                  installation, it can go anywhere in your venue. Ideal for high-traffic locations
                  that want maximum product availability. Touchscreen, cashless, and always
                  connected.
                </p>

                <div className="rounded-xl border border-ink-border overflow-hidden mb-8">
                  <div className="bg-ink-elevated-2 px-5 py-3 border-b border-ink-border">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      Specifications
                    </p>
                  </div>
                  <ul className="divide-y divide-ink-border">
                    {SPECS.map(({ label, value }) => (
                      <li key={label} className="flex justify-between px-5 py-3.5">
                        <span className="text-sm font-medium text-white/60">{label}</span>
                        <span className="text-sm font-semibold text-white">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://go.vizbl.com/en/object/u_VmLhdFQt-b4WcvTO4nMQ#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg font-semibold bg-neon-gradient hover:shadow-neon text-white transition-all duration-200 justify-center text-sm py-3 px-6"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    View in AR
                  </a>
                  <a href="/nightlife#contact" className="inline-flex items-center gap-2 rounded-lg font-semibold border border-white/20 text-white hover:bg-white/5 transition-all duration-200 justify-center text-sm py-3 px-6">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <NightlifeFooter />
    </>
  )
}
