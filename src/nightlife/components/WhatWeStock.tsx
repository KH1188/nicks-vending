const CATEGORIES = [
  { name: 'Disposable Vapes',            desc: 'Top-selling brands, age-verified at the point of sale.' },
  { name: 'Nicotine Pouches',            desc: 'Popular pouch brands stocked and rotated for freshness.' },
  { name: 'Lighters & Accessories',      desc: 'Small-ticket impulse items that keep machines moving.' },
  { name: 'Tobacco Products',            desc: 'Where locally compliant, stocked per venue and parish rules.' },
]

export default function WhatWeStock() {
  return (
    <section id="what-we-stock" className="py-24 bg-ink-elevated">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">What we stock</p>
        <h2 className="text-3xl md:text-4xl font-brand font-black text-white tracking-tight mb-14 max-w-xl">
          Age-restricted product, handled compliantly.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="rounded-2xl border border-ink-border bg-ink p-6">
              <h3 className="text-base font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
