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
    title: 'Disposable Vapes, Pouches & Tobacco',
    description:
      'Top-selling disposables, rechargeable devices, nicotine pouches — Zyn, Alp, On! — and traditional tobacco. We stock the Louisiana V.A.P.E Directory approved SKUs covering the full spectrum of adult nicotine preferences.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: 'Louisiana ATC Licensed & Compliant',
    description:
      'We handle every license, permit, and regulatory requirement with the Louisiana Alcohol and Tobacco Control — so you don\'t have to. No headaches, no paperwork, no compliance risk on your venue.',
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
      'Every machine can be outfitted with an ID scanner at venue\'s request. No stress, no liability on your venue.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Smart Restocking & Maintenance',
    description:
      'The machines alert us when stock is low, when a refund is needed, or when there\'s a jam — so issues get handled fast. Scheduled service visits and 24/7 response, always.',
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
