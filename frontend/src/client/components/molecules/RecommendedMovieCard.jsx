import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const RecommendedMovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.id}`} className="group block">
    <div className="relative overflow-hidden rounded-xl bg-[#171717] border border-white/5 group-hover:border-[#e63946]/40 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_8px_32px_rgba(230,57,70,0.2)]">
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x450/171717/e63946?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">{movie.title}</p>
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-xs font-bold">{movie.rating}</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">{movie.year}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[#e63946]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-2 flex flex-wrap gap-1">
        {movie.genre.slice(0, 2).map((g) => (
          <span key={g} className="text-xs text-[#b3b3b3] bg-white/5 px-2 py-0.5 rounded-full">
            {g}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

export default RecommendedMovieCard;
