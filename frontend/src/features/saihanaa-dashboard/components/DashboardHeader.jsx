function DashboardHeader({ status }) {
  const statusText = {
    loading: 'Loading API',
    success: 'Live API',
    error: 'Offline mode',
  }

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Saihanaa responsibility</p>
        <h1>Admin dashboard</h1>
      </div>
      <div className={`api-pill ${status}`}>
        <span aria-hidden="true"></span>
        {statusText[status] || statusText.loading}
      </div>
    </header>
  )
}

export default DashboardHeader
