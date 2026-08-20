import CardsNavbar from '../components/CardsNavbar'
import CardsFooter from '../components/CardsFooter'

const WHY_CHOOSE = [
  {
    title: 'Factory-sealed, always',
    body: 'Every pack we vend is sourced sealed and never opened, repacked, or resealed. No hot-packing, no shortcuts — just what the factory shipped.',
  },
  {
    title: 'Zero cost, zero hassle',
    body: 'We install, stock, and service the machine at no cost to your venue. There\'s no inventory to manage and no staff time required.',
  },
  {
    title: 'Built for foot traffic',
    body: 'Malls, card shops, arcades, and family entertainment venues see steady, repeat engagement from a machine that\'s always stocked and always trusted.',
  },
]

export default function CardsAboutPage() {
  return (
    <>
      <CardsNavbar />
      <main className="pt-[72px] bg-paper">
        <section className="py-24 bg-paper">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">About us</p>
                <h1 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight mb-8">Local operator.<br />Sealed only.</h1>
                <div className="space-y-5 text-ink/60 leading-relaxed">
                  <p>
                    Nick's Vending brings factory-sealed Pokémon and TCG product to
                    malls, card shops, arcades, and family entertainment venues — built
                    on the same principle as the rest of our business: reliability.
                  </p>
                  <p>
                    Collectors are wary of vending machines after repack scandals
                    elsewhere. Sealed-only sourcing is our whole pitch — every pack is
                    exactly what the manufacturer shipped, never opened, weighed, or
                    hand-picked.
                  </p>
                  <p>
                    There's no upfront cost, no inventory to manage, and no staff
                    involvement. From placement to ongoing restocking, we handle
                    everything, so your venue earns a revenue share with zero effort.
                  </p>
                </div>

                <a href="/cards#contact" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold text-white bg-neon-gradient hover:shadow-neon transition-all duration-200 mt-10">
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* Right */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-8">Why choose us</p>
                <ul className="space-y-8">
                  {WHY_CHOOSE.map(({ title, body }) => (
                    <li key={title} className="flex gap-5 items-start">
                      <div className="w-8 h-8 rounded-full bg-paper-elevated border border-paper-border
                        flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-neon-violet" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink mb-1.5">{title}</p>
                        <p className="text-sm text-ink/60 leading-relaxed">{body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      </main>
      <CardsFooter />
    </>
  )
}
