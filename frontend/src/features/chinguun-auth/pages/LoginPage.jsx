import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

const POSTERS = [
  'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
  'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
]

const FEATURED = [
  { title: 'Dune: Part Two', genre: 'Sci-Fi' },
  { title: 'Interstellar', genre: 'Adventure' },
  { title: 'The Dark Knight', genre: 'Action' },
]

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [bgIdx, setBgIdx] = useState(0)

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
      {/* LEFT — Hero */}
      <div className="auth-hero">
        <div className="auth-hero-bg" style={{ backgroundImage: `url('${POSTERS[bgIdx]}')` }} />
        <div className="auth-hero-overlay" />
        <div className="auth-hero-content">
          <div className="auth-hero-tag">
            🎬 &nbsp;Now Showing
          </div>
          <h2 className="auth-hero-title">
            Your Cinema.<br />
            <span>Your Tickets.</span>
          </h2>
          <p className="auth-hero-desc">
            Монголын хамгийн том кино театрын захиалгын систем.
            Суудал сонгоод, тасалбараа захиалаарай.
          </p>
          <div className="auth-hero-stats">
            <div>
              <div className="auth-hero-stat-num">12+</div>
              <div className="auth-hero-stat-lbl">Танхим</div>
            </div>
            <div>
              <div className="auth-hero-stat-num">50+</div>
              <div className="auth-hero-stat-lbl">Кино</div>
            </div>
            <div>
              <div className="auth-hero-stat-num">1K+</div>
              <div className="auth-hero-stat-lbl">Захиалга</div>
            </div>
          </div>
          <div className="auth-hero-movies">
            {FEATURED.map((m, i) => (
              <div
                key={m.title}
                className="auth-hero-pill"
                onClick={() => setBgIdx(i)}
                style={{ opacity: bgIdx === i ? 1 : 0.65 }}
              >
                <span className="auth-hero-pill-dot" />
                {m.title}
              </div>
            ))}
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
          <h1>Нэвтрэх</h1>
          <p>Зөвхөн <strong style={{ color: 'var(--c-gold)' }}>Admin</strong> болон <strong style={{ color: 'var(--c-gold)' }}>Ажилтан</strong> нэвтрэх боломжтой</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
            {loading ? <span className="auth-spinner-sm" /> : 'Нэвтрэх →'}
          </button>
        </form>

        <p className="auth-footer">
          Нэвтрэх эрх авах бол системийн <strong style={{ color: 'var(--c-muted)' }}>Admin</strong>-тай холбогтун
        </p>
      </div>
    </div>
  )
}
