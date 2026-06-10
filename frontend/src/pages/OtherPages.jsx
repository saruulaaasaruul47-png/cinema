// ── ShowtimesPage ─────────────────────────────────────────────
import { useState } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { showtimesApi } from "@/api/index.js";
import { useFetch } from "@/hooks/useFetch.js";
import { Badge, Spinner, EmptyState } from "@/atoms/index.jsx";
import { ShowtimeBtn } from "@/molecules/index.jsx";
import { InnerPageLayout } from "@/templates/index.jsx";

export function ShowtimesPage() {
  const { navigate } = useApp();
  const [format, setFormat] = useState("Бүгд");

  const { data, loading } = useFetch(() => showtimesApi.getAll());
  const allShowtimes = data?.data?.content || data?.showtimes || [];

  const filtered = format === "Бүгд" ? allShowtimes : allShowtimes.filter(st => st.format === format);

  // Movie-оор group хийнэ
  const grouped = filtered.reduce((acc, st) => {
    const key = st.movie_id;
    if (!acc[key]) acc[key] = { movie: { id:st.movie_id, title:st.movie_title, poster_url:st.poster_url, duration:st.duration, ageRating:st.age_rating }, times:[] };
    acc[key].times.push(st);
    return acc;
  }, {});

  return (
    <InnerPageLayout page="showtimes" title="ЦАГИЙН" accent="ХУВААРЬ"
      subtitle="Өнөөдөр ба маргаашийн кино цагийн хуваарь"
      onBack={() => navigate("home")}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px 60px" }}>
        {/* Format filter */}
        <div style={{ display:"flex", gap:2, background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:4, marginBottom:28, width:"fit-content" }}>
          {["Бүгд","2D","3D","IMAX"].map(f => (
            <button key={f} onClick={() => setFormat(f)}
              style={{ padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:500, border:"none", cursor:"pointer", fontFamily:"inherit", transition:"all .2s",
                background: format===f ? "#E50914" : "transparent",
                color: format===f ? "#fff" : "#777" }}>{f}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", padding:60 }}><Spinner size={40} /></div>
        ) : Object.keys(grouped).length === 0 ? (
          <EmptyState icon="🕐" title="Хуваарь байхгүй" subtitle="Одоогоор цагийн хуваарь байхгүй байна." />
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {Object.values(grouped).map(({ movie, times }) => (
              <div key={movie.id} style={{ background:"#111", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:18, display:"flex", gap:16, transition:"border .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                <img src={movie.poster_url} alt={movie.title} style={{ width:58, height:84, borderRadius:8, objectFit:"cover", border:"1px solid rgba(255,255,255,0.1)", flexShrink:0, cursor:"pointer" }}
                  onClick={() => navigate("detail", movie.id)}
                  onError={e => e.target.src=`https://placehold.co/58x84/161616/444?text=?`} />
                <div style={{ flex:1 }}>
                  <p onClick={() => navigate("detail", movie.id)}
                    style={{ color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer", marginBottom:6, transition:"color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#E50914"}
                    onMouseLeave={e => e.currentTarget.style.color="#fff"}>{movie.title}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {times.map(st => (
                      <ShowtimeBtn key={st.id}
                        time={new Date(st.start_time).toLocaleTimeString("mn-MN",{hour:"2-digit",minute:"2-digit"})}
                        movieId={movie.id} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </InnerPageLayout>
  );
}

// ── ComingSoonPage ─────────────────────────────────────────────
import { moviesApi } from "@/api/index.js";
import { Btn } from "@/atoms/index.jsx";
import { Tag } from "@/atoms/index.jsx";

export function ComingSoonPage() {
  const { navigate } = useApp();
  const { data, loading } = useFetch(() => moviesApi.getAll({ status:"coming_soon" }));
  const movies = (data?.movies || []).filter(m => m.status === "coming_soon");

  return (
    <InnerPageLayout page="coming-soon" title="УДАХГҮЙ" accent="ГАРАХ"
      subtitle={`${movies.length} кино удахгүй гарна`}
      onBack={() => navigate("home")}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px 60px", display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(480px, 1fr))", gap:20 }}>
        {loading ? <Spinner size={40} /> : movies.map(movie => (
          <div key={movie.id} style={{ background:"#111", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, overflow:"hidden", transition:"border .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="rgba(229,9,20,0.25)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
            <div style={{ position:"relative", aspectRatio:"21/9", overflow:"hidden" }}>
              <img src={movie.backdropUrl || movie.backdrop_url || movie.posterUrl || movie.poster_url} alt={movie.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s" }}
                onMouseEnter={e => e.target.style.transform="scale(1.05)"}
                onMouseLeave={e => e.target.style.transform="scale(1)"}
                onError={e => e.target.src=`https://placehold.co/800x343/161616/E50914?text=${encodeURIComponent(movie.title)}`} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #111 0%, rgba(0,0,0,0.35) 100%)" }} />
              <div style={{ position:"absolute", top:12, left:12 }}><Badge variant="red">⏳ Удахгүй</Badge></div>
              {movie.releaseDate && <div style={{ position:"absolute", top:12, right:12 }}><Badge variant="ghost">📅 {movie.releaseDate || movie.release_date}</Badge></div>}
            </div>
            <div style={{ padding:"16px 18px 18px", display:"flex", gap:14 }}>
              <img src={movie.posterUrl || movie.poster_url} alt={movie.title}
                style={{ width:52, height:74, borderRadius:8, objectFit:"cover", border:"1px solid rgba(255,255,255,0.1)", flexShrink:0, marginTop:-32, position:"relative", zIndex:1 }}
                onError={e => e.target.src=`https://placehold.co/52x74/161616/444?text=?`} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ color:"#fff", fontWeight:600, fontSize:15, marginBottom:6 }}>{movie.title}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8 }}>
                  {movie.genres?.slice(0,3).map(g => <Tag key={g.id||g}>{g.name||g}</Tag>)}
                </div>
                <p style={{ color:"#777", fontSize:13, lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", marginBottom:14 }}>{movie.description}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <Btn variant="ghost" size="sm" onClick={() => navigate("detail", movie.id)}>Дэлгэрэнгүй</Btn>
                  <Btn variant="outline" size="sm">🔔 Сануулга</Btn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InnerPageLayout>
  );
}

// ── BookingHistoryPage ─────────────────────────────────────────
import { useAuth } from "@/context/AuthContext.jsx";
import { bookingsApi } from "@/api/index.js";
import { useMutation } from "@/hooks/useFetch.js";
import { BookingCard } from "@/molecules/index.jsx";

export function BookingHistoryPage() {
  const { navigate, showToast } = useApp();
  const { user, token } = useAuth();

  const { data, loading, refetch } = useFetch(
    () => user ? bookingsApi.getHistory({}, token) : Promise.resolve({ data:{ content:[] } }),
    [user?.id]
  );
  const bookings = data?.data?.content || data?.bookings || [];
  const total = bookings.reduce((s,b) => s + Number(b.total_price||0), 0);

  const { mutate: cancelBooking } = useMutation((id) => bookingsApi.cancel(id, token));

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      showToast("Захиалга цуцлагдлаа", "success");
      refetch();
    } catch (e) {
      showToast(e.message || "Алдаа гарлаа", "error");
    }
  };

  if (!user) return (
    <InnerPageLayout page="history" title="ЗАХИАЛГИЙН" accent="ТҮҮХ" onBack={() => navigate("home")}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 20px 60px" }}>
        <EmptyState icon="🔐" title="Нэвтрэх шаардлагатай" subtitle="Захиалгын түүхээ харахын тулд нэвтэрнэ үү" action="Нэвтрэх" onAction={() => navigate("login")} />
      </div>
    </InnerPageLayout>
  );

  return (
    <InnerPageLayout page="history" title="ЗАХИАЛГИЙН" accent="ТҮҮХ"
      subtitle={`${bookings.length} захиалга`}
      onBack={() => navigate("home")}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 20px 60px" }}>
        {loading ? <div style={{ display:"flex", justifyContent:"center", padding:60 }}><Spinner size={40} /></div>
          : bookings.length === 0 ? (
            <EmptyState icon="🎫" title="Захиалга байхгүй" subtitle="Та одоохондоо кино захиалаагүй байна" action="Кино үзэх" onAction={() => navigate("home")} />
          ) : (
            <>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:40 }}>
                {bookings.map(b => <BookingCard key={b.id} booking={b} onCancel={handleCancel} />)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {[["Нийт захиалга",bookings.length],["Нийт зарцуулсан",`${total.toLocaleString()}₮`],["Статус","Идэвхтэй"]].map(([l,v]) => (
                  <div key={l} style={{ padding:"16px 12px", background:"#111", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, textAlign:"center" }}>
                    <p style={{ color:"#fff", fontWeight:700, fontSize:18, marginBottom:4 }}>{v}</p>
                    <p style={{ color:"#555", fontSize:12 }}>{l}</p>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    </InnerPageLayout>
  );
}

// ── LoginPage ──────────────────────────────────────────────────
import { Divider, Input as AtomInput } from "@/atoms/index.jsx";

export function LoginPage({ defaultAdmin = false }) {
  const { navigate, showToast } = useApp();
  const { login, adminLogin, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(defaultAdmin);
  const [form, setForm] = useState({ username:"", email:"", password:"", role:"user" });
  const [loading2, setLoading2] = useState(false);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      if (isRegister) {
        await register({ username: form.username, email: form.email, password: form.password, role: form.role });
        showToast("Бүртгэл амжилттай! Нэвтэрнэ үү.", "success");
        setIsRegister(false);
      } else {
        if (isAdminLogin) {
          await adminLogin({ email: form.email, password: form.password });
          showToast("Admin/employee login successful!", "success");
          navigate("admin");
          return;
        }
        await login({ email: form.email, password: form.password });
        showToast("Нэвтрэлт амжилттай!", "success");
        navigate("home");
      }
    } catch (err) {
      showToast(err.message || "Алдаа гарлаа", "error");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex" }}>
      {/* Left backdrop */}
      <div style={{ flex:1, position:"relative", overflow:"hidden", display:"none" }} className="cx-show-lg">
        <img src="https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(8,8,8,0.5), rgba(8,8,8,0.95))" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:48 }}>
          <div style={{ width:64, height:64, background:"#E50914", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, fontSize:28, boxShadow:"0 0 40px rgba(229,9,20,0.5)" }}>🎬</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"3.2rem", color:"#fff", letterSpacing:4, marginBottom:10 }}>CINEMA<span style={{ color:"#E50914" }}>X</span></h2>
          <p style={{ color:"#888", fontSize:14, maxWidth:280, lineHeight:1.7, marginBottom:40 }}>Дэлхийн хамгийн шинэ кинуудыг IMAX, 3D, 2D-ээр үзэх боломж олго.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[["50+","Кино"],["8","Заал"],["1000+","Суудал"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <p style={{ fontFamily:"var(--font-display)", fontSize:"2rem", color:"#E50914" }}>{v}</p>
                <p style={{ color:"#555", fontSize:12 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex:1, maxWidth:480, display:"flex", flexDirection:"column", justifyContent:"center", padding:"48px 40px" }}>
        <button onClick={() => navigate("home")} style={{ display:"flex", alignItems:"center", gap:4, color:"#666", fontSize:13, marginBottom:32, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", alignSelf:"flex-start" }}>◀ Нүүр хуудас</button>

        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"2rem", color:"#fff", letterSpacing:2, marginBottom:6 }}>{isRegister?"БҮРТГҮҮЛЭХ":"НЭВТРЭХ"}</h1>
        <p style={{ color:"#555", fontSize:13, marginBottom:24 }}>{isRegister?"Шинэ бүртгэл үүсгэх":"Таны акаунтад нэвтрэх"}</p>

        {/* Tabs */}
        <div style={{ display:"flex", background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:4, marginBottom:24, gap:4 }}>
          {[["Нэвтрэх",false],["Бүртгүүлэх",true]].map(([l,v]) => (
            <button key={l} onClick={() => setIsRegister(v)} style={{ flex:1, padding:9, borderRadius:8, fontSize:13, fontWeight:600, border:"none", cursor:"pointer", fontFamily:"inherit", transition:"all .2s",
              background: isRegister===v ? "#E50914" : "transparent", color: isRegister===v ? "#fff" : "#666" }}>{l}</button>
          ))}
        </div>

        {!isRegister && (
          <button type="button" onClick={() => setIsAdminLogin(v => !v)} style={{ marginBottom:14, width:"100%", padding:"10px 12px", borderRadius:10, border:"1px solid rgba(229,9,20,0.25)", background:isAdminLogin ? "rgba(229,9,20,0.14)" : "#111", color:isAdminLogin ? "#fff" : "#777", fontSize:13, fontWeight:600, fontFamily:"inherit", cursor:"pointer" }}>
            {isAdminLogin ? "Admin/employee login идэвхтэй" : "Admin/employee login"}
          </button>
        )}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {isRegister && <AtomInput label="Нэр" placeholder="Таны нэр" value={form.username} onChange={set("username")} />}
          {isRegister && (
            <label style={{ display:"flex", flexDirection:"column", gap:7 }}>
              <span style={{ color:"#777", fontSize:12, fontWeight:600 }}>Role</span>
              <select value={form.role} onChange={set("role")} style={{ width:"100%", background:"#111", color:"#fff", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 13px", outline:"none", fontFamily:"inherit" }}>
                <option value="user">User</option>
                <option value="staff">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}
          <AtomInput label="И-мэйл" placeholder="example@email.com" value={form.email} onChange={set("email")} type="email" icon="✉" />
          <AtomInput label="Нууц үг" placeholder="••••••••" value={form.password} onChange={set("password")} type="password" icon="🔒" />
          <Btn type="submit" disabled={loading2} style={{ marginTop:4, width:"100%", padding:"13px" }}>
            {loading2 ? <Spinner size={16} /> : isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}
          </Btn>
        </form>

        <Divider label="эсвэл" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
          {["Google-ээр","Facebook-ээр"].map(l => (
            <Btn key={l} variant="ghost" style={{ width:"100%", padding:11 }} onClick={() => showToast("Тун удахгүй!", "error")}>{l}</Btn>
          ))}
        </div>
        <p style={{ textAlign:"center", color:"#444", fontSize:12 }}>
          {isRegister?"Аль хэдийн бүртгэлтэй?":"Бүртгэл байхгүй юу?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} style={{ color:"#E50914", fontWeight:600, fontSize:12, background:"none", border:"none", cursor:"pointer" }}>
            {isRegister?"Нэвтрэх":"Бүртгүүлэх"}
          </button>
        </p>
      </div>
      <style>{`@media(min-width:900px){.cx-show-lg{display:flex!important}}`}</style>
    </div>
  );
}
