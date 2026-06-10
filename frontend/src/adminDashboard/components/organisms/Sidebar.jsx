import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Film, Tag, Building2, Grid3X3,
  Clock, Users, Settings, Clapperboard
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/genres', label: 'Genres', icon: Tag },
  { to: '/halls', label: 'Halls', icon: Building2 },
  { to: '/hall-seats', label: 'Hall Seats', icon: Grid3X3 },
  { to: '/showtimes', label: 'Showtimes', icon: Clock },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
    isActive
      ? 'bg-cinema-red/15 text-cinema-red font-medium'
      : 'text-cinema-muted hover:text-white hover:bg-cinema-card2'
  }`

const Sidebar = () => (
  <aside className="w-56 min-h-screen bg-cinema-card border-r border-cinema-border flex flex-col shrink-0">
    <div className="px-5 py-5 border-b border-cinema-border">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-cinema-red rounded-lg flex items-center justify-center">
          <Clapperboard size={16} className="text-white" />
        </div>
        <div>
          <div className="font-display tracking-widest text-base text-white leading-none">IMAGIX</div>
          <div className="text-cinema-muted text-[9px] tracking-[0.3em] uppercase">Cinema</div>
        </div>
      </div>
    </div>

    <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
      {navItems.map(({ to, label, icon: Icon, exact }) => (
        <NavLink key={to} to={to} end={exact} className={linkClass}>
          <Icon size={16} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="px-4 py-4 border-t border-cinema-border">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-cinema-red flex items-center justify-center text-xs font-bold text-white">A</div>
        <div>
          <div className="text-xs font-semibold text-white">Admin</div>
          <div className="text-[10px] text-cinema-muted">Super Admin</div>
        </div>
      </div>
    </div>
  </aside>
)

export default Sidebar
