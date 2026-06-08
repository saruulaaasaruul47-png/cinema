function HeroSummary({ totalElements }) {
  return (
    <section className="border-b border-[#1f1f1f] bg-linear-to-b from-[#1a0000] to-[#0a0a0a] px-3.5 py-8 sm:px-6">
      <h1 className="mb-1 text-[22px] font-semibold text-[#f5f5f5]">Кино хайх</h1>
      <p className="mb-5 text-[13px] text-[#777]">Кино сонгож, суудлаа урьдчилан захиалаарай</p>
      <div className="grid max-w-[720px] gap-2.5 sm:grid-cols-3">
        <div className="rounded-lg border border-[#1f1f1f] bg-[#111] px-3.5 py-3">
          <div className="mb-1 text-[11px] text-[#666]">Нийт цаг</div>
          <div className="text-xl font-semibold text-[#e63946]">{totalElements}</div>
        </div>
        <div className="rounded-lg border border-[#1f1f1f] bg-[#111] px-3.5 py-3">
          <div className="mb-1 text-[11px] text-[#666]">Өнөөдрийн цаг</div>
          <div className="text-xl font-semibold text-[#f0f0f0]">{totalElements}</div>
        </div>
        <div className="rounded-lg border border-[#1f1f1f] bg-[#111] px-3.5 py-3">
          <div className="mb-1 text-[11px] text-[#666]">Захиалга</div>
          <div className="text-xl font-semibold text-[#f0f0f0]">Live</div>
        </div>
      </div>
    </section>
  )
}

export default HeroSummary
