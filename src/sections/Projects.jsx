import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projects from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import ProjectCover from '../components/ProjectCover'
import ProjectModal from '../components/ProjectModal'

const TABS = [
  { label: 'Personal', value: 'personal' },
  { label: 'School',   value: 'school'   },
  { label: 'Try Me',   value: 'tryme'    },
]

const ProjectCard = ({ project, index, inCarousel, onClick }) => {
  const { id, title, subtitle, description, tags, category } = project
  const reduced = useReducedMotion()

  return (
    <motion.div
      onClick={onClick}
      initial={reduced || inCarousel ? false : { opacity: 0, y: 24, rotateX: 8 }}
      whileInView={inCarousel ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      whileHover={inCarousel ? undefined : {
        y: -4, scale: 1.01,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      viewport={inCarousel ? undefined : { once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 60, damping: 20, delay: index * 0.05 }}
      style={{ transformOrigin: 'center bottom', cursor: 'pointer' }}
      className="glass-card flex flex-col rounded-2xl overflow-hidden h-full"
    >
      <ProjectCover id={id} index={index} title={title} category={category} />

      <div className="flex flex-col flex-1 p-5 gap-2.5">
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

        {subtitle && (
          <p className="font-body text-sm text-accent/80 leading-snug -mt-0.5">
            {subtitle}
          </p>
        )}

        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        <span className="text-accent font-body text-sm font-medium pt-1">
          View project →
        </span>
      </div>
    </motion.div>
  )
}

// ── Mobile Carousel (CSS scroll-snap) ────────────────────────────
const ProjectCarousel = ({ items, onCardClick }) => {
  const trackRef  = useRef(null)
  const cardRefs  = useRef([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(0)
    if (trackRef.current) trackRef.current.scrollLeft = 0
  }, [items])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observers = items.map((_, i) => {
      const card = cardRefs.current[i]
      if (!card) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && entry.intersectionRatio >= 0.55) setCurrent(i) },
        { threshold: 0.55, root: track }
      )
      obs.observe(card)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [items])

  const scrollToCard = (i) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
    >
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
            <ProjectCard
              project={project}
              index={index}
              inCarousel
              onClick={() => onCardClick(project, index)}
            />
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5" aria-hidden="true">
          {items.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => scrollToCard(i)}
              animate={{ width: i === current ? 20 : 8, opacity: i === current ? 1 : 0.35 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="h-2 rounded-full bg-accent cursor-pointer"
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Try Me feature card ───────────────────────────────────────────
const TryMeCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 60, damping: 20 }}
    className="glass-card rounded-2xl p-6 md:p-8"
  >
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex flex-col gap-4 flex-1">
        <h3 className="font-display font-bold text-2xl text-text-primary">
          {project.title}
        </h3>
        <p className="font-body text-text-secondary text-base leading-relaxed">
          {project.trymeDescription || project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-bg text-text-secondary text-xs font-body border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="w-full md:w-auto flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-bg font-body font-semibold text-base whitespace-nowrap flex-shrink-0"
        style={{ boxShadow: '0 4px 20px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.25)' }}
      >
        Try it →
      </motion.a>
    </div>
  </motion.div>
)

// ── Section ───────────────────────────────────────────────────────
const Projects = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [selected, setSelected] = useState(null) // { project, index }

  const tabProjects = useMemo(() => projects.filter(p => p.type === activeTab), [activeTab])

  return (
    <section id="projects" className="py-section overflow-hidden">
      <div className="max-w-content mx-auto px-6 flex flex-col gap-block">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            {['My', 'Projects'].map((word, i) => (
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
            A mix of design systems, interfaces, and React builds. Things I actually finished.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            {TABS.map(({ label, value }) => (
              <motion.button
                key={value}
                onClick={() => setActiveTab(value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`
                  px-4 py-2 rounded-full text-sm font-body border transition-colors duration-200 cursor-pointer min-h-[44px]
                  ${activeTab === value
                    ? 'bg-accent text-bg border-accent font-semibold'
                    : 'bg-transparent text-text-secondary border-border hover:border-accent hover:text-accent'}
                `}
              >
                {label}
              </motion.button>
            ))}
          </div>

          {/* School note */}
          <AnimatePresence>
            {activeTab === 'school' && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="font-body text-text-secondary text-[13px] overflow-hidden"
                style={{ fontWeight: 300 }}
              >
                Projects built during my IT coursework at AdDU.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Try Me tab — feature card layout */}
      {activeTab === 'tryme' && (
        <div className="max-w-content mx-auto px-6 mt-6 flex flex-col gap-4">
          {tabProjects.map(project => (
            <TryMeCard key={project.id} project={project} />
          ))}
          <p
            className="text-center font-body text-text-secondary text-[13px]"
            style={{ fontWeight: 300 }}
          >
            More free tools coming soon.
          </p>
        </div>
      )}

      {/* Personal / School — mobile carousel + desktop grid */}
      {activeTab !== 'tryme' && (
        <>
          <div className="mt-6 md:hidden">
            <ProjectCarousel
              key={activeTab}
              items={tabProjects}
              onCardClick={(project, index) => setSelected({ project, index })}
            />
          </div>

          <div className="max-w-content mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                style={{ perspective: '1200px' }}
              >
                {tabProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelected({ project, index })}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.project.id}
            project={selected.project}
            index={selected.index}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
