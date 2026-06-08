import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Film, Tag, Building2, Grid3X3,
  Clock, Users, Settings, Clapperboard
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/movies', label: 'Movies', icon: Film },
  { to: '/admin/genres', label: 'Genres', icon: Tag },
  { to: '/admin/halls', label: 'Halls', icon: Building2 },
  { to: '/admin/hall-seats', label: 'Hall Seats', icon: Grid3X3 },
  { to: '/admin/showtimes', label: 'Showtimes', icon: Clock },
  { to: '/admin/employees', label: 'Employees', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const Sidebar = () => {
  return (
    <aside className="w-56 min-h-screen bg-[#111111] border-r border-[#2a2a2a] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center">
            <Clapperboard size={16} className="text-white" />
          </div>
          <div>
            <div className="font-['Bebas_Neue'] tracking-widest text-base text-white leading-none">IMAGIX</div>
            <div className="text-[#888888] text-[9px] tracking-[0.3em] uppercase">Cinema</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-4 py-2.5 text-sm transition duration-200 ${isActive ? 'bg-[#e50914] text-white shadow-lg shadow-[#e50914]/20' : 'text-[#888888] hover:bg-[#1a1a1a] hover:text-white'}`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-xs font-bold text-white">A</div>
          <div>
            <div className="text-xs font-semibold text-white">Admin</div>
            <div className="text-[10px] text-[#888888]">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
