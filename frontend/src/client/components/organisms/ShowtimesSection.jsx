import { useState } from "react";
import { Calendar } from "lucide-react";
import SectionTitle from "../atoms/SectionTitle";
import ShowtimeRow from "../molecules/ShowtimeRow";

const ShowtimesSection = ({ showtimes, movieId }) => {
  const [activeDay, setActiveDay] = useState("today");
  const days = ["today", "tomorrow"];
  const currentShowtimes = showtimes[activeDay];

  return (
    <section>
      <SectionTitle>Showtimes</SectionTitle>

      {/* Day Tabs */}
      <div className="flex gap-2 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
              activeDay === day
                ? "bg-[#e63946] text-white shadow-[0_0_16px_rgba(230,57,70,0.4)]"
                : "bg-[#171717] text-[#b3b3b3] border border-white/10 hover:border-white/30"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {day}
            </span>
          </button>
        ))}
      </div>

      {/* Showtimes Card */}
      <div className="bg-[#171717] rounded-2xl p-5 md:p-6 border border-white/5">
        {Object.entries(currentShowtimes).map(([format, times]) => (
          <ShowtimeRow key={format} format={format} times={times} movieId={movieId} />
        ))}
      </div>
    </section>
  );
};

export default ShowtimesSection;
