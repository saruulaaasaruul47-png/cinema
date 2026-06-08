import { formatMoney, formatNumber } from '../utils/dashboardFormatters'

function PopularMovies({ movies }) {
  return (
    <article className="panel" id="movies">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Top 5</p>
          <h2>Popular movies</h2>
        </div>
      </div>
      <div className="rank-list">
        {movies.length === 0 ? (
          <div className="empty-state">Movie booking data алга байна.</div>
        ) : (
          movies.map((movie, index) => (
            <div className="rank-row" key={movie.id || movie.title}>
              <span>{index + 1}</span>
              <div>
                <strong>{movie.title}</strong>
                <small>{formatNumber(movie.bookings)} bookings</small>
              </div>
              <em>{formatMoney(movie.revenue)}</em>
            </div>
          ))
        )}
      </div>
    </article>
  )
}

export default PopularMovies
