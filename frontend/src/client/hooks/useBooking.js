// src/hooks/useBooking.js
import { useState, useCallback, useMemo } from 'react'

export function useBooking(pricePerSeat) {
  const [selectedIds, setSelectedIds] = useState(new Set())

  const toggleSeat = useCallback((seatId, status) => {
    if (status === 'occupied') return
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(seatId) ? next.delete(seatId) : next.add(seatId)
      return next
    })
  }, [])

  const clearAll = useCallback(() => setSelectedIds(new Set()), [])

  const count      = selectedIds.size
  const totalPrice = count * pricePerSeat
  const sortedSeats = useMemo(() =>
    [...selectedIds].sort((a, b) => a.localeCompare(b)),
    [selectedIds])

  return { selectedIds, toggleSeat, clearAll, count, totalPrice, sortedSeats }
}
