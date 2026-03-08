import { useState } from 'react'
import Lightbox from './Lightbox'
import fingerRule from '../assets/finger-rule.png'
import photo1 from '../assets/Photos Section/alp_wrap-your-vape-vending-machine-vtm-vapetm-132898.avif'
import photo2 from '../assets/Photos Section/nicotine-pouch-vending-machine-zyn.webp'
import photo3 from '../assets/Photos Section/vapetm-slim-tower-20-in-use-high-traffic-location.avif'
import photo4 from '../assets/Photos Section/vapetm-vape-vending-machine-interior-open-door-stocked-trays.png'
import photo5 from '../assets/Photos Section/vapetm-vape-vending-machine-bar-customer-touchscreen.avif'

type PhotoSlot = {
  id: number
  label: string
  title?: string
  src?: string
}

const PHOTO_SLOTS: PhotoSlot[] = [
  { id: 1, label: 'Alp Wrapped Slim Wall Tin Lift',          title: 'Alp Wrapped Slim Wall Tin Lift',          src: photo1 },
  { id: 2, label: 'Stocked Tin Lift',                        title: 'Stocked Tin Lift',                        src: photo2 },
  { id: 3, label: 'Slim Tower In Use',                       title: 'Slim Tower In Use',                       src: photo3 },
  { id: 4, label: 'Fully Stocked — Ready for the Night',     title: 'Fully Stocked — Ready for the Night',     src: photo4 },
  { id: 5, label: 'Slim Wall In Action', title: 'Slim Wall In Action', src: photo5 },
  { id: 6, label: 'Truck stop / travel center' },
]

const REAL_PHOTOS = PHOTO_SLOTS.filter(s => s.src).map(s => s.src as string)
const REAL_NAMES  = PHOTO_SLOTS.filter(s => s.src).map(s => s.label)

function Placeholder({ label }: { label: string }) {
  return (
    <div className="relative w-full h-full photo-placeholder rounded-xl overflow-hidden
      flex flex-col items-center justify-center gap-2 group">
      {/* Camera icon */}
      <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center
        text-slate-400 group-hover:text-slate-600 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.775 48.775 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      </div>
      <span className="text-[11px] font-medium text-slate-400 text-center px-4 leading-tight">
        {label}
      </span>
      <span className="text-[10px] text-slate-300">Photo coming soon</span>
    </div>
  )
}

export default function Photos() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // map a slot to its index within REAL_PHOTOS
  let realIndex = -1

  return (
    <section id="photos" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Gallery</p>
            <h2 className="section-title">See the work.</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-xs text-right hidden sm:block">
            Photos will be added here as installations are documented.
          </p>
        </div>

        {/* Featured image + brand mark */}
        <div className="mb-8 card overflow-hidden rounded-2xl flex flex-col md:flex-row">
          {/* Finger Rule image — brand accent */}
          <div className="md:w-1/3 bg-slate-900 flex items-center justify-center p-10">
            <img
              src={fingerRule}
              alt="Nick's Vending — detail"
              className="w-full max-w-[200px] object-contain drop-shadow-lg"
            />
          </div>
          <div className="md:w-2/3 p-8 flex flex-col justify-center bg-white">
            <p className="section-label mb-2">Featured</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Placed right. Kept right.
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Every machine is sited with care, stocked with what your customers
              actually want, and serviced on a schedule — not when someone notices it's empty.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTO_SLOTS.map((slot) => {
            if (slot.src) realIndex++
            const idx = slot.src ? realIndex : -1
            return (
              <div
                key={slot.id}
                className="aspect-[4/3] rounded-xl overflow-hidden relative"
              >
                {slot.src ? (
                  <div className="relative w-full h-full cursor-zoom-in group" onClick={() => setLightboxIndex(idx)}>
                    <img src={slot.src} alt={slot.label} className="w-full h-full object-cover" />
                    {slot.title && (
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {slot.title}
                      </div>
                    )}
                  </div>
                ) : (
                  <Placeholder label={slot.label} />
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Photos added as installations are documented.{' '}
          <a href="/#contact" className="text-brand-700 hover:underline font-medium">
            Request placement
          </a>{' '}
          to see machines in action at your venue.
        </p>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={REAL_PHOTOS}
          initialIndex={lightboxIndex}
          name={REAL_NAMES[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
