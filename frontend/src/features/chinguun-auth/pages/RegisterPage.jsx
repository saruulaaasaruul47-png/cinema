import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function RegisterPage() {
  const { register, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const validate = () => {
    if (!form.username.trim()) return 'Хэрэглэгчийн нэрийг оруулна уу'
    if (form.username.length < 3) return 'Хэрэглэгчийн нэр 3-аас дээш тэмдэгт байх ёстой'
    if (!form.email) return 'И-мэйл оруулна уу'
    if (!form.password) return 'Нууц үг оруулна уу'
    if (form.password.length < 6) return 'Нууц үг 6-аас дээш тэмдэгт байх ёстой'
    if (form.password !== form.confirm) return 'Нууц үг таарахгүй байна'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    try {
      await register(form.username, form.email, form.password)
      // Бүртгэлийн дараа шууд login хийх
      await login(form.email, form.password)
      navigate('/', { replace: true })
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

        <h1 className="auth-title">Бүртгүүлэх</h1>
        <p className="auth-subtitle">Шинэ бүртгэл үүсгэж эхэл</p>

        {error && (
          <div className="auth-error" role="alert">
            <span>⚠</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="username">Хэрэглэгчийн нэр</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="johndoe"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

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
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Нууц үг давтах</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner-sm" /> : 'Бүртгүүлэх'}
          </button>
        </form>

        <p className="auth-footer">
          Бүртгэлтэй юу?{' '}
          <Link to="/login">Нэвтрэх</Link>
        </p>
      </div>
    </div>
  )
}
