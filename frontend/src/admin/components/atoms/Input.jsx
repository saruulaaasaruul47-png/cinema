const Input = ({ label, type = 'text', value, onChange, placeholder, name, required = false, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-xs text-[#888888] uppercase tracking-wider font-semibold">
        {label}{required && <span className="text-[#e50914] ml-0.5">*</span>}
      </label>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-sm text-white placeholder-[#888888] transition-colors focus:border-[#e50914] focus:outline-none"
    />
  </div>
)

export default Input
