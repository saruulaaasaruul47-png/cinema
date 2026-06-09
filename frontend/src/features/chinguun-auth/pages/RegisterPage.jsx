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
    if (form.username.length < 3) return 'Хэрэглэгчийн нэр 3+ тэмдэгт байх ёстой'
    if (!form.email) return 'И-мэйл оруулна уу'
    if (!form.password) return 'Нууц үг оруулна уу'
    if (form.password.length < 6) return 'Нууц үг 6+ тэмдэгт байх ёстой'
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
      {/* LEFT — Hero */}
      <div className="auth-hero">
        <div className="auth-hero-bg" style={{ backgroundImage: "url('https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg')" }} />
        <div className="auth-hero-overlay" />
        <div className="auth-hero-content">
          <div className="auth-hero-tag">
            🎟 &nbsp;Join Us
          </div>
          <h2 className="auth-hero-title">
            Нэгдэж,<br />
            <span>туршлагаа</span><br />
            эхлүүл.
          </h2>
          <p className="auth-hero-desc">
            Бүртгүүлснээр онцгой урьдчилсан үзэлгээ, хөнгөлөлт, 
            хурдан суудал захиалах боломж нээгдэнэ.
          </p>
          <div className="auth-hero-stats">
            <div>
              <div className="auth-hero-stat-num">Үнэгүй</div>
              <div className="auth-hero-stat-lbl">Бүртгэл</div>
            </div>
            <div>
              <div className="auth-hero-stat-num">30с</div>
              <div className="auth-hero-stat-lbl">Захиалга</div>
            </div>
            <div>
              <div className="auth-hero-stat-num">E-Ticket</div>
              <div className="auth-hero-stat-lbl">Тасалбар</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="auth-panel">
        <div className="auth-brand">
          <div className="auth-brand-logo">🎬</div>
          <span className="auth-brand-name">CinemaBook</span>
        </div>

        <div className="auth-heading">
          <h1>Бүртгүүлэх</h1>
          <p>Шинэ бүртгэл үүсгэж эхэл</p>
        </div>

        {error && (
          <div className="auth-error">
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
            <label htmlFor="email">И-мэйл хаяг</label>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
              <label htmlFor="confirm">Давтах</label>
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
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner-sm" /> : 'Бүртгүүлэх →'}
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
