import { Link } from 'react-router-dom'
import circleLogo from '../../assets/logos/circle-logo.webp'

const YEAR = new Date().getFullYear()

export default function NightlifeFooter() {
  return (
    <footer className="bg-ink-elevated border-t border-ink-border text-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="sm:col-span-2 lg:col-span-1">
            <img src={circleLogo} alt="Nick's Vending" className="h-12 w-auto object-contain mb-5" />
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Smart nightlife vending for bars, clubs, casinos, and adult venues.
              Fully managed. No cost to you.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">On this page</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'How It Works',   href: '#how-it-works'  },
                { label: 'What We Stock',  href: '#what-we-stock' },
                { label: 'Compliance',     href: '#compliance'    },
                { label: 'FAQ',            href: '#faq'           },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors duration-150">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">Company</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About',        href: '/about'      },
                { label: 'Machines',     href: '/machines/slim-wall' },
                { label: 'Photos',       href: '/photos'     },
                { label: 'Collectibles Vending', href: '/cards' },
                { label: 'Owner Login',  href: '/login'      },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="hover:text-white transition-colors duration-150">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+15042521125" className="flex items-center gap-2 hover:text-white transition-colors">
                  504-252-1125
                </a>
              </li>
              <li>
                <a href="mailto:nicksvendingnola@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  nicksvendingnola@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold text-neon-violet hover:text-neon-magenta transition-colors">
                  Contact Us →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ink-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {YEAR} Nick's Vending, LLC. All rights reserved.</p>
          <p>Smart nightlife vending — compliant, fully managed, no cost to you.</p>
        </div>
      </div>
    </footer>
  )
}
