// src/components/atoms/Badge.jsx

const VARIANTS = {
  default: 'bg-white/8 text-white/70 border border-white/10',
  red:     'bg-cinema-red-dim text-cinema-red border border-cinema-red/30',
  green:   'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  amber:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  blue:    'bg-blue-500/10 text-blue-400 border border-blue-500/20',
}

export default function seatBadge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`
      inline-flex items-center gap-1
      px-2.5 py-0.5 rounded-full
      text-[11px] font-medium tracking-wide
      ${VARIANTS[variant] ?? VARIANTS.default}
      ${className}
    `}>
      {children}
    </span>
  )
}