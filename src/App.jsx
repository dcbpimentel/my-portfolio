import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const BLOBS = [
  { top: '-15%', right: '-8%',  width: '700px', height: '700px', background: 'rgba(232, 255, 77, 0.05)', filter: 'blur(100px)' },
  { bottom: '10%', left: '-12%', width: '600px', height: '600px', background: 'rgba(255, 255, 255, 0.02)', filter: 'blur(120px)' },
  { top: '55%',   right: '18%', width: '500px', height: '300px', background: 'rgba(232, 255, 77, 0.03)', filter: 'blur(80px)'  },
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
