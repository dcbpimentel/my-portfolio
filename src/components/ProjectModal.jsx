import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi'
import ProjectCover from './ProjectCover'
import { useIsMobile } from '../hooks/useIsMobile'

const ProjectModal = ({ project, index = 0, onClose }) => {
  const isMobile = useIsMobile()
  const { id, title, description, tags, githubUrl, liveUrl, category, image, type } = project

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
          ? { bottom: 0, left: 0, right: 0, height: '92vh', borderRadius: '16px 16px 0 0' }
          : { inset: 0, margin: 'auto', width: '100%', maxWidth: '680px', maxHeight: '85vh', borderRadius: '16px' }
        }
      >
        {/* Cover / Image */}
        <div className="aspect-video w-full overflow-hidden flex-shrink-0 relative">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <ProjectCover id={id} index={index} title={title} category={category} />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
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

          {type === 'tryme' && (githubUrl !== '#' || liveUrl !== '#') && (
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              {githubUrl !== '#' && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors font-body text-sm glass-card"
                >
                  <FiGithub size={16} />
                  Code
                </a>
              )}
              {liveUrl !== '#' && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                  style={{ boxShadow: '0 4px 16px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.25)' }}
                >
                  <FiExternalLink size={16} />
                  Live
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default ProjectModal
