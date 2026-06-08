import { formatNumber } from '../utils/dashboardFormatters'

function HallOccupancy({ halls }) {
  return (
    <article className="panel" id="halls">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Seat usage</p>
          <h2>Hall occupancy</h2>
        </div>
      </div>
      <div className="hall-list">
        {halls.length === 0 ? (
          <div className="empty-state">Hall data алга байна.</div>
        ) : (
          halls.map((hall) => {
            const booked = Number(hall.booked_seats || 0)
            const total = Number(hall.seat_count || 0)
            const percent = total > 0 ? Math.min(Math.round((booked / total) * 100), 100) : 0
            return (
              <div className="hall-row" key={hall.id || hall.hall_name}>
                <div>
                  <strong>{hall.hall_name}</strong>
                  <small>{formatNumber(booked)} / {formatNumber(total)} seats</small>
                </div>
                <div className="progress" aria-label={`${hall.hall_name} occupancy ${percent}%`}>
                  <span style={{ width: `${percent}%` }}></span>
                </div>
                <em>{percent}%</em>
              </div>
            )
          })
        )}
      </div>
    </article>
  )
}

export default HallOccupancy
