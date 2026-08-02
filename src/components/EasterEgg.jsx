import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { text: '> initializing dwyane.exe ...', type: 'cmd' },
  { text: '[SYS] identity confirmed.', type: 'dim' },
  { text: '' },
  { text: '  name          Dwyane Clark Pimentel' },
  { text: '  location      Davao City, PH  🌴' },
  { text: '  role          UI/UX · Vibe Coder · Videographer' },
  { text: '  status        open to opportunities  ✓', type: 'accent' },
  { text: '  coffee_level  ████████░░  87%' },
  { text: '  bugs_squashed ∞' },
  { text: '  bugs_created  ∞ – 1  (net positive)' },
  { text: '' },
  { text: '[SECRET] you found the easter egg.', type: 'dim' },
  { text: "         not many people get here.", type: 'dim' },
  { text: "         i think we'd get along.", type: 'dim' },
  { text: '' },
  { text: '> reach out →  dwyanepimentel@gmail.com', type: 'cmd' },
  { text: '> esc / click anywhere to close_', type: 'dim' },
]

const DELAYS = [0, 280, 380, 520, 640, 780, 930, 1080, 1220, 1360, 1450, 1620, 1800, 1970, 2080, 2300, 2520]

export default function EasterEgg({ onClose }) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const timers = DELAYS.map((delay, i) => setTimeout(() => setVisible(i + 1), delay))
    const autoClose = setTimeout(onClose, 9000)
    return () => { timers.forEach(clearTimeout); clearTimeout(autoClose) }
  }, [onClose])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 flex items-end justify-center p-4 md:p-10"
      style={{ zIndex: 9500, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: '#0A0A0A',
          border: '1px solid rgba(232,255,77,0.18)',
          boxShadow: '0 0 80px rgba(232,255,77,0.07), 0 24px 64px rgba(0,0,0,0.7)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,95,87,0.65)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,188,46,0.65)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(40,200,64,0.65)' }} />
          </div>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginLeft: '8px', letterSpacing: '0.03em' }}>
            dwyane.sh · bash
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 flex flex-col" style={{ minHeight: '260px' }}>
          {LINES.slice(0, visible).map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: '"DM Mono", "Courier New", monospace',
                fontSize: '12.5px',
                lineHeight: '1.7',
                whiteSpace: 'pre',
                color: line.type === 'cmd'    ? '#E8FF4D'
                     : line.type === 'dim'    ? 'rgba(255,255,255,0.32)'
                     : line.type === 'accent' ? '#E8FF4D'
                     : 'rgba(255,255,255,0.72)',
              }}
            >
              {line.text || ' '}
            </div>
          ))}

          {visible < LINES.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'steps(1)' }}
              style={{ display: 'inline-block', width: '7px', height: '13px', background: '#E8FF4D', verticalAlign: 'text-bottom', marginTop: '2px' }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
