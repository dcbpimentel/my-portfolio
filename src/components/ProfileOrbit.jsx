import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion'

const ORBIT_DATA = [
  {
    id: 'tib',
    label: 'Tokyo Innovation Base',
    category: 'International Delegation',
    chips: ['2026', 'Tokyo, Japan', 'Department Representative'],
    hero: '/images/orbit/tib-hero.jpg',
    gallery: [
      '/images/orbit/tib-01.jpg',
      '/images/orbit/tib-02.jpg',
      '/images/orbit/tib-03.jpg',
      '/images/orbit/tib-04.jpg',
      '/images/orbit/tib-05.jpg',
    ],
    description: "Represented our department at Tokyo Innovation Base (TiB), Japan's flagship government-backed innovation hub, as part of an international delegation. We toured the facility, engaged with engineers and inventors at the forefront of hardware and AI development, and witnessed collaborative teams building the next generation of technology. The TiB FAB digital fabrication lab powered by DMM.make TOKYO showcased robotics, 3D-printed prototypes, and circuit design, alongside a state-of-the-art lecture amphitheater where global minds convene. A firsthand look at what it means to build at the intersection of technology, design, and human impact.",
    angle: 30,
    radius: 0.80,
    size: 96,
    depth: 1.4,
  },
  {
    id: 'sit',
    label: 'Shibaura Institute of Technology',
    category: 'Tokyo AI Class',
    chips: ['2026', 'Tokyo, Japan', 'SIT'],
    hero: '/images/orbit/sit-hero.jpg',
    gallery: [
      '/images/orbit/sit-01.jpg',
      '/images/orbit/sit-02.jpg',
    ],
    description: "Attended an AI class at Shibaura Institute of Technology (SIT), one of Japan's leading engineering universities in Tokyo. The session, titled Introduction to AI and Applications, was led by a tenured professor and founder of SHIBA AI, heading a research team of graduates from institutions including MIT, Harvard, and other world-renowned universities. The class offered a deep dive into the practical and theoretical frontiers of artificial intelligence, delivered at the intersection of academia and cutting-edge industry research.",
    angle: 100,
    radius: 0.76,
    size: 84,
    depth: 1.0,
  },
  {
    id: 'chronogate',
    label: 'Chronogate',
    category: 'Logistics and Automation',
    chips: ['2026', 'Haneda, Tokyo', 'Industry Visit'],
    hero: '/images/orbit/chronogate-hero.jpg',
    gallery: [
      '/images/orbit/chronogate-01.jpg',
      '/images/orbit/chronogate-02.jpg',
    ],
    description: "Toured Chronogate, Yamato Transport's flagship logistics hub located in Haneda, Tokyo. As one of the most advanced sorting and distribution facilities in Asia, Chronogate operates a fully automated package sorting system capable of processing hundreds of thousands of parcels daily. The facility visit provided firsthand insight into large-scale logistics automation, smart infrastructure design, and the operational technology driving one of Japan's most trusted delivery networks.",
    angle: 155,
    radius: 0.80,
    size: 88,
    depth: 1.2,
  },
  {
    id: 'fpt',
    label: 'FPT Japan Academy',
    category: 'FPT Japan Academy',
    chips: ['Nov 2026', 'Tokyo, Japan', 'Certified Participant'],
    hero: '/images/orbit/fpt-hero.jpg',
    gallery: [
      '/images/orbit/fpt-01.jpg',
      '/images/orbit/fpt-02.jpg',
    ],
    description: "Participated in the inaugural Educational and Cultural Trip to Japan, organized through the first-ever partnership between FPT Japan Academy and Ateneo de Davao University. The program included an exclusive tour of FPT's Tokyo offices and facilities, offering direct exposure to one of Southeast Asia's largest technology corporations operating at the heart of Japan's tech industry. The trip was formally recognized with a Certificate of Participation issued by FPT Japan Academy Principal Yasutaka Owada, conducted from November 1 to 7, 2026.",
    angle: 220,
    radius: 0.78,
    size: 90,
    depth: 0.9,
  },
  {
    id: 'gawad',
    label: 'Gawad Parangal',
    category: "President's List",
    chips: ['Oct 2026', 'Ateneo de Davao', 'QPI 3.93'],
    hero: '/images/orbit/gawad-hero.jpg',
    gallery: [
      '/images/orbit/gawad-01.jpg',
    ],
    description: "Recognized on the President's List at Ateneo de Davao University at the annual Gawad Parangal Academic Awards Ceremony, with a cumulative Quality Point Index (QPI) of 3.93. This distinction is conferred upon students who demonstrate exceptional academic performance across all subjects, reflecting consistent excellence and an unwavering commitment to scholarly achievement.",
    angle: 270,
    radius: 0.74,
    size: 96,
    depth: 1.3,
  },
  {
    id: 'extras',
    label: 'Campus Life',
    category: 'Multimedia Production',
    chips: ['Ateneo de Davao', 'Videographer'],
    hero: '/images/orbit/extras-hero.jpg',
    gallery: [
      '/images/orbit/extras-01.jpg',
      '/images/orbit/extras-02.jpg',
      '/images/orbit/extras-03.jpg',
      '/images/orbit/extras-04.jpg',
    ],
    description: "Beyond academics, actively engaged in campus life and multimedia production at Ateneo de Davao University. Took on roles as videographer and cinematographer for student narrative film productions, operating professional gimbals and camera rigs on set. Participated in university-wide events including The Ateneo U-Fest, representing the department. These experiences reflect a hands-on commitment to storytelling through lens, light, and motion.",
    angle: 330,
    radius: 0.80,
    size: 84,
    depth: 1.1,
  },
]

