import { Play, Ticket, Clock, Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import GenreTag from "../atoms/GenreTag";
import RatingBadge from "../atoms/RatingBadge";
import Button from "../atoms/Button";

const HeroSection = ({ movie }) => (
  <section className="relative w-full min-h-[90vh] flex items-end overflow-hidden">
    {/* Backdrop */}
    <div className="absolute inset-0">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="w-full h-full object-cover object-top"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-[#0f0f0f]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pb-12 pt-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-end gap-8">
        {/* Poster */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="w-52 xl:w-60 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/240x360/171717/e63946?text=${encodeURIComponent(movie.title)}`;
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded bg-[#e63946] text-white text-xs font-bold tracking-widest uppercase">
              {movie.ageRating}
            </span>
            <span className="text-[#b3b3b3] text-sm">Now Showing</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl xl:text-8xl text-white tracking-wide mb-4 text-shadow leading-none">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <RatingBadge rating={movie.rating} size="lg" />
            <div className="flex items-center gap-1.5 text-[#b3b3b3] text-sm">
              <Clock className="w-4 h-4" />
              {movie.duration}
            </div>
            <div className="flex items-center gap-1.5 text-[#b3b3b3] text-sm">
              <Calendar className="w-4 h-4" />
              {movie.year}
            </div>
            <div className="flex items-center gap-1.5 text-[#b3b3b3] text-sm">
              <Shield className="w-4 h-4" />
              {movie.ageRating}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((g) => (
              <GenreTag key={g} label={g} />
            ))}
          </div>

          <p className="text-[#b3b3b3] text-base leading-relaxed mb-8 max-w-xl line-clamp-3">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to={`/booking/${movie.id}`}>
              <Button variant="primary" size="lg">
                <Ticket className="w-5 h-5" />
                Book Tickets
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Play className="w-5 h-5 fill-white" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
