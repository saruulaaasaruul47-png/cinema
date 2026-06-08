function FormField({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] text-[#666]">{label}</span>
      {children}
    </label>
  )
}

export default FormField
