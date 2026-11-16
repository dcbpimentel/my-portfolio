import { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const ORBIT_DATA = [
  {
    id: 'tib',
    label: 'Tokyo Innovation Base',
    category: 'International Delegation',
    chips: ['2024', 'Tokyo, Japan', 'Department Representative'],
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
    radius: 0.68,
    size: 70,
    depth: 1.4,
  },
  {
    id: 'sit',
    label: 'Shibaura Institute of Technology',
    category: 'Tokyo AI Class',
    chips: ['2024', 'Tokyo, Japan', 'SIT'],
    hero: '/images/orbit/sit-hero.jpg',
    gallery: [
      '/images/orbit/sit-01.jpg',
      '/images/orbit/sit-02.jpg',
    ],
    description: "Attended an AI class at Shibaura Institute of Technology (SIT), one of Japan's leading engineering universities in Tokyo. The session, titled Introduction to AI and Applications, was led by a tenured professor and founder of SHIBA AI, heading a research team of graduates from institutions including MIT, Harvard, and other world-renowned universities. The class offered a deep dive into the practical and theoretical frontiers of artificial intelligence, delivered at the intersection of academia and cutting-edge industry research.",
    angle: 100,
    radius: 0.66,
    size: 62,
    depth: 1.0,
  },
  {
    id: 'chronogate',
    label: 'Chronogate',
    category: 'Logistics and Automation',
    chips: ['2024', 'Haneda, Tokyo', 'Industry Visit'],
    hero: '/images/orbit/chronogate-hero.jpg',
    gallery: [
      '/images/orbit/chronogate-01.jpg',
      '/images/orbit/chronogate-02.jpg',
    ],
    description: "Toured Chronogate, Yamato Transport's flagship logistics hub located in Haneda, Tokyo. As one of the most advanced sorting and distribution facilities in Asia, Chronogate operates a fully automated package sorting system capable of processing hundreds of thousands of parcels daily. The facility visit provided firsthand insight into large-scale logistics automation, smart infrastructure design, and the operational technology driving one of Japan's most trusted delivery networks.",
    angle: 155,
    radius: 0.70,
    size: 66,
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
    radius: 0.68,
    size: 68,
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
    radius: 0.66,
    size: 72,
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
    radius: 0.70,
    size: 60,
    depth: 1.1,
  },
]

function BubbleItem({ item, springX, springY, onSelect }) {
  const [animating, setAnimating] = useState(false)

  const angleRad = (item.angle - 90) * Math.PI / 180
  const bx = Math.cos(angleRad) * item.radius * 50
  const by = Math.sin(angleRad) * item.radius * 50

  const px = useTransform(springX, v => v * item.depth * 0.05)
  const py = useTransform(springY, v => v * item.depth * 0.05)

  const handleClick = () => {
    if (animating) return
    setAnimating(true)
    try { navigator.vibrate([8, 10, 15]) } catch {}
    setTimeout(() => {
      setAnimating(false)
      onSelect(item)
    }, 420)
  }

  return (
    <motion.button
      style={{
        position: 'absolute',
        left: `calc(${50 + bx}% - ${item.size / 2}px)`,
        top: `calc(${50 + by}% - ${item.size / 2}px)`,
        x: px,
        y: py,
        width: item.size,
        height: item.size,
        boxShadow: '0 4px 20px var(--accent-glow)',
      }}
      animate={animating ? { scale: [1, 0.86, 1.14, 1] } : { scale: 1 }}
      transition={{ duration: 0.42, times: [0, 0.2, 0.65, 1], ease: 'easeInOut' }}
      onClick={handleClick}
      className="rounded-full overflow-hidden border-2 border-border cursor-pointer focus:outline-none"
    >
      <img
        src={item.hero}
        alt={item.label}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
    </motion.button>
  )
}

function OrbitModal({ item, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const allImages = [item.hero, ...item.gallery]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="relative bg-surface border border-border rounded-2xl overflow-hidden max-w-md w-full overflow-y-auto"
        style={{
          maxHeight: 'min(85vh, 680px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Main image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              src={allImages[activeIdx]}
              alt={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full h-full object-cover"
              loading="eager"
              draggable={false}
            />
          </AnimatePresence>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          >
            <FiX size={15} color="#fff" />
          </button>
        </div>

        {/* Gallery thumbnails */}
        {allImages.length > 1 && (
          <div
            className="flex gap-2 px-4 pt-3 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden cursor-pointer focus:outline-none transition-opacity"
                style={{
                  border: `2px solid ${i === activeIdx ? 'var(--color-accent)' : 'transparent'}`,
                  opacity: i === activeIdx ? 1 : 0.55,
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" draggable={false} />
              </button>
            ))}
          </div>
        )}

        {/* Text content */}
        <div className="p-4 flex flex-col gap-3">
          <span className="font-body text-xs font-semibold text-accent uppercase tracking-widest">
            {item.category}
          </span>
          <h3 className="font-display font-bold text-xl text-text-primary leading-tight">
            {item.label}
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {item.chips.map(chip => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full text-xs font-medium font-body text-text-secondary border border-border"
                style={{ background: 'var(--color-surface2)' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProfileOrbit() {
  const containerRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 80, damping: 25 })
  const springY = useSpring(rawY, { stiffness: 80, damping: 25 })

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
    <>
      <div
        ref={containerRef}
        className="relative w-full max-w-sm aspect-square select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle orbit ring */}
        <div
          className="absolute rounded-full border border-border pointer-events-none"
          style={{ inset: '15%', opacity: 0.25 }}
        />

        {/* Center profile photo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full overflow-hidden border-2 border-border pointer-events-auto"
            style={{
              width: '40%',
              height: '40%',
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
    </>
  )
}
