import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import projects from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'

const FILTERS = [
  { label: 'All',        value: 'all'      },
  { label: 'Mobile',     value: 'mobile'   },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Frontend',   value: 'frontend'  },
]

const COVERS = {
  1: { from: '#071e1e', to: '#0d0d0d', dot: '#2dd4bf', label: 'Mobile'     },
  2: { from: '#1c1000', to: '#0d0d0d', dot: '#f59e0b', label: 'Full Stack' },
  3: { from: '#13072b', to: '#0d0d0d', dot: '#a78bfa', label: 'Desktop'    },
  4: { from: '#050f1f', to: '#0d0d0d', dot: '#60a5fa', label: 'Full Stack' },
  5: { from: '#0f1500', to: '#0d0d0d', dot: '#E8FF4D', label: 'Frontend'   },
  6: { from: '#001518', to: '#0d0d0d', dot: '#06b6d4', label: 'Full Stack' },
  7: { from: '#0a1500', to: '#0d0d0d', dot: '#84cc16', label: 'Frontend'   },
  8: { from: '#001a0d', to: '#0d0d0d', dot: '#10b981', label: 'Full Stack' },
  9: { from: '#1a0800', to: '#0d0d0d', dot: '#f97316', label: 'Full Stack' },
}

const ProjectCover = ({ id, index, title, category }) => {
  const theme = COVERS[id] ?? { from: '#111', to: '#0A0A0A', dot: '#E8FF4D', label: category }
  const num   = String(index + 1).padStart(2, '0')

  return (
    <div
      className="relative aspect-video overflow-hidden flex items-end"
      style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.dot}22 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(5rem, 14vw, 8rem)', color: `${theme.dot}12` }}
      >
        {num}
      </span>
      <span
        className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-body font-semibold border"
        style={{ color: theme.dot, borderColor: `${theme.dot}40`, background: `${theme.dot}12` }}
      >
        {theme.label}
      </span>
      <div className="relative px-5 pb-4 pt-8 w-full bg-gradient-to-t from-black/60 to-transparent">
        <p className="font-display font-bold text-base text-white leading-tight line-clamp-1 drop-shadow">
          {title}
        </p>
      </div>
    </div>
  )
}

// Card shared between grid and carousel views
const ProjectCard = ({ project, index, inCarousel }) => {
  const { id, title, description, tags, githubUrl, liveUrl, featured, category } = project
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced || inCarousel ? false : { opacity: 0, y: 24, rotateX: 8 }}
      whileInView={inCarousel ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      whileHover={inCarousel ? undefined : {
        y: -6, scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      viewport={inCarousel ? undefined : { once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 60, damping: 20, delay: index * 0.05 }}
      style={{ transformOrigin: 'center bottom' }}
      className={`glass-card flex flex-col rounded-2xl overflow-hidden h-full
        ${!inCarousel && featured ? 'md:col-span-1 lg:col-span-1' : ''}
      `}
    >
      <ProjectCover id={id} index={index} title={title} category={category} />

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-bg text-text-secondary text-xs font-body border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display font-bold text-base text-text-primary leading-snug">
          {title}
        </h3>

        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {(githubUrl !== '#' || liveUrl !== '#') && (
          <div className="flex items-center gap-3 pt-1">
            {githubUrl !== '#' && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} GitHub`}
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors text-sm font-body min-h-[44px]"
              >
                <FiGithub size={16} />
                <span>Code</span>
              </a>
            )}
            {liveUrl !== '#' && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live site`}
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors text-sm font-body min-h-[44px]"
              >
                <FiExternalLink size={16} />
                <span>Live</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Mobile Carousel ───────────────────────────────────────────────
const ProjectCarousel = ({ items }) => {
  const trackRef   = useRef(null)
  const cardRefs   = useRef([])
  const [current, setCurrent] = useState(0)

  // Reset current when items change (filter switch)
  useEffect(() => {
    setCurrent(0)
    if (trackRef.current) trackRef.current.scrollLeft = 0
  }, [items])

  // IntersectionObserver to track active card
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observers = []
    items.forEach((_, i) => {
      const card = cardRefs.current[i]
      if (!card) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) setCurrent(i)
        },
        { threshold: 0.55, root: track }
      )
      obs.observe(card)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [items])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
    >
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="carousel-track flex gap-4"
        style={{ paddingInline: '7.5vw' }}
      >
        {items.map((project, index) => (
          <div
            key={project.id}
            ref={el => { cardRefs.current[index] = el }}
            className="flex-shrink-0 snap-center"
            style={{ width: '85vw' }}
          >
            <ProjectCard project={project} index={index} inCarousel />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5" aria-hidden="true">
          {items.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width:   i === current ? 20 : 8,
                opacity: i === current ? 1 : 0.35,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="h-2 rounded-full bg-accent"
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="py-section overflow-hidden">
      <div className="max-w-content mx-auto px-6 flex flex-col gap-block">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-4xl md:text-5xl text-text-primary"
          >
            My Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-text-secondary text-base max-w-prose"
          >
            A mix of design systems, interfaces, and React builds. Things I actually finished.
          </motion.p>
        </div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center flex-wrap gap-2"
        >
          {FILTERS.map(({ label, value }) => (
            <motion.button
              key={value}
              onClick={() => setActiveFilter(value)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className={`
                px-4 py-2 rounded-full text-sm font-body border transition-colors duration-200 cursor-pointer min-h-[44px]
                ${activeFilter === value
                  ? 'bg-accent text-bg border-accent font-semibold'
                  : 'bg-transparent text-text-secondary border-border hover:border-accent hover:text-accent'}
              `}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

      </div>

      {/* Mobile carousel — full-bleed, no container padding */}
      <div className="mt-6 md:hidden">
        <ProjectCarousel key={activeFilter} items={filtered} />
      </div>

      {/* Tablet + desktop grid */}
      <div className="max-w-content mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
            style={{ perspective: '1200px' }}
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects
