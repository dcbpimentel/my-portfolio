import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import {
  SiFigma, SiCanva,
  SiTailwindcss, SiJavascript, SiTypescript, SiHtml5,
  SiAnthropic, SiVercel, SiNpm, SiXcode,
} from 'react-icons/si'
import { FaReact, FaGitAlt } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { FiPenTool, FiVideo, FiFilm, FiInstagram, FiScissors } from 'react-icons/fi'
import { skills, skillCategories } from '../data/skills'

const ICON_MAP = {
  SiFigma, SiCanva,
  FaReact, SiTailwindcss, SiJavascript, SiTypescript, SiHtml5,
  FaGitAlt, VscVscode, SiAnthropic, SiVercel, SiNpm, SiXcode,
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

// ── Mobile skill icon card ────────────────────────────────────────
const MobileSkillCard = ({ skill, index, catIdx }) => {
  const Icon = ICON_MAP[skill.iconName]
  const glowControls = useAnimation()
  const iconControls = useAnimation()

  const handleTap = () => {
    glowControls.start({
      opacity: [0, 1, 0],
      transition: { duration: 0.55, ease: 'easeOut' },
    })
    iconControls.start({
      scale: [1, 1.35, 1],
      filter: ['brightness(0.7)', 'brightness(2)', 'brightness(1)'],
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    })
  }

  return (
    <motion.div
      onTap={handleTap}
      initial={{ opacity: 0, scale: 0.75, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 18,
        delay: catIdx * 0.06 + index * 0.045,
      }}
      whileTap={{ scale: 0.88, transition: { type: 'spring', stiffness: 600, damping: 22 } }}
      className="relative glass-card flex flex-col items-center justify-center gap-2 p-3 rounded-xl aspect-square select-none overflow-hidden"
    >
      {/* Tap glow flash */}
      <motion.div
        animate={glowControls}
        initial={{ opacity: 0 }}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(232,255,77,0.24) 0%, transparent 72%)',
          border: '1px solid rgba(232,255,77,0.4)',
        }}
      />

      <motion.div
        animate={iconControls}
        className="relative z-10 text-accent/70 flex-shrink-0"
      >
        {Icon ? <Icon size={22} /> : <span className="w-5 h-5 rounded bg-border" />}
      </motion.div>

      <span className="relative z-10 font-body text-[10px] text-text-secondary text-center leading-tight">
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
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            {['Tech', 'Stack'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                className="inline-block mr-[0.25em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h2>
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

        {/* ── Mobile + Tablet: Grouped icon grid (hidden on lg+) ── */}
        <div className="flex flex-col gap-8 lg:hidden">
          {grouped.map(({ key, label, items }, catIdx) => (
            <div key={key} className="flex flex-col gap-3">
              <motion.p
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.38, ease: 'easeOut', delay: catIdx * 0.06 }}
                className="font-body text-xs text-accent uppercase tracking-widest font-semibold"
              >
                {label}
              </motion.p>
              <div className="grid grid-cols-4 gap-2.5">
                {items.map((skill, i) => (
                  <MobileSkillCard key={skill.name} skill={skill} index={i} catIdx={catIdx} />
                ))}
              </div>
            </div>
          ))}
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
