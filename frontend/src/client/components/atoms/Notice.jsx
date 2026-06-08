function Notice({ message, type = 'success' }) {
  if (!message) return null

  const className =
    type === 'error'
      ? 'mx-3.5 mt-3.5 rounded-lg border border-[#e63946]/45 bg-[#e63946]/10 px-3.5 py-3 text-[13px] font-bold text-[#ff8b95] sm:mx-6'
      : 'mx-3.5 mt-3.5 rounded-lg border border-emerald-400/35 bg-emerald-400/10 px-3.5 py-3 text-[13px] font-bold text-[#8de3af] sm:mx-6'

  return <div className={className}>{message}</div>
}

export default Notice
