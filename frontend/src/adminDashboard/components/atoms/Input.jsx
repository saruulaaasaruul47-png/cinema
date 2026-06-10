import React from 'react'

const Input = ({ label, type = 'text', value, onChange, placeholder, name, required = false, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-xs text-cinema-muted uppercase tracking-wider font-semibold">
        {label}{required && <span className="text-cinema-red ml-0.5">*</span>}
      </label>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-cinema-card2 border border-cinema-border text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-cinema-red transition-colors placeholder-cinema-muted"
    />
  </div>
)

export default Input
