const paths = {
  AlertTriangle: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" /></>,
  Bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  Building2: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M20 21V9a2 2 0 0 0-2-2h-2" /><path d="M3 21h18" /><path d="M8 7h1" /><path d="M12 7h1" /><path d="M8 11h1" /><path d="M12 11h1" /><path d="M8 15h1" /><path d="M12 15h1" /></>,
  ChevronLeft: <path d="m15 18-6-6 6-6" />,
  ChevronRight: <path d="m9 18 6-6-6-6" />,
  Clapperboard: <><path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" /><path d="m4 11 2.5-7H20l-2.5 7" /><path d="m9 4-2 7" /><path d="m14 4-2 7" /></>,
  Clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  DollarSign: <><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" /></>,
  Film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16" /><path d="M17 4v16" /><path d="M3 9h18" /><path d="M3 15h18" /></>,
  Globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></>,
  Grid3X3: <><path d="M4 4h16v16H4z" /><path d="M4 9.33h16" /><path d="M4 14.67h16" /><path d="M9.33 4v16" /><path d="M14.67 4v16" /></>,
  LayoutDashboard: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
  Menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  Monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></>,
  Pencil: <><path d="M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5Z" /><path d="m15 5 4 4" /></>,
  Plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  RotateCcw: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>,
  Save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></>,
  Search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  Settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  Star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2 7.5 14 3 9.6l6.2-.9Z" />,
  Tag: <><path d="M20 10 12 2H4v8l8 8a2.8 2.8 0 0 0 4 0l4-4a2.8 2.8 0 0 0 0-4Z" /><path d="M7.5 7.5h.01" /></>,
  Trash2: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 15H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></>,
  User: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  Users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
  X: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
}

const createIcon = (name) => {
  const Icon = ({ size = 24, className = '', strokeWidth = 2, ...props }) => (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name]}
    </svg>
  )
  Icon.displayName = name
  return Icon
}

export const AlertTriangle = createIcon('AlertTriangle')
export const Bell = createIcon('Bell')
export const Building2 = createIcon('Building2')
export const ChevronLeft = createIcon('ChevronLeft')
export const ChevronRight = createIcon('ChevronRight')
export const Clapperboard = createIcon('Clapperboard')
export const Clock = createIcon('Clock')
export const DollarSign = createIcon('DollarSign')
export const Film = createIcon('Film')
export const Globe = createIcon('Globe')
export const Grid3X3 = createIcon('Grid3X3')
export const LayoutDashboard = createIcon('LayoutDashboard')
export const Menu = createIcon('Menu')
export const Monitor = createIcon('Monitor')
export const Pencil = createIcon('Pencil')
export const Plus = createIcon('Plus')
export const RotateCcw = createIcon('RotateCcw')
export const Save = createIcon('Save')
export const Search = createIcon('Search')
export const Settings = createIcon('Settings')
export const Shield = createIcon('Shield')
export const Star = createIcon('Star')
export const Tag = createIcon('Tag')
export const Trash2 = createIcon('Trash2')
export const User = createIcon('User')
export const Users = createIcon('Users')
export const X = createIcon('X')