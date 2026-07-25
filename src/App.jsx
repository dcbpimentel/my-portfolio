import { lazy, Suspense } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'

const Projects = lazy(() => import('./sections/Projects'))
const About    = lazy(() => import('./sections/About'))
const Skills   = lazy(() => import('./sections/Skills'))
const Contact  = lazy(() => import('./sections/Contact'))
const Footer   = lazy(() => import('./sections/Footer'))

const ORBS = [
  {
    style: {
      top: '-10%', right: '-15%',
      width: '600px', height: '600px',
      background: 'var(--orb-1)',
      filter: 'blur(120px)',
    },
  },
  {
    style: {
      bottom: '-8%', left: '-18%',
      width: '400px', height: '400px',
      background: 'var(--orb-2)',
      filter: 'blur(100px)',
    },
  },
  {
    style: {
      top: '45%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px', height: '500px',
      background: 'var(--orb-3)',
      filter: 'blur(150px)',
    },
  },
]

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          '2px',
        background:      'var(--color-accent)',
        transformOrigin: '0%',
        scaleX,
        zIndex:          200,
      }}
    />
  )
}

const OrbLayer = () => {
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 1500], [0, -180])
  const orb2Y = useTransform(scrollY, [0, 1500], [0,  120])
  const orb3Y = useTransform(scrollY, [0, 1500], [0,  -80])

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {ORBS.map((orb, i) => {
        const y = [orb1Y, orb2Y, orb3Y][i]
        return (
          <motion.div
            key={i}
            style={{ position: 'absolute', borderRadius: '50%', ...orb.style, y }}
          />
        )
      })}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <OrbLayer />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Suspense fallback={null}>
          <Projects />
          <About />
          <Skills />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
