import React from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Search, Menu } from 'lucide-react'

const pageNames = {
  '/': 'Dashboard',
  '/movies': 'Movies',
  '/genres': 'Genres',
  '/halls': 'Halls',
  '/hall-seats': 'Hall Seats',
  '/showtimes': 'Showtimes',
  '/employees': 'Employees',
  '/settings': 'Settings',
}

const Navbar = () => {
  const location = useLocation()
  const title = pageNames[location.pathname] ?? 'Cinema Admin'

  return (
    <header className="h-14 bg-cinema-card border-b border-cinema-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <Menu size={18} className="text-cinema-muted" />
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-cinema-card2 border border-cinema-border text-white text-sm rounded-lg pl-8 pr-3 py-1.5 w-44 focus:outline-none focus:border-cinema-red transition-colors placeholder:text-cinema-muted"
          />
        </div>

        <button type="button" className="relative w-8 h-8 flex items-center justify-center text-cinema-muted hover:text-white transition-colors">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cinema-red" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-cinema-border">
          <div className="w-7 h-7 rounded-full bg-cinema-red flex items-center justify-center text-xs font-bold text-white">A</div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-white leading-none">Admin</div>
            <div className="text-[10px] text-cinema-muted">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
