// src/components/organisms/MovieInfo.jsx
import { Clock, Calendar, MapPin, Film, Star, Globe } from 'lucide-react'
import Badge from '../atoms/Badge'
import { fmtDuration } from '../../utils/helpers'

export default function MovieInfo({ movie }) {
  return (
    <div className="relative rounded-2xl overflow-hidden cinema-border bg-cinema-card animate-fade-in">
      {/* Backdrop blur layer */}
      {movie.backdrop && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:    `url(${movie.backdrop})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            filter:             'blur(8px)',
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-cinema-card/60 to-cinema-card" />

      {/* Content */}
      <div className="relative p-5 flex gap-4">
        {/* Poster */}
        <div className="flex-shrink-0">
          <div className="relative w-24 rounded-xl overflow-hidden shadow-2xl hover-lift">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
              onError={e => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div
              className="hidden w-full aspect-[2/3] bg-cinema-subtle items-center justify-center rounded-xl"
              style={{ display: 'none' }}
            >
              <Film size={28} className="text-white/20" />
            </div>
            {/* Rating badge */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
              <span className="flex items-center gap-1 bg-black/80 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-mono text-amber-400 whitespace-nowrap">
                <Star size={8} fill="currentColor" />
                {movie.imdb}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title */}
          <div>
            <h2 className="font-display text-2xl tracking-widest text-white leading-none">
              {movie.title}
            </h2>
            <p className="text-xs text-white/40 italic mt-0.5 font-body">{movie.tagline}</p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5">
            {movie.genre.map(g => (
              <Badge key={g} variant="default">{g}</Badge>
            ))}
            <Badge variant="red">{movie.rating}</Badge>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <MetaItem icon={<Clock size={11} />}    label="Duration" value={fmtDuration(movie.duration)} />
            <MetaItem icon={<Globe size={11} />}    label="Language" value={movie.language} />
            <MetaItem icon={<MapPin size={11} />}   label="Hall"     value={`${movie.hall} · ${movie.hallType}`} />
            <MetaItem icon={<Star size={11} />}     label="Director" value={movie.director} />
          </div>

          {/* Showtime highlight */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 bg-cinema-red-dim border border-cinema-red/25 rounded-lg px-3 py-1.5">
              <Calendar size={11} className="text-cinema-red" />
              <span className="text-xs font-mono text-white">{movie.date}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <Clock size={11} className="text-white/50" />
              <span className="text-xs font-mono text-white font-semibold">{movie.showtime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-1.5">
      <span className="text-white/30 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[9px] text-white/30 uppercase tracking-wider font-mono">{label}</p>
        <p className="text-xs text-white/80 font-medium truncate">{value}</p>
      </div>
    </div>
  )
}
