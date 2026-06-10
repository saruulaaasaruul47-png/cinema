import { createContext, useContext, useState, useCallback, useRef } from "react";

const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [page,      setPage]      = useState("home");
  const [pageParam, setPageParam] = useState(null);
  const [toast,     setToast]     = useState(null);
  const timer = useRef(null);

  const navigate = useCallback((p, param = null) => {
    setPage(p); setPageParam(param);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showToast = useCallback((msg, type = "success") => {
    clearTimeout(timer.current);
    setToast({ msg, type });
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  return (
    <AppCtx.Provider value={{ page, pageParam, navigate, showToast }}>
      {children}
      {toast && (
        <div style={{
          position:"fixed", bottom:24, right:24, zIndex:9999,
          background: toast.type === "error" ? "#1a0505" : "#0a1a0a",
          border: `1px solid ${toast.type === "error" ? "rgba(229,9,20,0.4)" : "rgba(34,197,94,0.3)"}`,
          color: toast.type === "error" ? "#f87171" : "#86efac",
          padding:"12px 20px", borderRadius:12, fontSize:13, fontWeight:500,
          boxShadow:"0 8px 32px rgba(0,0,0,0.6)", animation:"fadeIn .3s ease-out",
          display:"flex", alignItems:"center", gap:8,
        }}>
          <span>{toast.type === "error" ? "✕" : "✓"}</span> {toast.msg}
        </div>
      )}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);
