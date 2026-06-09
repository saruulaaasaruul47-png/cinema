const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#e63946] text-white hover:bg-[#c1121f] hover:scale-105 hover:shadow-[0_0_24px_rgba(230,57,70,0.5)]",
    outline:
      "bg-transparent text-white border-2 border-white/60 hover:border-white hover:bg-white/10 hover:scale-105",
    ghost:
      "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:scale-105",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
