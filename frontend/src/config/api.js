export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? '/api/v1' : 'http://localhost:5050/api/v1')

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(
      payload.message || payload.error || 'Алдаа гарлаа'
    )
    error.statusCode = response.status
    error.errors = payload.errors
    throw error
  }

  return payload
}

export async function apiData(endpoint, options = {}) {
  const payload = await apiRequest(endpoint, options)
  return payload.data ?? payload
}
