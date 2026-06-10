import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'
import { authApi } from '../../../features/chinguun-auth/api/authApi'
import { useAuth } from '../../../features/chinguun-auth/context/AuthContext'

export default function AdminLoginPage() {
  const { setTokenAndUser } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Бүх талбарыг бөглөнө үү'); return }
    setLoading(true)
    try {
      const data = await authApi.adminLogin(form)
      setTokenAndUser(data.accessToken, data.user)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#0a0a0a',
      fontFamily: 'Inter, sans-serif', padding: '24px',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px',
        background: '#111111', border: '1px solid #2a2a2a',
        borderRadius: '16px', padding: '40px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{
            width: '36px', height: '36px', background: '#e50914',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Clapperboard size={18} color="white" />
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.08em', color: 'white' }}>
            CinemaBook Admin
          </span>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: 'white', letterSpacing: '0.03em', marginBottom: '6px' }}>
            Нэвтрэх
          </h1>
          <p style={{ fontSize: '13px', color: '#666' }}>
            Зөвхөн <span style={{ color: '#e50914', fontWeight: 600 }}>Admin</span> болон{' '}
            <span style={{ color: '#e50914', fontWeight: 600 }}>Ажилтан</span>
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)',
            color: '#ff6b6b', borderRadius: '10px', padding: '12px 14px',
            fontSize: '13.5px', marginBottom: '20px', display: 'flex', gap: '8px',
          }}>
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['email', 'password'].map((field) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555' }}>
                {field === 'email' ? 'И-мэйл' : 'Нууц үг'}
              </label>
              <input
                name={field}
                type={field === 'password' ? 'password' : 'email'}
                autoComplete={field}
                placeholder={field === 'email' ? 'admin@cinema.mn' : '••••••••'}
                value={form[field]}
                onChange={handleChange}
                disabled={loading}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2a2a',
                  borderRadius: '10px', padding: '13px 15px', color: 'white',
                  fontSize: '15px', outline: 'none', fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = '#e50914'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
          ))}
          <button
            type="submit" disabled={loading}
            style={{
              background: loading ? '#333' : '#e50914', color: 'white', border: 'none',
              borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: 700,
              fontFamily: 'Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px', letterSpacing: '0.04em',
            }}
          >
            {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх →'}
          </button>
        </form>
      </div>
    </div>
  )
}
