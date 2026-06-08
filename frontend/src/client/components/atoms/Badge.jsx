function Badge({ children, variant = 'default' }) {
  const className =
    variant === 'genre'
      ? 'rounded bg-[#e63946] px-[7px] py-0.5 text-[10px] font-semibold text-white'
      : 'rounded border border-[#333] bg-black/70 px-[7px] py-0.5 text-[10px] font-semibold text-[#ccc]'

  return <span className={className}>{children}</span>
}

export default Badge
