// src/components/organisms/SeatGrid.jsx
import SeatRow from '../molecules/SeatRow'
import Screen from './Screen'
import Legend from '../molecules/Legend'

/**
 * seatLayout: [{ row, seats: [{id, label, status}] }]
 * selectedIds: Set<string>
 * onToggle: (id, currentStatus) => void
 */
export default function SeatGrid({ seatLayout, selectedIds, onToggle }) {
  return (
    <div className="flex flex-col items-center">
      {/* Screen */}
      <Screen />

      {/* Rows */}
      <div className="space-y-2 mb-8">
        {seatLayout.map(({ row, seats }) => (
          <SeatRow
            key={row}
            rowLabel={row}
            seats={seats}
            selectedIds={selectedIds}
            onToggle={onToggle}
          />
        ))}

        {/* Column number guide */}
        <div className="flex items-center gap-1.5 mt-1 pt-2 border-t border-white/5">
          <span className="w-5" /> {/* spacer for row label */}
          {/* Numbers for first half */}
          <div className="flex gap-1">
            {Array.from({ length: Math.ceil(seatLayout[0]?.seats.length / 2) }, (_, i) => (
              <span key={i} className="w-7 text-center text-[8px] font-mono text-white/20">
                {i + 1}
              </span>
            ))}
          </div>
          <div className="w-4" /> {/* aisle */}
          <div className="flex gap-1">
            {Array.from({ length: Math.floor(seatLayout[0]?.seats.length / 2) }, (_, i) => (
              <span key={i} className="w-7 text-center text-[8px] font-mono text-white/20">
                {Math.ceil(seatLayout[0]?.seats.length / 2) + i + 1}
              </span>
            ))}
          </div>
          <span className="w-5" />
        </div>
      </div>

      {/* Legend */}
      <Legend />
    </div>
  )
}
