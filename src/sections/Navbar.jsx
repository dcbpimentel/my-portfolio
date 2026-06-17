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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background:           'rgba(10, 10, 10, 0.70)',
        backdropFilter:       'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        borderBottom:         '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow:            '0 8px 32px rgba(0, 0, 0, 0.4)',
      } : {}}
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

        {/* Hamburger */}
        <button
          className="md:hidden text-text-primary p-1"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        aria-hidden={!menuOpen}
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-64 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
          bg-surface border-b border-border
        `}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map(({ label, id }) => (
            <Link
              key={id}
              to={id}
              {...SCROLL_PROPS}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className="text-left font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
