import { formatMoney, formatNumber } from '../utils/dashboardFormatters'
import StatCard from './StatCard'

function SummaryStats({ summary, seatsBooked, seatsTotal }) {
  return (
    <section className="stats-grid" aria-label="Dashboard summary">
      <StatCard
        label="Total revenue"
        value={formatMoney(summary.totalRevenue)}
        helper="Confirmed bookings"
        tone="green"
      />
      <StatCard
        label="Today revenue"
        value={formatMoney(summary.todayRevenue)}
        helper="Өнөөдрийн орлого"
        tone="blue"
      />
      <StatCard
        label="Bookings"
        value={formatNumber(summary.totalBookings)}
        helper={`${formatNumber(summary.activeBookings)} active`}
        tone="orange"
      />
      <StatCard
        label="Occupancy"
        value={`${summary.occupancyRate || 0}%`}
        helper={`${formatNumber(seatsBooked)} / ${formatNumber(seatsTotal)} seats`}
        tone="pink"
      />
    </section>
  )
}

export default SummaryStats
