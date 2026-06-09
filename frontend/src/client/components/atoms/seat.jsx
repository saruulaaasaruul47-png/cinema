// src/components/atoms/Seat.jsx
import { useState, useCallback } from 'react'

/**
 * status: 'available' | 'occupied' | 'selected'
 */
export default function Seat({ id, label, status, onToggle }) {
  const [animating, setAnimating] = useState(false)

  const handleClick = useCallback(() => {
    if (status === 'occupied') return
    setAnimating(true)
    onToggle(id, status === 'selected' ? 'available' : 'selected')
    setTimeout(() => setAnimating(false), 260)
  }, [id, status, onToggle])

  /* ── Visual states ─────────────────────────────────────────────────── */
  const base = `
    relative flex items-center justify-center
    w-7 h-6 rounded-t-lg text-[9px] font-mono font-semibold
    select-none transition-all duration-150 outline-none
    focus-visible:ring-2 focus-visible:ring-cinema-red
  `

  const states = {
    available: `
      bg-white/90 text-cinema-bg border border-white/60
      hover:bg-white hover:scale-110 hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]
      cursor-pointer
    `,
    selected: `
      bg-cinema-red text-white border border-cinema-red glow-red-sm
      hover:bg-cinema-red-dark hover:scale-110
      cursor-pointer animate-pulse-red
    `,
    occupied: `
      bg-cinema-muted/40 text-cinema-muted/60 border border-white/5
      cursor-not-allowed
    `,
  }

  return (
    <button
      type="button"
      aria-label={`Seat ${label} — ${status}`}
      aria-pressed={status === 'selected'}
      disabled={status === 'occupied'}
      onClick={handleClick}
      className={`
        ${base}
        ${states[status] ?? states.available}
        ${animating && status !== 'occupied' ? 'animate-seat-pop' : ''}
      `}
      style={{
        /* seat "legs" using a bottom pseudo-border trick */
        borderRadius: '4px 4px 2px 2px',
      }}
    >
      {status !== 'occupied' ? label : ''}

      {/* Seat cushion sheen */}
      {status === 'available' && (
        <span className="absolute inset-x-0 top-0 h-1/2 rounded-t bg-white/20 pointer-events-none" />
      )}
      {status === 'selected' && (
        <span className="absolute inset-x-0 top-0 h-1/2 rounded-t bg-white/15 pointer-events-none" />
      )}
    </button>
  )
}
