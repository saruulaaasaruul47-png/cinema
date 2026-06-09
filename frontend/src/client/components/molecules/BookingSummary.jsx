// src/components/molecules/BookingSummary.jsx
import { Ticket, Users, CreditCard, Tag } from 'lucide-react'
import { fmtMNT } from '../../utils/helpers'

/**
 * sortedSeats: string[]  e.g. ['A4','A5']
 * count:       number
 * pricePerSeat: number
 * totalPrice:  number
 */
export default function BookingSummary({ sortedSeats, count, pricePerSeat, totalPrice }) {
  const isEmpty = count === 0

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Selected seats */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest font-mono mb-3">
          <Tag size={11} />
          <span>Selected Seats</span>
        </div>

        {isEmpty ? (
          <p className="text-sm text-white/25 italic text-center py-2">No seats selected</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {sortedSeats.map(s => (
              <span
                key={s}
                className="px-2.5 py-0.5 bg-cinema-red text-white text-xs font-mono rounded-md
                           glow-red-sm animate-fade-in"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-3">
        <Row icon={<Users size={13} />} label="Ticket Count" value={count} mono />
        <div className="h-px bg-white/6" />
        <Row icon={<Ticket size={13} />} label="Price / Ticket" value={fmtMNT(pricePerSeat)} mono />
        <div className="h-px bg-white/6" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <CreditCard size={14} className="text-cinema-red" />
            Total
          </div>
          <span
            className={`font-display text-2xl tracking-wider transition-all duration-300 ${
              isEmpty ? 'text-white/20' : 'text-gradient-red'
            }`}
          >
            {isEmpty ? '—' : fmtMNT(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}

function Row({ icon, label, value, mono }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-white/50">
        <span className="text-white/30">{icon}</span>
        {label}
      </div>
      <span className={`text-white font-medium ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}
