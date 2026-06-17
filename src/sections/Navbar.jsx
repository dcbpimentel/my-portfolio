import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMenu, HiX } from 'react-icons/hi'

const NAV_LINKS = [
  { label: 'Home',     id: 'hero'     },
  { label: 'Projects', id: 'projects' },
  { label: 'About',    id: 'about'    },
  { label: 'Contact',  id: 'contact'  },
]

const SCROLL_PROPS = {
  smooth:      true,
  duration:    500,
  offset:      -70,
  spy:         true,
  activeClass: '!text-accent',
}

const Navbar = () => {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={scrolled ? {
        background:           'rgba(10, 10, 10, 0.70)',
        backdropFilter:       'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        borderBottom:         '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow:            '0 8px 32px rgba(0, 0, 0, 0.4)',
        transition:           'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      } : { transition: 'background 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="hero" smooth={true} duration={500} offset={-70} className="flex items-center cursor-pointer select-none">
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            dwyane<span className="text-[#E8FF4D]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredLink(null)}>
          {NAV_LINKS.map(({ label, id }) => (
            <div key={id} className="relative" onMouseEnter={() => setHoveredLink(id)}>
              <AnimatePresence>
                {hoveredLink === id && (
                  <motion.span
                    key={`pill-${id}`}
                    layoutId="nav-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.06)', borderRadius: '6px' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <Link
                to={id}
                {...SCROLL_PROPS}
                className="relative z-10 font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer px-4 py-2 block"
              >
                {label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Hamburger — simple rotate animation, no AnimatePresence to avoid iOS tap issues */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{
            background:  menuOpen ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
            transition:  'background 0.2s ease',
          }}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{ display: 'block', lineHeight: 0 }}
          >
            {menuOpen
              ? <HiX   size={22} className="text-text-primary" />
              : <HiMenu size={22} className="text-text-primary" />
            }
          </motion.span>
        </button>
      </div>

      {/* Mobile menu — liquid glass, opacity+y only (no scaleY to avoid iOS tap-through) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background:           'rgba(10, 10, 10, 0.92)',
              backdropFilter:       'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom:         '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow:            '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            className="md:hidden"
          >
            <nav className="flex flex-col px-6 py-2">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.18, ease: 'easeOut' }}
                >
                  <Link
                    to={id}
                    {...SCROLL_PROPS}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer border-b border-white/[0.05] last:border-0"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
