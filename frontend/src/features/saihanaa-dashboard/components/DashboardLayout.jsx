function DashboardLayout({ children }) {
  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="Admin navigation">
        <div className="brand">
          <span className="brand-mark">CB</span>
          <div>
            <strong>Cinema Booking</strong>
            <small>Admin panel</small>
          </div>
        </div>

        <nav className="nav-list">
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#revenue">Revenue</a>
          <a href="#movies">Movies</a>
          <a href="#halls">Halls</a>
          <a href="#bookings">Bookings</a>
        </nav>
      </aside>

      <section className="dashboard-content" id="dashboard">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout
