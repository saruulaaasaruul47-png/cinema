import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ page, total, perPage = 5, onChange }) => {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center gap-2 mt-4 px-4 pb-3">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-7 h-7 rounded flex items-center justify-center text-[#888888] hover:text-white hover:bg-[#1a1a1a] disabled:opacity-30 transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
            p === page ? 'bg-[#e50914] text-white' : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-7 h-7 rounded flex items-center justify-center text-[#888888] hover:text-white hover:bg-[#1a1a1a] disabled:opacity-30 transition-colors"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

export default Pagination
