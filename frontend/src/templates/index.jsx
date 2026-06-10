import { useApp } from "@/context/AppContext.jsx";
import { Navbar, Footer } from "@/organisms/index.jsx";

const RED = "#E50914";

/* ── PageLayout — full page with Navbar + Footer ─────────── */
export function PageLayout({ children, page }) {
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Navbar currentPage={page} />
      {children}
      <Footer />
    </div>
  );
}

/* ── InnerPageLayout — inner page with header + back btn ─── */
export function InnerPageLayout({ children, page, title, accent, subtitle, onBack, backLabel, noPadding }) {
  const { navigate } = useApp();
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Navbar currentPage={page} />
      <div style={{ paddingTop:88, maxWidth:1200, margin:"0 auto", padding: noPadding ? "88px 0 20px" : "88px 20px 20px" }}>
        <button onClick={onBack || (() => navigate("home"))}
          style={{ display:"flex", alignItems:"center", gap:4, color:"#666", fontSize:13, marginBottom:20,
            background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", transition:"color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color="#fff"}
          onMouseLeave={e => e.currentTarget.style.color="#666"}>
          ◀ {backLabel || "Буцах"}
        </button>
        {title && (
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,3rem)", color:"#fff", letterSpacing:2, marginBottom:6 }}>
            {title} <span style={{ color:RED }}>{accent}</span>
          </h1>
        )}
        {subtitle && <p style={{ color:"#555", fontSize:13, marginBottom:28 }}>{subtitle}</p>}
      </div>
      {children}
      <Footer />
    </div>
  );
}
