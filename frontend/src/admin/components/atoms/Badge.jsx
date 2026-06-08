const colors = {
  red: 'bg-red-900/40 text-red-400 border border-red-900/50',
  green: 'bg-green-900/40 text-green-400 border border-green-900/50',
  blue: 'bg-blue-900/40 text-blue-400 border border-blue-900/50',
  yellow: 'bg-yellow-900/40 text-yellow-400 border border-yellow-900/50',
  gray: 'bg-[#1a1a1a] text-[#888888] border border-[#2a2a2a]',
  purple: 'bg-purple-900/40 text-purple-400 border border-purple-900/50',
}

const Badge = ({ children, color = 'gray' }) => (
  <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[color]}`}>{children}</span>
)

export default Badge
