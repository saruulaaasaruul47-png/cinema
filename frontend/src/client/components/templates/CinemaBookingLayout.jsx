// src/components/templates/CinemaBookingLayout.jsx
import { Film } from 'lucide-react'

export default function CinemaBookingLayout({ movieInfo, seatGrid, bookingPanel }) {
  return (
    <div
      className="min-h-screen bg-cinema-bg relative"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(229,9,20,0.07) 0%, transparent 70%),
          repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.008) 60px, rgba(255,255,255,0.008) 61px),
          repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.008) 60px, rgba(255,255,255,0.008) 61px)
        `,
      }}
    >
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header className="border-b border-white/6 bg-cinema-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-cinema-red rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(229,9,20,0.5)]">
              <Film size={14} className="text-white" />
            </div>
            <span className="font-display text-lg tracking-[0.2em] text-white">IMAGIX</span>
          </div>

          {/* Breadcrumb steps */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <Step n={1} label="Movie"    done />
            <Chevron />
            <Step n={2} label="Seats"   active />
            <Chevron />
            <Step n={3} label="Payment" />
          </div>

          <div className="w-24" />
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Movie info — full width on top */}
        <div className="mb-6 animate-slide-up">
          {movieInfo}
        </div>

        {/* Two-column: seat map + booking panel */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Seat map */}
          <div className="flex-1 min-w-0">
            <SectionCard title="Select Your Seats">
              {seatGrid}
            </SectionCard>
          </div>

          {/* Booking panel — sticky */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-20">
            {bookingPanel}
          </div>
        </div>
      </main>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-cinema-card cinema-border overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/6">
        <div className="w-1 h-4 bg-cinema-red rounded-full" />
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em]">{title}</h3>
      </div>
      <div className="p-5 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

function Step({ n, label, done, active }) {
  return (
    <div className={`flex items-center gap-1.5 ${done || active ? '' : 'opacity-30'}`}>
      <div className={`
        w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
        ${done   ? 'bg-cinema-red text-white' : ''}
        ${active ? 'bg-white/10 text-white border border-white/20' : ''}
        ${!done && !active ? 'bg-white/5 text-white/30' : ''}
      `}>
        {done ? '✓' : n}
      </div>
      <span className={`${active ? 'text-white' : done ? 'text-white/50' : 'text-white/30'}`}>
        {label}
      </span>
    </div>
  )
}

function Chevron() {
  return <span className="text-white/20">›</span>
}
