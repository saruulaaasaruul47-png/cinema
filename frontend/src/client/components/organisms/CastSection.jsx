import SectionTitle from "../atoms/SectionTitle";
import CastCard from "../molecules/CastCard";

const CastSection = ({ cast }) => (
  <section>
    <SectionTitle subtitle={`${cast.length} cast members`}>Cast</SectionTitle>
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
        {cast.map((actor) => (
          <CastCard key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  </section>
);

export default CastSection;
