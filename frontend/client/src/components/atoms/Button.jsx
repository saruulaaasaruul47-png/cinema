const baseClass =
  'min-h-8 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-2.5 py-[7px] text-xs font-semibold text-[#aaa] transition hover:border-[#e63946] hover:text-white disabled:cursor-not-allowed disabled:opacity-45'

function Button({ children, className = '', type = 'button', ...props }) {
  return (
    <button type={type} className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
