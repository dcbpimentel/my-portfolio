import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',     id: 'hero'     },
  { label: 'Projects', id: 'projects' },
  { label: 'About',    id: 'about'    },
  { label: 'Contact',  id: 'contact'  },
]

const DRAWER_SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/dcbpimentel',                               label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/', label: 'LinkedIn' },
]

const scrollTo = (id, attempt = 0) => {
  const el = document.getElementById(id)
  if (!el) {
    if (attempt < 10) setTimeout(() => scrollTo(id, attempt + 1), 150)
    return
  }
  const y = el.getBoundingClientRect().top + window.scrollY - 70
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const useActiveSection = () => {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const ratios = {}
    const observers = NAV_LINKS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      ratios[id] = 0
      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio
          const top = Object.entries(ratios).reduce((a, b) => (b[1] > a[1] ? b : a))
          setActive(top[0])
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])
  return active
}

// ── Morphing hamburger / X icon ─────────────────────────────────
const MenuIcon = ({ isOpen }) => (
  <div
    className="w-[22px] h-[14px] flex flex-col justify-between text-text-primary"
    aria-hidden="true"
  >
    <motion.span
      className="block h-[1.8px] w-full bg-current rounded-full"
      style={{ originX: '50%', originY: '50%' }}
      animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    />
    <motion.span
      className="block h-[1.8px] w-full bg-current rounded-full"
      animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.14 }}
    />
    <motion.span
      className="block h-[1.8px] w-full bg-current rounded-full"
      style={{ originX: '50%', originY: '50%' }}
      animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    />
  </div>
)

// ── Theme toggle — pill switch ────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        width:        '44px',
        height:       '26px',
        borderRadius: '100px',
        padding:      '3px',
        border:       isDark
          ? '1px solid rgba(232, 255, 77, 0.28)'
          : '1px solid rgba(0, 0, 0, 0.14)',
        background:   isDark
          ? 'rgba(232, 255, 77, 0.10)'
          : 'rgba(0, 0, 0, 0.08)',
        cursor:       'pointer',
        display:      'flex',
        alignItems:   'center',
        flexShrink:   0,
        transition:   'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Sliding thumb */}
      <motion.div
        animate={{ x: isDark ? 18 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }}
        style={{
          width:          '18px',
          height:         '18px',
          borderRadius:   '50%',
          background:     isDark ? '#E8FF4D' : '#2a2a2a',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexShrink:     0,
          boxShadow:      isDark
            ? '0 0 8px rgba(232, 255, 77, 0.45)'
            : '0 1px 3px rgba(0, 0, 0, 0.22)',
          transition:     'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0,   scale: 1   }}
              exit={{    opacity: 0, rotate:  30, scale: 0.5 }}
              transition={{ duration: 0.13 }}
              style={{ display: 'flex', lineHeight: 0 }}
            >
              <FiMoon size={9} color="#0A0A0A" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate:  30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0,   scale: 1   }}
              exit={{    opacity: 0, rotate: -30, scale: 0.5 }}
              transition={{ duration: 0.13 }}
              style={{ display: 'flex', lineHeight: 0 }}
            >
              <FiSun size={9} color="#F5F5F0" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

// ── Slide-in drawer (mobile + tablet) ───────────────────────────
const DrawerMenu = ({ isOpen, onClose, activeSection }) => {
  const drawerRef = useRef(null)

  // Body scroll lock — fixed position approach prevents scroll jump
  useEffect(() => {
    if (isOpen) {
      const y = window.scrollY
      document.body.style.overflow  = 'hidden'
      document.body.style.position  = 'fixed'
      document.body.style.top       = `-${y}px`
      document.body.style.width     = '100%'
    } else {
      const top = document.body.style.top
      document.body.style.overflow  = ''
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      if (top) window.scrollTo(0, parseInt(top) * -1)
    }
    return () => {
      document.body.style.overflow  = ''
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
    }
  }, [isOpen])

  // ESC key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus first link on open; trap Tab inside drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    setTimeout(() => first?.focus(), 50)

    const trap = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [isOpen])

  const handleLinkClick = (id) => {
    onClose()
    setTimeout(() => scrollTo(id), 280)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 0.9 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col lg:hidden"
            style={{
              width:               'min(75vw, 320px)',
              background:          'var(--drawer-bg)',
              backdropFilter:      'blur(24px) saturate(160%)',
              WebkitBackdropFilter:'blur(24px) saturate(160%)',
              borderLeft:          '1px solid var(--drawer-border)',
            }}
          >
            {/* Nav links — stagger in from right */}
            <nav className="flex flex-col flex-1 pt-24 px-6 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.div
                  key={id}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.04 + i * 0.06,
                    type: 'spring', stiffness: 280, damping: 26,
                  }}
                >
                  <button
                    onClick={() => handleLinkClick(id)}
                    className={`
                      relative w-full text-left py-4 pl-5 pr-4
                      font-body text-lg font-medium rounded-xl
                      transition-colors duration-150 cursor-pointer
                      ${activeSection === id
                        ? 'text-accent'
                        : 'text-text-secondary'
                      }
                    `}
                  >
                    {/* Active indicator — left accent bar */}
                    {activeSection === id && (
                      <motion.span
                        layoutId="drawer-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-accent"
                      />
                    )}
                    {label}
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Social links at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.24, ease: 'easeOut' }}
              className="px-6 pb-10 pt-5 border-t"
              style={{ borderColor: 'var(--drawer-border)' }}
            >
              <p className="font-body text-xs text-text-secondary uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {DRAWER_SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-11 h-11 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Navbar ────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const activeSection = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer when resizing to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background:           'var(--glass-bg)',
          backdropFilter:       'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          borderBottom:         '1px solid var(--glass-border)',
          boxShadow:            'var(--glass-shadow)',
        } : {}}
      >
        <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center cursor-pointer select-none shrink-0"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-text-primary">
              dwyane<span className="text-accent">.</span>
            </span>
          </button>

          {/* Desktop nav — lg+ only */}
          <nav
            className="hidden lg:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
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
                      style={{
                        position:     'absolute',
                        inset:        0,
                        background:   'var(--glass-bg)',
                        borderRadius: '6px',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                <button
                  onClick={() => scrollTo(id)}
                  className={`relative z-10 font-body text-sm transition-colors duration-200 cursor-pointer px-4 py-2 block ${
                    activeSection === id
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {label}
                </button>
              </div>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Drawer trigger — mobile + tablet only */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-colors duration-200"
              style={{ background: menuOpen ? 'var(--glass-bg)' : 'transparent' }}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <MenuIcon isOpen={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in drawer */}
      <DrawerMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        activeSection={activeSection}
      />
    </>
  )
}

export default Navbar
