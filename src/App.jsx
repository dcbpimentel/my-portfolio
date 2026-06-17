import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const BLOBS = [
  { top: '-20%', right: '-15%', width: '900px', height: '900px', background: 'rgba(232, 255, 77, 0.028)', filter: 'blur(140px)' },
  { bottom: '-10%', left: '-20%', width: '800px', height: '800px', background: 'rgba(255, 255, 255, 0.012)', filter: 'blur(160px)' },
]

function App() {
  return (
    <>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {BLOBS.map((blob, i) => (
          <div key={i} style={{ position: 'absolute', borderRadius: '50%', ...blob }} />
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
