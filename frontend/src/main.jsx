import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import { AppProvider } from './admin/context/AppContext'
import { ProtectedRoute } from './features/chinguun-auth/components/ProtectedRoute'
import MainLayout from './admin/components/templates/MainLayout'
import LoginPage from './features/chinguun-auth/pages/LoginPage'
import RegisterPage from './features/chinguun-auth/pages/RegisterPage'
import ProfilePage from './features/chinguun-auth/pages/ProfilePage'
import ShowTimePage from './client/pages/ShowTimePage'
import Movies from './admin/pages/Movies/Movies'
import Genres from './admin/pages/Genres/Genres'
import Halls from './admin/pages/Halls/Halls'
import HallSeats from './admin/pages/Halls/HallSeats/HallSeats'
import Showtimes from './admin/pages/Showtimes/Showtimes'
import Employees from './admin/pages/Employees/Employees'
import Settings from './admin/pages/Settings/Settings'
import SeatSelection from './client/pages/SeatSelection'
import BookingHistory from './client/pages/BookingHistory'
import Dashboard from './admin/pages/Dashboard/Dashboard'
import MovieDetailPage from './client/pages/MovieDetailPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // AuthProvider энд байх ёстой
    children: [
      // ✅ Public routes
      { index: true, element: <ShowTimePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'movie/:id', element: <MovieDetailPage /> },
      { path: 'booking/:showtimeId', element: <SeatSelection /> },
      { path: 'seatselection', element: <SeatSelection /> },

      // ✅ Protected client routes
      {
        path: 'booking-history',
        element: (
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      // ✅ Protected admin routes
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AppProvider>
              <MainLayout />
            </AppProvider>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'movies', element: <Movies /> },
          { path: 'genres', element: <Genres /> },
          { path: 'halls', element: <Halls /> },
          { path: 'hall-seats', element: <HallSeats /> },
          { path: 'showtimes', element: <Showtimes /> },
          { path: 'employees', element: <Employees /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
