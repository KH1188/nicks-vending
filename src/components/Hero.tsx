import logo from '../assets/logo.png'
import businessCard from '../assets/business-card.png'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-white overflow-hidden pt-[72px]"
    >
      {/* Soft gradient bloom */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
        bg-brand-50 opacity-60 blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left column */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="Nick's Vending"
              className="h-14 sm:h-16 w-auto object-contain mb-10"
            />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900
              tracking-tight leading-[1.1] mb-6">
              Nicotine vending,<br />
              <span className="text-brand-800">age-verified.</span><br />
              <span className="text-slate-400 font-light">Always stocked.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-10">
              We place, stock, and maintain nicotine vending machines in adult
              venues — fully managed, fully compliant, zero hassle for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary text-base py-3.5 px-8">
                Request Placement
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#locations" className="btn-secondary text-base py-3.5 px-8">
                See Locations
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-brand-100 rounded-3xl blur-2xl opacity-40 scale-95" />
              <div className="relative card overflow-hidden rounded-2xl">
                <img
                  src={businessCard}
                  alt="Nick's Vending"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-1 text-slate-300
          hover:text-slate-500 transition-colors duration-200 animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
