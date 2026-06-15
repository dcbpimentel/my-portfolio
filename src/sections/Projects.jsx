import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import projects from '../data/projects'

const FILTERS = [
  { label: 'All',        value: 'all'      },
  { label: 'Mobile',     value: 'mobile'   },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Frontend',   value: 'frontend'  },
]

// Editorial cover themes — one per project id
const COVERS = {
  1: { from: '#071e1e', to: '#0d0d0d', dot: '#2dd4bf', label: 'Mobile'     },
  2: { from: '#1c1000', to: '#0d0d0d', dot: '#f59e0b', label: 'Full Stack' },
  3: { from: '#13072b', to: '#0d0d0d', dot: '#a78bfa', label: 'Desktop'    },
  4: { from: '#050f1f', to: '#0d0d0d', dot: '#60a5fa', label: 'Full Stack' },
  5: { from: '#0f1500', to: '#0d0d0d', dot: '#E8FF4D', label: 'Frontend'   },
  6: { from: '#001518', to: '#0d0d0d', dot: '#06b6d4', label: 'Full Stack' },
  7: { from: '#0a1500', to: '#0d0d0d', dot: '#84cc16', label: 'Frontend'   },
}

const ProjectCover = ({ id, index, title, category }) => {
  const theme = COVERS[id] ?? { from: '#111', to: '#0A0A0A', dot: '#E8FF4D', label: category }
  const num   = String(index + 1).padStart(2, '0')

  return (
    <div
      className="relative aspect-video overflow-hidden flex items-end"
      style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.dot}22 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ghost project number — watermark */}
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(5rem, 14vw, 8rem)', color: `${theme.dot}12` }}
      >
        {num}
      </span>

      {/* Top-right category badge */}
      <span
        className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-body font-semibold border"
        style={{ color: theme.dot, borderColor: `${theme.dot}40`, background: `${theme.dot}12` }}
      >
        {theme.label}
      </span>

      {/* Bottom title strip */}
      <div className="relative px-5 pb-4 pt-8 w-full bg-gradient-to-t from-black/60 to-transparent">
        <p className="font-display font-bold text-base text-white leading-tight line-clamp-1 drop-shadow">
          {title}
        </p>
      </div>
    </div>
  )
}

const ProjectCard = ({ project, index }) => {
  const { id, title, description, tags, githubUrl, liveUrl, featured, category } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className={`
        group flex flex-col rounded-xl border border-border bg-surface
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-shadow duration-300 overflow-hidden
        ${featured ? 'md:col-span-2' : ''}
      `}
    >
      {/* Editorial cover — replaces raw screenshots */}
      <ProjectCover id={id} index={index} title={title} category={category} />

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
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

        {/* Title */}
        <h3 className="font-display font-bold text-base text-text-primary leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Links — only shown when a real URL is provided */}
        {(githubUrl !== '#' || liveUrl !== '#') && (
          <div className="flex items-center gap-3 pt-1">
            {githubUrl !== '#' && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} GitHub`}
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors text-sm font-body"
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
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors text-sm font-body"
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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="py-section px-6">
      <div className="max-w-content mx-auto flex flex-col gap-block">

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
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-body border transition-colors duration-200
                ${activeFilter === value
                  ? 'bg-accent text-bg border-accent font-semibold'
                  : 'bg-transparent text-text-secondary border-border hover:border-accent hover:text-accent'}
              `}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects
