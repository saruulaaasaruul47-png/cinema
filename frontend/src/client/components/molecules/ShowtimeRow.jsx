import { Link } from "react-router-dom";

const ShowtimeRow = ({ format, times, movieId }) => {
  const formatColors = {
    "2D": "bg-blue-900/20 border-blue-500/30 text-blue-400",
    "3D": "bg-purple-900/20 border-purple-500/30 text-purple-400",
    IMAX: "bg-amber-900/20 border-amber-500/30 text-amber-400",
  };

  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <span
        className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border ${
          formatColors[format] || "bg-white/10 border-white/20 text-white"
        } w-16 text-center`}
      >
        {format}
      </span>
      <div className="flex flex-wrap gap-2">
        {times.map((time) => (
          <Link
            key={time}
            to={`/booking/${movieId}`}
            className="px-4 py-1.5 rounded-full border border-white/20 text-sm text-white/80 font-medium hover:bg-[#e63946] hover:border-[#e63946] hover:text-white hover:shadow-[0_0_12px_rgba(230,57,70,0.4)] transition-all duration-200"
          >
            {time}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowtimeRow;
