import React from 'react'

const variants = {
  primary: 'bg-cinema-red hover:bg-cinema-red-dark text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer border-0',
  secondary: 'bg-cinema-card2 hover:bg-cinema-border text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm border border-cinema-border cursor-pointer',
  danger: 'bg-red-900/40 hover:bg-red-900/70 text-red-400 font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm border border-red-900/50 cursor-pointer',
  ghost: 'text-cinema-muted hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-1',
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
