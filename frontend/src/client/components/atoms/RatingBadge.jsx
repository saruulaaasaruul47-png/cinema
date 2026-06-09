import { Star } from "lucide-react";

const RatingBadge = ({ rating, size = "md" }) => {
  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center ${sizes[size]} rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold`}
    >
      <Star className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} fill="currentColor" />
      {rating}
    </span>
  );
};

export default RatingBadge;
