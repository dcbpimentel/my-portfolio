import { motion } from 'framer-motion'
import {
  SiFigma, SiFramer,
  SiTailwindcss, SiJavascript, SiTypescript, SiHtml5,
  SiAnthropic, SiVercel, SiNpm,
} from 'react-icons/si'
import { FaReact, FaGitAlt } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { FiPenTool, FiVideo, FiFilm, FiInstagram, FiScissors } from 'react-icons/fi'
import { skills, skillCategories } from '../data/skills'

// SiAdobexd is not in this version of react-icons/si — using FiPenTool as fallback
const ICON_MAP = {
  SiFigma, SiAdobexd: FiPenTool, SiFramer,
  FaReact, SiTailwindcss, SiJavascript, SiTypescript, SiHtml5,
  FaGitAlt, VscVscode, SiAnthropic, SiVercel, SiNpm,
  FiVideo, FiFilm, FiInstagram, FiScissors,
}

// Pre-group by category so we can stagger globally
const grouped = skillCategories.map(cat => ({
  ...cat,
  items: skills.filter(s => s.category === cat.key),
}))

// Flat index offset per group for consistent global stagger
const globalIndexOf = (() => {
  let offset = 0
  const map = {}
  grouped.forEach(({ key, items }) => {
    items.forEach((s, i) => { map[`${key}-${i}`] = offset + i })
    offset += items.length
  })
  return map
})()

const SkillCard = ({ skill, globalIndex }) => {
  const Icon = ICON_MAP[skill.iconName]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: globalIndex * 0.04 }}
      style={{
        background:           'rgba(255, 255, 255, 0.04)',
        backdropFilter:       'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border:               '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow:            '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      }}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl cursor-default"
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

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-section px-6 relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(232,255,77,0.07) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Fade edges so the dot grid doesn't bleed into adjacent sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />

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

        {/* Grouped skill grids */}
        {grouped.map(({ key, label, items }) => (
          <div key={key} className="flex flex-col gap-4">
            {/* Category label */}
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-body text-sm text-accent uppercase tracking-widest font-medium"
            >
              {label}
            </motion.p>

            {/* Cards */}
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
    </section>
  )
}

export default Skills
