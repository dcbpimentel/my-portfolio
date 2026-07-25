import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiFigma, SiFramer,
  SiTailwindcss, SiJavascript, SiTypescript, SiHtml5,
  SiAnthropic, SiVercel, SiNpm,
} from 'react-icons/si'
import { FaReact, FaGitAlt } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { FiPenTool, FiVideo, FiFilm, FiInstagram, FiScissors } from 'react-icons/fi'
import { skills, skillCategories } from '../data/skills'

const ICON_MAP = {
  SiFigma, SiAdobexd: FiPenTool, SiFramer,
  FaReact, SiTailwindcss, SiJavascript, SiTypescript, SiHtml5,
  FaGitAlt, VscVscode, SiAnthropic, SiVercel, SiNpm,
  FiVideo, FiFilm, FiInstagram, FiScissors,
}

// Desktop: pre-grouped with global stagger index
const grouped = skillCategories.map(cat => ({
  ...cat,
  items: skills.filter(s => s.category === cat.key),
}))

const globalIndexOf = (() => {
  let offset = 0
  const map = {}
  grouped.forEach(({ key, items }) => {
    items.forEach((s, i) => { map[`${key}-${i}`] = offset + i })
    offset += items.length
  })
  return map
})()

// ── Desktop skill card ────────────────────────────────────────────
const SkillCard = ({ skill, globalIndex }) => {
  const Icon = ICON_MAP[skill.iconName]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: globalIndex * 0.02 }}
      className="glass-card group flex flex-col items-center gap-3 p-4 rounded-xl cursor-default"
    >
      {Icon
        ? <Icon size={28} className="text-text-secondary group-hover:text-accent transition-colors duration-200" />
        : <span className="w-7 h-7 rounded bg-border" />
      }
      <span className="font-body text-xs text-text-secondary text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  )
}

// ── Mobile/tablet skill pill ──────────────────────────────────────
const SkillPill = ({ skill, index }) => {
  const Icon = ICON_MAP[skill.iconName]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2, ease: 'easeOut' }}
      whileTap={{ scale: 1.1, transition: { type: 'spring', stiffness: 600, damping: 20 } }}
      className="glass-card flex items-center gap-2 px-3 py-2.5 rounded-full cursor-pointer select-none"
    >
      {Icon && <Icon size={15} className="text-accent flex-shrink-0" />}
      <span className="font-body text-xs text-text-secondary whitespace-nowrap">{skill.name}</span>
    </motion.div>
  )
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillCategories[0]?.key ?? '')

  const tabSkills = skills.filter(s => s.category === activeTab)

  return (
    <section
      id="skills"
      className="py-section px-6 relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, var(--dot-color) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Crossfade gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 28%, transparent 72%, var(--color-bg) 100%)' }}
      />

      <div className="relative max-w-content mx-auto flex flex-col gap-block">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-4xl md:text-5xl text-text-primary"
          >
            Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-text-secondary text-base max-w-prose"
          >
            Tools I design with, build with, and reach for first.
          </motion.p>
        </div>

        {/* ── Mobile + Tablet: Tab UI (hidden on lg+) ── */}
        <div className="flex flex-col gap-5 lg:hidden">
          {/* Scrollable tab row */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', WebkitScrollbar: 'none' }}
          >
            {skillCategories.map(cat => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`
                  flex-none px-5 py-2 rounded-full font-body text-sm font-medium
                  whitespace-nowrap transition-colors duration-200 cursor-pointer
                  min-h-[44px]
                  ${activeTab === cat.key
                    ? 'bg-accent text-bg'
                    : 'border border-border text-text-secondary hover:border-accent hover:text-accent'}
                `}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Animated pill grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex flex-wrap gap-2"
            >
              {tabSkills.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Desktop: Grouped grid (hidden below lg) ── */}
        <div className="hidden lg:flex flex-col gap-block">
          {grouped.map(({ key, label, items }) => (
            <div key={key} className="flex flex-col gap-4">
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-body text-sm text-accent uppercase tracking-widest font-medium"
              >
                {label}
              </motion.p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    globalIndex={globalIndexOf[`${key}-${i}`]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills
