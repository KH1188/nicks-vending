const STEPS = [
  {
    title: 'We install',
    body: 'We deliver and mount the machine at no cost to you — typically same week, with zero disruption to your floor plan.',
  },
  {
    title: 'We stock',
    body: 'Our team sources age-restricted product from licensed Louisiana wholesalers and keeps the machine full.',
  },
  {
    title: 'We service',
    body: 'Routine restocks, cleaning, and maintenance are handled on our schedule, not yours. You never touch the machine.',
  },
  {
    title: 'We pay you monthly',
    body: 'You receive a revenue-share statement and payout every month — no invoicing, no chasing payment.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">How it works</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-white tracking-tight mb-14 max-w-xl">
          Four steps. Zero effort on your end.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-ink-border bg-ink-elevated p-6
                hover:border-neon-violet/40 hover:shadow-neon-soft transition-all duration-200"
            >
              <span className="text-sm font-black bg-neon-gradient-text bg-clip-text text-transparent">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
