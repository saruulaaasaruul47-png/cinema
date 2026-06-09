// src/components/atoms/Button.jsx

const VARIANTS = {
  primary: `
    bg-cinema-red hover:bg-cinema-red-dark active:scale-95
    text-white font-semibold tracking-wide
    shadow-[0_4px_20px_rgba(229,9,20,0.4)]
    hover:shadow-[0_6px_28px_rgba(229,9,20,0.55)]
    disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
  `,
  ghost: `
    bg-transparent border border-white/15 hover:border-white/30
    hover:bg-white/5 active:scale-95
    text-white/80 hover:text-white font-medium
    disabled:opacity-40 disabled:cursor-not-allowed
  `,
  danger: `
    bg-transparent border border-cinema-red/50 hover:border-cinema-red
    hover:bg-cinema-red-dim active:scale-95
    text-cinema-red font-medium
    disabled:opacity-40 disabled:cursor-not-allowed
  `,
}

const SIZES = {
  sm:  'px-4 py-2 text-sm rounded-lg',
  md:  'px-6 py-3 text-sm rounded-xl',
  lg:  'px-8 py-4 text-base rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-150 cursor-pointer
        ${VARIANTS[variant] ?? VARIANTS.primary}
        ${SIZES[size] ?? SIZES.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
