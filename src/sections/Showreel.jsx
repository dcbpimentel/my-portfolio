import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiExternalLink } from 'react-icons/fi'

// ── Replace this with your actual YouTube video ID ──────────────
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ
//          YOUTUBE_ID = 'dQw4w9WgXcQ'
const YOUTUBE_ID = null
// ────────────────────────────────────────────────────────────────

const Showreel = () => {
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef(null)

  const embedSrc = YOUTUBE_ID
    ? `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&color=white`
    : null

  return (
    <section id="showreel" className="py-section px-6 relative overflow-hidden">
      <div className="max-w-content mx-auto flex flex-col gap-10 items-center text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-body text-sm text-accent uppercase tracking-widest font-medium">
            Creative Work
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            {['Showreel', '2025'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                className="inline-block mr-[0.3em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="font-body text-text-secondary text-base max-w-md leading-relaxed">
            Design. Code. Motion. A look at everything I&apos;ve been building and creating.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
          style={{ maxWidth: '860px' }}
        >
          <div
            className="relative w-full glass-card border border-border overflow-hidden"
            style={{
              borderRadius: '20px',
              aspectRatio: '16/9',
              boxShadow: '0 0 0 1px var(--color-border), 0 24px 80px rgba(0,0,0,0.4), 0 0 60px var(--accent-glow)',
            }}
          >
            {/* If YouTube ID is set and play pressed, show iframe */}
            {playing && embedSrc ? (
              <iframe
                ref={iframeRef}
                src={embedSrc}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Showreel"
              />
            ) : (
              /* Thumbnail / placeholder */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                {/* Gradient shimmer background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(232,255,77,0.06) 0%, transparent 70%)',
                  }}
                />

                {/* Decorative scan lines */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--color-text-primary) 2px, var(--color-text-primary) 3px)',
                    backgroundSize: '100% 4px',
                  }}
                />

                {/* Play button */}
                {YOUTUBE_ID ? (
                  <motion.button
                    onClick={() => setPlaying(true)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-accent cursor-pointer"
                    style={{ boxShadow: '0 0 0 12px rgba(232,255,77,0.12), 0 8px 32px rgba(232,255,77,0.3)' }}
                    aria-label="Play showreel"
                  >
                    <FiPlay size={28} className="text-bg ml-1" fill="currentColor" />
                  </motion.button>
                ) : (
                  /* Coming soon state */
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div
                      className="flex items-center justify-center w-20 h-20 rounded-full"
                      style={{
                        background: 'rgba(232,255,77,0.08)',
                        border: '1.5px solid rgba(232,255,77,0.25)',
                      }}
                    >
                      <FiPlay size={28} className="text-accent ml-1" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-display font-bold text-xl text-text-primary">
                        Reel dropping soon
                      </span>
                      <span className="font-body text-sm text-text-secondary">
                        Currently in the edit bay. Check back soon.
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom meta */}
                <div
                  className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between"
                >
                  <span className="font-body text-xs text-text-secondary font-medium tracking-widest uppercase">
                    Showreel · 2025
                  </span>
                  {YOUTUBE_ID && (
                    <a
                      href={`https://www.youtube.com/watch?v=${YOUTUBE_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-body text-xs text-text-secondary hover:text-accent transition-colors"
                    >
                      Watch on YouTube <FiExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Showreel
