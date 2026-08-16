import { useEffect } from 'react'
import Seo from '../components/Seo'
import CardsNavbar from './components/CardsNavbar'
import CardsHero from './components/CardsHero'
import HowItWorksCards from './components/HowItWorksCards'
import WhySealed from './components/WhySealed'
import TermsOptions from './components/TermsOptions'
import FAQCards from './components/FAQCards'
import CardsContact from './components/CardsContact'
import CardsFooter from './components/CardsFooter'

export default function CardsHome() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="bg-paper">
      <Seo
        title="Factory-Sealed Pokémon Card Vending | Nick's Vending Collectibles"
        description="Factory-sealed Pokémon card vending machines for malls, card shops, barcades, and family entertainment venues. No repacks, ever. Flexible lease/license or revenue-share terms."
        path="/cards"
        image="/og/cards-og.png"
      />
      <CardsNavbar />
      <main>
        <CardsHero />
        <HowItWorksCards />
        <WhySealed />
        <TermsOptions />
        <FAQCards />
        <CardsContact />
      </main>
      <CardsFooter />
    </div>
  )
}
