import { formatMoney, parseSeats } from '../utils/dashboardFormatters'

function RecentBookings({ bookings }) {
  return (
    <section className="panel" id="bookings">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Latest activity</p>
          <h2>Recent bookings</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Movie</th>
              <th>Hall</th>
              <th>Seats</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-cell">Booking history хоосон байна.</td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const seats = parseSeats(booking.seats)
                return (
                  <tr key={booking.id}>
                    <td>{booking.customer_name || 'Guest'}</td>
                    <td>{booking.movie_title || 'Unknown movie'}</td>
                    <td>{booking.hall_name || 'Unknown hall'}</td>
                    <td>{seats.join(', ') || '-'}</td>
                    <td>{formatMoney(booking.total_price)}</td>
                    <td>
                      <span className={`booking-status ${booking.status || 'confirmed'}`}>
                        {booking.status || 'confirmed'}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RecentBookings
