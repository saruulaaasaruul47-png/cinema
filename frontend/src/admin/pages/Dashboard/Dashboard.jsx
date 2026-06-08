import { Film, Tag, Building2, Clock, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { weeklyTickets, popularMovies } from '../../data/mockData'

const StatCard = ({ icon: Icon, label, value, color = 'red' }) => (
  <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 shadow-2xl shadow-black/20 transition duration-200 hover:border-[#e50914]/40 hover:bg-[#1a1a1a]">
    <div>
      <div className="text-[#888888] text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-3xl font-['Bebas_Neue'] tracking-wider text-white">{value}</div>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color === 'red' ? 'bg-[#e50914]/20' : 'bg-[#1a1a1a]'}`}>
      <Icon size={20} className={color === 'red' ? 'text-[#e50914]' : 'text-[#888888]'} />
    </div>
  </div>
)

const SalesChart = ({ data }) => {
  const maxTickets = Math.max(...data.map(item => item.tickets))
  const points = data.map((item, index) => {
    const x = 24 + index * (252 / (data.length - 1))
    const y = 154 - (item.tickets / maxTickets) * 118
    return { ...item, x, y }
  })
  const line = points.map(point => `${point.x},${point.y}`).join(' ')

  return (
    <div className="h-[220px] w-full">
      <svg viewBox="0 0 320 190" className="h-full w-full overflow-visible">
        {[0, 1, 2, 3].map(row => (
          <line
            key={row}
            x1="24"
            x2="300"
            y1={36 + row * 38}
            y2={36 + row * 38}
            className="stroke-[#2a2a2a]"
            strokeDasharray="4 5"
          />
        ))}
        <polyline fill="none" points={line} className="stroke-[#e50914]" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map(point => (
          <g key={point.day}>
            <circle cx={point.x} cy={point.y} r="5" className="fill-[#e50914] stroke-[#0a0a0a]" strokeWidth="3" />
            <text x={point.x} y="178" textAnchor="middle" className="fill-[#888888] text-[10px] font-['DM_Sans']">{point.day}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

const Dashboard = () => {
  const { movies, genres, halls, showtimes, employees } = useApp()

  const stats = [
    { icon: Film, label: 'Total Movies', value: movies.length },
    { icon: Tag, label: 'Total Genres', value: genres.length },
    { icon: Building2, label: 'Total Halls', value: halls.length },
    { icon: Clock, label: 'Showtimes Today', value: showtimes.length },
    { icon: Users, label: 'Total Staff', value: employees.length },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket Sales Chart */}
        <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20 p-5 lg:col-span-2">
          <h3 className="font-['Bebas_Neue'] text-xl tracking-wider text-white mb-4">Ticket Sales (This Week)</h3>
          <SalesChart data={weeklyTickets} />
        </div>

        {/* Popular Movies */}
        <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20 p-5">
          <h3 className="font-['Bebas_Neue'] text-xl tracking-wider text-white mb-4">Popular Movies</h3>
          <div className="space-y-3">
            {popularMovies.map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <img
                  src={m.poster} alt={m.title}
                  className="w-9 h-12 object-cover rounded"
                  onError={e => { e.target.src = 'https://placehold.co/36x48/1a1a1a/888?text=?' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{m.title}</div>
                  <div className="text-xs text-[#888888]">{m.tickets.toLocaleString()} Tickets</div>
                </div>
                <div className="w-1 h-8 rounded-full bg-[#e50914] opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Showtimes */}
      <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20">
        <div className="px-5 py-4 border-b border-[#2a2a2a]">
          <h3 className="font-['Bebas_Neue'] text-xl tracking-wider text-white">Recent Showtimes</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Time', 'Movie', 'Hall', 'Price'].map(h => (
                <th key={h} className="bg-[#1a1a1a] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#888888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showtimes.slice(0, 5).map(s => (
              <tr key={s.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white font-['JetBrains_Mono'] text-[#e50914] text-xs">{s.time}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white font-medium">{s.movieTitle}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888]">{s.hallName}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white font-['JetBrains_Mono'] text-green-400">${s.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
