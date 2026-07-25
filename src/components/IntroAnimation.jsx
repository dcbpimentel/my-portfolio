import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const alreadyPlayed = typeof window !== 'undefined' && (
  window.__introPlayed === true ||
  sessionStorage.getItem('intro-played') === 'true'
)

// CSS keyframes injected once
const STYLE = `
@keyframes _intro-fade-in {
  from { opacity: 0; transform: scale(0.93); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes _intro-dot-pop {
  0%   { opacity: 0; transform: scale(0); }
  70%  { transform: scale(1.18); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes _intro-sub-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
`

let styleInjected = false
function ensureStyle() {
  if (styleInjected || typeof document === 'undefined') return
  styleInjected = true
  const el = document.createElement('style')
  el.textContent = STYLE
  document.head.appendChild(el)
}

export default function IntroAnimation({ onRevealPortfolio, onComplete }) {
  const isMobile = useIsMobile()
  const [isExiting, setIsExiting]   = useState(false)
  const [exitTarget, setExitTarget] = useState(null)
  const [showSkip, setShowSkip]     = useState(false)

  const wordmarkRef   = useRef(null)
  const exitCalledRef = useRef(false)
  const doExitRef     = useRef(null)

  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  doExitRef.current = () => {
    if (exitCalledRef.current) return
    exitCalledRef.current = true
    setIsExiting(true)
    onRevealPortfolio?.()

    if (!reducedMotion) {
      requestAnimationFrame(() => {
        const navLogo  = document.querySelector('[data-nav-logo]')
        const wordmark = wordmarkRef.current
        if (navLogo && wordmark) {
          const lr = navLogo.getBoundingClientRect()
          const wr = wordmark.getBoundingClientRect()
          setExitTarget({
            x:     (lr.left + lr.width  / 2) - (wr.left + wr.width  / 2),
            y:     (lr.top  + lr.height / 2) - (wr.top  + wr.height / 2),
            scale: lr.height / wr.height,
          })
        }
      })
    }

    setTimeout(() => {
      if (typeof window !== 'undefined') window.__introPlayed = true
      sessionStorage.setItem('intro-played', 'true')
      onComplete?.()
    }, reducedMotion ? 300 : 600)
  }

  useEffect(() => {
    ensureStyle()
    if (reducedMotion) {
      const t = setTimeout(() => doExitRef.current?.(), 600)
      return () => clearTimeout(t)
    }
    const t1 = setTimeout(() => setShowSkip(true), 800)
    const t2 = setTimeout(() => doExitRef.current?.(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const orbSz = isMobile ? '200px' : '400px'

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}>

      {/* Background + orbs — single motion element, no blur-inside-animated-parent issue */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: '#0A0A0A' }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeIn' }}
      >
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: orbSz, height: orbSz, borderRadius: '50%', background: 'rgba(232,255,77,0.05)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: orbSz, height: orbSz, borderRadius: '50%', background: 'rgba(232,255,77,0.05)', filter: 'blur(80px)' }} />
      </motion.div>

      {/* Center content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>

        {/* Wordmark — single motion.div, inner spans use CSS animations (no nested FM) */}
        <motion.div
          ref={wordmarkRef}
          style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1, willChange: 'transform, opacity' }}
          animate={exitTarget
            ? { x: exitTarget.x, y: exitTarget.y, scale: exitTarget.scale, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <span style={{
            fontFamily:    'Syne, sans-serif',
            fontWeight:    700,
            fontSize:      'clamp(2.25rem, 9vw, 4.5rem)',
            color:         '#F5F5F5',
            letterSpacing: '-0.02em',
            lineHeight:    1,
            animation:     reducedMotion ? 'none' : '_intro-fade-in 0.7s ease-out 0.6s both',
          }}>
            dwyane
          </span>
          <span style={{
            fontFamily:  'Syne, sans-serif',
            fontWeight:  700,
            fontSize:    'clamp(2.25rem, 9vw, 4.5rem)',
            color:       '#E8FF4D',
            lineHeight:  1,
            display:     'inline-block',
            animation:   reducedMotion ? 'none' : '_intro-dot-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.4s both',
          }}>
            .
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={isExiting
            ? { duration: 0.18, ease: 'easeIn' }
            : { duration: 0 }
          }
          style={{
            fontFamily:    'DM Sans, sans-serif',
            fontWeight:    300,
            fontSize:      isMobile ? '13px' : '16px',
            letterSpacing: '0.05em',
            color:         '#888888',
            margin:        0,
            animation:     reducedMotion ? 'none' : '_intro-sub-in 0.5s ease-out 1.8s both',
          }}
        >
          Works the way you expect it to.
        </motion.p>
      </div>

      {/* Skip */}
      {showSkip && !isExiting && (
        <motion.button
          onClick={() => doExitRef.current?.()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.3 }}
          style={{
            position:   'absolute',
            bottom:     '32px',
            right:      '32px',
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize:   '12px',
            color:      '#555555',
            padding:    '10px 14px',
          }}
        >
          Skip →
        </motion.button>
      )}
    </div>
  )
}

export { alreadyPlayed }
