function DashboardNotice({ message }) {
  if (!message) return null

  return (
    <section className="notice" role="status">
      {message}. Backend ажиллаагүй үед dashboard хоосон датагаар эвдрэлгүй харагдана.
    </section>
  )
}

export default DashboardNotice
