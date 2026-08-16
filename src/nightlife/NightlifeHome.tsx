import { useEffect } from 'react'
import Seo from '../components/Seo'
import NightlifeNavbar from './components/NightlifeNavbar'
import NightlifeHero from './components/NightlifeHero'
import HowItWorks from './components/HowItWorks'
import WhatWeStock from './components/WhatWeStock'
import Compliance from './components/Compliance'
import FAQ from './components/FAQ'
import NightlifeContact from './components/NightlifeContact'
import NightlifeFooter from './components/NightlifeFooter'

export default function NightlifeHome() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="bg-ink">
      <Seo
        title="Nightlife Vending for Bars, Clubs & Casinos | Nick's Vending"
        description="Zero-cost smart vending for bars, nightclubs, and casinos. We install, stock, and service the machine — you collect a monthly revenue share. Fully compliant, Louisiana-based."
        path="/nightlife"
        image="/og/nightlife-og.png"
      />
      <NightlifeNavbar />
      <main>
        <NightlifeHero />
        <HowItWorks />
        <WhatWeStock />
        <Compliance />
        <FAQ />
        <NightlifeContact />
      </main>
      <NightlifeFooter />
    </div>
  )
}
