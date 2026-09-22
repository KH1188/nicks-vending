import { useState, useRef, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

const EJS_SERVICE   = 'service_wyl6jvt'
const EJS_TEMPLATE  = 'template_68vvsyq'
const EJS_CONFIRM   = 'template_h42ujue'
const EJS_PUBLIC    = 'wFObCt7fUUZCoWCVM'

type FormState = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', interest: 'Not sure yet', message: '' }

export default function LandingContact() {
  const [form, setForm]           = useState<FormState>(EMPTY)
  const [submitted, setSubmit]    = useState(false)
  const [sending, setSending]     = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [errors, setErrors]       = useState<Partial<FormState>>({})
  const recaptchaRef = useRef<ReCAPTCHA>(null)

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

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    const captchaToken = recaptchaRef.current?.getValue()
    if (!captchaToken) {
      setSendError('Please complete the CAPTCHA before sending.')
      return
    }

    setSending(true)
    setSendError(null)

    try {
      const data = {
        from_name: form.name,
        from_email: form.email,
        phone:    form.phone || 'N/A',
        business: `Interested in: ${form.interest}`,
        message:  form.message,
      }

      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, data, EJS_PUBLIC)
      await emailjs.send(EJS_SERVICE, EJS_CONFIRM,  data, EJS_PUBLIC)
      setSubmit(true)
      setForm(EMPTY)
      recaptchaRef.current?.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendError('Something went wrong. Please call or email us directly.')
      recaptchaRef.current?.reset()
    } finally {
      setSending(false)
    }
  }

  const field = (id: keyof FormState) => ({
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [id]: e.target.value })),
    className: `lp-input ${errors[id] ? 'lp-input--error' : ''}`,
  })

  return (
    <section id="contact" className="lp-contact">
      <div className="lp-contact-inner">
        <div className="lp-contact-intro">
          <span className="lp-eyebrow">Get in touch</span>
          <h2 className="lp-contact-heading">Tell us about<br />your venue.</h2>
          <p className="lp-blurb" style={{ maxWidth: '40ch' }}>
            Whether it's nightlife or collectibles — or you're not sure yet — send us a
            few details and we'll follow up with options.
          </p>
        </div>

        <div className="lp-contact-form">
          {submitted ? (
            <div className="lp-contact-success">
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. We'll respond within 1 business day.</p>
              <button onClick={() => setSubmit(false)} className="lp-contact-again">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="lp-field-row">
                <div className="lp-field">
                  <label htmlFor="lc-name">Full Name *</label>
                  <input id="lc-name" type="text" placeholder="Jane Smith" {...field('name')} />
                  {errors.name && <p className="lp-field-error">{errors.name}</p>}
                </div>
                <div className="lp-field">
                  <label htmlFor="lc-email">Email *</label>
                  <input id="lc-email" type="email" placeholder="jane@company.com" {...field('email')} />
                  {errors.email && <p className="lp-field-error">{errors.email}</p>}
                </div>
              </div>

              <div className="lp-field-row">
                <div className="lp-field">
                  <label htmlFor="lc-phone">Phone</label>
                  <input id="lc-phone" type="tel" placeholder="(555) 000-0000" {...field('phone')} />
                </div>
                <div className="lp-field">
                  <label htmlFor="lc-interest">Interested in</label>
                  <select id="lc-interest" {...field('interest')}>
                    <option>Not sure yet</option>
                    <option>Nightlife</option>
                    <option>Collectibles</option>
                  </select>
                </div>
              </div>

              <div className="lp-field">
                <label htmlFor="lc-message">Message *</label>
                <textarea
                  id="lc-message"
                  rows={4}
                  placeholder="Tell us about your venue — type of location, foot traffic, etc."
                  {...field('message')}
                />
                {errors.message && <p className="lp-field-error">{errors.message}</p>}
              </div>

              <div className="lp-recaptcha-wrap">
                <ReCAPTCHA ref={recaptchaRef} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} theme="dark" size="compact" />
              </div>

              <button type="submit" disabled={sending} className="lp-contact-submit">
                {sending ? 'Sending…' : 'Send Message'}
              </button>

              {sendError && <p className="lp-field-error" style={{ textAlign: 'center' }}>{sendError}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
