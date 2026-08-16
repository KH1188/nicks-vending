import { useState } from 'react'

const FAQS = [
  {
    q: 'Does this cost my venue anything?',
    a: 'No. We cover the machine, installation, product, and service. You provide the floor space and collect a monthly revenue share.',
  },
  {
    q: 'Who restocks and services the machine?',
    a: 'We do — on our schedule. Your staff never needs to touch the machine or manage inventory.',
  },
  {
    q: 'How do I get paid?',
    a: 'You receive a revenue-share statement and payout every month, based on your venue\'s agreed commission rate.',
  },
  {
    q: 'What if the machine needs a repair?',
    a: 'Call or text us and we\'ll dispatch service — repairs and maintenance are on us, not your venue.',
  },
  {
    q: 'Can I choose what gets stocked?',
    a: 'We tailor the product mix to your venue and customer base, and adjust based on what actually sells.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-ink-elevated">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-white tracking-tight mb-12">
          Questions, answered.
        </h2>

        <div className="divide-y divide-ink-border rounded-2xl border border-ink-border bg-ink overflow-hidden">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                    hover:bg-white/5 transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 text-neon-violet transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-sm text-white/60 leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
