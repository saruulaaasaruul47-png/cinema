import { apiRequest } from '../../../config/api'

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
  const payload = await apiRequest('/dashboard/analytics', { signal })
  return payload.data || payload.analytics || emptyAnalytics
}
