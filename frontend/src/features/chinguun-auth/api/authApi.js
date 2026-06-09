const API = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || data.error || 'Алдаа гарлаа')
  return data
}

export const authApi = {
  register: (body) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () =>
    request('/auth/logout', { method: 'POST' }),

  refresh: () =>
    request('/auth/refresh', { method: 'POST' }),

  getProfile: (token) =>
    request('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProfile: (token, body) =>
    request('/users/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),

  changePassword: (token, body) =>
    request('/users/change-password', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),
}
