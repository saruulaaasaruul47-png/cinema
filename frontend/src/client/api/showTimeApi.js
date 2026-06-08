// Backend API-ийн үндсэн URL. .env байхгүй үед local backend рүү холбогдоно.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/v1'

async function readJsonResponse(response, fallbackMessage) {
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || fallbackMessage)
  }

  return result.data
}

// Filter, sort, pagination query-тэй showtime жагсаалт татна.
export async function fetchShowTimes(queryString) {
  const response = await fetch(`${API_URL}/showtimes?${queryString}`)
  return readJsonResponse(response, 'ShowTime жагсаалт авахад алдаа гарлаа')
}

// Form дээр сонгох movie болон hall option-уудыг татна.
export async function fetchShowTimeOptions() {
  const response = await fetch(`${API_URL}/showtimes/options`)
  return readJsonResponse(response, 'ShowTime option авахад алдаа гарлаа')
}

// id байвал update, байхгүй бол create request илгээнэ.
export async function saveShowTimeRequest(form) {
  const method = form.id ? 'PUT' : 'POST'
  const url = form.id ? `${API_URL}/showtimes/${form.id}` : `${API_URL}/showtimes`

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      movie_id: Number(form.movie_id),
      hall_id: Number(form.hall_id),
      start_time: form.start_time,
      end_time: form.end_time,
    }),
  })

  return readJsonResponse(response, 'ShowTime хадгалахад алдаа гарлаа')
}

// Сонгосон showtime-г backend дээр soft delete хийлгэнэ.
export async function deleteShowTimeRequest(id) {
  const response = await fetch(`${API_URL}/showtimes/${id}`, { method: 'DELETE' })
  return readJsonResponse(response, 'ShowTime устгахад алдаа гарлаа')
}
