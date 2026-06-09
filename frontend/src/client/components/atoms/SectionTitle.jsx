const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
      {children}
    </h2>
    {subtitle && <p className="text-[#b3b3b3] text-sm mt-1">{subtitle}</p>}
    <div className="mt-3 w-12 h-0.5 bg-[#e63946] rounded-full" />
  </div>
);

export default SectionTitle;
