import { Link } from 'react-router-dom'
import CardsWordmark from './CardsWordmark'

const YEAR = new Date().getFullYear()

export default function CardsFooter() {
  return (
    <footer className="bg-paper-elevated border-t border-paper-border text-ink/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="sm:col-span-2 lg:col-span-1">
            <CardsWordmark size="lg" stacked className="mb-5" />
            <p className="text-sm leading-relaxed text-ink/50 max-w-xs mt-4">
              Factory-sealed Pokémon card vending for malls, card shops, barcades,
              and family entertainment venues.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/70 mb-4">On this page</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Why Sealed',   href: '#why-sealed'    },
                { label: 'Terms',        href: '#terms'         },
                { label: 'FAQ',          href: '#faq'           },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="hover:text-ink transition-colors duration-150">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/70 mb-4">Company</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About',            href: '/about'      },
                { label: 'Machines',         href: '/machines/slim-wall' },
                { label: 'Photos',           href: '/photos'     },
                { label: 'Nightlife Vending', href: '/nightlife' },
                { label: 'Owner Login',      href: '/login'      },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="hover:text-ink transition-colors duration-150">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/70 mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+15042521125" className="flex items-center gap-2 hover:text-ink transition-colors">
                  504-252-1125
                </a>
              </li>
              <li>
                <a href="mailto:nicksvendingnola@gmail.com" className="flex items-center gap-2 hover:text-ink transition-colors">
                  nicksvendingnola@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold text-neon-violet hover:text-neon-magenta transition-colors">
                  Get in Touch →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-paper-border flex flex-col items-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-neon-violet transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Choose a different vending line
          </Link>

          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink/30">
            <p>© {YEAR} Nick's Vending, LLC. All rights reserved.</p>
            <p>Factory-sealed only. No repacks.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
