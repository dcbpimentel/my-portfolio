import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiLinkedin, FiCheckCircle, FiMapPin, FiLock } from 'react-icons/fi'
import MagnetButton from '../components/MagnetButton'
import { RESTRICTED } from '../config/restricted'

const LocalTime = () => {
  const fmt = () => new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true,
  })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-2.5 pt-1">
      <FiMapPin size={14} className="text-text-secondary/50 flex-shrink-0" />
      <span className="font-body text-sm text-text-secondary">
        Davao City, Philippines
        <span className="text-text-secondary/45 mx-1.5">·</span>
        <span className="text-accent/80 font-medium">{time}</span>
        <span className="text-text-secondary/45 ml-1">local</span>
      </span>
    </div>
  )
}

// ── Validation ──────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (fields) => {
  const errors = {}
  if (!fields.name.trim())               errors.name    = 'Name is required.'
  if (!fields.email.trim())              errors.email   = 'Email is required.'
  else if (!EMAIL_RE.test(fields.email)) errors.email   = 'Enter a valid email address.'
  if (!fields.message.trim())            errors.message = 'Message is required.'
  return errors
}

const FORMSPREE_URL = 'https://formspree.io/f/xvznqqlg'

// ── Spinner SVG ─────────────────────────────────────────────────
const Spinner = () => (
  <motion.svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
    <path d="M14 8A6 6 0 0 0 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
)

// ── Floating label field ────────────────────────────────────────
const FloatingField = ({ id, name, type = 'text', label, value, onChange, onBlur, hasError, isTextarea }) => {
  const [focused, setFocused] = useState(false)
  const isUp = focused || !!value

  const sharedClass = [
    isTextarea ? 'float-textarea' : 'float-input',
    hasError ? 'error' : '',
  ].join(' ')

  const labelClass = [
    'absolute left-4 font-body pointer-events-none transition-all duration-200',
    isUp
      ? 'top-2 text-[11px] text-accent font-medium'
      : isTextarea
        ? 'top-4 text-sm text-text-secondary'
        : 'top-1/2 -translate-y-1/2 text-sm text-text-secondary',
  ].join(' ')

  const handleFocus = (e) => {
    setFocused(true)
    // Scroll input into view on mobile so the keyboard doesn't cover it
    if (window.innerWidth < 768) {
      setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120)
    }
  }

  const commonProps = {
    id, name,
    value, onChange,
    onFocus: handleFocus,
    onBlur:  (e) => { setFocused(false); onBlur?.(e) },
    className: sharedClass,
  }

  return (
    <div className="relative">
      {isTextarea
        ? <textarea {...commonProps} rows={5} />
        : <input    {...commonProps} type={type} />
      }
      <label htmlFor={id} className={labelClass}>{label}</label>
    </div>
  )
}

// ── Contact form ────────────────────────────────────────────────
const ContactForm = () => {
  const [fields,      setFields]      = useState({ name: '', email: '', message: '' })
  const [errors,      setErrors]      = useState({})
  const [touched,     setTouched]     = useState({})
  const [submitted,   setSubmitted]   = useState(false)
  const [submitting,  setSubmitting]  = useState(false)
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: fields.name, email: fields.email, message: fields.message }),
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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center gap-4 min-h-[280px] rounded-2xl border border-border p-10 text-center glass-card"
      >
        <FiCheckCircle size={40} className="text-accent" />
        <p className="font-display font-bold text-xl text-text-primary">Message sent!</p>
        <p className="font-body text-text-secondary text-sm">I&apos;ll get back to you soon.</p>
      </motion.div>
    )
  }

  return (
    <div className="rounded-2xl p-6 glass-card">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

        <FloatingField
          id="name" name="name" label="Your name"
          value={fields.name} onChange={handleChange} onBlur={handleBlur}
          hasError={touched.name && errors.name}
        />
        {touched.name && errors.name && (
          <p className="font-body text-xs text-red-500 -mt-3">{errors.name}</p>
        )}

        <FloatingField
          id="email" name="email" type="email" label="Your email"
          value={fields.email} onChange={handleChange} onBlur={handleBlur}
          hasError={touched.email && errors.email}
        />
        {touched.email && errors.email && (
          <p className="font-body text-xs text-red-500 -mt-3">{errors.email}</p>
        )}

        <FloatingField
          id="message" name="message" label="Your message" isTextarea
          value={fields.message} onChange={handleChange} onBlur={handleBlur}
          hasError={touched.message && errors.message}
        />
        {touched.message && errors.message && (
          <p className="font-body text-xs text-red-500 -mt-3">{errors.message}</p>
        )}

        {serverError && (
          <p className="font-body text-xs text-red-500 text-center">{serverError}</p>
        )}

        <MagnetButton
          type="submit"
          disabled={isEmpty || submitting}
          strength={isEmpty || submitting ? 0 : 0.3}
          whileHover={{ scale: isEmpty || submitting ? 1 : 1.03, filter: 'brightness(1.06)' }}
          whileTap={{ scale: isEmpty || submitting ? 1 : 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          style={{ boxShadow: isEmpty || submitting ? 'none' : '0 4px 20px rgba(232,255,77,0.2), inset 0 1px 0 rgba(255,255,255,0.25)' }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-body font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            {submitting ? (
              <motion.span
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Spinner /> Sending...
              </motion.span>
            ) : (
              <motion.span
                key="label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Send it my way →
              </motion.span>
            )}
          </AnimatePresence>
        </MagnetButton>

      </form>
    </div>
  )
}

// ── Section ─────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section id="contact" className="py-section px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none section-fade-top" />

      <div className="max-w-content mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
            className="flex flex-col gap-6"
          >
            <span className="font-body text-sm text-accent uppercase tracking-widest font-medium">
              Get In Touch
            </span>

            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              {['Got', 'something', 'in', 'mind?'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                  className="inline-block mr-[0.25em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <p className="font-body text-text-secondary text-base leading-relaxed">
              Whether you have a project in mind, a role you think I&apos;d fit, or just want
              to talk design, my inbox is open. I usually respond within a day.
            </p>

            {!RESTRICTED && <LocalTime />}

            {RESTRICTED ? (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl glass-card border border-border">
                <FiLock size={13} className="text-accent flex-shrink-0" />
                <span className="font-body text-sm text-text-secondary">
                  Contact details temporarily restricted. Use the form to reach out.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pt-2">
                <a
                  href="mailto:dwyanepimentel@gmail.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-border group-hover:border-accent transition-colors glass-card">
                    <FiMail size={16} />
                  </span>
                  <span className="font-body text-sm">dwyanepimentel@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/?skipRedirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-border group-hover:border-accent transition-colors glass-card">
                    <FiLinkedin size={16} />
                  </span>
                  <span className="font-body text-sm">linkedin.com/in/dwyane-clark-pimentel</span>
                </a>
              </div>
            )}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
