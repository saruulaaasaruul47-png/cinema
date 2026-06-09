export const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api/v1'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed')
    error.errors = payload.errors
    throw error
  }

  return payload.data ?? payload
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
