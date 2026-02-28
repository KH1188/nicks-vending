import logo from '../assets/logo.png'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={logo}
              alt="Nick's Vending"
              className="h-10 w-auto object-contain brightness-0 invert mb-5"
            />
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Age-verified nicotine vending for bars, clubs, casinos, and
              adult venues. Fully managed. No cost to you.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Services
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                'Disposable Vapes',
                'Nicotine Pouches & Tobacco',
                'Age Verification',
                'Bar & Club Placement',
                'Restocking & Maintenance',
              ].map(s => (
                <li key={s}>
                  <a href="#services"
                    className="hover:text-white transition-colors duration-150">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About',     href: '#about'     },
                { label: 'Locations', href: '#locations' },
                { label: 'Photos',    href: '#photos'    },
                { label: 'Contact',   href: '#contact'   },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href}
                    className="hover:text-white transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Contact
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+15042521125"
                  className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  504-252-1125
                </a>
              </li>
              <li>
                <a href="mailto:nicksvendingnola@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  nicksvendingnola@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold
                    text-brand-300 hover:text-brand-200 transition-colors">
                  Request Placement →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row
          items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {YEAR} Nick's Vending. All rights reserved.</p>
          <p>Age-verified nicotine vending — compliant, fully managed, no cost to you.</p>
        </div>
      </div>
    </footer>
  )
}
