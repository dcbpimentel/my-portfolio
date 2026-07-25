import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HEADLINE_WORDS = ['Works', 'the', 'way', 'you', 'expect', 'it', 'to.']

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/dcbpimentel',                              label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/', label: 'LinkedIn' },
]

const springBtn = { type: 'spring', stiffness: 400, damping: 17 }

const Hero = () => {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const heroH = typeof window !== 'undefined' ? window.innerHeight : 800

  // Parallax Y offsets — positive Y counteracts the page scroll, making elements appear slower
  const _badgeY    = useTransform(scrollY, [0, heroH], [0, heroH * 0.30])
  const _subtitleY = useTransform(scrollY, [0, heroH], [0, heroH * 0.15])
  const badgeY    = reduced ? 0 : _badgeY
  const subtitleY = reduced ? 0 : _subtitleY

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
    >
      <div className="flex flex-col items-center text-center max-w-prose gap-6">

        {/* Badge — 0.7x scroll speed */}
        <motion.div style={{ y: badgeY }}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-text-secondary cursor-default glass-card"
          >
            Let&apos;s work together
          </motion.div>
        </motion.div>

        {/* Headline — anchored 1x, word-by-word stagger */}
        <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-tight text-text-primary">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 + i * 0.06 }}
              className="inline-block mr-[0.28em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle — 0.85x scroll speed */}
        <motion.div style={{ y: subtitleY }}>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.50 }}
            className="font-body font-medium text-xl md:text-2xl text-accent"
          >
            UI/UX Designer · Vibe Coder · Videographer
          </motion.h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.60 }}
          className="font-body text-text-secondary text-base md:text-lg max-w-xl leading-relaxed"
        >
          Designing something is easy. Making it actually work the way people expect? That&apos;s the part I love.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.68 }}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.96 }}
            transition={springBtn}
            className="px-6 py-3 rounded-lg bg-accent text-bg font-body font-semibold text-sm cursor-pointer"
            style={{ boxShadow: '0 4px 20px rgba(232,255,77,0.2), inset 0 1px 0 rgba(255,255,255,0.25)' }}
          >
            View Projects
          </motion.button>
          <motion.a
            href="/cv.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={springBtn}
            className="px-6 py-3 rounded-lg border border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-bg transition-colors cursor-pointer glass-card"
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.76 }}
          className="flex items-center gap-5 pt-2"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={springBtn}
              className="text-text-secondary hover:text-accent transition-colors cursor-pointer"
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
