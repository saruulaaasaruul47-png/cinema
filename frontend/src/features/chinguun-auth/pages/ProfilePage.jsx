import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function ProfilePage() {
  const { user, logout, updateProfile, changePassword } = useAuth()
  const navigate = useNavigate()

  const [profileForm, setProfileForm] = useState({ username: user?.username || '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' })
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' })
  const [profileLoading, setProfileLoading] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    if (!profileForm.username.trim()) {
      setProfileMsg({ type: 'error', text: 'Хэрэглэгчийн нэрийг оруулна уу' })
      return
    }
    setProfileLoading(true)
    try {
      await updateProfile({ username: profileForm.username })
      setProfileMsg({ type: 'success', text: 'Профайл амжилттай шинэчлэгдлээ' })
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message })
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePwSubmit = async (e) => {
    e.preventDefault()
    if (!pwForm.currentPassword || !pwForm.newPassword) {
      setPwMsg({ type: 'error', text: 'Бүх талбарыг бөглөнө үү' })
      return
    }
    if (pwForm.newPassword.length < 6) {
      setPwMsg({ type: 'error', text: 'Шинэ нууц үг 6-аас дээш тэмдэгт байх ёстой' })
      return
    }
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwMsg({ type: 'error', text: 'Нууц үг таарахгүй байна' })
      return
    }
    setPwLoading(true)
    try {
      await changePassword(pwForm.currentPassword, pwForm.newPassword)
      setPwMsg({ type: 'success', text: 'Нууц үг амжилттай солигдлоо' })
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' })
    } catch (err) {
      setPwMsg({ type: 'error', text: err.message })
    } finally {
      setPwLoading(false)
    }
  }

  const roleBadge = { admin: '👑 Admin', staff: '🎭 Staff', user: '🎟 User' }

  return (
    <div className="profile-page">
      <div className="auth-bg">
        <div className="auth-bg-reel" />
        <div className="auth-bg-reel reel-2" />
        <div className="auth-film-strip" />
      </div>

      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
            <span className="profile-role-badge">
              {roleBadge[user?.role] || user?.role}
            </span>
          </div>
          <button className="profile-logout-btn" onClick={handleLogout}>
            Гарах
          </button>
        </div>

        <div className="profile-grid">
          {/* Profile засах */}
          <div className="profile-card">
            <h2 className="profile-card-title">Профайл засах</h2>
            {profileMsg.text && (
              <div className={`auth-${profileMsg.type === 'error' ? 'error' : 'success'}`}>
                {profileMsg.text}
              </div>
            )}
            <form onSubmit={handleProfileSubmit} className="auth-form">
              <div className="auth-field">
                <label>Хэрэглэгчийн нэр</label>
                <input
                  type="text"
                  value={profileForm.username}
                  onChange={(e) => setProfileForm({ username: e.target.value })}
                  disabled={profileLoading}
                />
              </div>
              <div className="auth-field">
                <label>И-мэйл</label>
                <input type="email" value={user?.email || ''} disabled />
              </div>
              <button className="auth-btn" type="submit" disabled={profileLoading}>
                {profileLoading ? <span className="auth-spinner-sm" /> : 'Хадгалах'}
              </button>
            </form>
          </div>

          {/* Нууц үг солих */}
          <div className="profile-card">
            <h2 className="profile-card-title">Нууц үг солих</h2>
            {pwMsg.text && (
              <div className={`auth-${pwMsg.type === 'error' ? 'error' : 'success'}`}>
                {pwMsg.text}
              </div>
            )}
            <form onSubmit={handlePwSubmit} className="auth-form">
              <div className="auth-field">
                <label>Одоогийн нууц үг</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pwForm.currentPassword}
                  onChange={(e) => setPwForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  disabled={pwLoading}
                />
              </div>
              <div className="auth-field">
                <label>Шинэ нууц үг</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pwForm.newPassword}
                  onChange={(e) => setPwForm((p) => ({ ...p, newPassword: e.target.value }))}
                  disabled={pwLoading}
                />
              </div>
              <div className="auth-field">
                <label>Нууц үг давтах</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                  disabled={pwLoading}
                />
              </div>
              <button className="auth-btn" type="submit" disabled={pwLoading}>
                {pwLoading ? <span className="auth-spinner-sm" /> : 'Солих'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
