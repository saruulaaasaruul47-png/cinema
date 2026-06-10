import { useApp } from "@/context/AppContext.jsx";
import { moviesApi } from "@/api/index.js";
import { useFetch } from "@/hooks/useFetch.js";
import { Btn, Badge, Tag, StarRating, Spinner, EmptyState } from "@/atoms/index.jsx";
import { ShowtimeBtn, MovieCard } from "@/molecules/index.jsx";
import { Navbar, Footer } from "@/organisms/index.jsx";

const RED = "#E50914";

export default function MovieDetailPage({ id }) {
  const { navigate } = useApp();
  const { data, loading } = useFetch(() => moviesApi.getById(id), [id]);

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", justifyContent:"center", alignItems:"center" }}>
      <Spinner size={48} />
    </div>
  );

  const movie = data?.movie || data;
  if (!movie) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:16 }}>
      <EmptyState icon="🎬" title="Кино олдсонгүй" action="Нүүр хуудас" onAction={() => navigate("home")} />
    </div>
  );

  const backdrop = movie.backdropUrl || movie.backdrop_url || movie.posterUrl || movie.poster_url;
  const poster   = movie.posterUrl   || movie.poster_url;

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Navbar currentPage="detail" />

      {/* Hero */}
      <section style={{ position:"relative", minHeight:"85vh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src={backdrop} alt={movie.title} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} onError={e => e.target.style.display="none"} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #080808 0%, rgba(8,8,8,0.72) 55%, rgba(8,8,8,0.2) 100%)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 55%, transparent 100%)" }} />
        </div>

        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:1200, margin:"0 auto", padding:"0 20px 56px" }}>
          <button onClick={() => navigate("movies")} style={{ display:"flex", alignItems:"center", gap:4, color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:24, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit" }}>◀ Буцах</button>
          <div style={{ display:"flex", gap:36, alignItems:"flex-end" }}>
            {poster && (
              <div style={{ width:220, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", flexShrink:0, display:"none" }} className="cx-show-lg">
                <img src={poster} alt={movie.title} style={{ width:"100%", display:"block" }} />
              </div>
            )}
            <div style={{ flex:1, maxWidth:640 }}>
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                <Badge variant="red">{movie.ageRating || "PG"}</Badge>
                <span style={{ color:"#aaa", fontSize:13 }}>Одоо үзүүлж байна</span>
              </div>
              <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.5rem,7vw,5rem)", color:"#fff", lineHeight:1, marginBottom:16, letterSpacing:2 }}>{movie.title}</h1>
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:10, marginBottom:12 }}>
                {movie.rating > 0 && <StarRating rating={movie.rating} />}
                {movie.duration && <span style={{ color:"#aaa", fontSize:13 }}>⏱ {movie.duration} мин</span>}
                {movie.director && <span style={{ color:"#aaa", fontSize:13 }}>🎬 {movie.director}</span>}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                {movie.genres?.map(g => <Tag key={g.id||g}>{g.name||g}</Tag>)}
              </div>
              <p style={{ color:"#999", fontSize:14, lineHeight:1.7, maxWidth:520, marginBottom:24 }}>{movie.description}</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <Btn onClick={() => navigate("booking", movie.id)} size="lg">🎫 Тасалбар захиалах</Btn>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(min-width:1024px){.cx-show-lg{display:block!important}}`}</style>
      </section>

      {/* Body */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 20px 60px", display:"flex", gap:40, flexWrap:"wrap" }}>
        <main style={{ flex:1, minWidth:0 }}>
          {/* Metadata */}
          <section style={{ marginBottom:40 }}>
            <h2 style={{ color:"#fff", fontWeight:600, fontSize:16, marginBottom:14, paddingLeft:12, borderLeft:`2px solid ${RED}` }}>Мэдээлэл</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:10 }}>
              {[["Найруулагч", movie.director],["Хэл", movie.language],["Үргэлжлэх хугацаа", movie.duration && `${movie.duration} мин`],["Гарсан огноо", movie.releaseDate || movie.release_date]].filter(([,v])=>v).map(([l,v]) => (
                <div key={l} style={{ padding:"10px 12px", background:"#111", border:"1px solid rgba(255,255,255,0.05)", borderRadius:10 }}>
                  <p style={{ color:"#555", fontSize:11, marginBottom:4 }}>{l}</p>
                  <p style={{ color:"#fff", fontSize:13, fontWeight:500 }}>{v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Showtimes from API */}
          {movie.showtimes?.length > 0 && (
            <section style={{ marginBottom:40 }}>
              <h2 style={{ color:"#fff", fontWeight:600, fontSize:16, marginBottom:14, paddingLeft:12, borderLeft:`2px solid ${RED}` }}>Цагийн хуваарь</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {movie.showtimes.map(st => (
                  <div key={st.id} style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                    <span style={{ color:"#555", fontSize:12, minWidth:120 }}>{new Date(st.start_time).toLocaleDateString("mn-MN")}</span>
                    <ShowtimeBtn time={new Date(st.start_time).toLocaleTimeString("mn-MN",{hour:"2-digit",minute:"2-digit"})} movieId={movie.id} />
                    {st.hall_name && <span style={{ color:"#555", fontSize:12 }}>— {st.hall_name}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside style={{ width:260, flexShrink:0 }}>
          <div style={{ background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", position:"sticky", top:88 }}>
            <div style={{ padding:20 }}>
              <p style={{ color:"#fff", fontWeight:600, fontSize:14, marginBottom:16 }}>Тасалбар захиалах</p>
              {[["Ердийн тасалбар","18,000₮"],["IMAX тасалбар","28,000₮"],["3D тасалбар","22,000₮"]].map(([l,p]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color:"#888", fontSize:13 }}>{l}</span>
                  <span style={{ color:"#fff", fontWeight:600, fontSize:13 }}>{p}</span>
                </div>
              ))}
              <Btn onClick={() => navigate("booking", movie.id)} style={{ width:"100%", marginTop:16 }}>Суудал сонгох</Btn>
            </div>
            <div style={{ padding:"0 20px 20px" }}>
              <div style={{ padding:"10px 12px", background:"rgba(229,9,20,0.05)", border:"1px solid rgba(229,9,20,0.15)", borderRadius:10 }}>
                <p style={{ color:RED, fontSize:11, fontWeight:600, marginBottom:2 }}>💳 Гишүүн эрх</p>
                <p style={{ color:"#666", fontSize:11 }}>Гишүүн картаар 30% хямдарна</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
