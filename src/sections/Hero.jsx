import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaDribbble } from 'react-icons/fa'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/dcbpimentel',                                    label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/',       label: 'LinkedIn' },
  { icon: FaDribbble, href: 'https://dribbble.com/dcbpimentel',                                   label: 'Dribbble' },
]

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-16"
    >
      <div className="flex flex-col items-center text-center max-w-prose gap-6">

        {/* Badge */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-sm text-text-secondary"
        >
          Let&apos;s work together
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-tight text-text-primary text-balance"
        >
          Works the way you expect it to.
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          {...fadeUp(0.30)}
          className="font-body font-medium text-xl md:text-2xl text-accent"
        >
          UI/UX Designer · Vibe Coder · Videographer
        </motion.h2>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-body text-text-secondary text-base md:text-lg max-w-xl leading-relaxed"
        >
          Designing something is easy. Making it actually work the way people expect? That&apos;s the part I love.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.60)}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg bg-accent text-bg font-body font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            View Projects
          </button>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 rounded-lg border border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-bg transition-colors"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          {...fadeUp(0.75)}
          className="flex items-center gap-5 pt-2"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
