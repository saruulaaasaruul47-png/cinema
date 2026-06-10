import { apiData } from '../../config/api'

export async function fetchShowTimes(queryString) {
  return apiData(`/showtimes?${queryString}`)
}

export async function fetchShowTimeOptions() {
  return apiData('/showtimes/options')
}

export async function saveShowTimeRequest(form) {
  const method = form.id ? 'PUT' : 'POST'
  const url = form.id ? `/showtimes/${form.id}` : '/showtimes'

  return apiData(url, {
    method,
    body: JSON.stringify({
      movie_id: Number(form.movie_id),
      hall_id: Number(form.hall_id),
      start_time: form.start_time,
      end_time: form.end_time,
    }),
  })
}

export async function deleteShowTimeRequest(id) {
  return apiData(`/showtimes/${id}`, { method: 'DELETE' })
}
