import { useState, FormEvent } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  business: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', business: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState<FormState>(EMPTY)
  const [submitted, setSubmit] = useState(false)
  const [errors, setErrors]   = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Please include a message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    // Mailto fallback — opens email client as a backup
    const subject = encodeURIComponent(`Vending inquiry from ${form.name} — ${form.business || 'N/A'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\n` +
      `Business: ${form.business || 'N/A'}\n\nMessage:\n${form.message}`
    )
    // Silently attempt the mailto; works if user has a mail client configured
    window.location.href = `mailto:contact@nicksvending.com?subject=${subject}&body=${body}`

    setSubmit(true)
    setForm(EMPTY)
  }

  const field = (id: keyof FormState) => ({
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [id]: e.target.value })),
    className: `w-full px-4 py-2.5 text-sm rounded-lg border
      ${errors[id] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}
      text-slate-900 placeholder-slate-400
      focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent
      transition-colors duration-200`,
  })

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: contact info */}
          <div>
            <p className="section-label mb-3">Get in touch</p>
            <h2 className="section-title mb-5">Let's talk about<br />your location.</h2>
            <p className="section-subtitle mb-10 max-w-md">
              Tell us about your venue and we'll follow up with machine options,
              placement details, and next steps.
            </p>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center
                  text-brand-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Phone</p>
                  <a href="tel:+15550000000"
                    className="text-sm font-medium text-slate-800 hover:text-brand-700 transition-colors">
                    (555) 000-0000
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Mon–Fri, 8 am – 5 pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center
                  text-brand-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Email</p>
                  <a href="mailto:contact@nicksvending.com"
                    className="text-sm font-medium text-slate-800 hover:text-brand-700 transition-colors">
                    contact@nicksvending.com
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">We respond within 1 business day</p>
                </div>
              </div>
            </div>

            {/* Response promise */}
            <div className="mt-10 p-5 bg-white rounded-xl border border-slate-100 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Response within 1 business day
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No automated replies — you'll hear from Nick directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="card p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-sm text-slate-500 max-w-xs">
                    Thanks for reaching out. We'll respond within 1 business day.
                  </p>
                </div>
                <button
                  onClick={() => setSubmit(false)}
                  className="mt-2 btn-ghost text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Request Placement</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Tell us about your venue and we'll reach out with options.
                </p>

                {/* Row: name + email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name"
                      className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input id="name" type="text" placeholder="Jane Smith" {...field('name')} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email"
                      className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input id="email" type="email" placeholder="jane@company.com" {...field('email')} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row: phone + business */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone"
                      className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Phone
                    </label>
                    <input id="phone" type="tel" placeholder="(555) 000-0000" {...field('phone')} />
                  </div>
                  <div>
                    <label htmlFor="business"
                      className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Business / Facility Name
                    </label>
                    <input id="business" type="text" placeholder="Acme Corp" {...field('business')} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message"
                    className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your venue — type of location, foot traffic, preferred products, etc."
                    {...field('message')}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  No spam. We'll respond with next steps only.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
