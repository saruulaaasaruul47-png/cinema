import { apiRequest } from '../../../config/api'

const request = (endpoint, options = {}) => apiRequest(endpoint, options)

export const authApi = {
  register: (body) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  adminLogin: (body) =>
    request('/auth/admin-login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () =>
    request('/auth/logout', { method: 'POST' }),

  refresh: () =>
    request('/auth/refresh', { method: 'POST' }),

  getProfile: (token) =>
    request('/users/profile', { headers: { Authorization: `Bearer ${token}` } }),

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
