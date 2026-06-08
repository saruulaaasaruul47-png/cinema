export function formatDateTime(value) {
  return new Intl.DateTimeFormat('mn-MN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function formatTime(value) {
  return new Intl.DateTimeFormat('mn-MN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function toLocalInputValue(value) {
  if (!value) return ''
  const date = new Date(value)
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return offsetDate.toISOString().slice(0, 16)
}
