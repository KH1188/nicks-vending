import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import circleTransparent from '../assets/logos/circle-transparent.webp'

export default function Landing() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-4 sm:px-6 py-16">
      <Seo
        title="Nick's Vending — Nightlife & Collectibles Vending | Louisiana"
        description="Nick's Vending places smart vending machines in Louisiana bars, clubs, casinos, malls, and card shops — nightlife vending and factory-sealed collectibles vending, fully managed."
        path="/"
        image="/og/default-og.png"
      />
      <img
        src={circleTransparent}
        alt="Nick's Vending"
        className="w-56 h-56 sm:w-64 sm:h-64 object-contain mb-10 [filter:drop-shadow(0_0_28px_rgba(139,92,246,0.5))]"
      />

      <h1 className="text-center text-2xl sm:text-3xl font-brand font-black text-white tracking-tight mb-3">
        Two vending lines. One operator.
      </h1>
      <p className="text-center text-white/60 max-w-md mb-12 leading-relaxed">
        Choose the path that fits your venue.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
          to="/nightlife"
          className="group relative rounded-2xl border border-ink-border bg-ink-elevated
            p-8 flex flex-col items-start gap-4 overflow-hidden
            hover:shadow-neon hover:border-neon-violet/50 transition-all duration-300"
        >
          <span className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <span className="relative w-11 h-11 rounded-lg bg-ink-elevated-2 border border-ink-border
            flex items-center justify-center text-neon-violet">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </span>
          <div className="relative">
            <h2 className="text-xl font-brand font-black text-white mb-2">Nightlife Vending</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Revenue-sharing vending for bars, clubs, and casinos. We install, stock, and service — you profit.
            </p>
          </div>
          <span className="relative mt-auto text-sm font-semibold bg-neon-gradient-text bg-clip-text text-transparent
            group-hover:underline underline-offset-4">
            For 21+ venue owners →
          </span>
        </Link>

        <Link
          to="/cards"
          className="group relative rounded-2xl border border-paper-border bg-paper-elevated
            p-8 flex flex-col items-start gap-4 overflow-hidden
            hover:shadow-neon-soft hover:border-neon-violet/40 transition-all duration-300"
        >
          <span className="relative w-11 h-11 rounded-lg bg-paper border border-paper-border
            flex items-center justify-center text-neon-violet">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </span>
          <div className="relative">
            <h2 className="text-xl font-brand font-black text-ink mb-2">Collectibles Vending</h2>
            <p className="text-sm text-ink/60 leading-relaxed">
              Factory-sealed Collectible card vending for malls, convenience stores, family entertainment venues, and more.
            </p>
          </div>
          <span className="relative mt-auto text-sm font-semibold bg-neon-gradient-text bg-clip-text text-transparent
            group-hover:underline underline-offset-4">
            For retail & entertainment venues →
          </span>
        </Link>
      </div>

      <p className="mt-16 text-xs text-white/30">
        © {new Date().getFullYear()} Nick's Vending, LLC
      </p>
    </main>
  )
}
