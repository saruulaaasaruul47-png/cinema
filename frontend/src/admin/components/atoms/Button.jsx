const variants = {
  primary: 'inline-flex items-center justify-center gap-2 rounded-md border border-[#e50914] bg-[#e50914] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#b80710]',
  secondary: 'inline-flex items-center justify-center gap-2 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-[#e50914]/50 hover:bg-[#2a2a2a]',
  danger: 'inline-flex items-center justify-center gap-2 rounded-md border border-red-900/50 bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-300 transition duration-200 hover:bg-red-900/70',
  ghost: 'text-[#888888] hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-1',
}

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
)

export default Button
