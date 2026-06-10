import { useState } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { moviesApi } from "@/api/index.js";
import { useFetch } from "@/hooks/useFetch.js";
import { Input, Select, Spinner, EmptyState } from "@/atoms/index.jsx";
import { MovieCard } from "@/molecules/index.jsx";
import { InnerPageLayout } from "@/templates/index.jsx";

export default function MoviesPage() {
  const { navigate } = useApp();
  const [search, setSearch] = useState("");
  const [genre,  setGenre]  = useState("Бүгд");
  const [sort,   setSort]   = useState("rating");

  const { data, loading } = useFetch(() => moviesApi.getAll());
  const movies = (data?.movies || []).filter(m => m.status === "now_playing" || !m.status);

  const allGenres = [...new Set(movies.flatMap(m => m.genres?.map(g => g.name || g) || []))].sort();

  const filtered = movies
    .filter(m => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre  = genre === "Бүгд" || m.genres?.some(g => (g.name||g) === genre);
      return matchSearch && matchGenre;
    })
    .sort((a,b) => {
      if (sort==="rating") return (b.rating||0) - (a.rating||0);
      if (sort==="title")  return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <InnerPageLayout page="movies" title="ОДОО" accent="ҮЗҮҮЛЖ БАЙНА"
      subtitle={`${movies.length} кино одоо гарч байна`}
      onBack={() => navigate("home")} backLabel="Нүүр хуудас">

      {/* Filters */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px 28px", display:"flex", flexWrap:"wrap", gap:10 }}>
        <div style={{ flex:1, minWidth:200 }}>
          <Input placeholder="Кино хайх..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" />
        </div>
        <Select value={genre} onChange={e => setGenre(e.target.value)}
          options={["Бүгд", ...allGenres]} />
        <Select value={sort} onChange={e => setSort(e.target.value)}
          options={[{value:"rating",label:"Үнэлгээгээр"},{value:"title",label:"Нэрээр"}]} />
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px 60px" }}>
        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", padding:60 }}><Spinner size={40} /></div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="🎬" title="Кино олдсонгүй" subtitle="Хайлтаа өөрчилж үзнэ үү" />
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:14 }}>
            {filtered.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </div>
    </InnerPageLayout>
  );
}
