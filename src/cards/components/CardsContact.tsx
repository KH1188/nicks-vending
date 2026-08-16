import { useState, FormEvent } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  venue: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', venue: '', message: '' }

const inputClass = (hasError: boolean) => `w-full px-4 py-2.5 text-sm rounded-lg border
  ${hasError ? 'border-red-400 bg-red-50' : 'border-paper-border bg-paper-elevated'}
  text-ink placeholder-ink/30
  focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent
  transition-colors duration-200`

export default function CardsContact() {
  const [form, setForm]     = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormState>>({})

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

    const subject = encodeURIComponent(`Collectibles vending inquiry — ${form.venue || form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nVenue: ${form.venue || 'N/A'}\n\n${form.message}`
    )
    window.location.href = `mailto:nicksvendingnola@gmail.com?subject=${subject}&body=${body}`
  }

  const field = (id: keyof FormState) => ({
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [id]: e.target.value })),
    className: inputClass(!!errors[id]),
  })

  return (
    <section id="contact" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neon-violet mb-3">Get in touch</p>
            <h2 className="text-3xl md:text-4xl font-brand font-black text-ink tracking-tight mb-5">
              Let's talk about<br />your venue.
            </h2>
            <p className="text-lg text-ink/60 leading-relaxed mb-10 max-w-md">
              Tell us about your space and foot traffic — we'll follow up with placement
              options and terms.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-paper-elevated border border-paper-border flex items-center justify-center text-neon-violet flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink/40 uppercase tracking-wide mb-1">Phone</p>
                  <a href="tel:+15042521125" className="text-sm font-medium text-ink hover:text-neon-violet transition-colors">
                    504-252-1125
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-paper-elevated border border-paper-border flex items-center justify-center text-neon-violet flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink/40 uppercase tracking-wide mb-1">Email</p>
                  <a href="mailto:nicksvendingnola@gmail.com" className="text-sm font-medium text-ink hover:text-neon-violet transition-colors">
                    nicksvendingnola@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-paper-border bg-paper-elevated p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h3 className="text-lg font-bold text-ink mb-1">Get in Touch</h3>
              <p className="text-sm text-ink/40 mb-6">
                This opens an email pre-filled with your details — no account or backend required.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-semibold text-ink/60 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input id="c-name" type="text" placeholder="Jane Smith" {...field('name')} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-semibold text-ink/60 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input id="c-email" type="email" placeholder="jane@company.com" {...field('email')} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-phone" className="block text-xs font-semibold text-ink/60 mb-1.5">Phone</label>
                  <input id="c-phone" type="tel" placeholder="(555) 000-0000" {...field('phone')} />
                </div>
                <div>
                  <label htmlFor="c-venue" className="block text-xs font-semibold text-ink/60 mb-1.5">Venue Name</label>
                  <input id="c-venue" type="text" placeholder="Card Shop Name" {...field('venue')} />
                </div>
              </div>

              <div>
                <label htmlFor="c-message" className="block text-xs font-semibold text-ink/60 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  placeholder="Tell us about your venue — type of location, foot traffic, space available, etc."
                  {...field('message')}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold
                  text-white bg-neon-gradient hover:shadow-neon-soft active:scale-[0.98] transition-all duration-200"
              >
                Send via Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
