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

// ── Three-line → X morphing icon ────────────────────────────────
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

// ── Apple-inspired full-screen menu overlay ───────────────────────
const DrawerMenu = ({ isOpen, onClose, activeSection }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mounted,        setMounted]        = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [linksReady,     setLinksReady]     = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      // Animate out first, then unmount
      setOverlayVisible(false)
      setLinksReady(false)
      const t = setTimeout(() => setMounted(false), 260)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Once mounted: fade overlay in (16ms), then stagger links (120ms)
  useEffect(() => {
    if (!mounted) return
    const t1 = setTimeout(() => setOverlayVisible(true), 16)
    const t2 = setTimeout(() => setLinksReady(true), 120)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [mounted])

  const overlayBg   = isDark ? 'rgba(10, 10, 10, 0.75)' : 'rgba(250, 249, 247, 0.72)'
  const linkColor   = isDark ? '#F5F5F5' : '#0A0A0A'
  const mutedColor  = isDark ? 'rgba(245,245,245,0.28)' : 'rgba(10,10,10,0.28)'
  const accentColor = isDark ? '#E8FF4D' : '#E85D04'
  const dividerColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleLinkClick = (id) => {
    onClose()
    setTimeout(() => scrollTo(id), 240)
  }

  if (!mounted) return null

  return (
    <motion.div
      role="dialog"
      aria-label="Navigation menu"
      aria-modal="true"
      onClick={onClose}
      className="lg:hidden"
      animate={overlayVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        position:             'fixed',
        inset:                0,
        zIndex:               60,
        background:           overlayBg,
        backdropFilter:       'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      {/* Nav links — stop propagation so tapping a link doesn't fire the overlay onClose */}
      <nav
        aria-label="Mobile navigation"
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
      >
        {MOBILE_LINKS.map(({ label, id }, i) => {
          const isActive = activeSection === id
          return (
            <motion.button
              key={id}
              onClick={() => handleLinkClick(id)}
              initial={{ opacity: 0, y: 14 }}
              animate={linksReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={linksReady ? {
                delay:     i * 0.035,
                type:      'spring',
                stiffness: 340,
                damping:   26,
              } : { duration: 0 }}
              whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 20 } }}
              style={{
                background:    'none',
                border:        'none',
                cursor:        'pointer',
                fontFamily:    'Syne, sans-serif',
                fontWeight:    700,
                fontSize:      '32px',
                lineHeight:    1.15,
                letterSpacing: '-0.02em',
                color:         isActive ? accentColor : linkColor,
                padding:       '10px 32px',
                outline:       'none',
                opacity:       isActive ? 1 : 0.8,
                transition:    'color 0.18s ease, opacity 0.18s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {label}
            </motion.button>
          )
        })}
      </nav>

      {/* Social icons — bottom, stop propagation */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:   'absolute',
          bottom:     'max(36px, env(safe-area-inset-bottom, 36px))',
          display:    'flex',
          alignItems: 'center',
          gap:        '8px',
          opacity:    linksReady ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        {DRAWER_SOCIALS.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileTap={{ scale: 1.15, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
            style={{
              width:          '44px',
              height:         '44px',
              borderRadius:   '50%',
              border:         `1px solid ${dividerColor}`,
              background:     isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              color:          mutedColor,
              textDecoration: 'none',
              cursor:         'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Icon size={17} />
          </motion.a>
        ))}
      </div>
    </motion.div>
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
        className="fixed top-0 left-0 right-0 z-[70] transition-all duration-300"
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

            {/* Hamburger — mobile + tablet only */}
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

      <DrawerMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        activeSection={activeSection}
      />
    </>
  )
}

export default Navbar
