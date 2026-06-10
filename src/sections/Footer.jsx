import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaDribbble } from 'react-icons/fa'

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com',   label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://linkedin.com',  label: 'LinkedIn' },
  { icon: FaDribbble, href: 'https://dribbble.com',  label: 'Dribbble' },
]

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="max-w-content mx-auto flex flex-col gap-6">

        {/* Tagline */}
        <p className="text-center font-body text-sm text-text-secondary italic">
          Designed with intent. Built with care.
        </p>

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">

          {/* Left — wordmark */}
          <span className="font-display font-bold text-lg text-accent tracking-tight">
            Dwyane.
          </span>

          {/* Center — copyright */}
          <p className="font-body text-sm text-text-secondary order-last md:order-none">
            © 2026 Dwyane Clark Pimentel. All rights reserved.
          </p>

          {/* Right — socials */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-secondary hover:text-accent transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
