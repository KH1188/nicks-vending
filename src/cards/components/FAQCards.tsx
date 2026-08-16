import { useState } from 'react'

const FAQS = [
  {
    q: 'Is the product really factory-sealed?',
    a: 'Yes — every pack is sourced sealed and never opened, repacked, or resealed before it goes in the machine.',
  },
  {
    q: 'Does this cost my venue anything?',
    a: 'No upfront cost. We cover the machine, installation, and stock — you earn a revenue share on every sale.',
  },
  {
    q: 'What venues is this a good fit for?',
    a: 'Malls, card shops, barcades, arcades, and family entertainment venues with steady walk-in traffic.',
  },
  {
    q: 'Who restocks the machine?',
    a: 'We do, on our own schedule — your staff never needs to manage inventory or cash collection.',
  },
  {
    q: 'Can I choose what card sets get stocked?',
    a: 'We tailor the product mix to what sells best at your venue and rotate sets as new releases come out.',
  },
]

export default function FAQCards() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-paper-elevated">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight mb-12">
          Questions, answered.
        </h2>

        <div className="divide-y divide-paper-border rounded-2xl border border-paper-border bg-paper overflow-hidden">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                    hover:bg-ink/[0.03] transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-ink">{item.q}</span>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 text-neon-violet transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-sm text-ink/60 leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
