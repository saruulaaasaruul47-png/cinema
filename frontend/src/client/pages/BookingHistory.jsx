import { useEffect, useState } from 'react'
import { CalendarClock, RefreshCw, Search, XCircle } from 'lucide-react'
import { bookingApi } from '../api/bookingApi'

function formatMoney(value) {
  return `${new Intl.NumberFormat('mn-MN').format(Number(value || 0))} MNT`
}

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleString('mn-MN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function BookingHistory() {
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const loadHistory = async (signal) => {
    try {
      setStatus('loading')
      const data = await bookingApi.history(email.trim(), signal)
      setBookings(data)
      setStatus('success')
      setError('')
    } catch (err) {
      if (err.name === 'AbortError') return
      setStatus('error')
      setError(err.message || 'History could not be loaded')
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    loadHistory(controller.signal)
    return () => controller.abort()
  }, [])

  const handleCancel = async (bookingId) => {
    try {
      await bookingApi.cancel(bookingId)
      await loadHistory()
    } catch (err) {
      setError(err.message || 'Cancel failed')
    }
  }

  return (
    <main className="min-h-screen bg-cinema-bg px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-5">
        <section className="rounded-lg border border-white/10 bg-cinema-card p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl tracking-widest">Booking History</h1>
              <p className="text-sm text-white/40">Search by email, then cancel confirmed bookings when needed.</p>
            </div>
            <div className="flex gap-2">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="customer@email.com"
                className="w-56 rounded-lg border border-white/10 bg-cinema-surface px-3 py-2 text-sm text-white outline-none focus:border-cinema-red"
              />
              <button
                type="button"
                onClick={() => loadHistory()}
                className="inline-flex items-center gap-2 rounded-lg bg-cinema-red px-4 py-2 text-sm font-semibold text-white"
              >
                <Search size={15} />
                Search
              </button>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-lg border border-cinema-red/30 bg-cinema-red-dim px-4 py-3 text-sm text-white/80">
            {error}
          </div>
        )}

        <section className="overflow-hidden rounded-lg border border-white/10 bg-cinema-card">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60">Tickets</h2>
          </div>

          {status === 'loading' ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-white/40">
              <RefreshCw size={16} className="animate-spin" />
              Loading
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-16 text-center text-sm text-white/35">No bookings found</div>
          ) : (
            <div className="divide-y divide-white/8">
              {bookings.map((booking) => (
                <article key={booking.id} className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{booking.movie_title || 'Movie'}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-white/10 text-white/40'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-white/45">
                      <span>{booking.hall_name || 'Hall'}</span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarClock size={13} />
                        {formatDate(booking.start_time)}
                      </span>
                      <span>{formatMoney(booking.total_price)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {booking.seats.map((seat) => (
                        <span key={seat} className="rounded bg-cinema-red px-2 py-0.5 text-xs font-mono">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={booking.status !== 'confirmed'}
                    onClick={() => handleCancel(booking.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-cinema-red hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <XCircle size={15} />
                    Cancel
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
