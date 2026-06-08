import { formatNumber } from '../utils/dashboardFormatters'

function ContentStatus({ summary }) {
  return (
    <article className="panel compact">
      <div className="panel-header">
        <div>
          <p className="eyebrow">System</p>
          <h2>Content status</h2>
        </div>
      </div>
      <div className="status-list">
        <div><span>Users</span><strong>{formatNumber(summary.totalUsers)}</strong></div>
        <div><span>Movies</span><strong>{formatNumber(summary.totalMovies)}</strong></div>
        <div><span>Halls</span><strong>{formatNumber(summary.totalHalls)}</strong></div>
        <div><span>Cancelled</span><strong>{formatNumber(summary.cancelledBookings)}</strong></div>
      </div>
    </article>
  )
}

export default ContentStatus
