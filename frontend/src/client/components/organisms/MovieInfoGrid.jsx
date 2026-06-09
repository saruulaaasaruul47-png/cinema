import {
  User,
  Clock,
  Tag,
  Globe,
  Calendar,
  Star,
  Flag,
  Shield,
} from "lucide-react";
import SectionTitle from "../atoms/SectionTitle";
import InfoCard from "../atoms/InfoCard";

const MovieInfoGrid = ({ movie }) => {
  const info = [
    { icon: User, label: "Director", value: movie.director },
    { icon: Clock, label: "Runtime", value: movie.duration },
    { icon: Tag, label: "Genre", value: movie.genre.join(", ") },
    { icon: Globe, label: "Language", value: movie.language },
    { icon: Calendar, label: "Release Date", value: movie.releaseDate },
    { icon: Star, label: "IMDb Rating", value: `${movie.rating} / 10` },
    { icon: Flag, label: "Country", value: movie.country },
    { icon: Shield, label: "Age Rating", value: movie.ageRating },
  ];

  return (
    <section>
      <SectionTitle>Movie Information</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {info.map((item) => (
          <InfoCard key={item.label} icon={item.icon} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
};

export default MovieInfoGrid;
