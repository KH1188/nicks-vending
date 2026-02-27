const AREAS = [
  'Bars & Lounges',
  'Nightclubs & Music Venues',
  'Casinos & Gaming Floors',
  'Hotels & Hospitality',
  'Truck Stops & Travel Centers',
  'Bowling Alleys & Entertainment',
]

export default function Locations() {
  return (
    <section id="locations" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="section-label mb-3">Coverage</p>
            <h2 className="section-title mb-6">Where adults gather,<br />we belong.</h2>
            <p className="section-subtitle mb-12 max-w-md">
              Nicotine vending thrives where people spend time. We place machines
              in high-traffic adult venues and keep them stocked.
            </p>

            <ul className="space-y-2">
              {AREAS.map((name) => (
                <li key={name}
                  className="flex items-center gap-4 py-3.5 border-b border-slate-100
                    last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-700 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{name}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-slate-400">
              Different kind of venue?{' '}
              <a href="#contact" className="text-brand-700 font-medium hover:underline">
                Reach out
              </a>{' '}
              — if adults are there, it's worth a conversation.
            </p>
          </div>

          {/* Right: map placeholder */}
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-100
              bg-slate-50 aspect-[4/3] flex flex-col items-center justify-center gap-4">
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.1) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10 w-14 h-14 rounded-xl bg-white shadow-card
                border border-slate-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="relative z-10 text-center px-6">
                <p className="text-sm font-semibold text-slate-700">Service area map coming soon</p>
                <p className="text-xs text-slate-400 mt-1">Contact us to confirm your area</p>
              </div>
              {/* To embed a map: replace this div with an <iframe> using your Google Maps embed URL */}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
