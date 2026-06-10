import { AuthProvider } from "@/context/AuthContext.jsx";
import { AppProvider, useApp } from "@/context/AppContext.jsx";
import HomePage from "@/pages/HomePage.jsx";
import MoviesPage from "@/pages/MoviesPage.jsx";
import MovieDetailPage from "@/pages/MovieDetailPage.jsx";
import SeatSelectionPage from "@/pages/SeatSelectionPage.jsx";
import { ShowtimesPage, ComingSoonPage, BookingHistoryPage, LoginPage } from "@/pages/OtherPages.jsx";

function Router() {
  const { page, pageParam } = useApp();

  const routes = {
    home:          <HomePage />,
    movies:        <MoviesPage />,
    detail:        <MovieDetailPage id={pageParam} />,
    booking:       <SeatSelectionPage movieId={pageParam} />,
    showtimes:     <ShowtimesPage />,
    "coming-soon": <ComingSoonPage />,
    history:       <BookingHistoryPage />,
    login:         <LoginPage />,
  };

  return routes[page] || <HomePage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router />
      </AppProvider>
    </AuthProvider>
  );
}
