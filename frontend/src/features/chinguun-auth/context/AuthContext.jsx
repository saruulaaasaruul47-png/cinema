import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [token, setToken] = useState(() => sessionStorage.getItem('accessToken'))
  const [loading, setLoading] = useState(true)
  const refreshTimer = useRef(null)

  // Access token-г 13 минут тутамд шинэчлэх
  const scheduleRefresh = useCallback((delay = 13 * 60 * 1000) => {
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(async () => {
      try {
        const data = await authApi.refresh()
        const newToken = data.accessToken
        setToken(newToken)
        sessionStorage.setItem('accessToken', newToken)
        scheduleRefresh()
      } catch {
        logout()
      }
    }, delay)
  }, [])

  // Profile татах
  const fetchProfile = useCallback(async (accessToken) => {
    try {
      const data = await authApi.getProfile(accessToken)
      setUser(data.user)
    } catch {
      setUser(null)
    }
  }, [])

  // App ачаалахад refresh хийж token шалгах
  useEffect(() => {
    const init = async () => {
      try {
        const data = await authApi.refresh()
        const newToken = data.accessToken
        setToken(newToken)
        sessionStorage.setItem('accessToken', newToken)
        await fetchProfile(newToken)
        scheduleRefresh()
      } catch {
        setToken(null)
        sessionStorage.removeItem('accessToken')
      } finally {
        setLoading(false)
      }
    }
    init()
    return () => clearTimeout(refreshTimer.current)
  }, [fetchProfile, scheduleRefresh])

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password })
    const newToken = data.accessToken
    setToken(newToken)
    sessionStorage.setItem('accessToken', newToken)
    setUser(data.user)
    scheduleRefresh()
    return data
  }, [scheduleRefresh])

  const register = useCallback(async (username, email, password) => {
    return await authApi.register({ username, email, password })
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    setUser(null)
    setToken(null)
    sessionStorage.removeItem('accessToken')
    clearTimeout(refreshTimer.current)
  }, [])

  const updateProfile = useCallback(async (body) => {
    const data = await authApi.updateProfile(token, body)
    await fetchProfile(token)
    return data
  }, [token, fetchProfile])

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    return await authApi.changePassword(token, { currentPassword, newPassword })
  }, [token])

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout, updateProfile, changePassword,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
