import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiBookOpen, FiDownload, FiMessageSquare, FiAward } from 'react-icons/fi'
import { aboutContent } from '../data/skills'
import CertificatesModal from '../components/CertificatesModal'

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
    <section id="about" className="py-section px-6">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left: Photo placeholder ── */}
          <motion.div {...slideIn('left')} className="flex justify-center md:justify-start">
            <div className="relative w-72 md:w-full max-w-sm">

              {/* Photo card */}
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-border">
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

            {/* What I do */}
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm text-text-secondary uppercase tracking-widest">
                What I do
              </p>
              <ul className="flex flex-col gap-2.5">
                {whatIDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheck size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-text-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fun line */}
            <p className="font-body text-xs text-text-secondary italic border-l-2 border-accent pl-3 leading-relaxed">
              {funLine}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap pt-1">
              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ boxShadow: '0 4px 16px rgba(232, 255, 77, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' }}
              >
                <FiDownload size={15} />
                Download CV
              </motion.a>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-bg transition-colors"
                style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)' }}
              >
                <FiMessageSquare size={15} />
                Let&apos;s Talk
              </motion.button>
              <motion.button
                onClick={() => setCertOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary font-body font-semibold text-sm hover:border-accent hover:text-accent transition-colors"
                style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)' }}
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
