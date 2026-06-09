import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getMovieById, getRecommendedMovies } from "../data/mockMovies";

import HeroSection from "../components/organisms/HeroSection";
import SynopsisSection from "../components/organisms/SynopsisSection";
import CastSection from "../components/organisms/CastSection";
import TrailerSection from "../components/organisms/TrailerSection";
import ShowtimesSection from "../components/organisms/ShowtimesSection";
import MovieInfoGrid from "../components/organisms/MovieInfoGrid";
import RecommendedMovies from "../components/organisms/RecommendedMovies";
import StickyBookingBar from "../components/organisms/StickyBookingBar";

const MovieDetailPage = () => {
  const { id } = useParams();
  const movie = getMovieById(id || "1");

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🎬</p>
          <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
          <p className="text-[#b3b3b3] mb-6">This movie doesn't exist in our catalogue.</p>
          <Link to="/movie/1" className="px-6 py-3 bg-[#e63946] text-white rounded-full font-semibold hover:bg-[#c1121f] transition-colors">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const recommendedMovies = getRecommendedMovies(movie.recommendations);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>
        <span className="font-display text-xl text-white tracking-widest">
          CINEMA<span className="text-[#e63946]">X</span>
        </span>
        <div className="w-16" />
      </nav>

      {/* Hero */}
      <HeroSection movie={movie} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 pb-28 xl:pb-12">
        <div className="flex gap-10 xl:gap-14 items-start">
          {/* Main Column */}
          <main className="flex-1 min-w-0 space-y-14">
            <SynopsisSection movie={movie} />
            <CastSection cast={movie.cast} />
            <TrailerSection movie={movie} />
            <ShowtimesSection showtimes={movie.showtimes} movieId={movie.id} />
            <MovieInfoGrid movie={movie} />
            <RecommendedMovies movies={recommendedMovies} />
          </main>

          {/* Sticky Sidebar */}
          <StickyBookingBar movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
