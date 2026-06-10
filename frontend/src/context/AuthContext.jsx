import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, usersApi } from "@/api/index.js";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);

  // токен байвал профайл татна
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    usersApi.getProfile(token)
      .then(res => setUser(res.user))
      .catch(() => { setToken(null); localStorage.removeItem("accessToken"); })
      .finally(() => setLoading(false));
  }, [token]);

  const login = useCallback(async (body) => {
    const res = await authApi.login(body);
    localStorage.setItem("accessToken", res.accessToken);
    setToken(res.accessToken);
    setUser(res.user);
    return res;
  }, []);

  const adminLogin = useCallback(async (body) => {
    const res = await authApi.adminLogin(body);
    localStorage.setItem("accessToken", res.accessToken);
    setToken(res.accessToken);
    setUser(res.user);
    return res;
  }, []);

  const register = useCallback(async (body) => {
    return authApi.register(body);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {});
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  }, []);

  // access token дуусвал refresh хийнэ
  const refreshToken = useCallback(async () => {
    try {
      const res = await authApi.refresh();
      localStorage.setItem("accessToken", res.accessToken);
      setToken(res.accessToken);
      return res.accessToken;
    } catch {
      setToken(null); setUser(null);
      localStorage.removeItem("accessToken");
      return null;
    }
  }, []);

  return (
    <AuthCtx.Provider value={{
      user,
      token,
      loading,
      login,
      adminLogin,
      register,
      logout,
      refreshToken,
      isAdmin: user?.role === "admin",
      isEmployee: user?.role === "staff",
      canUseAdmin: user?.role === "admin" || user?.role === "staff",
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
