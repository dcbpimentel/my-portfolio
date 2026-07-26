import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsMobile } from '../hooks/useIsMobile'

const HEADLINE_WORDS = ['Works', 'the', 'way', 'you', 'expect', 'it', 'to.']
const ROLES = ['UI/UX Designer', 'Vibe Coder', 'Videographer']

function useTypingEffect(words, { typeSpeed = 65, deleteSpeed = 35, pauseAfterType = 1800, pauseAfterDelete = 400 } = {}) {
  const [displayed, setDisplayed] = useState(words[0])
  const [wordIdx,   setWordIdx]   = useState(0)
  const [deleting,  setDeleting]  = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const word = words[wordIdx]
    let t
    if (!deleting) {
      if (displayed.length < word.length) {
        t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typeSpeed)
      } else {
        t = setTimeout(() => setDeleting(true), pauseAfterType)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed)
      } else {
        setDeleting(false)
        setWordIdx((wordIdx + 1) % words.length)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, wordIdx, words, reduced])

  return displayed
}

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/dcbpimentel',                               label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/', label: 'LinkedIn' },
]

const springBtn = { type: 'spring', stiffness: 400, damping: 17 }

function useMagnet(strength = 0.35) {
  const ref  = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x    = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.5 })
  const y    = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.5 })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      rawX.set((e.clientX - r.left - r.width  / 2) * strength)
      rawY.set((e.clientY - r.top  - r.height / 2) * strength)
    }
    const onLeave = () => { rawX.set(0); rawY.set(0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, rawX, rawY])

  return { ref, x, y }
}

const Hero = () => {
  const sectionRef = useRef(null)
  const reduced    = useReducedMotion()
  const isMobile   = useIsMobile()
  const typedRole  = useTypingEffect(ROLES)
  const m1         = useMagnet(0.3)
  const m2         = useMagnet(0.3)

  // Word stagger: tighter on mobile
  const wordDelay = isMobile ? 0.04 : 0.06

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
    >
      <div className="flex flex-col items-center text-center max-w-prose gap-5 md:gap-6 w-full mb-[18vh] md:mb-0">

        {/* Badge */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-text-secondary cursor-default glass-card"
        >
          Let&apos;s work together
        </motion.div>

        {/* Headline — word-by-word stagger */}
        <h1 className="hero-headline font-display font-bold tracking-tight text-text-primary">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 + i * wordDelay }}
              className="inline-block mr-[0.28em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle — typing effect */}
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.50 }}
          className="font-body font-medium text-lg md:text-xl lg:text-2xl text-accent"
          style={{ minHeight: '1.5em' }}
        >
          {typedRole}
          <span className="typing-cursor" aria-hidden="true" />
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.60 }}
          className="font-body text-text-secondary text-[15px] md:text-base lg:text-lg max-w-[340px] md:max-w-xl leading-[1.7]"
        >
          Designing something is easy. Making it actually work the way people expect? That&apos;s the part I love.
        </motion.p>

        {/* CTA Buttons — stacked + full-width on mobile, row on md+ */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.68 }}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 w-full max-w-[340px] md:max-w-none md:justify-center"
        >
          <motion.button
            ref={m1.ref}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
            transition={springBtn}
            className="px-6 py-4 md:py-3 rounded-lg bg-accent text-bg font-body font-semibold text-sm cursor-pointer text-center"
            style={{ x: m1.x, y: m1.y, boxShadow: '0 4px 20px rgba(232,255,77,0.2), inset 0 1px 0 rgba(255,255,255,0.25)' }}
          >
            View Projects
          </motion.button>
          <motion.a
            ref={m2.ref}
            href="/cv.pdf"
            download
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            transition={springBtn}
            className="px-6 py-4 md:py-3 rounded-lg border border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-bg transition-colors cursor-pointer glass-card text-center"
            style={{ x: m2.x, y: m2.y }}
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.76 }}
          className="flex items-center gap-5 pt-1"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.15, y: -2 }}
              transition={springBtn}
              className="flex items-center justify-center w-11 h-11 text-text-secondary hover:text-accent transition-colors cursor-pointer"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
