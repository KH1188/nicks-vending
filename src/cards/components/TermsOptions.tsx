export default function TermsOptions() {
  return (
    <section id="terms" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">Terms</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight mb-14 max-w-xl">
          Simple revenue share.
        </h2>

        <div className="max-w-xl rounded-2xl border border-paper-border bg-paper-elevated p-8">
          <h3 className="text-xl font-bold text-ink mb-3">Revenue Share</h3>
          <p className="text-sm text-ink/60 leading-relaxed mb-6">
            No upfront cost. We install and stock the machine, then split proceeds
            with your venue on an agreed percentage — paid out monthly.
          </p>
          <ul className="space-y-2.5 text-sm text-ink/70">
            {['No equipment cost', 'No monthly minimum', 'Payout scales with foot traffic'].map(item => (
              <li key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-violet flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-sm text-ink/40 max-w-2xl">
          Reach out and we'll walk through the details for your venue.
        </p>
      </div>
    </section>
  )
}
