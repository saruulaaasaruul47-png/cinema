import { Ticket, Star } from "lucide-react";
import { Link } from "react-router-dom";

const StickyBookingBar = ({ movie }) => (
  <>
    {/* Desktop: Right floating card */}
    <aside className="hidden xl:block sticky top-24 w-72 flex-shrink-0 self-start">
      <div className="bg-[#171717] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="relative h-32 overflow-hidden">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-transparent" />
        </div>
        <div className="px-5 pb-5">
          <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mb-5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 font-bold">{movie.rating}</span>
            <span className="text-[#b3b3b3] text-sm">/ 10 IMDb</span>
          </div>
          <div className="space-y-2">
            {["2D", "3D", "IMAX"].map((format) => (
              <Link
                key={format}
                to={`/booking/${movie.id}`}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#e63946]/50 hover:bg-[#e63946]/10 transition-all duration-200 group"
              >
                <span className="text-white text-sm font-semibold">{format}</span>
                <span className="text-[#b3b3b3] text-xs group-hover:text-[#e63946]">Book →</span>
              </Link>
            ))}
          </div>
          <Link
            to={`/booking/${movie.id}`}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[#e63946] hover:bg-[#c1121f] text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:scale-[1.02]"
          >
            <Ticket className="w-5 h-5" />
            Book Tickets
          </Link>
        </div>
      </div>
    </aside>

    {/* Mobile: Fixed bottom bar */}
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{movie.title}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-xs font-bold">{movie.rating}</span>
          </div>
        </div>
        <Link
          to={`/booking/${movie.id}`}
          className="flex items-center gap-2 bg-[#e63946] hover:bg-[#c1121f] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-200 hover:shadow-[0_0_16px_rgba(230,57,70,0.5)] flex-shrink-0"
        >
          <Ticket className="w-4 h-4" />
          Book Now
        </Link>
      </div>
    </div>
  </>
);

export default StickyBookingBar;
