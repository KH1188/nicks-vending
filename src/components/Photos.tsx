import fingerRule from '../assets/finger-rule.png'

// Replace any of these placeholder entries with a real image import + src to add photos.
// The `src` field is undefined for placeholders; add an actual import and set src to show a real photo.
type PhotoSlot = {
  id: number
  label: string
  src?: string
  span?: 'col' | 'row'
}

const PHOTO_SLOTS: PhotoSlot[] = [
  { id: 1, label: 'Machine at a bar / lounge' },
  { id: 2, label: 'Stocked with top disposable brands' },
  { id: 3, label: 'Casino floor placement' },
  { id: 4, label: 'Nicotine pouch selection' },
  { id: 5, label: 'Hotel hallway install' },
  { id: 6, label: 'Truck stop / travel center' },
]

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

        {/* Photo grid — 6 placeholders */}
        {/* To add photos: import your image at the top of this file, then set src on the slot */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTO_SLOTS.map((slot) => (
            <div
              key={slot.id}
              className="aspect-[4/3] rounded-xl overflow-hidden"
            >
              {slot.src
                ? <img src={slot.src} alt={slot.label}
                    className="w-full h-full object-cover rounded-xl" />
                : <Placeholder label={slot.label} />
              }
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Photos added as installations are documented.{' '}
          <a href="#contact" className="text-brand-700 hover:underline font-medium">
            Request placement
          </a>{' '}
          to see machines in action at your venue.
        </p>
      </div>
    </section>
  )
}
