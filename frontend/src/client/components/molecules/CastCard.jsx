const CastCard = ({ actor }) => (
  <div className="flex-shrink-0 w-32 group cursor-pointer">
    <div className="relative overflow-hidden rounded-xl mb-2 border-2 border-transparent group-hover:border-[#e63946] transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(230,57,70,0.3)]">
      <img
        src={actor.image}
        alt={actor.name}
        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=1f1f1f&color=e63946&size=160`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <p className="text-white font-semibold text-xs text-center leading-tight truncate">{actor.name}</p>
    <p className="text-[#b3b3b3] text-xs text-center truncate mt-0.5 italic">{actor.character}</p>
  </div>
);

export default CastCard;
