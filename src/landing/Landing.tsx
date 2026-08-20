import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import circleTransparent from '../assets/logos/circle-transparent.webp'
import './Landing.css'

const PROOF: ReactNode[] = [
  <><b>Zero cost</b> to the venue</>,
  <>We <b>stock and service</b> it</>,
  <><b>Cash, card and tap</b> accepted</>,
  <><b>Licensed and permitted</b> in Louisiana</>,
  <>Remote <b>sales monitoring</b></>,
]

export default function Landing() {
  return (
    <div className="lp-root">
      <Seo
        title="Nick's Vending — Nightlife & Collectibles Vending | Louisiana"
        description="Nick's Vending places smart vending machines in Louisiana bars, clubs, casinos, malls, and card shops — nightlife vending and factory-sealed collectibles vending, fully managed."
        path="/"
        image="/og/default-og.png"
      />
      <h1 className="sr-only">Nick's Vending — Nightlife &amp; Collectibles Vending in Louisiana</h1>

      <div className="lp-grain" aria-hidden="true" />
      <div className="lp-vig" aria-hidden="true" />

      <nav className="lp-nav">
        <Link to="/" className="lp-brand">
          <span>New Orleans, LA</span>
        </Link>
        <div className="lp-navlinks">
          <Link to="/nightlife">Nightlife</Link>
          <Link to="/cards">Collectibles</Link>
          <a href="mailto:nicksvendingnola@gmail.com">Contact</a>
        </div>
      </nav>

      <section className="lp-hero">
        <img src={circleTransparent} alt="" className="lp-ambient" />

        <Link to="/nightlife" className="lp-door lp-night">
          <span className="lp-eyebrow">21+ bars · lounges · casinos</span>
          <h2 className="lp-title">Night<br />life</h2>
          <p className="lp-blurb">
            A wall-mounted machine stocked with what your guests already walk out to buy.
            You give up two feet of wall. We handle the rest.
          </p>
          <span className="lp-cta-btn">Learn more <span aria-hidden="true">→</span></span>
        </Link>

        <Link to="/cards" className="lp-door lp-cards">
          <span className="lp-eyebrow">Family Entertainment Centers · Arcades · Anywhere</span>
          <h2 className="lp-title lp-title--long">Collectibles</h2>
          <p className="lp-blurb">
            Sealed packs of the hottest collectibles and more. Foot traffic turns into revenue
            with no staff, no inventory risk, and no hassle. We handle it all.
          </p>
          <span className="lp-cta-btn">Learn more <span aria-hidden="true">→</span></span>
        </Link>

        <div className="lp-seamline" aria-hidden="true" />

        <div className="lp-mark">
          <img src={circleTransparent} alt="Nick's Vending — we stock it, you profit" />
        </div>
      </section>

      <div className="lp-proof">
        <div className="lp-track">
          {[...PROOF, ...PROOF].map((item, i) => (
            <span key={i}>{item}<span className="lp-dot">◆</span></span>
          ))}
        </div>
      </div>
    </div>
  )
}
