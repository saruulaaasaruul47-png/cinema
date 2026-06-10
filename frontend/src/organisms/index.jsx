import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { Btn, Badge, Tag, StarRating } from "@/atoms/index.jsx";
import { NavLink, MovieCard, ComingSoonCard } from "@/molecules/index.jsx";
import { SeatButton } from "@/molecules/index.jsx";

const RED = "#E50914";

/* ── Navbar ─────────────────────────────────────────────── */
export function Navbar({ currentPage }) {
  const { navigate } = useApp();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label:"Нүүр",          key:"home" },
    { label:"Кинонууд",      key:"movies" },
    { label:"Цагийн хуваарь",key:"showtimes" },
    { label:"Удахгүй",       key:"coming-soon" },
  ];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"all .3s",
      background: scrolled ? "rgba(8,8,8,0.96)" : "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <button onClick={() => navigate("home")} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", border:"none", background:"none" }}>
          <div style={{ width:32, height:32, background:RED, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 14px rgba(229,9,20,0.5)`, fontSize:16 }}>🎬</div>
          <span style={{ fontFamily:"var(--font-display)", fontSize:22, color:"#fff", letterSpacing:3 }}>
            CINEMA<span style={{ color:RED }}>X</span>
          </span>
        </button>

        {/* Desktop links */}
        <div style={{ display:"flex", alignItems:"center", gap:2 }} className="cx-hide-mobile">
          {links.map(l => <NavLink key={l.key} label={l.label} pageKey={l.key} active={currentPage===l.key} />)}
        </div>

        {/* Right */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }} className="cx-hide-mobile">
          <button onClick={() => navigate("history")}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, background:"transparent", color:"#888", fontSize:13, fontWeight:500, border:"none", fontFamily:"inherit", cursor:"pointer", transition:"color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color="#fff"}
            onMouseLeave={e => e.currentTarget.style.color="#888"}>🎫 Захиалгууд</button>
          {user ? (
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ color:"#aaa", fontSize:13 }}>👤 {user.username}</span>
              <Btn variant="ghost" size="sm" onClick={logout}>Гарах</Btn>
            </div>
          ) : (
            <Btn size="sm" onClick={() => navigate("login")}>👤 Нэвтрэх</Btn>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="cx-show-mobile"
          style={{ background:"none", border:"none", color:"#fff", fontSize:20, cursor:"pointer" }}>
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background:"rgba(8,8,8,0.98)", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"12px 16px 16px" }}>
          {[...links, { label:"🎫 Захиалгууд", key:"history" }, { label:user?"Гарах":"👤 Нэвтрэх", key:user?"_logout":"login" }].map(l => (
            <button key={l.key} onClick={() => { if(l.key==="_logout") logout(); else navigate(l.key); setMobileOpen(false); }}
              style={{ display:"block", width:"100%", textAlign:"left", padding:"12px 14px", borderRadius:8, color:"#ccc", fontSize:13, background:"none", border:"none", fontFamily:"inherit", cursor:"pointer" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`.cx-hide-mobile{} .cx-show-mobile{display:none!important} @media(max-width:768px){.cx-hide-mobile{display:none!important}.cx-show-mobile{display:flex!important}}`}</style>
    </nav>
  );
}

/* ── HeroCarousel ────────────────────────────────────────── */
export function HeroCarousel({ movies }) {
  const { navigate } = useApp();
  const [idx, setIdx] = useState(0);
  const featured = movies[idx];

  useEffect(() => {
    if (!movies.length) return;
    const t = setInterval(() => setIdx(i => (i+1) % movies.length), 6000);
    return () => clearInterval(t);
  }, [movies.length]);

  if (!featured) return null;

  const backdrop = featured.backdropUrl || featured.backdrop_url || featured.posterUrl || featured.poster_url;
  const poster   = featured.posterUrl   || featured.poster_url;

  return (
    <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0 }}>
        <img key={featured.id} src={backdrop} alt={featured.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"opacity .7s" }}
          onError={e => e.target.style.display="none"} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #080808 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.2) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 55%, transparent 100%)" }} />
      </div>

      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:1200, margin:"0 auto", padding:"0 20px 80px", display:"flex", gap:32, alignItems:"flex-end" }}>
        {poster && (
          <div style={{ flexShrink:0, width:180, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 0 60px rgba(0,0,0,0.8)" }} className="cx-show-lg">
            <img src={poster} alt={featured.title} style={{ width:"100%", display:"block" }} />
          </div>
        )}

        <div style={{ flex:1, maxWidth:640 }} key={featured.id} className="animate-hero">
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <Badge variant="red">{featured.ageRating || "PG"}</Badge>
            <span style={{ color:"#aaa", fontSize:13, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block" }} />
              Одоо үзүүлж байна
            </span>
          </div>

          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(3rem,8vw,5.5rem)", color:"#fff", lineHeight:1, marginBottom:14, letterSpacing:2 }}>
            {featured.title}
          </h1>

          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:10, marginBottom:12 }}>
            {featured.rating > 0 && <StarRating rating={featured.rating} />}
            <span style={{ color:"#aaa", fontSize:13 }}>⏱ {featured.duration} мин</span>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
            {featured.genres?.slice(0,3).map(g => <Tag key={g.id||g}>{g.name||g}</Tag>)}
          </div>

          <p style={{ color:"#999", fontSize:14, lineHeight:1.7, marginBottom:28, maxWidth:520,
            display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {featured.description}
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Btn onClick={() => navigate("booking", featured.id)} size="lg">🎫 Тасалбар захиалах</Btn>
            <Btn onClick={() => navigate("detail", featured.id)} variant="secondary" size="lg">▶ Дэлгэрэнгүй</Btn>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"center", gap:10, zIndex:11 }}>
        <button onClick={() => setIdx(i => (i-1+movies.length)%movies.length)}
          style={{ padding:"6px 10px", borderRadius:8, background:"rgba(255,255,255,0.08)", color:"#fff", border:"none", cursor:"pointer" }}>◀</button>
        {movies.map((_,i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{ height:5, borderRadius:99, border:"none", cursor:"pointer", transition:"all .3s",
              width: i===idx ? 28 : 6, background: i===idx ? RED : "rgba(255,255,255,0.25)" }} />
        ))}
        <button onClick={() => setIdx(i => (i+1)%movies.length)}
          style={{ padding:"6px 10px", borderRadius:8, background:"rgba(255,255,255,0.08)", color:"#fff", border:"none", cursor:"pointer" }}>▶</button>
      </div>
      <style>{`@media(min-width:1024px){.cx-show-lg{display:block!important}}.cx-show-lg{display:none}`}</style>
    </section>
  );
}

/* ── MovieGrid ───────────────────────────────────────────── */
export function MovieGrid({ movies, title, accent, subtitle, linkLabel, linkPage, skeleton=false }) {
  const { navigate } = useApp();
  return (
    <section style={{ padding:"0 20px", maxWidth:1200, margin:"0 auto 60px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,4vw,2.4rem)", color:"#fff", letterSpacing:2 }}>
            {title} <span style={{ color:RED }}>{accent}</span>
          </h2>
          {subtitle && <p style={{ color:"#555", fontSize:13, marginTop:4 }}>{subtitle}</p>}
        </div>
        {linkLabel && <Btn variant="outline" size="sm" onClick={() => navigate(linkPage)}>{linkLabel} →</Btn>}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:14 }}>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );
}

/* ── SeatMap ─────────────────────────────────────────────── */
const ROWS = ["A","B","C","D","E","F","G","H"];
export function SeatMap({ seats, onToggle }) {
  return (
    <div style={{ overflowX:"auto", paddingBottom:8 }}>
      {/* Screen */}
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ width:"60%", maxWidth:260, height:4,
          background:"linear-gradient(to bottom, rgba(229,9,20,0.7), transparent)",
          borderRadius:4, margin:"0 auto 8px", boxShadow:"0 0 20px rgba(229,9,20,0.3)" }} />
        <p style={{ color:"#444", fontSize:11, letterSpacing:3, textTransform:"uppercase" }}>Дэлгэц</p>
      </div>

      {ROWS.map(row => (
        <div key={row} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:6 }}>
          <span style={{ color:"#444", fontSize:11, width:16, textAlign:"right" }}>{row}</span>
          <div style={{ display:"flex", gap:5 }}>
            {Array.from({length:10},(_,i)=>i+1).map(col => {
              const key = `${row}${col}`;
              return <SeatButton key={key} seatKey={key} status={seats[key] || "available"} onClick={onToggle} />;
            })}
          </div>
          <span style={{ color:"#444", fontSize:11, width:16 }}>{row}</span>
        </div>
      ))}

      {/* Legend */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center", marginTop:20 }}>
        {[["rgba(255,255,255,0.07)","rgba(255,255,255,0.14)","Чөлөөтэй"],
          [RED,RED,"Сонгосон"],["#1e1e1e","#2a2a2a","Захиалагдсан"],
          ["rgba(245,158,11,0.15)","rgba(245,158,11,0.35)","VIP"]].map(([bg,border,label]) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:18, height:18, borderRadius:4, background:bg, border:`1px solid ${border}` }} />
            <span style={{ color:"#777", fontSize:12 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Footer ─────────────────────────────────────────────── */
export function Footer() {
  const { navigate } = useApp();
  return (
    <footer style={{ background:"#0a0a0a", borderTop:"1px solid rgba(255,255,255,0.05)", marginTop:60 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 20px 32px",
        display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:40 }}>
        {/* Brand */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <div style={{ width:30, height:30, background:RED, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🎬</div>
            <span style={{ fontFamily:"var(--font-display)", fontSize:20, color:"#fff", letterSpacing:3 }}>
              CINEMA<span style={{ color:RED }}>X</span>
            </span>
          </div>
          <p style={{ color:"#666", fontSize:13, lineHeight:1.8, marginBottom:20 }}>
            Монголын шилдэг кино театр. IMAX, 3D, 2D форматаар дэлхийн хамгийн шинэ киног үзэх боломж.
          </p>
          <div style={{ display:"flex", gap:8 }}>
            {["FB","IG","TW","YT"].map(s => (
              <div key={s} style={{ width:34, height:34, borderRadius:8, background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", color:"#666", fontSize:11, fontWeight:600, cursor:"pointer", transition:"all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background=RED; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="#666"; }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p style={{ color:"#fff", fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:1.5, marginBottom:16 }}>Холбоос</p>
          {[["Нүүр","home"],["Кинонууд","movies"],["Цагийн хуваарь","showtimes"],["Удахгүй гарах","coming-soon"],["Захиалгын түүх","history"]].map(([l,k]) => (
            <p key={k} style={{ color:"#666", fontSize:13, marginBottom:10, cursor:"pointer", transition:"color .2s" }}
              onClick={() => navigate(k)}
              onMouseEnter={e => e.currentTarget.style.color=RED}
              onMouseLeave={e => e.currentTarget.style.color="#666"}>{l}</p>
          ))}
        </div>

        {/* Info */}
        <div>
          <p style={{ color:"#fff", fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:1.5, marginBottom:16 }}>Мэдээлэл</p>
          {["Бидний тухай","Үйлчилгээний нөхцөл","Нууцлалын бодлого","Тусламж & FAQ","Корпорат захиалга"].map(l => (
            <p key={l} style={{ color:"#666", fontSize:13, marginBottom:10, cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.color=RED}
              onMouseLeave={e => e.currentTarget.style.color="#666"}>{l}</p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ color:"#fff", fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:1.5, marginBottom:16 }}>Холбоо барих</p>
          {[["📍","Улаанбаатар хот, Сүхбаатар дүүрэг"],["📞","+976 7711-8899"],["✉️","info@cinemax.mn"]].map(([ic,t]) => (
            <p key={t} style={{ color:"#666", fontSize:13, marginBottom:10, display:"flex", alignItems:"flex-start", gap:8 }}>
              <span>{ic}</span>{t}
            </p>
          ))}
          <div style={{ marginTop:16, padding:"10px 12px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:10 }}>
            <p style={{ color:"#555", fontSize:11, marginBottom:2 }}>Ажиллах цаг</p>
            <p style={{ color:"#ddd", fontSize:13, fontWeight:600 }}>Даваа–Ням: 09:00–24:00</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"20px", borderTop:"1px solid rgba(255,255,255,0.05)",
        display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ color:"#444", fontSize:12 }}>© 2024 CinemaX. Бүх эрх хуулиар хамгаалагдсан.</p>
        <div style={{ display:"flex", gap:14 }}>
          {["Visa","Mastercard","QPay","SocialPay"].map(l => <span key={l} style={{ color:"#333", fontSize:11 }}>{l}</span>)}
        </div>
      </div>
    </footer>
  );
}
