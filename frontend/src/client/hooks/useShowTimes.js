import { useEffect, useMemo, useState } from 'react'
import {
  deleteShowTimeRequest,
  fetchShowTimeOptions,
  fetchShowTimes,
  saveShowTimeRequest,
} from '../api/showTimeApi'
import { toLocalInputValue } from '../utils/date'

// Add form-ийг цэвэрлэхэд ашиглах эхний хоосон төлөв.
const emptyForm = {
  id: null,
  movie_id: '',
  hall_id: '',
  start_time: '',
  end_time: '',
}

// Showtime page-ийн state, API дуудлага, event handler-уудыг нэг hook-д төвлөрүүлнэ.
function useShowTimes() {
  // Filter өөрчлөгдөх бүрт query string шинэчлэгдэж showtime жагсаалт дахин татагдана.
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    date: '',
    sort: 'start_time',
    order: 'asc',
    page: 1,
    size: 6,
  })
  const [showTimes, setShowTimes] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 6,
    totalElements: 0,
    totalPages: 0,
  })
  const [options, setOptions] = useState({ movies: [], halls: [] })
  const [form, setForm] = useState(emptyForm)
  const [reloadKey, setReloadKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Хоосон filter-үүдийг URL query-д оруулахгүйгээр backend рүү дамжуулах string бэлдэнэ.
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    return params.toString()
  }, [filters])

  // Жагсаалт, filter, pagination-ийн мэдээллийг backend-ээс татна.
  useEffect(() => {
    async function loadShowTimes() {
      setLoading(true)
      setError('')

      try {
        const data = await fetchShowTimes(queryString)
        setShowTimes(data.content)
        setPagination({
          page: data.page,
          size: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadShowTimes()
  }, [queryString, reloadKey])

  // Form дээр сонгох movie болон hall option-уудыг backend-ээс татна.
  useEffect(() => {
    async function loadOptions() {
      try {
        const data = await fetchShowTimeOptions()
        setOptions(data)
      } catch {
        setOptions({ movies: [], halls: [] })
      }
    }

    loadOptions()
  }, [reloadKey])

  // Filter өөрчлөгдвөл эхний page рүү буцаана, харин page өөрчлөгдвөл тухайн page-г хадгална.
  function updateFilter(key, value) {
    setFilters((current) => ({
      ...current,
      [key]: value,
      page: key === 'page' ? value : 1,
    }))
  }

  // Form input бүрийн өөрчлөлтийг нэг ерөнхий handler-аар state-д хадгална.
  function updateForm(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  // Form-ийг add mode буюу хоосон төлөвт буцаана.
  function resetForm() {
    setForm(emptyForm)
  }

  // Card дээрх "Засах" товч дарахад тухайн showtime-г form-д populate хийнэ.
  function editShowTime(showTime) {
    setForm({
      id: showTime.id,
      movie_id: String(showTime.movie_id),
      hall_id: String(showTime.hall_id),
      start_time: toLocalInputValue(showTime.start_time),
      end_time: toLocalInputValue(showTime.end_time),
    })
    setMessage('')
    setError('')
  }

  // id байгаа бол update, байхгүй бол create request backend рүү илгээнэ.
  async function saveShowTime(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      await saveShowTimeRequest(form)
      setMessage(form.id ? 'Үзвэрийн цаг амжилттай шинэчлэгдлээ' : 'Үзвэрийн цаг амжилттай нэмэгдлээ')
      resetForm()
      setReloadKey((current) => current + 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Сонгосон showtime-г backend дээр soft delete хийлгээд жагсаалтыг refresh хийнэ.
  async function deleteShowTime(id) {
    setError('')
    setMessage('')

    try {
      await deleteShowTimeRequest(id)
      setMessage('Үзвэрийн цаг устгагдлаа')
      setReloadKey((current) => current + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  return {
    filters,
    showTimes,
    pagination,
    options,
    form,
    loading,
    saving,
    message,
    error,
    updateFilter,
    updateForm,
    resetForm,
    editShowTime,
    saveShowTime,
    deleteShowTime,
  }
}

export default useShowTimes
