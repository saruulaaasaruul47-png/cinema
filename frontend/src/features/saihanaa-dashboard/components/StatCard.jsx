function StatCard({ label, value, helper, tone = 'neutral' }) {
  return (
    <article className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  )
}

export default StatCard