function MosaicGrid({ images }) {
  const count = images.length

  const gridStyle = {
    display: 'grid',
    gap: 2,
    ...(count >= 6 && { gridTemplateColumns: 'repeat(3, 1fr)' }),
    ...(count === 5 && { gridTemplateColumns: '1.3fr 1fr 1fr', gridTemplateRows: '1fr 1fr' }),
    ...(count === 3 && { gridTemplateColumns: '1.2fr 1fr', gridTemplateRows: '1fr 1fr' }),
    ...(count === 2 && { gridTemplateColumns: '1fr 1fr' }),
  }

  return (
    <div style={gridStyle}>
      {images.map((src, i) => {
        const cellStyle = {
          overflow: 'hidden',
          ...(count >= 6 && { aspectRatio: '4/3' }),
          ...(count === 5 && i === 0 && { gridRow: '1 / 3', minHeight: 190 }),
          ...(count === 5 && i > 0 && { aspectRatio: '1' }),
          ...(count === 3 && i === 0 && { gridRow: '1 / 3', minHeight: 170 }),
          ...(count === 3 && i > 0 && { aspectRatio: '1' }),
          ...(count === 2 && { aspectRatio: '3/4' }),
          ...(count === 1 && { aspectRatio: '4/3' }),
        }
        return (
          <div key={i} style={cellStyle}>
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="eager"
              draggable={false}
            />
          </div>
        )
      })}
    </div>
  )
}

