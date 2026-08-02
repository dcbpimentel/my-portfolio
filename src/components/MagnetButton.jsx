import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MagnetButton = ({ children, tag = 'button', strength = 0.3, style, ...rest }) => {
  const ref  = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x    = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.5 })
  const y    = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.5 })

  const MotionEl = motion[tag]

  const onMouseMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const r = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left - r.width  / 2) * strength)
    rawY.set((e.clientY - r.top  - r.height / 2) * strength)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <MotionEl
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y, ...style }}
      {...rest}
    >
      {children}
    </MotionEl>
  )
}

export default MagnetButton
