import { useApp } from "@/context/AppContext.jsx";
import { moviesApi } from "@/api/index.js";
import { useFetch } from "@/hooks/useFetch.js";
import { Btn, Badge, Spinner, EmptyState } from "@/atoms/index.jsx";
import { ComingSoonCard } from "@/molecules/index.jsx";
import { HeroCarousel, MovieGrid } from "@/organisms/index.jsx";
import { PageLayout } from "@/templates/index.jsx";

const RED = "#E50914";

export default function HomePage() {
  const { navigate } = useApp();
  const { data, loading } = useFetch(() => moviesApi.getAll());

  const movies      = data?.movies || [];
  const nowPlaying  = movies.filter(m => m.status === "now_playing" || !m.status);
  const comingSoon  = movies.filter(m => m.status === "coming_soon");

  if (loading) return (
    <PageLayout page="home">
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"60vh" }}>
        <Spinner size={48} />
      </div>
    </PageLayout>
  );

  return (
    <PageLayout page="home">
      {/* Hero */}
      {nowPlaying.length > 0 && <HeroCarousel movies={nowPlaying.slice(0,4)} />}

      {/* Features strip */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.04)", background:"#0d0d0d", padding:"14px 20px", marginBottom:60 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:12 }}>
          {[["🏆","IMAX & 3D","Дэвшилтэт технологи"],["⚡","Онлайн захиалга","Хурдан & хялбар"],["🎫","E-Ticket","Цаасгүй орцон"],["⭐","Хөнгөлөлтийн карт","Гишүүн эрх"]].map(([ic,l,s]) => (
            <div key={l} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, transition:"background .2s", cursor:"default" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.025)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              <div style={{ width:36, height:36, borderRadius:8, background:"rgba(229,9,20,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{ic}</div>
              <div>
                <p style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{l}</p>
                <p style={{ color:"#555", fontSize:11 }}>{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Now playing */}
      {nowPlaying.length > 0 ? (
        <MovieGrid movies={nowPlaying} title="ОДОО" accent="ҮЗҮҮЛЖ БАЙНА"
          subtitle={`${nowPlaying.length} кино одоо гарч байна`}
          linkLabel="Бүгдийг харах" linkPage="movies" />
      ) : (
        <div style={{ maxWidth:1200, margin:"0 auto 60px", padding:"0 20px" }}>
          <EmptyState icon="🎬" title="Одоо үзүүлж буй кино байхгүй" />
        </div>
      )}

      {/* Promo banner */}
      <div style={{ maxWidth:1200, margin:"0 auto 60px", padding:"0 20px" }}>
        <div style={{ borderRadius:20, background:"linear-gradient(135deg, rgba(229,9,20,0.15) 0%, rgba(229,9,20,0.03) 100%)", border:"1px solid rgba(229,9,20,0.2)", padding:"40px 48px" }}>
          <div style={{ maxWidth:500 }}>
            <Badge variant="redOutline" style={{ marginBottom:14 }}>🎉 Тусгай санал</Badge>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,4vw,2.4rem)", color:"#fff", letterSpacing:2, marginBottom:10 }}>
              ГИШҮҮН КАРТААР <span style={{ color:RED }}>30%</span> ХЯМДРАЛ
            </h3>
            <p style={{ color:"#888", fontSize:14, lineHeight:1.7, marginBottom:22 }}>
              CinemaX гишүүн картаа авч, бүх үзвэрийн үнэнд 30% хямдрал эдэл.
            </p>
            <Btn onClick={() => navigate("login")}>Гишүүн болох</Btn>
          </div>
        </div>
      </div>

      {/* Coming soon */}
      {comingSoon.length > 0 && (
        <section style={{ maxWidth:1200, margin:"0 auto 60px", padding:"0 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,4vw,2.4rem)", color:"#fff", letterSpacing:2 }}>
                УДАХГҮЙ <span style={{ color:RED }}>ГАРАХ</span>
              </h2>
              <p style={{ color:"#555", fontSize:13, marginTop:4 }}>Ойрын хугацаанд гарах кинонууд</p>
            </div>
            <Btn variant="outline" size="sm" onClick={() => navigate("coming-soon")}>Бүгдийг харах →</Btn>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
            {comingSoon.slice(0,4).map(m => <ComingSoonCard key={m.id} movie={m} />)}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
