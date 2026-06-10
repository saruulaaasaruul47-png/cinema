import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => sessionStorage.getItem('accessToken'))
  const [loading, setLoading] = useState(true)
  const refreshTimer = useRef(null)

  const scheduleRefresh = useCallback((delay = 13 * 60 * 1000) => {
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(async () => {
      try {
        const data = await authApi.refresh()
        setToken(data.accessToken)
        sessionStorage.setItem('accessToken', data.accessToken)
        scheduleRefresh()
      } catch {
        doLogout()
      }
    }, delay)
  }, [])

  const fetchProfile = useCallback(async (accessToken) => {
    try {
      const data = await authApi.getProfile(accessToken)
      setUser(data.user)
    } catch {
      setUser(null)
    }
  }, [])

  const doLogout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    setUser(null)
    setToken(null)
    sessionStorage.removeItem('accessToken')
    clearTimeout(refreshTimer.current)
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const data = await authApi.refresh()
        setToken(data.accessToken)
        sessionStorage.setItem('accessToken', data.accessToken)
        await fetchProfile(data.accessToken)
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
    setToken(data.accessToken)
    sessionStorage.setItem('accessToken', data.accessToken)
    setUser(data.user)
    scheduleRefresh()
    return data
  }, [scheduleRefresh])

  const register = useCallback(async (username, email, password) => {
    return authApi.register({ username, email, password })
  }, [])

  const setTokenAndUser = useCallback((accessToken, userData) => {
    setToken(accessToken)
    sessionStorage.setItem('accessToken', accessToken)
    setUser(userData)
    scheduleRefresh()
  }, [scheduleRefresh])

  const updateProfile = useCallback(async (body) => {
    const data = await authApi.updateProfile(token, body)
    await fetchProfile(token)
    return data
  }, [token, fetchProfile])

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    return authApi.changePassword(token, { currentPassword, newPassword })
  }, [token])

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout: doLogout, setTokenAndUser,
      updateProfile, changePassword,
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
