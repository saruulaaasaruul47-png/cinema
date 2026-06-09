export const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api/v1'

export const emptyAnalytics = {
  summary: {
    totalUsers: 0,
    totalMovies: 0,
    totalHalls: 0,
    totalBookings: 0,
    activeBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    occupancyRate: 0,
  },
  recentBookings: [],
  popularMovies: [],
  hallOccupancy: [],
  revenueByDay: [],
}

export async function fetchDashboardAnalytics(signal) {
  const response = await fetch(`${API_BASE_URL}/dashboard/analytics`, { signal })

  if (!response.ok) {
    throw new Error('Dashboard дата татахад алдаа гарлаа')
  }

  const data = await response.json()
  return data.data || data.analytics || emptyAnalytics
}
