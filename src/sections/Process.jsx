import { motion } from 'framer-motion'
import { FiSearch, FiPenTool, FiCode, FiZap } from 'react-icons/fi'

const STEPS = [
  {
    num: '01',
    icon: FiSearch,
    title: 'Discover',
    desc: "Understanding the actual problem before jumping to solutions. Who uses this? What do they need? What's getting in their way?",
  },
  {
    num: '02',
    icon: FiPenTool,
    title: 'Design',
    desc: 'Wireframes, Figma prototypes, and iteration until it feels right. The solution should be obvious before a line of code is written.',
  },
  {
    num: '03',
    icon: FiCode,
    title: 'Build',
    desc: 'Turning designs into real, working interfaces with React and Tailwind. What I design is exactly what gets built — no fidelity lost.',
  },
  {
    num: '04',
    icon: FiZap,
    title: 'Ship',
    desc: 'Deploy, test, and keep improving. Real products live in the wild and evolve with the feedback of people actually using them.',
  },
]

const Process = () => (
  <section id="process" className="py-section px-6 relative overflow-hidden">


    <div className="max-w-content mx-auto relative z-10">

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-14">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-body text-sm text-accent uppercase tracking-widest font-medium"
        >
          How I Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display font-bold text-4xl md:text-5xl text-text-primary"
        >
          My Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-body text-text-secondary text-base max-w-md"
        >
          Four steps I follow on every project — from the first question to the last deploy.
        </motion.p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">

        {/* Connecting line — desktop only */}
        <div
          className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] pointer-events-none"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-border) 15%, var(--color-border) 85%, transparent)' }}
          aria-hidden="true"
        />

        {STEPS.map(({ num, icon: Icon, title, desc }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            className="glass-card flex flex-col gap-4 p-5 rounded-2xl relative"
          >
            {/* Icon bubble */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ background: 'rgba(232,255,77,0.08)', border: '1px solid rgba(232,255,77,0.15)' }}
              >
                <Icon size={18} className="text-accent" />
              </div>
              <span
                className="font-display font-bold"
                style={{ fontSize: '13px', color: 'var(--color-accent)', opacity: 0.5, letterSpacing: '0.05em' }}
              >
                {num}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-display font-bold text-base text-text-primary">{title}</h3>
              <p className="font-body text-xs text-text-secondary leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Process
