import skylineLogo from '../../assets/logos/skyline-logo.webp'
import installPhoto from '../../assets/Background Photos/vtm-vape-vending-machine-alp-delta8-bar-installation.avif'

export default function NightlifeHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-[72px] bg-ink">
      {/* Neon glow backdrop */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-neon-violet/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full bg-neon-blue/20 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left column */}
          <div className="flex flex-col items-start">
            <img src={skylineLogo} alt="Nick's Vending" className="h-20 sm:h-24 w-auto object-contain mb-8" />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-black text-white tracking-tight leading-[1.1] mb-6">
              We stock it.<br />
              <span className="bg-neon-gradient-text bg-clip-text text-transparent">You profit.</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed max-w-md mb-8">
              Smart nightlife vending for bars, clubs, and casinos — zero cost, zero labor
              to your venue. We install, stock, and service the machine; you collect a
              monthly revenue share.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+15042521125"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  text-white bg-neon-gradient hover:shadow-neon active:scale-[0.98] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call 504-252-1125
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold
                  border border-white/20 text-white hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
              >
                Get a Quote
              </a>
            </div>

            <p className="mt-6 text-sm text-white/40">
              10–12.5% monthly revenue share &middot; no equipment cost &middot; no staff time
            </p>
          </div>

          {/* Right column — photo slot */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-neon-gradient rounded-3xl blur-2xl opacity-25 scale-95" />
              <div className="relative rounded-2xl overflow-hidden border border-ink-border shadow-neon">
                <img
                  src={installPhoto}
                  alt="Nick's Vending machine installed in a Louisiana bar"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-ink/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Installed &amp; serviced by Nick's Vending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#how-it-works"
        aria-label="Scroll to how it works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          text-white/40 hover:text-white/70 transition-colors duration-200 animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
