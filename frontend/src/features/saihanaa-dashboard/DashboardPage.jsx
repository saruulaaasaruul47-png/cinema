import { useEffect, useMemo, useState } from 'react'
import { emptyAnalytics, fetchDashboardAnalytics } from './api/dashboardApi'
import ContentStatus from './components/ContentStatus'
import DashboardHeader from './components/DashboardHeader'
import DashboardLayout from './components/DashboardLayout'
import DashboardNotice from './components/DashboardNotice'
import HallOccupancy from './components/HallOccupancy'
import PopularMovies from './components/PopularMovies'
import RecentBookings from './components/RecentBookings'
import RevenueTrend from './components/RevenueTrend'
import SummaryStats from './components/SummaryStats'
import './DashboardPage.css'

function DashboardPage() {
  const [analytics, setAnalytics] = useState(emptyAnalytics)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadDashboard = async () => {
      try {
        setStatus('loading')
        const dashboardData = await fetchDashboardAnalytics(controller.signal)
        setAnalytics(dashboardData)
        setStatus('success')
        setError('')
      } catch (err) {
        if (err.name === 'AbortError') return
        setAnalytics(emptyAnalytics)
        setStatus('error')
        setError(err.message || 'Dashboard API холбогдсонгүй')
      }
    }

    loadDashboard()

    return () => controller.abort()
  }, [])

  const summary = analytics.summary || emptyAnalytics.summary

  const revenueMax = useMemo(() => {
    const values = analytics.revenueByDay.map((item) => Number(item.revenue || 0))
    return Math.max(...values, 1)
  }, [analytics.revenueByDay])

  const seatsBooked = useMemo(
    () =>
      analytics.hallOccupancy.reduce(
        (total, hall) => total + Number(hall.booked_seats || hall.bookedSeats || 0),
        0,
      ),
    [analytics.hallOccupancy],
  )

  const seatsTotal = useMemo(
    () => analytics.hallOccupancy.reduce((total, hall) => total + Number(hall.seat_count || 0), 0),
    [analytics.hallOccupancy],
  )

  return (
    <DashboardLayout>
      <DashboardHeader status={status} />
      <DashboardNotice message={error} />

      <SummaryStats summary={summary} seatsBooked={seatsBooked} seatsTotal={seatsTotal} />

      <section className="panel-grid">
        <RevenueTrend
          revenueByDay={analytics.revenueByDay}
          totalRevenue={summary.totalRevenue}
          revenueMax={revenueMax}
        />
        <ContentStatus summary={summary} />
      </section>

      <section className="panel-grid">
        <PopularMovies movies={analytics.popularMovies} />
        <HallOccupancy halls={analytics.hallOccupancy} />
      </section>

      <RecentBookings bookings={analytics.recentBookings} />
    </DashboardLayout>
  )
}

export default DashboardPage
