import { FiGithub, FiLinkedin } from 'react-icons/fi'

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/dcbpimentel',                               label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/dwyane-clark-pimentel-a7a5b12b1/', label: 'LinkedIn' },
]

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-6">
      <div className="max-w-content mx-auto flex flex-col gap-6">

        {/* Tagline */}
        <p className="text-center font-body text-sm text-text-secondary italic">
          Built by Dwyane. Still improving it.
        </p>

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">

          {/* Left — wordmark */}
          <span className="font-display text-lg font-bold tracking-tight text-text-primary">
            dwyane<span className="text-accent">.</span>
          </span>

          {/* Center — copyright */}
          <p className="font-body text-sm text-text-secondary order-last md:order-none">
            © 2026 Dwyane Clark Pimentel. All rights reserved.
          </p>

          {/* Right — socials */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-11 h-11 text-text-secondary hover:text-accent transition-colors duration-200"
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
