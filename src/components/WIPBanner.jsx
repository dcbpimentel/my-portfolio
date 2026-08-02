import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const WIPBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('wip-banner-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('wip-banner-dismissed', '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 2.5 }}
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 9000,
          }}
        >
          <div
            style={{
              background: 'rgba(10,10,10,0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(232,255,77,0.12)',
            }}
            className="px-4 py-2.5 flex items-center justify-center gap-3"
          >
            {/* Pulsing dot */}
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>

            <p className="font-body text-xs text-white/60 text-center leading-snug">
              This portfolio is actively being built and improved.{' '}
              <span className="text-white/40">Some sections and features are still a work in progress.</span>
            </p>

            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="flex-shrink-0 text-white/30 hover:text-white/70 transition-colors ml-1"
            >
              <FiX size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WIPBanner
