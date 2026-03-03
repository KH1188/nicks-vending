import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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
  { label: 'Payment',   value: 'Cashless via Nayax' },
]

function Carousel() {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex(i => (i - 1 + IMAGES.length) % IMAGES.length)
  const next = () => setIndex(i => (i + 1) % IMAGES.length)

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-100 group">
      <img
        src={IMAGES[index]}
        alt={`Slim Tower ${index + 1}`}
        className="w-full h-auto object-contain transition-opacity duration-300"
      />

      <button onClick={prev} aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
          bg-white/80 hover:bg-white shadow flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button onClick={next} aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
          bg-white/80 hover:bg-white shadow flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
  )
}

export default function SlimTower() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <a href="/machines"
              className="inline-flex items-center gap-2 text-sm text-slate-500
                hover:text-brand-700 transition-colors mb-10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Machines
            </a>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              <Carousel />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 mb-2">
                  Smart Machine
                </p>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Slim Tower</h1>
                <p className="text-lg font-medium text-slate-500 italic mb-6">
                  Freestanding. Flexible. Smart.
                </p>
                <p className="text-slate-500 leading-relaxed mb-8">
                  The Slim Tower is a freestanding unit that goes anywhere in your venue — no wall
                  installation required. With 24 aisles across 8 trays, it holds a serious selection
                  of product without taking up much floor space. Ideal for venues that want placement
                  flexibility without sacrificing capacity. Touchscreen, cashless, and always
                  connected.
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
                    Request Placement
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
