import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBookOpen, FiMessageSquare, FiAward, FiPenTool, FiCode, FiVideo } from 'react-icons/fi'
import { aboutContent } from '../data/skills'
import CertificatesModal from '../components/CertificatesModal'
import current from '../data/current'

const SERVICES = [
  {
    icon: FiPenTool,
    title: 'UI/UX Design',
    desc: 'From wireframes and Figma prototypes to polished, pixel-perfect interfaces people actually enjoy.',
  },
  {
    icon: FiCode,
    title: 'Frontend Dev',
    desc: 'Building fast, responsive web apps with React and Tailwind. What I design is what gets built.',
  },
  {
    icon: FiVideo,
    title: 'Video Production',
    desc: 'Shooting and editing short-form content, montages, and promo videos with Final Cut Pro.',
  },
]

const slideIn = (direction, delay = 0) => ({
  initial:    { opacity: 0, x: direction === 'left' ? -40 : 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

const About = () => {
  const { paragraph, whatIDo, funLine } = aboutContent
  const [certOpen, setCertOpen] = useState(false)

  return (
    <section id="about" className="py-section px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none section-fade-bottom" />


      <div className="max-w-content mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left: Photo placeholder ── */}
          <motion.div {...slideIn('left')} className="flex justify-center lg:justify-start">
            <div className="relative w-40 md:w-64 lg:w-full max-w-sm">

              {/* Photo card */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-square border border-border"
                style={{ boxShadow: '0 0 0 1px var(--color-border), 0 0 28px var(--accent-glow)' }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Dwyane Clark Pimentel"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-lg whitespace-nowrap">
                <FiBookOpen size={14} className="text-accent flex-shrink-0" />
                <span className="font-body text-xs text-text-primary font-medium">
                  4th Year IT Student
                </span>
              </div>

            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div {...slideIn('right', 0.1)} className="flex flex-col gap-6 pt-6 md:pt-0">

            {/* Label */}
            <span className="font-body text-sm text-accent uppercase tracking-widest font-medium">
              About Me
            </span>

            {/* Headline */}
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              I design interfaces people actually enjoy using.
            </h2>

            {/* Bio */}
            <p className="font-body text-text-secondary text-base leading-relaxed">
              {paragraph}
            </p>

            {/* Service cards */}
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm text-text-secondary uppercase tracking-widest">
                What I do
              </p>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.07 }}
                    className="glass-card flex items-start gap-4 p-4 rounded-xl"
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/20">
                      <Icon size={16} className="text-accent" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-sm font-semibold text-text-primary">{title}</span>
                      <span className="font-body text-xs text-text-secondary leading-relaxed">{desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fun line */}
            <p className="font-body text-xs text-text-secondary italic border-l-2 border-accent pl-3 leading-relaxed">
              {funLine}
            </p>

            {/* Currently building */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col gap-2 p-4 rounded-xl glass-card border border-border"
            >
              <p className="font-body text-[10px] text-accent font-semibold uppercase tracking-widest">Currently building</p>
              {current.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="relative flex h-2 w-2 flex-shrink-0 mt-[5px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-body text-sm text-text-primary font-semibold">{item.project}</p>
                    <p className="font-body text-xs text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap pt-1">
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-bg transition-colors glass-card cursor-pointer"
              >
                <FiMessageSquare size={15} />
                Let&apos;s Talk
              </motion.button>
              <motion.button
                onClick={() => setCertOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary font-body font-semibold text-sm hover:border-accent hover:text-accent transition-colors glass-card cursor-pointer"
              >
                <FiAward size={15} />
                Certificates
              </motion.button>
            </div>

            <CertificatesModal isOpen={certOpen} onClose={() => setCertOpen(false)} />

          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
