import { useLocation } from 'react-router-dom'
import { Bell, Search, Menu } from 'lucide-react'
import { useAuth } from '../../../features/chinguun-auth/context/AuthContext'

const pageNames = {
  '/': 'Dashboard',
  '/admin': 'Dashboard',
  '/admin/movies': 'Movies',
  '/admin/genres': 'Genres',
  '/admin/halls': 'Halls',
  '/admin/hall-seats': 'Hall Seats',
  '/admin/showtimes': 'Showtimes',
  '/admin/employees': 'Employees',
  '/admin/settings': 'Settings',
}

const Navbar = () => {
  const location = useLocation()
  const { user } = useAuth()
  const title = pageNames[location.pathname] ?? 'Cinema Admin'

  return (
    <header className="h-14 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <Menu size={18} className="text-[#888888]" />
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded-lg pl-8 pr-3 py-1.5 w-44 focus:outline-none focus:border-[#e50914] transition-colors placeholder-[#888888]"
          />
        </div>

        {/* Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#e50914]" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#2a2a2a]">
          <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-xs font-bold text-white">{user?.username?.[0]?.toUpperCase()}</div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-white leading-none">{user?.username}</div>
            <div className="text-[10px] text-[#888888]">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
