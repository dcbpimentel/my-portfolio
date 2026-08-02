import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import ProjectCover from './ProjectCover'
import { useIsMobile } from '../hooks/useIsMobile'

const CASE_STUDY_SECTIONS = [
  { key: 'problem', num: '01', label: 'The Problem' },
  { key: 'process', num: '02', label: 'What I Did'  },
  { key: 'outcome', num: '03', label: 'The Outcome' },
]

const ProjectModal = ({ project, index = 0, onClose }) => {
  const isMobile = useIsMobile()
  const { id, title, description, tags, githubUrl, liveUrl, category, image, type, caseStudy } = project

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const panelVariants = isMobile
    ? {
        hidden:  { y: '100%' },
        visible: { y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } },
        exit:    { y: '100%', transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } },
      }
    : {
        hidden:  { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', stiffness: 300, damping: 30 } },
        exit:    { opacity: 0, scale: 0.95, y: 20, transition: { type: 'tween', duration: 0.2, ease: 'easeIn' } },
      }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed z-50 overflow-hidden flex flex-col bg-surface border border-border shadow-2xl"
        style={isMobile
          ? { bottom: 0, left: 0, right: 0, top: 80, borderRadius: '16px 16px 0 0' }
          : { inset: 0, margin: 'auto', width: '100%', maxWidth: '680px', maxHeight: '85vh', borderRadius: '16px' }
        }
      >
        {/* Mobile: sticky header with drag handle + close button */}
        {isMobile && (
          <div className="flex-shrink-0 flex items-center justify-between px-4 pt-3 pb-2">
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: 'var(--color-surface2)', color: 'var(--color-text-secondary)' }}
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          </div>
        )}

        {/* Cover / Image */}
        <div className="aspect-video w-full overflow-hidden flex-shrink-0 relative">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <ProjectCover id={id} index={index} title={title} category={category} />
          )}
          {/* Desktop-only close button inside cover */}
          {!isMobile && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          <h2 className="font-display font-bold text-text-primary" style={{ fontSize: '24px' }}>
            {title}
          </h2>

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

          <p className="font-body text-text-secondary text-base leading-relaxed">
            {description}
          </p>

          {/* Case study sections */}
          {caseStudy && (
            <div className="flex flex-col gap-5 pt-1">
              <div style={{ height: '1px', background: 'var(--color-border)' }} />
              {CASE_STUDY_SECTIONS.map(({ key, num, label }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-body text-[11px] text-accent font-semibold tracking-widest">{num}</span>
                    <h4 className="font-display font-bold text-sm text-text-primary">{label}</h4>
                  </div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{caseStudy[key]}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.div>
    </>
  )
}

export default ProjectModal
