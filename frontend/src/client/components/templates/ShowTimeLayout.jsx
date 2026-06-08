function ShowTimeLayout({ hero, filters, notice, list, editor }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <nav className="flex h-14 items-center justify-between gap-4 border-b border-[#1f1f1f] bg-[#111] px-3.5 sm:px-6">
        <div className="flex min-w-28 items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#e63946]"></div>
          <span className="text-base font-semibold text-[#f5f5f5]">CineBook</span>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-6 sm:flex">
          <span className="text-[13px] text-[#e63946]">Кино</span>
          <span className="text-[13px] text-[#888]">Цагийн хуваарь</span>
          <span className="text-[13px] text-[#888]">Захиалга</span>
        </div>
        <button className="min-w-20 rounded-[7px] border-0 bg-[#e63946] px-4 py-[7px] text-[13px] font-semibold text-white">
          Нэвтрэх
        </button>
      </nav>
      {hero}
      {filters}
      {notice}
      <section className="grid gap-5 px-3.5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {list}
        {editor}
      </section>
    </main>
  )
}

export default ShowTimeLayout
