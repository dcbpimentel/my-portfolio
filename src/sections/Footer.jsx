import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi'
import { RESTRICTED, fireRestricted } from '../config/restricted'

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/dcbpimentel',                               label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/', label: 'LinkedIn' },
]

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 pt-20 pb-8">
      <div className="max-w-content mx-auto flex flex-col gap-12">

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="flex flex-col gap-3">
            <span className="font-body text-sm text-accent uppercase tracking-widest font-medium">
              Let&apos;s collaborate
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
              Let&apos;s build something
              <br />
              <span className="text-accent">together.</span>
            </h2>
            <p className="font-body text-text-secondary text-base max-w-md mx-auto leading-relaxed">
              Have a project, a role, or just a great idea? I&apos;m open. Reach out and let&apos;s make something worth showing.
            </p>
          </div>

          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-bg font-body font-semibold text-base cursor-pointer"
            style={{ boxShadow: '0 4px 28px rgba(232,255,77,0.25), inset 0 1px 0 rgba(255,255,255,0.25)' }}
          >
            Get in touch <FiArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-border pt-6 flex flex-col gap-6">

          <p className="text-center font-body text-sm text-text-secondary italic">
            Built by Dwyane. Still improving it.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">

            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
              dwyane<span className="text-accent">.</span>
            </span>

            <p className="font-body text-sm text-text-secondary order-last md:order-none">
              © 2026 Dwyane Clark Pimentel. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={RESTRICTED ? undefined : href}
                  target={RESTRICTED ? undefined : '_blank'}
                  rel={RESTRICTED ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  onClick={RESTRICTED ? (e) => { e.preventDefault(); fireRestricted() } : undefined}
                  className="flex items-center justify-center w-11 h-11 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
