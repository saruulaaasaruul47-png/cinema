const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="font-['Bebas_Neue'] text-3xl tracking-wider text-white">{title}</h1>
      {subtitle && <p className="text-[#888888] text-sm mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
)

export default PageHeader
