import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi'

const slideIn = (direction, delay = 0) => ({
  initial:     { opacity: 0, x: direction === 'left' ? -40 : 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.6, ease: 'easeOut', delay },
})

// ── Validation helpers ──────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (fields) => {
  const errors = {}
  if (!fields.name.trim())               errors.name    = 'Name is required.'
  if (!fields.email.trim())              errors.email   = 'Email is required.'
  else if (!EMAIL_RE.test(fields.email)) errors.email   = 'Enter a valid email address.'
  if (!fields.message.trim())            errors.message = 'Message is required.'
  return errors
}

// ── Input / Textarea shared styles ──────────────────────────────
const baseInput = (hasError) =>
  `w-full bg-surface border rounded-lg px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors duration-200 focus:border-accent ${
    hasError ? 'border-red-500' : 'border-border'
  }`

const FORMSPREE_URL = 'https://formspree.io/f/xvznqqlg'

// ── Contact form ─────────────────────────────────────────────────
const ContactForm = () => {
  const [fields,     setFields]     = useState({ name: '', email: '', message: '' })
  const [errors,     setErrors]     = useState({})
  const [touched,    setTouched]    = useState({})
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const isEmpty = !fields.name.trim() || !fields.email.trim() || !fields.message.trim()

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...fields, [name]: value }
    setFields(next)
    if (touched[name]) {
      const errs = validate(next)
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const errs = validate(fields)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) {
      setErrors(errs)
      setTouched({ name: true, email: true, message: true })
      return
    }

    setSubmitting(true)
    setServerError('')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:    fields.name,
          email:   fields.email,
          message: fields.message,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setServerError(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ──────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center gap-4 h-full min-h-[280px] rounded-xl border border-border bg-surface p-10 text-center"
      >
        <FiCheckCircle size={40} className="text-accent" />
        <p className="font-display font-bold text-xl text-text-primary">
          Message sent!
        </p>
        <p className="font-body text-text-secondary text-sm">
          I&apos;ll get back to you soon.
        </p>
      </motion.div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-body text-xs text-text-secondary uppercase tracking-widest">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          value={fields.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={baseInput(touched.name && errors.name)}
        />
        {touched.name && errors.name && (
          <p className="font-body text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-body text-xs text-text-secondary uppercase tracking-widest">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={baseInput(touched.email && errors.email)}
        />
        {touched.email && errors.email && (
          <p className="font-body text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-body text-xs text-text-secondary uppercase tracking-widest">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me what's on your mind..."
          value={fields.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${baseInput(touched.message && errors.message)} resize-none`}
        />
        {touched.message && errors.message && (
          <p className="font-body text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <p className="font-body text-xs text-red-500 text-center">{serverError}</p>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isEmpty || submitting}
        whileHover={{ scale: isEmpty || submitting ? 1 : 1.02 }}
        whileTap={{ scale: isEmpty || submitting ? 1 : 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        style={{ boxShadow: isEmpty || submitting ? 'none' : '0 4px 20px rgba(232, 255, 77, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-body font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiSend size={15} />
        {submitting ? 'Sending...' : 'Send it my way →'}
      </motion.button>

    </form>
  )
}

// ── Section ───────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section id="contact" className="py-section px-6">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: info */}
          <motion.div {...slideIn('left')} className="flex flex-col gap-6">

            <span className="font-body text-sm text-accent uppercase tracking-widest font-medium">
              Get In Touch
            </span>

            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              Got something in mind?
            </h2>

            <p className="font-body text-text-secondary text-base leading-relaxed">
              Whether you have a project in mind, a role you think I&apos;d fit, or just want
              to talk design, my inbox is open. I usually respond within a day.
            </p>

            <div className="flex flex-col gap-4 pt-2">
              {/* Email */}
              <a
                href="mailto:dwyanepimentel@email.com"
                className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface group-hover:border-accent transition-colors">
                  <FiMail size={16} />
                </span>
                <span className="font-body text-sm">dwyanepimentel@email.com</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface group-hover:border-accent transition-colors">
                  <FiLinkedin size={16} />
                </span>
                <span className="font-body text-sm">linkedin.com/in/dwyane-clark-pimentel</span>
              </a>
            </div>

          </motion.div>

          {/* Right: form */}
          <motion.div {...slideIn('right', 0.1)}>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
