import { Outlet } from 'react-router-dom'
import { AuthProvider } from './features/chinguun-auth/context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default App
