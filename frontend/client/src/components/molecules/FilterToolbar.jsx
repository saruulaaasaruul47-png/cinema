import FormField from '../atoms/FormField'

const genreOptions = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']
const dateOptions = Array.from({ length: 7 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  const value = date.toISOString().slice(0, 10)
  const dayNum = String(date.getDate()).padStart(2, '0')
  const dayName = new Intl.DateTimeFormat('mn-MN', { weekday: 'short' }).format(date)

  return { value, dayNum, dayName }
})

function FilterToolbar({ filters, onFilterChange }) {
  const chipClass = (isActive) =>
    `inline-flex min-h-[30px] items-center rounded-full border px-3.5 py-[5px] text-xs ${
      isActive ? 'border-[#e63946] bg-[#2a0000] text-[#e63946]' : 'border-[#2a2a2a] bg-[#1a1a1a] text-[#888]'
    }`
  const dateClass = (isActive) =>
    `min-w-[54px] rounded-lg border px-2.5 py-2 text-center ${
      isActive ? 'border-[#e63946] bg-[#2a0000]' : 'border-[#2a2a2a] bg-[#1a1a1a]'
    }`
  const selectClass =
    'min-h-[34px] rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-2.5 py-[5px] text-xs text-[#aaa] outline-none'

  return (
    <section className="border-b border-[#1f1f1f] px-3.5 py-4 sm:px-6" aria-label="ShowTime filter">
      <div className="flex max-w-[920px] flex-col gap-2 rounded-[10px] border border-[#2a2a2a] bg-[#1a1a1a] p-2 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] bg-[#111] px-3 text-[#555]">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            className="min-h-[34px] w-full border-0 bg-transparent text-sm text-[#f5f5f5] outline-none placeholder:text-[#555]"
            placeholder="Киноны нэр, жанр хайх..."
            value={filters.search}
            onChange={(event) => onFilterChange('search', event.target.value)}
          />
        </div>
        <button className="min-h-[34px] min-w-[76px] rounded-[7px] border-0 bg-[#e63946] px-5 text-[13px] font-semibold text-white" type="button">
          Хайх
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button className={chipClass(!filters.genre)} type="button" onClick={() => onFilterChange('genre', '')}>
          Бүгд
        </button>
        {genreOptions.map((genre) => (
          <button
            className={chipClass(filters.genre === genre)}
            type="button"
            key={genre}
            onClick={() => onFilterChange('genre', genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {dateOptions.map((date) => (
          <button
            className={dateClass(filters.date === date.value)}
            type="button"
            key={date.value}
            onClick={() => onFilterChange('date', filters.date === date.value ? '' : date.value)}
          >
            <span className="block text-lg font-semibold text-[#f0f0f0]">{date.dayNum}</span>
            <span className={`mt-px block text-[10px] ${filters.date === date.value ? 'text-[#e63946]' : 'text-[#666]'}`}>{date.dayName}</span>
          </button>
        ))}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <FormField label="Эрэмбэ">
          <select className={selectClass} value={filters.sort} onChange={(event) => onFilterChange('sort', event.target.value)}>
            <option value="start_time">Эрт эхлэх</option>
            <option value="title">Киноны нэр</option>
            <option value="duration">Үргэлжлэх хугацаа</option>
            <option value="release_date">Нээлтийн огноо</option>
            <option value="hall_name">Танхим</option>
          </select>
        </FormField>

        <FormField label="Чиглэл">
          <select className={selectClass} value={filters.order} onChange={(event) => onFilterChange('order', event.target.value)}>
            <option value="asc">Өсөх</option>
            <option value="desc">Буурах</option>
          </select>
        </FormField>
      </div>
    </section>
  )
}

export default FilterToolbar
