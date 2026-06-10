import React from 'react'

const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-display tracking-wider text-white">{title}</h1>
      {subtitle && <p className="text-cinema-muted text-sm mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
)

export default PageHeader
