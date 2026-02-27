const WHY_CHOOSE = [
  {
    title: 'Compliant by design',
    body: 'Built-in age verification on every machine. We handle the regulatory side so your venue carries no extra liability.',
  },
  {
    title: 'Brands people actually want',
    body: 'We stock the disposables, pouches, and tobacco that sell. No dead inventory, no obsolete SKUs.',
  },
  {
    title: 'Zero burden on your staff',
    body: 'We show up, we restock, we fix it if it breaks. Your team never touches the machine.',
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
                Nick's Vending is an independently owned and operated nicotine
                vending company. We specialize in placing age-verified machines
                in bars, clubs, casinos, and other adult venues where customers
                are already looking for these products.
              </p>
              <p>
                From the initial site visit through ongoing restocking and maintenance,
                we manage everything. You get a revenue-generating amenity for your
                customers with no inventory responsibility and no upfront cost.
              </p>
              <p>
                As a local operation, you deal with one person — the person
                who actually services your machine. No call centers, no
                third-party logistics. Just a direct line and fast turnaround.
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
