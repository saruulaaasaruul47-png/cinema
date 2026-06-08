function SectionTitle({ title, meta }) {
  return (
    <div className="flex w-full items-baseline justify-between gap-3">
      <h2 className="m-0 text-sm font-semibold uppercase tracking-[1px] text-[#888]">{title}</h2>
      {meta ? <p className="m-0 text-xs text-[#555]">{meta}</p> : null}
    </div>
  )
}

export default SectionTitle
