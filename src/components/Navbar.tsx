import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Locations', href: '#locations' },
  { label: 'Photos',    href: '#photos'    },
  { label: 'About',     href: '#about'     },
  { label: 'Contact',   href: '#contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={close} className="flex items-center gap-2.5 flex-shrink-0">
          <img
            src={logo}
            alt="Nick's Vending"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg
                  hover:text-slate-900 hover:bg-slate-50
                  transition-colors duration-150
                  focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href="#contact" className="btn-primary text-sm py-2 px-5">
              Request Placement
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden btn-ghost p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-b border-slate-100`}
      >
        <ul className="px-4 pb-4 pt-1 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={close}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 rounded-lg
                  hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a href="#contact" onClick={close} className="btn-primary w-full text-sm justify-center">
              Request Placement
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
