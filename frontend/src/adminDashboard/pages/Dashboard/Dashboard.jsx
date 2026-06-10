import React from 'react'
import { Film, Tag, Building2, Clock, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '@/context/AuthContext.jsx'
import { dashboardApi } from '@/api/index.js'
import { useFetch } from '@/hooks/useFetch.js'

const StatCard = ({ icon: Icon, label, value, color = 'red' }) => (
  <div className="bg-cinema-card border border-cinema-border rounded-lg p-4 flex items-center justify-between">
    <div>
      <div className="text-cinema-muted text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-3xl font-display tracking-wider text-white">{value}</div>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color === 'red' ? 'bg-cinema-red/20' : 'bg-cinema-card2'}`}>
      <Icon size={20} className={color === 'red' ? 'text-cinema-red' : 'text-cinema-muted'} />
    </div>
  </div>
)

const SimpleTicketChart = ({ data }) => {
  if (!data?.length) {
    return <p className="text-cinema-muted text-sm py-8 text-center">No booking data this week</p>
  }

  const max = Math.max(...data.map(d => d.tickets), 1)
  const points = data.map((d, index) => {
    const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100
    const y = 100 - (d.tickets / max) * 84 - 8
    return { ...d, x, y }
  })
  const path = points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="h-[200px] w-full">
      <svg viewBox="0 0 100 112" preserveAspectRatio="none" className="h-[170px] w-full overflow-visible">
        {[20, 40, 60, 80, 100].map(y => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#2a2a2a" strokeDasharray="3 3" strokeWidth="0.4" />
        ))}
        <path d={path} fill="none" stroke="#E50914" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
        {points.map(p => (
          <circle key={p.day} cx={p.x} cy={p.y} r="1.7" fill="#E50914" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map(d => (
          <div key={d.day} className="text-center">
            <div className="text-[10px] text-cinema-muted">{d.day}</div>
            <div className="text-[10px] text-white">{d.tickets}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { movies, genres, halls, showtimes, employees, loading } = useApp()
  const { token } = useAuth()
  const { data: analytics } = useFetch(
    () => dashboardApi.getAnalytics(token).then(r => r.data),
    [token]
  )

  const stats = [
    { icon: Film, label: 'Total Movies', value: analytics?.summary?.totalMovies ?? movies.length },
    { icon: Tag, label: 'Total Genres', value: genres.length },
    { icon: Building2, label: 'Total Halls', value: analytics?.summary?.totalHalls ?? halls.length },
    { icon: Clock, label: 'Showtimes', value: showtimes.length },
    { icon: Users, label: 'Total Staff', value: employees.length },
  ]

  const weeklyTickets = (analytics?.revenueByDay ?? []).map(row => ({
    day: new Date(row.day).toLocaleDateString('en-US', { weekday: 'short' }),
    tickets: Number(row.revenue ?? 0),
  }))

  const popularMovies = (analytics?.popularMovies ?? []).map(m => ({
    id: m.id,
    title: m.title,
    tickets: Number(m.bookings ?? 0),
    poster: m.poster_url ?? '',
  }))

  if (loading) {
    return <div className="text-cinema-muted text-sm">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-cinema-card border border-cinema-border rounded-lg p-5 lg:col-span-2">
          <h3 className="text-sm font-display tracking-widest text-white uppercase mb-4">Revenue (This Week)</h3>
          <SimpleTicketChart data={weeklyTickets} />
        </div>

        <div className="bg-cinema-card border border-cinema-border rounded-lg p-5">
          <h3 className="text-sm font-display tracking-widest text-white uppercase mb-4">Popular Movies</h3>
          <div className="space-y-3">
            {popularMovies.length === 0 && (
              <p className="text-cinema-muted text-sm">No booking data yet</p>
            )}
            {popularMovies.map(m => (
              <div key={m.id} className="flex items-center gap-3">
                {m.poster ? (
                  <img
                    src={m.poster} alt={m.title}
                    className="w-9 h-12 object-cover rounded"
                    onError={e => { e.target.src = 'https://placehold.co/36x48/1a1a1a/888?text=?' }}
                  />
                ) : (
                  <div className="w-9 h-12 rounded bg-cinema-card2 flex items-center justify-center text-cinema-muted text-xs">?</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{m.title}</div>
                  <div className="text-xs text-cinema-muted">{m.tickets.toLocaleString()} Bookings</div>
                </div>
                <div className="w-1 h-8 rounded-full bg-cinema-red opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-cinema-card border border-cinema-border rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-cinema-border">
          <h3 className="text-sm font-display tracking-widest text-white uppercase">Recent Showtimes</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Time', 'Movie', 'Hall', 'Date'].map(h => (
                <th key={h} className="bg-cinema-card2 text-cinema-muted text-xs uppercase tracking-wider px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showtimes.slice(0, 5).map(s => (
              <tr key={s.id} className="hover:bg-cinema-card2/40 transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-cinema-red border-t border-cinema-border/50">{s.time}</td>
                <td className="px-4 py-3 text-sm font-medium text-white border-t border-cinema-border/50">{s.movieTitle}</td>
                <td className="px-4 py-3 text-sm text-cinema-muted border-t border-cinema-border/50">{s.hallName}</td>
                <td className="px-4 py-3 text-sm text-cinema-muted border-t border-cinema-border/50 font-mono text-xs">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
