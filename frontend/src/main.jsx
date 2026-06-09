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
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'showtimes', element: <ShowTimePage /> },
      { path: 'seatselection', element: <SeatSelection /> },
      { path: 'booking/:showtimeId', element: <SeatSelection /> },
      { path: 'booking-history', element: <BookingHistory /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <AppProvider>
              <MainLayout />
            </AppProvider>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/admin" replace /> },
          { path: 'admin', element: <Dashboard /> },
          { path: 'admin/movies', element: <Movies /> },
          { path: 'admin/genres', element: <Genres /> },
          { path: 'admin/halls', element: <Halls /> },
          { path: 'admin/hall-seats', element: <HallSeats /> },
          { path: 'admin/showtimes', element: <Showtimes /> },
          { path: 'admin/employees', element: <Employees /> },
          { path: 'admin/settings', element: <Settings /> },
        ],
      },
      { path: '*', element: <Navigate to="/admin" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
