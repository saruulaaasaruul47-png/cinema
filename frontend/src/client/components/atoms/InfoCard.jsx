const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="bg-[#171717] rounded-xl p-4 flex items-start gap-3 border border-white/5 hover:border-[#e63946]/30 transition-all duration-300 group">
    <div className="p-2 rounded-lg bg-[#e63946]/10 group-hover:bg-[#e63946]/20 transition-colors duration-300 flex-shrink-0">
      <Icon className="w-4 h-4 text-[#e63946]" />
    </div>
    <div className="min-w-0">
      <p className="text-[#b3b3b3] text-xs uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-white font-semibold text-sm truncate">{value}</p>
    </div>
  </div>
);

export default InfoCard;
