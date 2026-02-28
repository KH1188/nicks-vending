import type { ReactNode } from 'react'

type Service = {
  icon: ReactNode
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8 1.402 1.402c1 1 .03 2.798-1.414 2.798H4.213c-1.444 0-2.414-1.798-1.414-2.798L4.2 15.3" />
      </svg>
    ),
    title: 'Disposable Vapes & E-Cigarettes',
    description:
      'Top-selling disposable brands and rechargeable devices. We stock the Louisiana V.A.P.E Directory approved SKUs that move in your venue.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
    title: 'Nicotine Pouches & Tobacco',
    description:
      'Zyn, On!, Velo, and traditional tobacco products. We cover the full spectrum of adult nicotine preferences.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Age Verification Built-In',
    description:
      'Every machine includes ID scanner or credit card age verification. 21+ compliant, no liability on your venue.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Restocking & Maintenance',
    description:
      'Scheduled service visits keep machines full and running. Rapid response if anything goes down.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-16">
          <p className="section-label mb-3">What we offer</p>
          <h2 className="section-title">Fully managed.<br />Start to finish.</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((svc) => (
            <article key={svc.title} className="card p-8 flex gap-5">
              <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center
                text-brand-700 flex-shrink-0 mt-0.5">
                {svc.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{svc.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
