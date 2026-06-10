import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ page, total, perPage = 5, onChange }) => {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const btnBase = 'w-7 h-7 rounded-lg flex items-center justify-center text-cinema-muted hover:text-white hover:bg-cinema-card2 border border-cinema-border disabled:opacity-30 transition-colors'

  return (
    <div className="flex items-center gap-2 mt-4 px-4 pb-3">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1} className={btnBase}>
        <ChevronLeft size={14} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
            p === page ? 'bg-cinema-red text-white' : 'text-cinema-muted hover:text-white hover:bg-cinema-card2 border border-cinema-border'
          }`}
        >
          {p}
        </button>
      ))}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page === totalPages} className={btnBase}>
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

export default Pagination
