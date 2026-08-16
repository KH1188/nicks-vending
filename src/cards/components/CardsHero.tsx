import CardsWordmark from './CardsWordmark'

const PACK_COLORS = [
  'from-neon-blue to-blue-300', 'from-neon-violet to-purple-300', 'from-neon-magenta to-pink-300',
  'from-amber-400 to-yellow-200', 'from-emerald-400 to-emerald-200', 'from-neon-blue to-neon-violet',
]

function MachineMockup() {
  return (
    <div className="relative rounded-2xl border border-paper-border bg-paper-elevated shadow-neon-soft overflow-hidden p-6">
      <div className="text-center mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-neon-violet">Factory Sealed Only</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {PACK_COLORS.map((c, i) => (
          <div key={i} className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${c} shadow-sm flex items-end p-2`}>
            <span className="text-[10px] font-bold text-white/90 drop-shadow">SEALED</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-ink/40 font-medium">
        <span>No repacks. Ever.</span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Verified
        </span>
      </div>
    </div>
  )
}

export default function CardsHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-[72px] bg-paper">
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-neon-violet/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-neon-blue/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="flex flex-col items-start">
            <CardsWordmark size="lg" className="mb-8" />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-black text-ink tracking-tight leading-[1.1] mb-6">
              Factory-sealed<br />
              <span className="bg-neon-gradient-text bg-clip-text text-transparent">Pokémon card vending.</span>
            </h1>

            <p className="text-lg text-ink/60 leading-relaxed max-w-md mb-8">
              High-traffic passive revenue for malls, card shops, barcades, and family
              entertainment venues — factory-sealed product only, never repacks.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  text-white bg-neon-gradient hover:shadow-neon-soft active:scale-[0.98] transition-all duration-200"
              >
                Get in Touch
              </a>
              <a
                href="#terms"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  border border-ink/15 text-ink hover:bg-ink/5 active:scale-[0.98] transition-all duration-200"
              >
                See Lease & Revenue-Share Terms
              </a>
            </div>

            <p className="mt-6 text-sm text-ink/40">
              Flexible lease/license or revenue-share &middot; no cost to install &middot; family-friendly
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <MachineMockup />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#how-it-works"
        aria-label="Scroll to how it works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          text-ink/30 hover:text-ink/60 transition-colors duration-200 animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
