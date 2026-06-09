// src/components/molecules/SeatRow.jsx
import Seat from '../atoms/Seat'

/**
 * Renders a single labeled row of seats.
 * seats: [{ id, label, status }]
 * selectedIds: Set<string>
 */
export default function SeatRow({ rowLabel, seats, selectedIds, onToggle }) {
  return (
    <div className="flex items-center gap-1.5">
      {/* Row label — left */}
      <span className="w-5 text-right text-[10px] font-mono text-white/30 flex-shrink-0 select-none">
        {rowLabel}
      </span>

      {/* Gap in the middle for aisle illusion */}
      <div className="flex items-center gap-1">
        {seats.slice(0, Math.ceil(seats.length / 2)).map(seat => {
          const resolvedStatus = selectedIds.has(seat.id) ? 'selected' : seat.status
          return (
            <Seat
              key={seat.id}
              id={seat.id}
              label={seat.label}
              status={resolvedStatus}
              onToggle={onToggle}
            />
          )
        })}
      </div>

      {/* Aisle gap */}
      <div className="w-4 flex-shrink-0" />

      <div className="flex items-center gap-1">
        {seats.slice(Math.ceil(seats.length / 2)).map(seat => {
          const resolvedStatus = selectedIds.has(seat.id) ? 'selected' : seat.status
          return (
            <Seat
              key={seat.id}
              id={seat.id}
              label={seat.label}
              status={resolvedStatus}
              onToggle={onToggle}
            />
          )
        })}
      </div>

      {/* Row label — right */}
      <span className="w-5 text-left text-[10px] font-mono text-white/30 flex-shrink-0 select-none">
        {rowLabel}
      </span>
    </div>
  )
}
