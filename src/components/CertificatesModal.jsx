import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiExternalLink, FiAward } from 'react-icons/fi'
import certificates from '../data/certificates'

// Category badge colors
const CATEGORY_COLORS = {
  Networking:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Cybersecurity: 'bg-red-500/10 text-red-400 border-red-500/20',
  Event:         'bg-accent/10 text-accent border-accent/20',
}

const CertificateCard = ({ cert, onView }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-bg hover:border-accent transition-colors duration-200"
  >
    {/* Icon area */}
    <div className="flex items-center justify-center h-24 rounded-lg bg-surface border border-border group-hover:border-accent/40 transition-colors overflow-hidden">
      {cert.type === 'image' ? (
        <img
          src={cert.file}
          alt={cert.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <FiAward size={36} className="text-text-secondary group-hover:text-accent transition-colors" />
      )}
    </div>

    {/* Info */}
    <div className="flex flex-col gap-1.5 flex-1">
      <span className={`self-start px-2 py-0.5 rounded-md border text-xs font-body font-medium ${CATEGORY_COLORS[cert.category] ?? 'bg-surface text-text-secondary border-border'}`}>
        {cert.category}
      </span>
      <h3 className="font-display font-bold text-sm text-text-primary leading-snug">
        {cert.title}
      </h3>
      <p className="font-body text-xs text-text-secondary">{cert.issuer}</p>
    </div>

    {/* Actions */}
    <div className="flex gap-2 pt-1">
      <button
        onClick={() => onView(cert)}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-bg font-body font-semibold text-xs hover:opacity-90 transition-opacity"
      >
        <FiExternalLink size={13} />
        View
      </button>
      <a
        href={cert.file}
        download
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
        aria-label="Download"
      >
        <FiDownload size={14} />
      </a>
    </div>
  </motion.div>
)

const Viewer = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-sm flex flex-col"
  >
    {/* Viewer header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
      <div>
        <p className="font-display font-bold text-text-primary text-sm">{cert.title}</p>
        <p className="font-body text-xs text-text-secondary">{cert.issuer}</p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={cert.file}
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors text-sm font-body"
        >
          <FiDownload size={14} />
          Download
        </a>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
          aria-label="Close viewer"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-hidden p-4">
      {cert.type === 'image' ? (
        <img
          src={cert.file}
          alt={cert.title}
          className="w-full h-full object-contain rounded-xl"
        />
      ) : (
        <iframe
          src={cert.file}
          title={cert.title}
          className="w-full h-full rounded-xl border border-border"
        />
      )}
    </div>
  </motion.div>
)

const CertificatesModal = ({ isOpen, onClose }) => {
  const [viewing, setViewing] = useState(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (viewing) setViewing(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewing, onClose])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-x-4 top-16 bottom-4 md:inset-x-8 lg:inset-x-16 z-50 flex flex-col rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
              <div>
                <h2 className="font-display font-bold text-xl text-text-primary">Certificates</h2>
                <p className="font-body text-sm text-text-secondary mt-0.5">
                  {certificates.length} credentials earned
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {certificates.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} onView={setViewing} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificate viewer (layered on top) */}
          <AnimatePresence>
            {viewing && (
              <Viewer cert={viewing} onClose={() => setViewing(null)} />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default CertificatesModal
