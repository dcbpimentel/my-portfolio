import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const alreadyPlayed = typeof window !== 'undefined' && (
  window.__introPlayed === true ||
  sessionStorage.getItem('intro-played') === 'true'
)

export default function IntroAnimation({ onRevealPortfolio, onComplete }) {
  const isMobile = useIsMobile()
  const [phase, setPhase]       = useState('playing')
  const [showSkip, setShowSkip] = useState(false)
  const [exitTarget, setExitTarget] = useState(null)

  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const wordmarkRef    = useRef(null)
  const exitCalledRef  = useRef(false)
  const doExitRef      = useRef(null)

  doExitRef.current = () => {
    if (exitCalledRef.current) return
    exitCalledRef.current = true
    setPhase('exiting')
    onRevealPortfolio?.()

    // Calculate fly target after one frame so layout is stable
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
    }, reducedMotion ? 350 : 600)
  }

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => doExitRef.current?.(), 600)
      return () => clearTimeout(t)
    }
    const t1 = setTimeout(() => setShowSkip(true), 800)
    const t2 = setTimeout(() => doExitRef.current?.(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const orbSz = isMobile ? '200px' : '400px'
  const isExiting = phase === 'exiting'

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}
    >
      {/* Background — fades out independently */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: '#0A0A0A' }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeIn' }}
      />

      {/* Orbs — fade with background */}
      <motion.div
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.28, ease: 'easeIn' }}
      >
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: orbSz, height: orbSz, borderRadius: '50%', background: 'rgba(232,255,77,0.05)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: orbSz, height: orbSz, borderRadius: '50%', background: 'rgba(232,255,77,0.05)', filter: 'blur(80px)' }} />
      </motion.div>

      {/* Centered content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>

        {/* Wordmark — flies to nav logo on exit */}
        <motion.div
          ref={wordmarkRef}
          style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}
          animate={exitTarget
            ? { x: exitTarget.x, y: exitTarget.y, scale: exitTarget.scale, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            style={{
              fontFamily:    'Syne, sans-serif',
              fontWeight:    700,
              fontSize:      'clamp(2.25rem, 9vw, 4.5rem)',
              color:         '#F5F5F5',
              lineHeight:    1,
              letterSpacing: '-0.02em',
            }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: 'easeOut', delay: 0.6 }
            }
          >
            dwyane
          </motion.span>

          <motion.span
            style={{
              fontFamily:  'Syne, sans-serif',
              fontWeight:  700,
              fontSize:    'clamp(2.25rem, 9vw, 4.5rem)',
              color:       '#E8FF4D',
              lineHeight:  1,
              display:     'inline-block',
            }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 500, damping: 18, delay: 1.4 }
            }
          >
            .
          </motion.span>
        </motion.div>

        {/* Tagline — fades out on exit */}
        <motion.p
          style={{
            fontFamily:    'DM Sans, sans-serif',
            fontWeight:    300,
            fontSize:      isMobile ? '13px' : '16px',
            letterSpacing: '0.05em',
            color:         '#888888',
            margin:        0,
          }}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: isExiting ? 0 : 1, y: 0 }}
          transition={reducedMotion
            ? { duration: 0 }
            : isExiting
              ? { duration: 0.18, ease: 'easeIn' }
              : { duration: 0.5, ease: 'easeOut', delay: 1.8 }
          }
        >
          Works the way you expect it to.
        </motion.p>
      </div>

      {/* Skip button */}
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
