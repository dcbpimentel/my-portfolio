import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

// window.__introPlayed survives Vite HMR within the same page session;
// sessionStorage covers hard refreshes within the same browser session.
const alreadyPlayed = typeof window !== 'undefined' && (
  window.__introPlayed === true ||
  sessionStorage.getItem('intro-played') === 'true'
)

export default function IntroAnimation({ onRevealPortfolio, onComplete }) {
  const isMobile = useIsMobile()
  const [phase, setPhase]       = useState('playing')  // 'playing' | 'exiting'
  const [showSkip, setShowSkip] = useState(false)

  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Ref pattern keeps exit logic stable across re-renders and avoids double-fire
  const exitCalledRef = useRef(false)
  const doExitRef     = useRef(null)

  doExitRef.current = () => {
    if (exitCalledRef.current) return
    exitCalledRef.current = true
    setPhase('exiting')
    onRevealPortfolio?.()
    setTimeout(() => {
      if (typeof window !== 'undefined') window.__introPlayed = true
      sessionStorage.setItem('intro-played', 'true')
      onComplete?.()
    }, reducedMotion ? 350 : 480)
  }

  useEffect(() => {
    // Reduced-motion path: display wordmark briefly, no movement
    if (reducedMotion) {
      const t = setTimeout(() => doExitRef.current?.(), 600)
      return () => clearTimeout(t)
    }

    // Full animation path
    const t1 = setTimeout(() => setShowSkip(true), 800)
    const t2 = setTimeout(() => doExitRef.current?.(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, []) // runs once — correct, doExitRef holds the latest fn

  const orbSz = isMobile ? '200px' : '400px'

  const overlayStyle = {
    position:        'fixed',
    inset:           0,
    zIndex:          9999,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    background:      '#0A0A0A',
    overflow:        'hidden',
  }

  return (
    <motion.div
      aria-hidden="true"
      style={overlayStyle}
      initial={false}
      animate={phase === 'exiting' ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={phase === 'exiting'
        ? { duration: 0.4, ease: 'easeIn' }
        : { duration: 0 }
      }
    >
      {/* Background orbs — static, no animation to avoid Safari blur-repaint cost */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          top:          '-15%',
          right:        '-10%',
          width:        orbSz,
          height:       orbSz,
          borderRadius: '50%',
          background:   'rgba(232, 255, 77, 0.05)',
          filter:       'blur(80px)',
          pointerEvents:'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          bottom:       '-15%',
          left:         '-10%',
          width:        orbSz,
          height:       orbSz,
          borderRadius: '50%',
          background:   'rgba(232, 255, 77, 0.05)',
          filter:       'blur(80px)',
          pointerEvents:'none',
        }}
      />

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>

          {/* "dwyane" — fades + scales in */}
          <motion.span
            style={{
              fontFamily:  'Syne, sans-serif',
              fontWeight:  700,
              fontSize:    'clamp(2.25rem, 9vw, 4.5rem)',
              color:       '#F5F5F5',
              lineHeight:  1,
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

          {/* "." — springs in after the name settles — the signature beat */}
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

        </div>

        {/* Tagline */}
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
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: 'easeOut', delay: 1.8 }
          }
        >
          Works the way you expect it to.
        </motion.p>
      </div>

      {/* Skip button — appears at t=0.8s, subtle */}
      {showSkip && (
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
            tabIndex:   0,
          }}
        >
          Skip →
        </motion.button>
      )}
    </motion.div>
  )
}

// Export whether this session already has an intro so App.jsx can skip mounting
export { alreadyPlayed }
