import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

// Desktop nav — unchanged
const NAV_LINKS = [
  { label: 'Home',     id: 'hero'     },
  { label: 'Projects', id: 'projects' },
  { label: 'About',    id: 'about'    },
  { label: 'Contact',  id: 'contact'  },
]

// Mobile drawer — includes Skills
const MOBILE_LINKS = [
  { label: 'Home',     id: 'hero'     },
  { label: 'Projects', id: 'projects' },
  { label: 'About',    id: 'about'    },
  { label: 'Skills',   id: 'skills'   },
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
    const observers = MOBILE_LINKS.map(({ id }) => {
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

// ── Two-line → X morphing icon ──────────────────────────────────
const MenuIcon = ({ isOpen }) => {
  const line = {
    height:       '2px',
    width:        '20px',
    background:   'currentColor',
    borderRadius: '2px',
    display:      'block',
  }
  return (
    <div
      style={{ width: '20px', height: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      aria-hidden="true"
    >
      <motion.div
        style={{ ...line, transformOrigin: '50% 50%' }}
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
      <motion.div
        style={{ ...line, transformOrigin: '50% 50%' }}
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </div>
  )
}

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
        cursor:      'pointer',
        display:     'flex',
        alignItems:  'center',
        flexShrink:  0,
        transition:  'background 0.3s ease, border-color 0.3s ease',
      }}
    >
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

// ── Drawer animation variants — translateX only (GPU-accelerated) ─
const drawerVariants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

const scrimVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 0.6, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0,   transition: { duration: 0.2,  ease: 'easeIn'  } },
}

// ── Rebuilt mobile drawer ─────────────────────────────────────────
const DrawerMenu = ({ isOpen, onClose, activeSection }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const drawerRef = useRef(null)
  const [linksReady, setLinksReady] = useState(false)

  // Reset link stagger state when drawer closes
  useEffect(() => {
    if (!isOpen) setLinksReady(false)
  }, [isOpen])

  // Theme-aware colors — no CSS vars, no backdrop-filter on drawer
  const drawerBg      = isDark ? 'rgba(14, 14, 14, 0.97)'    : 'rgba(248, 248, 251, 0.97)'
  const drawerBorderL = isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)'
  const linkColor     = isDark ? '#F5F5F5' : '#0A0A0A'
  const dividerColor  = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const accentColor   = isDark ? '#E8FF4D' : '#3D3BF3'
  const accentBg      = isDark ? 'rgba(232, 255, 77, 0.08)' : 'rgba(61, 59, 243, 0.08)'

  // Simple scroll lock — no fixed-position body trick
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus trap — wait for drawer to finish sliding in
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    setTimeout(() => first?.focus(), 350)

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
    setTimeout(() => scrollTo(id), 250)
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Scrim — separate from drawer so they can animate independently */}
          <motion.div
            key="scrim"
            variants={scrimVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
            className="lg:hidden"
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     40,
              background: '#000000',
            }}
          />

          {/* Drawer panel — NO backdrop-filter; solid high-opacity bg */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(def) => { if (def === 'visible') setLinksReady(true) }}
            className="lg:hidden"
            style={{
              position:      'fixed',
              top:           0,
              right:         0,
              bottom:        0,
              zIndex:        50,
              width:         'min(72vw, 300px)',
              display:       'flex',
              flexDirection: 'column',
              background:    drawerBg,
              borderLeft:    drawerBorderL,
              borderRadius:  '20px 0 0 20px',
              willChange:    'transform',
            }}
          >
            {/* Nav links — stagger starts 320ms after drawer opens */}
            <nav
              aria-label="Mobile navigation"
              style={{
                display:       'flex',
                flexDirection: 'column',
                flex:          1,
                paddingTop:    '88px',
                paddingLeft:   '12px',
                paddingRight:  '12px',
                gap:           '2px',
              }}
            >
              {MOBILE_LINKS.map(({ label, id }, i) => {
                const isActive = activeSection === id
                return (
                  <motion.button
                    key={id}
                    onClick={() => handleLinkClick(id)}
                    initial={{ x: 20, opacity: 0 }}
                    animate={linksReady ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                    transition={linksReady ? {
                      delay:     i * 0.05,
                      type:      'spring',
                      stiffness: 300,
                      damping:   24,
                    } : { duration: 0 }}
                    whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
                    style={{
                      width:        '100%',
                      textAlign:    'left',
                      padding:      '16px 20px',
                      borderRadius: '12px',
                      cursor:       'pointer',
                      background:   isActive ? accentBg : 'transparent',
                      borderTop:    'none',
                      borderRight:  'none',
                      borderBottom: 'none',
                      borderLeft:   isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                      fontFamily:   'DM Sans, sans-serif',
                      fontWeight:   500,
                      fontSize:     '17px',
                      lineHeight:   1.2,
                      color:        isActive ? accentColor : linkColor,
                      outline:      'none',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {label}
                  </motion.button>
                )
              })}
            </nav>

            {/* Social icons — no label, thin divider */}
            <div
              style={{
                padding:     '20px 24px',
                paddingBottom: 'max(32px, env(safe-area-inset-bottom, 32px))',
                borderTop:   `1px solid ${dividerColor}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {DRAWER_SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileTap={{ scale: 1.2, color: accentColor }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{
                      width:          '36px',
                      height:         '36px',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      color:          '#888888',
                      cursor:         'pointer',
                      textDecoration: 'none',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────
const Navbar = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const activeSection = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on resize to desktop
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

          {/* Desktop nav — lg+ only, unchanged */}
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
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Hamburger — mobile + tablet only
                Small element: backdrop-filter is fine here, no lag */}
            <button
              className="lg:hidden flex items-center justify-center cursor-pointer"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              style={{
                width:               '40px',
                height:              '40px',
                borderRadius:        '10px',
                background:          isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border:              isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
                backdropFilter:      'blur(12px)',
                WebkitBackdropFilter:'blur(12px)',
                color:               isDark ? '#F5F5F5' : '#0A0A0A',
                flexShrink:          0,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <MenuIcon isOpen={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      <DrawerMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        activeSection={activeSection}
      />
    </>
  )
}

export default Navbar
