import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import textLogo from '../../assets/logos/text-logo.webp'

// Absolute paths so links work from the cards machine detail pages too
const NAV_LINKS = [
  { label: 'How It Works', href: '/cards#how-it-works' },
  { label: 'Machines',     href: '/cards#machines'     },
  { label: 'Why Sealed',   href: '/cards#why-sealed'   },
  { label: 'Terms',        href: '/cards#terms'        },
  { label: 'FAQ',          href: '/cards#faq'          },
]

export default function CardsNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b
        ${scrolled ? 'bg-paper-elevated/95 backdrop-blur-sm border-paper-border' : 'bg-paper-elevated/80 backdrop-blur-sm border-transparent'}`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <Link to="/cards" onClick={close} className="flex items-center gap-2.5 flex-shrink-0">
          <img src={textLogo} alt="Nick's Vending" className="h-11 w-auto object-contain" />
          <span className="font-brand font-bold uppercase tracking-widest text-neon-violet text-[10px]">
            Collectibles
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="px-4 py-2 text-sm font-medium text-ink/70 rounded-lg
                  hover:text-ink hover:bg-ink/5 transition-colors duration-150
                  focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-1"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="/cards#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold
                rounded-lg text-white bg-neon-gradient hover:shadow-neon-soft transition-all duration-200 active:scale-[0.98]"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 text-ink/70"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-paper-elevated border-b border-paper-border`}
      >
        <ul className="px-4 pb-4 pt-1 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={close}
                className="block px-4 py-2.5 text-sm font-medium text-ink/70 rounded-lg hover:text-ink hover:bg-ink/5 transition-colors">
                {label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a href="/cards#contact" onClick={close}
              className="block text-center px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-neon-gradient">
              Get in Touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
