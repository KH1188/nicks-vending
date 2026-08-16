// NOTE: Placeholder compliance copy — verify with Nick before publishing live.
const POINTS = [
  {
    title: 'Louisiana ATC compliant',
    body: 'Every machine and location is registered and operated in accordance with Louisiana Office of Alcohol and Tobacco Control (ATC) regulations.',
  },
  {
    title: 'Licensed Louisiana wholesale sourcing',
    body: 'All product is sourced through licensed Louisiana wholesale distributors, never gray-market or unlicensed channels.',
  },
  {
    title: 'Taxes handled by us',
    body: 'Sales tax, excise tax, and applicable state/parish filings are handled by Nick\'s Vending — nothing for your venue to file.',
  },
]

export default function Compliance() {
  return (
    <section id="compliance" className="py-24 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">Compliance</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-white tracking-tight mb-14 max-w-xl">
          Fully compliant, so you don't have to think about it.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {POINTS.map(p => (
            <div key={p.title} className="rounded-2xl border border-ink-border bg-ink-elevated p-6">
              <div className="w-10 h-10 rounded-lg bg-ink-elevated-2 border border-ink-border
                flex items-center justify-center text-neon-violet mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
