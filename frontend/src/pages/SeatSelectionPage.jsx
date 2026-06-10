import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { moviesApi, bookingsApi, showtimesApi } from "@/api/index.js";
import { useFetch, useMutation } from "@/hooks/useFetch.js";
import { Btn, Badge, Spinner } from "@/atoms/index.jsx";
import { ShowtimeBtn } from "@/molecules/index.jsx";
import { SeatMap, Navbar } from "@/organisms/index.jsx";

const RED = "#E50914";
const PRICE = { "2D":18000, "3D":22000, IMAX:28000, VIP:28000 };
const VIP_ROWS = ["A","B"];
const TAKEN_KEYS = ["C3","C4","C5","D7","D8","E1","E2","F5","F6","F7","G9","G10"];

function buildInitialSeats(seatMapData) {
  const ROWS = ["A","B","C","D","E","F","G","H"];
  const seats = {};
  ROWS.forEach(r => {
    for (let c=1; c<=10; c++) {
      const k = `${r}${c}`;
      if (seatMapData) {
        // API-аас ирсэн суудлын мэдээлэл ашиглана
        const s = seatMapData.find(s => s.seat_number === k);
        seats[k] = s?.is_booked ? "taken" : VIP_ROWS.includes(r) ? "vip" : "available";
      } else {
        seats[k] = TAKEN_KEYS.includes(k) ? "taken" : VIP_ROWS.includes(r) ? "vip" : "available";
      }
    }
  });
  return seats;
}

