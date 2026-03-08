import barPhoto from '../assets/Background Photos/mcgintys-with-model-at-bar.avif'

const AREAS = [
  'Bars & Lounges',
  'Nightclubs',
  'Casinos',
  'Any Venue 21+',
]

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${barPhoto})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-200 mb-3">
              Coverage
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              Where adults gather,<br />we belong.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-md">
              Nicotine vending thrives where people spend time. We place machines
              in high-traffic adult venues and keep them stocked.
            </p>

            <ul className="space-y-2">
              {AREAS.map((name) => (
                <li key={name}
                  className="flex items-center gap-4 py-3.5 border-b border-white/20
                    last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-200 flex-shrink-0" />
                  <span className="text-sm font-medium text-white">{name}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-white/60">
              Different kind of venue?{' '}
              <a href="#contact" className="text-brand-200 font-medium hover:underline">
                Reach out
              </a>{' '}
              — if adults are there, it's worth a conversation.
            </p>
          </div>

          {/* Right: map placeholder */}
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/20
              bg-white/10 backdrop-blur-sm aspect-[4/3] flex flex-col items-center justify-center gap-4">
              <div className="relative z-10 w-14 h-14 rounded-xl bg-white/90 shadow-card
                border border-white/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="relative z-10 text-center px-6">
                <p className="text-sm font-semibold text-white">Service area map coming soon</p>
                <p className="text-xs text-white/60 mt-1">Contact us to confirm your area</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
