export const COVERS = {
  1: { from: '#071e1e', to: '#0d0d0d', dot: '#2dd4bf', label: 'Mobile'     },
  2: { from: '#1c1000', to: '#0d0d0d', dot: '#f59e0b', label: 'Full Stack' },
  3: { from: '#13072b', to: '#0d0d0d', dot: '#a78bfa', label: 'Desktop'    },
  4: { from: '#050f1f', to: '#0d0d0d', dot: '#60a5fa', label: 'Full Stack' },
  5: { from: '#0f1500', to: '#0d0d0d', dot: '#E8FF4D', label: 'Frontend'   },
  6: { from: '#001518', to: '#0d0d0d', dot: '#06b6d4', label: 'Full Stack' },
  7: { from: '#0a1500', to: '#0d0d0d', dot: '#84cc16', label: 'Frontend'   },
  8: { from: '#001a0d', to: '#0d0d0d', dot: '#10b981', label: 'Full Stack' },
  9: { from: '#1a0800', to: '#0d0d0d', dot: '#f97316', label: 'Full Stack' },
}

const ProjectCover = ({ id, index, title, category }) => {
  const theme = COVERS[id] ?? { from: '#111', to: '#0A0A0A', dot: '#E8FF4D', label: category }
  const num   = String(index + 1).padStart(2, '0')

  return (
    <div
      className="relative aspect-video overflow-hidden flex items-end"
      style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.dot}22 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(5rem, 14vw, 8rem)', color: `${theme.dot}12` }}
      >
        {num}
      </span>
      <span
        className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-body font-semibold border"
        style={{ color: theme.dot, borderColor: `${theme.dot}40`, background: `${theme.dot}12` }}
      >
        {theme.label}
      </span>
      <div className="relative px-5 pb-4 pt-8 w-full bg-gradient-to-t from-black/60 to-transparent">
        <p className="font-display font-bold text-base text-white leading-tight line-clamp-1 drop-shadow">
          {title}
        </p>
      </div>
    </div>
  )
}

export default ProjectCover
