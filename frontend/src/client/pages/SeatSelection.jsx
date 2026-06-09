// src/pages/SeatSelection.jsx
import { useState } from 'react'
import { CheckCircle, X, ArrowRight, RefreshCw } from 'lucide-react'
import CinemaBookingLayout       from '../components/templates/CinemaBookingLayout'
import MovieInfo                 from '../components/organisms/MovieInfo'
import SeatGrid                  from '../components/organisms/SeatGrid'
import BookingSummary      from '../components/molecules/BookingSummary'
import SeatButton              from '../components/atoms/SeatButton'
import { movie, seatLayout } from '../data/mockData'
import { useBooking }        from '../hooks/useBooking'
function ConfirmOverlay({ seats, totalPrice, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-cinema-card border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-slide-up">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-cinema-red-dim border border-cinema-red/40 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-cinema-red" />
        </div>

        <h2 className="font-display text-3xl tracking-widest text-white mb-1">BOOKED!</h2>
        <p className="text-white/40 text-sm mb-6">Your seats have been reserved.</p>

        {/* Ticket stub */}
        <div className="bg-cinema-surface rounded-xl p-4 mb-6 border border-white/8">
          <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-3">Your Seats</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {seats.map(s => (
              <span key={s} className="bg-cinema-red text-white text-xs font-mono px-3 py-1 rounded-lg glow-red-sm">
                {s}
              </span>
            ))}
          </div>
          <div className="h-px bg-white/8 mb-3" />
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Total Paid</span>
            <span className="font-display text-lg text-gradient-red tracking-wider">
              {new Intl.NumberFormat('mn-MN').format(totalPrice)}₮
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

/* ── Main page ─────────────────────────────────────────────────────────────── */
export default function SeatSelection() {
  const {
    selectedIds, toggleSeat, clearAll,
    count, totalPrice, sortedSeats,
  } = useBooking(movie.priceAdult)

  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    if (count === 0) return
    setConfirmed(true)
  }

  const handleClose = () => {
    setConfirmed(false)
    clearAll()
  }

  /* ── Booking panel (right sidebar) ──────────────────────────────────── */
  const bookingPanel = (
    <div className="rounded-2xl bg-cinema-card cinema-border overflow-hidden animate-slide-up">
      {/* Header */}
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

      {/* Summary body */}
      <div className="p-4">
        <BookingSummary
          sortedSeats={sortedSeats}
          count={count}
          pricePerSeat={movie.priceAdult}
          totalPrice={totalPrice}
        />
      </div>

      {/* Actions */}
      <div className="px-4 pb-5 space-y-2.5">
        <SeatButton
          fullWidth
          disabled={count === 0}
          onClick={handleConfirm}
        >
          Book Now
          <ArrowRight size={15} />
        </SeatButton>

        <div className="grid grid-cols-2 gap-2">
          <SeatButton variant="ghost" onClick={clearAll} disabled={count === 0}>
            <X size={13} />
            Cancel
          </SeatButton>
          <SeatButton variant="ghost" disabled={count === 0}>
            Continue
            <ArrowRight size={13} />
          </SeatButton>
        </div>
      </div>

      {/* Fine print */}
      <div className="px-5 pb-4 pt-0">
        <p className="text-[10px] text-white/20 text-center leading-relaxed">
          Tickets are non-refundable after booking.<br />
          Max 8 seats per transaction.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <CinemaBookingLayout
        movieInfo={<MovieInfo movie={movie} />}
        seatGrid={
          <SeatGrid
            seatLayout={seatLayout}
            selectedIds={selectedIds}
            onToggle={toggleSeat}
          />
        }
        bookingPanel={bookingPanel}
      />

      {confirmed && (
        <ConfirmOverlay
          seats={sortedSeats}
          totalPrice={totalPrice}
          onClose={handleClose}
        />
      )}
    </>
  )
}
