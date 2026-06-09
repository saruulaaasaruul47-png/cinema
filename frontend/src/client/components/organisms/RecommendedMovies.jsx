import SectionTitle from "../atoms/SectionTitle";
import RecommendedMovieCard from "../molecules/RecommendedMovieCard";

const RecommendedMovies = ({ movies }) => (
  <section>
    <SectionTitle subtitle="You might also enjoy these">More Like This</SectionTitle>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <RecommendedMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </section>
);

export default RecommendedMovies;
