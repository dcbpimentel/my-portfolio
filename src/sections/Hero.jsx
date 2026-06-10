import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaDribbble } from 'react-icons/fa'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com',   label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://linkedin.com',  label: 'LinkedIn' },
  { icon: FaDribbble, href: 'https://dribbble.com',  label: 'Dribbble' },
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
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Open to opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-tight text-text-primary"
        >
          Designing systems.<br />
          <span className="text-accent">Building them too.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          {...fadeUp(0.30)}
          className="font-body font-medium text-xl md:text-2xl text-accent"
        >
          UI/UX Designer · WEB Developer · Videographer
        </motion.h2>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-body text-text-secondary text-base md:text-lg max-w-xl leading-relaxed"
        >
          I&apos;m a 4th-year IT student who designs interfaces in Figma and ships them in React.
          I care about the gap between how things look and how they actually work, and closing it.
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
