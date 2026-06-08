import { formatMoney } from '../utils/dashboardFormatters'

function RevenueTrend({ revenueByDay, totalRevenue, revenueMax }) {
  return (
    <article className="panel wide" id="revenue">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Last 7 days</p>
          <h2>Revenue trend</h2>
        </div>
        <strong>{formatMoney(totalRevenue)}</strong>
      </div>

      <div className="bar-chart" aria-label="Revenue by day">
        {revenueByDay.length === 0 ? (
          <div className="empty-state">Одоогоор revenue data алга байна.</div>
        ) : (
          revenueByDay.map((item) => {
            const height = Math.max((Number(item.revenue || 0) / revenueMax) * 100, 8)
            return (
              <div className="bar-column" key={item.day}>
                <div className="bar-track">
                  <span style={{ height: `${height}%` }}></span>
                </div>
                <small>{new Date(item.day).toLocaleDateString('mn-MN', { month: 'short', day: 'numeric' })}</small>
              </div>
            )
          })
        )}
      </div>
    </article>
  )
}

export default RevenueTrend
