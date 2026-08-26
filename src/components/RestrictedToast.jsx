import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLock } from 'react-icons/fi'

const RestrictedToast = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer
    const handler = () => {
      setShow(true)
      clearTimeout(timer)
      timer = setTimeout(() => setShow(false), 3000)
    }
    window.addEventListener('restricted-click', handler)
    return () => {
      window.removeEventListener('restricted-click', handler)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-full glass-card border border-border shadow-xl">
            <FiLock size={13} className="text-accent flex-shrink-0" />
            <span className="font-body text-sm text-text-primary whitespace-nowrap">
              This link isn&apos;t public yet. Check back soon.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RestrictedToast
