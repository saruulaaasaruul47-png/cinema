import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, CheckCircle, RefreshCw, X } from 'lucide-react'
import { bookingApi } from '../api/bookingApi'
import CinemaBookingLayout from '../components/templates/CinemaBookingLayout'
import MovieInfo from '../components/organisms/MovieInfo'
import SeatGrid from '../components/organisms/SeatGrid'
import BookingSummary from '../components/molecules/BookingSummary'
import SeatButton from '../components/atoms/SeatButton'
import { movie as mockMovie, seatLayout as mockSeatLayout } from '../data/mockData'
import { useBooking } from '../hooks/useBooking'

function ConfirmOverlay({ booking, seats, totalPrice, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-cinema-card border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-slide-up">
        <div className="w-16 h-16 rounded-full bg-cinema-red-dim border border-cinema-red/40 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-cinema-red" />
        </div>

        <h2 className="font-display text-3xl tracking-widest text-white mb-1">BOOKED</h2>
        <p className="text-white/40 text-sm mb-6">Your seats have been reserved.</p>

        <div className="bg-cinema-surface rounded-xl p-4 mb-6 border border-white/8">
          <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-3">
            Booking #{booking?.id || '-'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {seats.map((seat) => (
              <span key={seat} className="bg-cinema-red text-white text-xs font-mono px-3 py-1 rounded-lg glow-red-sm">
                {seat}
              </span>
            ))}
          </div>
          <div className="h-px bg-white/8 mb-3" />
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Total Paid</span>
            <span className="font-display text-lg text-gradient-red tracking-wider">
              {new Intl.NumberFormat('mn-MN').format(totalPrice)} MNT
            </span>
          </div>
        </div>

        <SeatButton variant="ghost" onClick={onClose} fullWidth>
          <RefreshCw size={14} />
          Book Again
        </SeatButton>
      </div>
    </div>
  )
}

export default function SeatSelection() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const showtimeId = params.showtimeId || searchParams.get('showtimeId') || ''

  const [movie, setMovie] = useState(mockMovie)
  const [seatLayout, setSeatLayout] = useState(mockSeatLayout)
  const [status, setStatus] = useState(showtimeId ? 'loading' : 'demo')
  const [error, setError] = useState('')
  const [booking, setBooking] = useState(null)
  const [customer, setCustomer] = useState({ name: '', email: '' })

  const pricePerSeat = movie.priceAdult || 15000
  const {
    selectedIds,
    toggleSeat,
    clearAll,
    count,
    totalPrice,
    sortedSeats,
  } = useBooking(pricePerSeat)

  useEffect(() => {
    if (!showtimeId) return undefined

    const controller = new AbortController()
    const loadSeatMap = async () => {
      try {
        setStatus('loading')
        const data = await bookingApi.getSeatMap(showtimeId, controller.signal)
        setMovie(data.movie)
        setSeatLayout(data.seatLayout)
        setStatus('success')
        setError('')
        clearAll()
      } catch (err) {
        if (err.name === 'AbortError') return
        setStatus('error')
        setError(err.message || 'Seat map could not be loaded')
      }
    }

    loadSeatMap()
    return () => controller.abort()
  }, [showtimeId, clearAll])

  const unavailableSeats = useMemo(
    () => new Set(
      seatLayout.flatMap((row) =>
        row.seats.filter((seat) => seat.status === 'occupied').map((seat) => seat.id),
      ),
    ),
    [seatLayout],
  )

  const handleConfirm = async () => {
    if (count === 0) return

    if (!showtimeId) {
      setBooking({ id: 'DEMO' })
      return
    }

    if (!customer.name.trim()) {
      setError('Customer name is required')
      return
    }

    try {
      setStatus('saving')
      const created = await bookingApi.create({
        showtimeId,
        seats: sortedSeats,
        customerName: customer.name.trim(),
        customerEmail: customer.email.trim(),
      })
      setBooking(created)
      setStatus('success')
      setError('')
    } catch (err) {
      setStatus('error')
      setError(
        err.errors?.seats?.length
          ? `Already booked: ${err.errors.seats.join(', ')}`
          : err.message || 'Booking failed',
      )
    }
  }

  const handleClose = async () => {
    setBooking(null)
    clearAll()

    if (!showtimeId) return
    try {
      const data = await bookingApi.getSeatMap(showtimeId)
      setMovie(data.movie)
      setSeatLayout(data.seatLayout)
    } catch {
      unavailableSeats.forEach(() => {})
    }
  }

  const bookingPanel = (
    <div className="rounded-2xl bg-cinema-card cinema-border overflow-hidden animate-slide-up">
      <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-cinema-red rounded-full" />
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em]">
            Booking Summary
          </h3>
        </div>
        {count > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] font-mono text-white/30 hover:text-cinema-red transition-colors flex items-center gap-1"
          >
            <X size={11} />
            Clear
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        <BookingSummary
          sortedSeats={sortedSeats}
          count={count}
          pricePerSeat={pricePerSeat}
          totalPrice={totalPrice}
        />

        {showtimeId && (
          <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-3">
            <input
              value={customer.name}
              onChange={(event) => setCustomer((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Customer name"
              className="w-full rounded-lg border border-white/10 bg-cinema-surface px-3 py-2 text-sm text-white outline-none focus:border-cinema-red"
            />
            <input
              value={customer.email}
              onChange={(event) => setCustomer((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="Email for history"
              className="w-full rounded-lg border border-white/10 bg-cinema-surface px-3 py-2 text-sm text-white outline-none focus:border-cinema-red"
            />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-cinema-red/30 bg-cinema-red-dim p-3 text-xs text-white/80">
            <AlertCircle size={14} className="mt-0.5 text-cinema-red" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="px-4 pb-5 space-y-2.5">
        <SeatButton
          fullWidth
          disabled={count === 0 || status === 'saving'}
          onClick={handleConfirm}
        >
          {status === 'saving' ? 'Booking...' : 'Book Now'}
          <ArrowRight size={15} />
        </SeatButton>

        <SeatButton variant="ghost" onClick={clearAll} disabled={count === 0} fullWidth>
          <X size={13} />
          Cancel Selection
        </SeatButton>
      </div>

      <div className="px-5 pb-4 pt-0">
        <p className="text-[10px] text-white/20 text-center leading-relaxed">
          Booked seats are locked by backend validation. Max 8 seats per transaction.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <CinemaBookingLayout
        movieInfo={<MovieInfo movie={movie} />}
        seatGrid={
          status === 'loading' ? (
            <div className="py-20 text-center text-sm text-white/40">Loading seats...</div>
          ) : (
            <SeatGrid
              seatLayout={seatLayout}
              selectedIds={selectedIds}
              onToggle={toggleSeat}
            />
          )
        }
        bookingPanel={bookingPanel}
      />

      {booking && (
        <ConfirmOverlay
          booking={booking}
          seats={sortedSeats}
          totalPrice={totalPrice}
          onClose={handleClose}
        />
      )}
    </>
  )
}
