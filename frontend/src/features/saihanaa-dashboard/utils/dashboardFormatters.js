export const formatMoney = (value) =>
  new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

export const formatNumber = (value) => new Intl.NumberFormat('mn-MN').format(Number(value || 0))

export const parseSeats = (seats) => {
  if (Array.isArray(seats)) return seats
  if (!seats) return []

  try {
    const parsed = JSON.parse(seats)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return String(seats)
      .split(',')
      .map((seat) => seat.trim())
      .filter(Boolean)
  }
}
