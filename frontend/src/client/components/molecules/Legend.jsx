// src/components/molecules/Legend.jsx

const ITEMS = [
  {
    label: 'Available',
    seatClass: 'bg-white/90 border border-white/60',
  },
  {
    label: 'Selected',
    seatClass: 'bg-cinema-red border border-cinema-red glow-red-sm',
  },
  {
    label: 'Occupied',
    seatClass: 'bg-cinema-muted/40 border border-white/5',
  },
]

export default function Legend() {
  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      {ITEMS.map(({ label, seatClass }) => (
        <div key={label} className="flex items-center gap-2">
          {/* Mini seat icon */}
          <div
            className={`
              w-5 h-4 rounded-t-md relative ${seatClass}
            `}
            style={{ borderRadius: '3px 3px 1px 1px' }}
          />
          <span className="text-xs text-white/50 font-body">{label}</span>
        </div>
      ))}
    </div>
  )
}
