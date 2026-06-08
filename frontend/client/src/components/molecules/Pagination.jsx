import Button from '../atoms/Button'

function Pagination({ pagination, onPageChange }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-1.5 pb-2">
      <Button className="grid h-8 w-8 place-items-center p-0" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>
        ‹
      </Button>
      <span className="grid h-8 w-8 place-items-center rounded-md border border-[#e63946] bg-[#e63946] p-0 text-xs font-semibold text-white">
        {pagination.page}
      </span>
      <span className="px-2 text-xs font-semibold text-[#666]">{pagination.totalElements} илэрц</span>
      <Button className="grid h-8 w-8 place-items-center p-0" disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}>
        ›
      </Button>
    </div>
  )
}

export default Pagination
