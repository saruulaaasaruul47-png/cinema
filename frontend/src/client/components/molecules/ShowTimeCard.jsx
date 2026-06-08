import Button from '../atoms/Button'
import { formatTime } from '../../utils/date'

function ShowTimeCard({ showTime, onEdit, onDelete }) {
  const genres = showTime.genres.length ? showTime.genres : ['Genre байхгүй']

  return (
    <article className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#111] transition hover:-translate-y-px hover:border-[#e63946]">
      <div className="relative aspect-2/3 overflow-hidden bg-[#1a1a1a]">
        {showTime.poster_url ? (
          <img className="block h-full w-full object-cover" src={showTime.poster_url} alt={showTime.movie_title} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2a2a2a] text-[22px] font-bold text-[#777]">
              {showTime.movie_title.slice(0, 1)}
            </span>
          </div>
        )}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <span className="rounded bg-[#e63946] px-[7px] py-0.5 text-[10px] font-semibold text-white">Шинэ</span>
          <span className="rounded border border-[#333] bg-black/70 px-[7px] py-0.5 text-[10px] font-semibold text-[#ccc]">
            {showTime.duration || '-'} мин
          </span>
        </div>
        <div className="absolute bottom-2 right-2 rounded-[5px] border border-[#333] bg-black/75 px-2 py-[3px] text-[11px] text-[#aaa]">
          {showTime.seat_count} суудал
        </div>
      </div>

      <div className="p-3">
        <div className="mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold text-[#f0f0f0]">{showTime.movie_title}</div>
        <div className="flex flex-col gap-1">
          <div className="flex min-w-0 items-center gap-1 text-[11px] text-[#666]">
            <span className="text-xs font-semibold text-[#e63946]">{formatTime(showTime.start_time)}</span>
            <span>- {formatTime(showTime.end_time)}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1 text-[11px] text-[#666]">
            {showTime.hall_name} · {showTime.seat_count} суудал
          </div>
          <div className="flex min-w-0 items-center gap-1 text-[11px] text-[#666]">{genres.join(', ')}</div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <Button className="col-span-2 w-full border-[#e63946] bg-[#e63946] text-white hover:bg-[#c62e3a]">Захиалах</Button>
          <Button onClick={() => onEdit(showTime)}>
            Засах
          </Button>
          <Button className="hover:border-[#e63946] hover:text-[#e63946]" onClick={() => onDelete(showTime.id)}>
            Устгах
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ShowTimeCard
