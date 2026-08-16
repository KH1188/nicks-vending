const STEPS = [
  {
    title: 'We install',
    body: 'We deliver and set up the machine at no cost to you, sized to fit your available floor space.',
  },
  {
    title: 'We stock',
    body: 'Only factory-sealed Pokémon product goes in the machine — sourced directly, never repacked or resealed.',
  },
  {
    title: 'We service',
    body: 'Restocking, cash collection, and maintenance are handled on our schedule. Your staff never manages inventory.',
  },
  {
    title: 'You earn',
    body: 'Choose a flat lease/license fee or a revenue-share split — paid out on a schedule that works for your business.',
  },
]

export default function HowItWorksCards() {
  return (
    <section id="how-it-works" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">How it works</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight mb-14 max-w-xl">
          Four steps to passive foot-traffic revenue.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-paper-border bg-paper-elevated p-6
                hover:border-neon-violet/30 hover:shadow-neon-soft transition-all duration-200"
            >
              <span className="text-sm font-black bg-neon-gradient-text bg-clip-text text-transparent">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold text-ink mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
