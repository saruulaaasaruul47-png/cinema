import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const regexEmail = /@/

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('И-мэйл болон нууц үгээ оруулна уу')
      return
    }
    // if (!regexEmail.test(form.email)) {
    //   setError('И-мэйл хаяг байна')
    //   console.log("@ байхгүй байна")
    //   return
    // }
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg-reel" />
        <div className="auth-bg-reel reel-2" />
        <div className="auth-film-strip" />
      </div>

      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand-icon">🎬</span>
          <span className="auth-brand-name">CinemaBook</span>
        </div>

        <h1 className="auth-title">Нэвтрэх</h1>
        <p className="auth-subtitle">Тасалбараа захиалахын тулд нэвтэрнэ үү</p>

        {error && (
          <div className="auth-error" role="alert">
            <span>⚠</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="email">И-мэйл</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Нууц үг</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner-sm" /> : 'Нэвтрэх'}
          </button>
        </form>

        <p className="auth-footer">
          Бүртгэл байхгүй юу?{' '}
          <Link to="/register">Бүртгүүлэх</Link>
        </p>
      </div>
    </div>
  )
}