export default function SeatSelectionPage({ movieId }) {
  const { navigate, showToast } = useApp();
  const { user, token } = useAuth();

  const { data: movieData, loading: movieLoading } = useFetch(() => moviesApi.getById(movieId), [movieId]);
  const movie = movieData?.movie || movieData;

  // showtimes татах
  const { data: stData } = useFetch(() => showtimesApi.getAll({ movie_id: movieId }), [movieId]);
  const showtimes = stData?.data?.content || stData?.showtimes || [];

  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [format,   setFormat]   = useState("2D");
  const [seats,    setSeats]    = useState(() => buildInitialSeats(null));
  const [selected, setSelected] = useState([]);
  const [booked,   setBooked]   = useState(null);

  // Showtime сонгоход seat map татна
  const { data: seatMapData } = useFetch(
    () => selectedShowtime ? bookingsApi.getSeatMap(selectedShowtime.id, token) : Promise.resolve(null),
    [selectedShowtime?.id]
  );

  useEffect(() => {
    if (seatMapData?.data) {
      setSeats(buildInitialSeats(seatMapData.data));
      setSelected([]);
    }
  }, [seatMapData]);

  const toggleSeat = useCallback((key) => {
    const s = seats[key];
    const isVip = VIP_ROWS.includes(key[0]);
    if (s === "selected") {
      setSeats(p => ({ ...p, [key]: isVip ? "vip" : "available" }));
      setSelected(p => p.filter(k => k !== key));
    } else {
      setSeats(p => ({ ...p, [key]: "selected" }));
      setSelected(p => [...p, key]);
    }
  }, [seats]);

  const totalPrice = selected.reduce((sum, k) => sum + (VIP_ROWS.includes(k[0]) ? PRICE.VIP : PRICE[format]), 0);

  const { mutate: createBooking, loading: submitting } = useMutation(
    (body) => bookingsApi.create(body, token)
  );

  const handleBook = async () => {
    if (!selected.length) return;
    if (!user) { showToast("Нэвтэрч орно уу", "error"); navigate("login"); return; }
    if (!selectedShowtime) { showToast("Цаг сонгоно уу", "error"); return; }

    try {
      const body = {
        showtime_id: selectedShowtime.id,
        seats: selected.map(s => ({ seat_number: s, ticket_price: VIP_ROWS.includes(s[0]) ? PRICE.VIP : PRICE[format] })),
        total_price: totalPrice,
      };
      const res = await createBooking(body);
      setBooked(res?.data || res);
      showToast("Захиалга амжилттай!", "success");
    } catch (e) {
      showToast(e.message || "Захиалга амжилтгүй", "error");
    }
  };

  if (movieLoading) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", justifyContent:"center", alignItems:"center" }}>
      <Spinner size={48} />
    </div>
  );

  /* ── Success screen ── */
  if (booked) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", justifyContent:"center", alignItems:"center", padding:20 }}>
      <div style={{ textAlign:"center", maxWidth:420, animation:"fadeIn .5s ease-out" }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"2px solid rgba(34,197,94,0.5)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:32 }}>✓</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"2.2rem", color:"#fff", letterSpacing:2, marginBottom:8 }}>ЗАХИАЛГА АМЖИЛТТАЙ!</h2>
        <p style={{ color:"#888", fontSize:13, marginBottom:4 }}>Захиалгын дугаар: <span style={{ color:"#fff", fontWeight:700 }}>#{booked.id}</span></p>
        <div style={{ background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:20, marginTop:20, textAlign:"left" }}>
          {[["Кино", movie?.title || "—"],["Цаг", selectedShowtime ? new Date(selectedShowtime.start_time).toLocaleString("mn-MN") : "—"],["Суудлууд", selected.join(", ")],["Нийт", `${totalPrice.toLocaleString()}₮`]].map(([l,v],i) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderTop: i ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span style={{ color:"#555", fontSize:13 }}>{l}</span>
              <span style={{ color: l==="Нийт" ? RED : "#fff", fontWeight: l==="Нийт" ? 700:500, fontSize:13 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <Btn variant="secondary" onClick={() => navigate("home")} style={{ flex:1 }}>Нүүр хуудас</Btn>
          <Btn onClick={() => navigate("history")} style={{ flex:1 }}>Захиалгууд</Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Navbar />
      <div style={{ maxWidth:900, margin:"0 auto", padding:"88px 20px 100px" }}>
        <button onClick={() => navigate(movie ? "detail" : "home", movie?.id)}
          style={{ display:"flex", alignItems:"center", gap:4, color:"#666", fontSize:13, marginBottom:20, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
          ◀ Буцах
        </button>

        {/* Movie header */}
        <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:28 }}>
          {movie?.posterUrl && <img src={movie.posterUrl || movie.poster_url} alt={movie.title} style={{ width:52, height:74, borderRadius:8, objectFit:"cover", border:"1px solid rgba(255,255,255,0.1)" }} />}
          <div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,4vw,2.4rem)", color:"#fff", letterSpacing:2 }}>{movie?.title || "Суудал сонгох"}</h1>
            <p style={{ color:"#555", fontSize:13 }}>{movie?.duration && `${movie.duration} мин`}</p>
          </div>
        </div>

        {/* Format + Showtime select */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:20, marginBottom:32 }}>
          <div>
            <p style={{ color:"#555", fontSize:11, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Формат</p>
            <div style={{ display:"flex", gap:8 }}>
              {["2D","3D","IMAX"].map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  style={{ padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:600, border:"1px solid", cursor:"pointer", fontFamily:"inherit", transition:"all .2s",
                    borderColor: format===f ? RED : "rgba(255,255,255,0.12)",
                    background: format===f ? RED : "#161616",
                    color: format===f ? "#fff" : "#888" }}>{f}</button>
              ))}
            </div>
          </div>

          {showtimes.length > 0 && (
            <div>
              <p style={{ color:"#555", fontSize:11, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Цаг сонгох</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {showtimes.map(st => (
                  <ShowtimeBtn key={st.id}
                    time={new Date(st.start_time).toLocaleTimeString("mn-MN",{hour:"2-digit",minute:"2-digit"})}
                    active={selectedShowtime?.id === st.id}
                    onClick={() => setSelectedShowtime(st)} />
                ))}
              </div>
            </div>
          )}
        </div>

        <SeatMap seats={seats} onToggle={toggleSeat} />

        {/* Sticky booking bar */}
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(13,13,13,0.97)", borderTop:"1px solid rgba(255,255,255,0.07)", padding:"14px 20px", backdropFilter:"blur(10px)", zIndex:50 }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              {selected.length > 0 ? (
                <>
                  <p style={{ color:"#888", fontSize:12, marginBottom:2 }}>Сонгосон: <span style={{ color:"#fff" }}>{selected.join(", ")}</span></p>
                  <p style={{ color:"#fff", fontWeight:700, fontSize:20 }}>{totalPrice.toLocaleString()}₮</p>
                </>
              ) : <p style={{ color:"#555", fontSize:13 }}>Суудал сонгоно уу</p>}
            </div>
            <Btn onClick={handleBook} disabled={!selected.length || submitting} size="lg">
              {submitting ? <Spinner size={16} /> : `🎫 Захиалах (${selected.length} суудал)`}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
