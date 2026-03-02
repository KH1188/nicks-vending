const WHY_CHOOSE = [
  {
    title: 'More sales, longer stays',
    body: 'When nicotine is available on-site, customers don\'t leave to find it — they stay, they order more, and they come back. Happy customers and a boosted bottom line, with nothing extra required from you.',
  },
  {
    title: 'We handle the Louisiana ATC',
    body: 'Licensing, permits, and compliance with the Louisiana Alcohol and Tobacco Control is our problem, not yours. We manage every regulatory requirement so your venue carries zero headache and zero liability.',
  },
  {
    title: 'Hands Free Money Machine',
    body: 'We show up, we restock, we process refunds, and we fix it if it breaks. You or your team never has to worry about the machine.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="section-label mb-3">About us</p>
            <h2 className="section-title mb-8">Local operator.<br />Serious service.</h2>
            <div className="space-y-5 text-slate-500 leading-relaxed">
              <p>
                Nick's Vending is a locally owned and operated nicotine vending
                company built on one principle: reliability. We show up, we restock,
                and we handle every issue — so you never have to think about the
                machine again.
              </p>
              <p>
                When customers don't have to step outside or leave your venue to get
                nicotine, they don't. They stay at the bar, they keep ordering, and
                they come back. Venues with our machines consistently see patrons
                staying longer and spending more — a direct boost to your bottom line
                with zero effort on your part.
              </p>
              <p>
                There's no upfront cost, no inventory to manage, and no staff
                involvement. From placement to ongoing maintenance, we handle
                everything. You get one reliable local operator — the same person
                who answers your call and services your machine, 24/7.
              </p>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="section-label mb-8">Why choose us</p>
            <ul className="space-y-8">
              {WHY_CHOOSE.map(({ title, body }) => (
                <li key={title} className="flex gap-5 items-start">
                  <div className="w-8 h-8 rounded-full bg-white border border-brand-100
                    flex items-center justify-center flex-shrink-0 mt-0.5 shadow-card">
                    <svg className="w-4 h-4 text-brand-700" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1.5">{title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
