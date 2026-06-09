import SectionTitle from "../atoms/SectionTitle";

const MetaRow = ({ label, value }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
    <span className="text-[#b3b3b3] text-sm w-36 flex-shrink-0">{label}</span>
    <span className="text-white text-sm font-medium">{value}</span>
  </div>
);

const SynopsisSection = ({ movie }) => (
  <section>
    <SectionTitle>Synopsis</SectionTitle>
    <div className="bg-[#171717] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
      <p className="text-[#b3b3b3] text-base leading-relaxed mb-8">{movie.description}</p>
      <div className="divide-y divide-white/5">
        <MetaRow label="Director" value={movie.director} />
        <MetaRow label="Writers" value={movie.writers.join(", ")} />
        <MetaRow label="Language" value={movie.language} />
        <MetaRow label="Country" value={movie.country} />
        <MetaRow label="Production" value={movie.productionCompany} />
        <MetaRow label="Release Date" value={movie.releaseDate} />
      </div>
    </div>
  </section>
);

export default SynopsisSection;