function BubbleItem({ item, springX, springY, onSelect, selectedId }) {
  const [pressing, setPressing] = useState(false)
  const pressTimer = useRef(null)
  const pressed = useRef(false)
  const isSelected = selectedId === item.id

  const angleRad = (item.angle - 90) * Math.PI / 180
  const bx = Math.cos(angleRad) * item.radius * 50
  const by = Math.sin(angleRad) * item.radius * 50

  const px = useTransform(springX, v => v * item.depth * 0.05)
  const py = useTransform(springY, v => v * item.depth * 0.05)

  const handlePointerDown = (e) => {
    e.preventDefault()
    pressed.current = false
    setPressing(true)
    pressTimer.current = setTimeout(() => {
      pressed.current = true
      setPressing(false)
      try { navigator.vibrate([10, 30, 15]) } catch {}
      onSelect(item)
    }, 500)
  }

  const handlePointerUp = () => {
    clearTimeout(pressTimer.current)
    pressTimer.current = null
    setPressing(false)
    if (!pressed.current) {
      onSelect(item)
    }
    pressed.current = false
  }

  const handlePointerCancel = () => {
    clearTimeout(pressTimer.current)
    pressTimer.current = null
    setPressing(false)
    pressed.current = false
  }

  return (
    <motion.button
      layoutId={`orbit-${item.id}`}
      style={{
        position: 'absolute',
        left: `calc(${50 + bx}% - ${item.size / 2}px)`,
        top: `calc(${50 + by}% - ${item.size / 2}px)`,
        x: isSelected ? 0 : px,
        y: isSelected ? 0 : py,
        width: item.size,
        height: item.size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid var(--color-border)',
        boxShadow: '0 4px 20px var(--accent-glow)',
        cursor: 'pointer',
        outline: 'none',
        background: 'var(--color-surface)',
        zIndex: isSelected ? 0 : 1,
        pointerEvents: isSelected ? 'none' : 'auto',
      }}
      animate={{ opacity: isSelected ? 0 : 1 }}
      transition={{
        layout: { type: 'spring', bounce: 0.15, duration: 0.5 },
        opacity: { duration: 0.08 },
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
    >
      <img
        src={item.hero}
        alt={item.label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading="lazy"
        draggable={false}
      />

      <AnimatePresence>
        {pressing && (
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              border: '2.5px solid var(--color-accent)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function OrbitModal({ item, onClose }) {
  const allImages = [item.hero, ...item.gallery]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 199,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={onClose}
      />

      {/* Centered card wrapper */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          layoutId={`orbit-${item.id}`}
          onClick={e => e.stopPropagation()}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            maxWidth: 500,
            width: '100%',
            background: 'var(--color-surface)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.25)',
            pointerEvents: 'auto',
          }}
          transition={{
            layout: { type: 'spring', bounce: 0.12, duration: 0.55 },
          }}
        >
          {/* Inner scroll container — isolates scroll from page */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: 'min(85vh, 680px)',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Photo mosaic — fades in after morph starts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <MosaicGrid images={allImages} />
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.24, duration: 0.22 }}
              style={{ padding: '18px 20px 26px' }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: 5,
                }}
              >
                {item.category}
              </p>

              <h3
                className="font-display"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.18,
                  color: 'var(--color-text-primary)',
                  marginBottom: 3,
                }}
              >
                {item.label}
              </h3>

              <p
                className="font-body"
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '-0.01em',
                  marginBottom: 14,
                }}
              >
                {item.chips.join(' · ')}
              </p>

              <div
                style={{
                  height: '0.5px',
                  background: 'var(--color-border)',
                  margin: '0 -20px 14px',
                }}
              />

              <p
                className="font-body"
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  letterSpacing: '-0.01em',
                }}
              >
                {item.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default function ProfileOrbit() {
  const containerRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 80, damping: 25 })
  const springY = useSpring(rawY, { stiffness: 80, damping: 25 })

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!selectedItem) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [selectedItem])

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left - rect.width / 2)
    rawY.set(e.clientY - rect.top - rect.height / 2)
  }, [rawX, rawY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0]
    if (!touch) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(touch.clientX - rect.left - rect.width / 2)
    rawY.set(touch.clientY - rect.top - rect.height / 2)
  }, [rawX, rawY])

  const handleTouchEnd = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <LayoutGroup>
      <div
        ref={containerRef}
        className="relative w-full aspect-square select-none"
        style={{ maxWidth: 500 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle orbit ring */}
        <div
          className="absolute rounded-full border border-border pointer-events-none"
          style={{ inset: '9%', opacity: 0.22 }}
        />

        {/* Center profile photo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full overflow-hidden border-2 border-border pointer-events-auto"
            style={{
              width: '44%',
              height: '44%',
              boxShadow: '0 0 0 1px var(--color-border), 0 0 32px var(--accent-glow)',
            }}
          >
            <img
              src="/images/profile.jpg"
              alt="Dwyane Clark Pimentel"
              className="w-full h-full object-cover object-top"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

        {/* Orbit bubbles */}
        {ORBIT_DATA.map(item => (
          <BubbleItem
            key={item.id}
            item={item}
            springX={springX}
            springY={springY}
            onSelect={setSelectedItem}
            selectedId={selectedItem?.id}
          />
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedItem && (
            <OrbitModal
              key={selectedItem.id}
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </LayoutGroup>
  )
}
