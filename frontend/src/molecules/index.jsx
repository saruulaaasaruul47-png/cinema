import { useState } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { Badge, Btn, Tag } from "@/atoms/index.jsx";

const RED = "#E50914";

/* ── MovieCard ───────────────────────────────────────────── */
export function MovieCard({ movie }) {
  const { navigate } = useApp();
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => navigate("detail", movie.id)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor:"pointer", borderRadius:14, overflow:"hidden", background:"#161616",
        border: hov ? "1px solid rgba(229,9,20,0.4)" : "1px solid rgba(255,255,255,0.05)",
        transform: hov ? "scale(1.03)" : "scale(1)", transition:"all .25s",
        boxShadow: hov ? "0 12px 40px rgba(229,9,20,0.18)" : "none" }}>
      <div style={{ position:"relative", aspectRatio:"2/3", overflow:"hidden" }}>
        <img src={movie.posterUrl || movie.poster_url} alt={movie.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transform:hov?"scale(1.08)":"scale(1)", transition:"transform .5s" }}
          onError={e => e.target.src=`https://placehold.co/300x450/161616/E50914?text=${encodeURIComponent(movie.title)}`} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)" }} />
        {movie.rating > 0 && (
          <div style={{ position:"absolute", top:8, right:8, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)", borderRadius:8, padding:"3px 8px", display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ color:"#f59e0b", fontSize:10 }}>★</span>
            <span style={{ color:"#f59e0b", fontSize:11, fontWeight:700 }}>{movie.rating}</span>
          </div>
        )}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 10px 10px" }}>
          <p style={{ color:"#fff", fontWeight:600, fontSize:13, lineHeight:1.3, marginBottom:3,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{movie.title}</p>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>⏱ {movie.duration} мин</p>
        </div>
      </div>
      <div style={{ padding:"10px 10px 12px", display:"flex", flexWrap:"wrap", gap:4 }}>
        {movie.genres?.slice(0,2).map(g => <Tag key={g.id || g}>{g.name || g}</Tag>)}
      </div>
    </div>
  );
}

/* ── ComingSoonCard ──────────────────────────────────────── */
export function ComingSoonCard({ movie }) {
  const { navigate } = useApp();
  return (
    <div onClick={() => navigate("detail", movie.id)} style={{ cursor:"pointer", borderRadius:14, overflow:"hidden", background:"#111",
      border:"1px solid rgba(255,255,255,0.07)", transition:"border .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor="rgba(229,9,20,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
    >
      <div style={{ position:"relative", aspectRatio:"16/9", overflow:"hidden" }}>
        <img src={movie.backdropUrl || movie.backdrop_url || movie.posterUrl} alt={movie.title}
          style={{ width:"100%", height:"100%", objectFit:"cover" }}
          onError={e => e.target.src=`https://placehold.co/400x225/161616/E50914?text=${encodeURIComponent(movie.title)}`} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #111 0%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position:"absolute", top:10, left:10 }}><Badge variant="red">⏳ Удахгүй</Badge></div>
      </div>
      <div style={{ padding:"14px 14px 16px", display:"flex", gap:12 }}>
        <img src={movie.posterUrl || movie.poster_url} alt={movie.title}
          style={{ width:52, height:74, borderRadius:8, objectFit:"cover", border:"1px solid rgba(255,255,255,0.1)", flexShrink:0 }}
          onError={e => e.target.src=`https://placehold.co/52x74/161616/444?text=?`} />
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ color:"#fff", fontWeight:600, fontSize:14, marginBottom:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{movie.title}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8 }}>
            {movie.genres?.slice(0,2).map(g => <Tag key={g.id || g}>{g.name || g}</Tag>)}
          </div>
          <p style={{ color:RED, fontSize:11, fontWeight:600 }}>{movie.releaseDate || movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}

/* ── NavLink ─────────────────────────────────────────────── */
export function NavLink({ label, pageKey, active }) {
  const { navigate } = useApp();
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => navigate(pageKey)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer",
        border:"none", fontFamily:"inherit", transition:"all .2s",
        background: active ? "rgba(255,255,255,0.07)" : "transparent",
        color: active || hov ? "#fff" : "#888" }}>
      {label}
    </button>
  );
}

/* ── SeatButton ──────────────────────────────────────────── */
const SEAT_STYLES = {
  available:{ bg:"rgba(255,255,255,0.07)", border:"rgba(255,255,255,0.14)", color:"#aaa" },
  vip:      { bg:"rgba(245,158,11,0.15)", border:"rgba(245,158,11,0.35)",  color:"#f59e0b" },
  selected: { bg:RED,                      border:RED,                      color:"#fff" },
  taken:    { bg:"#1e1e1e",               border:"#2a2a2a",                color:"#333" },
};
export function SeatButton({ seatKey, status, onClick }) {
  const c = SEAT_STYLES[status] || SEAT_STYLES.available;
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => status !== "taken" && onClick(seatKey)}
      disabled={status === "taken"}
      title={`${seatKey} — ${status === "taken" ? "Захиалагдсан" : status === "vip" ? "VIP" : "Чөлөөтэй"}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width:28, height:28, borderRadius:"6px 6px 2px 2px", fontSize:9, fontWeight:700,
        background: hov && status !== "taken" && status !== "selected" ? "rgba(255,255,255,0.15)" : c.bg,
        border:`1px solid ${c.border}`, color:c.color,
        cursor: status==="taken" ? "not-allowed" : "pointer", transition:"all .15s",
        animation: status==="selected" ? "seatPop .25s ease-out" : "none" }}>
      {seatKey.slice(1)}
    </button>
  );
}

/* ── ShowtimeBtn ─────────────────────────────────────────── */
export function ShowtimeBtn({ time, movieId, active, onClick }) {
  const { navigate } = useApp();
  const [hov, setHov] = useState(false);
  const activated = active || hov;
  return (
    <button onClick={() => onClick ? onClick(time) : navigate("booking", movieId)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding:"7px 14px", borderRadius:8, fontSize:13, cursor:"pointer",
        border:`1px solid ${activated ? RED : "rgba(255,255,255,0.14)"}`,
        background: active ? `rgba(229,9,20,0.12)` : "transparent",
        color: activated ? RED : "#ddd", fontFamily:"inherit", fontWeight:500, transition:"all .2s" }}>
      {time}
    </button>
  );
}

/* ── BookingCard ─────────────────────────────────────────── */
const STATUS_CFG = {
  confirmed: { label:"Баталгаажсан", color:"#22c55e", bg:"rgba(34,197,94,0.1)",   border:"rgba(34,197,94,0.2)" },
  pending:   { label:"Хүлээгдэж байна", color:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.2)" },
  cancelled: { label:"Цуцлагдсан",  color:"#888",      bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.08)" },
};
export function BookingCard({ booking, onCancel }) {
  const st = STATUS_CFG[booking.booking_status] || STATUS_CFG.confirmed;
  const movieTitle = booking.movie_title || booking.movie || "Кино";
  const posterUrl  = booking.poster_url || booking.posterUrl || `https://placehold.co/58x84/161616/444?text=${encodeURIComponent(movieTitle[0])}`;
  const seats = booking.seats || booking.tickets?.map(t => t.seat_number)?.join(", ") || "—";

  return (
    <div style={{ background:"#111", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:18, display:"flex", gap:14 }}>
      <img src={posterUrl} alt={movieTitle}
        style={{ width:58, height:84, borderRadius:8, objectFit:"cover", border:"1px solid rgba(255,255,255,0.1)", flexShrink:0 }}
        onError={e => e.target.src=`https://placehold.co/58x84/161616/444?text=?`} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <p style={{ color:"#fff", fontWeight:600, fontSize:15 }}>{movieTitle}</p>
          <span style={{ background:st.bg, color:st.color, border:`1px solid ${st.border}`,
            fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:999, flexShrink:0, marginLeft:8 }}>{st.label}</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 16px", marginBottom:10 }}>
          {[["📅", booking.show_date || booking.date || "—"],["🕐", booking.start_time || booking.time || "—"],["📍", booking.hall_name || booking.hall || "—"],["🎫", `${seats}`]].map(([ic,v]) => (
            <p key={ic+v} style={{ color:"#777", fontSize:12, display:"flex", alignItems:"center", gap:5 }}><span>{ic}</span>{v}</p>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ color:"#444", fontSize:11 }}>#{booking.id}</p>
            <p style={{ color:RED, fontWeight:700, fontSize:16 }}>{Number(booking.total_price || booking.total || 0).toLocaleString()}₮</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {booking.booking_status !== "cancelled" && onCancel && (
              <Btn variant="danger" size="sm" onClick={() => onCancel(booking.id)}>Цуцлах</Btn>
            )}
            <Btn variant="ghost" size="sm">⬇ E-Ticket</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
