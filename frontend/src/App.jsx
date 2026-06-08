import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './features/saihanaa-dashboard/DashboardPage'
import { AuthProvider } from './features/chinguun-auth/context/AuthContext'
import { ProtectedRoute } from './features/chinguun-auth/components/ProtectedRoute'
import LoginPage from './features/chinguun-auth/pages/LoginPage'
import RegisterPage from './features/chinguun-auth/pages/RegisterPage'
import ProfilePage from './features/chinguun-auth/pages/ProfilePage'
import ShowTimePage from './client/pages/ShowTimePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/showtimes" element={<ShowTimePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
