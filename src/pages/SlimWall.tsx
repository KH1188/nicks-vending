import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import slimWall1 from '../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-486251.webp'
import slimWall2 from '../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-769781.webp'
import slimWall3 from '../assets/Slim Wall/slim-wall-vape-vending-machine-ad-banner-id-scanner.webp'
import slimWall4 from '../assets/Slim Wall/slim-wall-vape-vending-machine-on-pedestal-stand.webp'
import slimWall5 from '../assets/Slim Wall/slim-wall-vape-vending-machine-open-10-aisles-touchscreen.webp'

const IMAGES = [slimWall1, slimWall2, slimWall3, slimWall4, slimWall5]

const SPECS = [
  { label: 'Height',    value: '40.5"' },
  { label: 'Width',     value: '23.6"' },
  { label: 'Depth',     value: '10.2"' },
  { label: 'Display',   value: '32" Touchscreen' },
  { label: 'Aisles',    value: '10 (5 trays × 2 aisles per tray)' },
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
        alt={`Slim Wall ${index + 1}`}
        className="w-full aspect-[4/3] object-cover transition-opacity duration-300"
      />

      {/* Arrows */}
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

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-white scale-125' : 'bg-white/50'
            }`} />
        ))}
      </div>

      {/* Thumbnail strip */}
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

export default function SlimWall() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back link */}
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

              {/* Left: Carousel */}
              <Carousel />

              {/* Right: Details */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 mb-2">
                  Smart Machine
                </p>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Slim Wall</h1>
                <p className="text-lg font-medium text-slate-500 italic mb-6">
                  Sleek. Space-saving. Always stocked.
                </p>
                <p className="text-slate-500 leading-relaxed mb-8">
                  The Slim Wall is designed for venues where space is at a premium. It mounts
                  flush to the wall with a minimal footprint while holding a solid selection of
                  top-selling products. Featuring a stunning 32" touchscreen and a slim, modern
                  aesthetic, it looks at home in any upscale venue. Cashless, always connected,
                  and fully managed by us.
                </p>

                {/* Specs */}
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

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://go.vizbl.com/en/object/1yjGO3KXS1iRKDakW0KUdg#"
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
