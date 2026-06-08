import EmptyState from '../atoms/EmptyState'
import Pagination from '../molecules/Pagination'
import SectionTitle from '../molecules/SectionTitle'
import ShowTimeCard from '../molecules/ShowTimeCard'

// Showtime жагсаалтын loading, empty, card list, pagination хэсгүүдийг нэг дор харуулна.
function ShowTimeList({ loading, showTimes, pagination, onEdit, onDelete, onPageChange }) {
  return (
    <div className="min-w-0">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="Цагийн хуваарь" meta={`Page ${pagination.page} / ${pagination.totalPages || 1}`} />
      </div>

      {loading ? (
        <EmptyState>Уншиж байна...</EmptyState>
      ) : showTimes.length === 0 ? (
        <EmptyState>Илэрц олдсонгүй</EmptyState>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          {/* key нь showtime бүрийг React-д давхардахгүй ялгаж танихад хэрэгтэй. */}
          {showTimes.map((showTime) => (
            <ShowTimeCard showTime={showTime} onEdit={onEdit} onDelete={onDelete} key={showTime.id} />
          ))}
        </div>
      )}

      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  )
}

export default ShowTimeList
