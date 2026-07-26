import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { useIsMobile } from './hooks/useIsMobile'
import IntroAnimation, { alreadyPlayed } from './components/IntroAnimation'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'

const Projects  = lazy(() => import('./sections/Projects'))
const About     = lazy(() => import('./sections/About'))
const Showreel  = lazy(() => import('./sections/Showreel'))
const Skills    = lazy(() => import('./sections/Skills'))
const Contact   = lazy(() => import('./sections/Contact'))
const Footer    = lazy(() => import('./sections/Footer'))

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
  const isMobile = useIsMobile()
  const sz = (desktop, mobile) => isMobile ? mobile : desktop

  const orbs = [
    {
      top: '-15%', right: '-15%',
      width: sz('800px', '420px'), height: sz('800px', '420px'),
      background: 'var(--orb-1)',
      filter: `blur(${sz('60px', '40px')})`,
    },
    {
      bottom: '-15%', left: '-15%',
      width: sz('600px', '340px'), height: sz('600px', '340px'),
      background: 'var(--orb-2)',
      filter: `blur(${sz('50px', '35px')})`,
    },
    {
      top: '40%', left: '45%',
      transform: 'translate(-50%, -50%)',
      width: sz('700px', '380px'), height: sz('700px', '380px'),
      background: 'var(--orb-3)',
      filter: `blur(${sz('70px', '45px')})`,
    },
  ]

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {orbs.map((style, i) => (
        <div key={i} style={{ position: 'absolute', ...style }} />
      ))}
    </div>
  )
}

function PerformanceInit() {
  useEffect(() => {
    const mem  = navigator.deviceMemory
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const slow = conn && ['2g', 'slow-2g'].includes(conn.effectiveType)
    if ((mem !== undefined && mem < 4) || slow) {
      document.documentElement.classList.add('reduce-glass')
    }
  }, [])
  return null
}

function App() {
  const [showIntro,       setShowIntro]       = useState(!alreadyPlayed)
  const [portfolioReady,  setPortfolioReady]  = useState(alreadyPlayed)

  return (
    <ThemeProvider>
      {/* Intro overlay — unmounted after exit animation completes */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation
            key="intro"
            onRevealPortfolio={() => setPortfolioReady(true)}
            onComplete={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {/* Portfolio — fades in as the intro exits */}
      <motion.div
        initial={alreadyPlayed ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: portfolioReady ? 1 : 0, y: portfolioReady ? 0 : 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <PerformanceInit />
        <ScrollProgressBar />
        <OrbLayer />
        {/* Film grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            pointerEvents: 'none',
            opacity: 0.038,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Hero />
          <Suspense fallback={null}>
            <Projects />
            <Showreel />
            <About />
            <Skills />
            <Contact />
            <Footer />
          </Suspense>
        </div>
      </motion.div>
    </ThemeProvider>
  )
}

export default App
