import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'

const CustomCursor = () => {
  const [visible,    setVisible]    = useState(false)
  const [hovered,    setHovered]    = useState(false)
  const [btnRect,    setBtnRect]    = useState(null)
  const activeEl  = useRef(null)
  const isTouch   = useRef(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const cursorX = useSpring(mouseX, { stiffness: 380, damping: 36, mass: 0.5 })
  const cursorY = useSpring(mouseY, { stiffness: 380, damping: 36, mass: 0.5 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) {
      isTouch.current = true
      return
    }

    const captureRect = (el) => {
      const r  = el.getBoundingClientRect()
      const br = window.getComputedStyle(el).borderRadius
      setBtnRect({ top: r.top, left: r.left, width: r.width, height: r.height, borderRadius: br })
    }

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
      if (activeEl.current) captureRect(activeEl.current)
    }

    const onOver = (e) => {
      const el = e.target.closest(INTERACTIVE)
      if (el) {
        activeEl.current = el
        setHovered(true)
        captureRect(el)
      }
    }

    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        activeEl.current = null
        setHovered(false)
        setBtnRect(null)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', () => setVisible(false))
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout',  onOut,  { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', () => setVisible(false))
      document.documentElement.removeEventListener('mouseenter', () => setVisible(true))
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [])

  if (isTouch.current) return null

  return (
    <>
      {/* Default pill cursor — disappears when over a button */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: visible && !hovered ? 0.38 : 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          x:             cursorX,
          y:             cursorY,
          translateX:    '-50%',
          translateY:    '-50%',
          width:         10,
          height:        16,
          borderRadius:  '5px',
          background:    'rgba(255,255,255,0.88)',
          pointerEvents: 'none',
          zIndex:        99999,
          willChange:    'transform',
        }}
      />

      {/* Magnetic button highlight — snaps to the button's exact shape */}
      <AnimatePresence>
        {hovered && btnRect && (
          <motion.div
            key="btn-highlight"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.14, ease: 'easeIn' } }}
            transition={{ duration: 0.22, ease: [0.34, 1.4, 0.64, 1] }}
            style={{
              position:      'fixed',
              top:           btnRect.top,
              left:          btnRect.left,
              width:         btnRect.width,
              height:        btnRect.height,
              borderRadius:  btnRect.borderRadius,
              background:    'rgba(255,255,255,0.1)',
              border:        '0.75px solid rgba(255,255,255,0.22)',
              pointerEvents: 'none',
              zIndex:        99999,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CustomCursor
