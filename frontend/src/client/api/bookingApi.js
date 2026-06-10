import { apiData } from '../../config/api'

async function request(endpoint, options = {}) {
  return apiData(endpoint, options)
}

export const bookingApi = {
  getSeatMap: (showtimeId, signal) =>
    request(`/bookings/showtimes/${showtimeId}/seats`, { signal }),

  create: (booking) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    }),

  cancel: (bookingId) =>
    request(`/bookings/${bookingId}/cancel`, { method: 'PATCH' }),

  history: (email = '', signal) => {
    const query = email ? `?email=${encodeURIComponent(email)}` : ''
    return request(`/bookings/history${query}`, { signal })
  },
}
