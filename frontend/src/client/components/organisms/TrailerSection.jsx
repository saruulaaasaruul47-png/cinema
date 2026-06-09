import { Play } from "lucide-react";
import SectionTitle from "../atoms/SectionTitle";

const TrailerSection = ({ movie }) => (
  <section>
    <SectionTitle>Trailer</SectionTitle>
    <div className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-[#e63946]/40 transition-all duration-300 shadow-xl hover:shadow-[0_8px_40px_rgba(230,57,70,0.2)]">
      <img
        src={movie.trailerThumbnail}
        alt={`${movie.title} Trailer`}
        className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/1280x720/111111/e63946?text=Trailer`;
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e63946] flex items-center justify-center shadow-[0_0_40px_rgba(230,57,70,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(230,57,70,0.8)] transition-all duration-300">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-white ml-1" />
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-4 left-4">
        <p className="text-white font-semibold text-sm glass px-3 py-1.5 rounded-full">
          Official Trailer — {movie.title}
        </p>
      </div>
    </div>
  </section>
);

export default TrailerSection;
