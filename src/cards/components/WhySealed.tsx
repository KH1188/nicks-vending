import bgImage1 from '../../assets/Pokemon Machines/background images/background image 1.jpg'

const POINTS = [
  {
    title: 'Factory-sealed, always',
    body: 'Every pack that goes into the machine comes sealed from the manufacturer or authorized distributor — never opened, weighed, or repacked.',
  },
  {
    title: 'No repacks, no hot-packing',
    body: 'We don\'t sell resealed or hand-picked packs. What\'s inside is exactly what the factory shipped — full stop.',
  },
  {
    title: 'Built for trust',
    body: 'Collectors are wary of vending machines after repack scandals elsewhere. Sealed-only sourcing is our whole pitch — to your customers and to you.',
  },
]

export default function WhySealed() {
  return (
    <section
      id="why-sealed"
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage1})` }}
    >
      {/* Light overlay to keep the family-friendly theme readable over the photo */}
      <div className="absolute inset-0 bg-paper/65" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">Why sealed only</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight mb-14 max-w-xl">
          Repacks kill trust. We don't sell them.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {POINTS.map(p => (
            <div key={p.title} className="rounded-2xl border border-paper-border bg-paper p-6">
              <div className="w-10 h-10 rounded-lg bg-paper-elevated border border-paper-border
                flex items-center justify-center text-neon-violet mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-ink mb-2">{p.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
