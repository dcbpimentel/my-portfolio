import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { HiMenu, HiX } from 'react-icons/hi'

const NAV_LINKS = [
  { label: 'Home',     id: 'hero'     },
  { label: 'Projects', id: 'projects' },
  { label: 'About',    id: 'about'    },
  { label: 'Contact',  id: 'contact'  },
]

// Shared props for every react-scroll Link
const SCROLL_PROPS = {
  smooth:   true,
  duration: 500,
  offset:   -70,   // clears the 64px fixed navbar + 6px breathing room
  spy:      true,
  activeClass: '!text-accent',
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Navbar background blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'backdrop-blur-md bg-bg/80 border-b border-border' : 'bg-transparent'}
      `}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — scrolls to hero, no spy needed */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          offset={-70}
          className="flex items-center cursor-pointer select-none"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            dwyane<span className="text-[#E8FF4D]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, id }) => (
            <Link
              key={id}
              to={id}
              {...SCROLL_PROPS}
              className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
            >
              {label}
            </Link>
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
