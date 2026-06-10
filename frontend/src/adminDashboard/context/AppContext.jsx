import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/context/AuthContext.jsx'
import {
  moviesApi, hallsApi, showtimesApi, usersApi, genresApi,
} from '@/api/index.js'

const AppContext = createContext(null)

const mapMovie = (row) => ({
  id: row.id,
  title: row.title ?? '',
  director: row.director ?? '',
  duration: row.duration ?? 0,
  poster: row.poster_url ?? '',
  year: row.release_date ? new Date(row.release_date).getFullYear() : '',
  rating: row.rating ?? '-',
  genres: row.genres ?? [],
  description: row.description ?? '',
})

const mapHall = (row) => {
  const capacity = Number(row.seat_count ?? row.capacity ?? 0)
  const cols = 10
  const rows = capacity > 0 ? Math.max(1, Math.ceil(capacity / cols)) : 8
  return {
    id: row.id,
    name: row.hall_name ?? row.name ?? '',
    capacity: capacity || rows * cols,
    type: row.type ?? '2D',
    rows,
    cols,
  }
}

const mapShowtime = (row) => {
  const start = row.start_time ? new Date(row.start_time) : null
  return {
    id: row.id,
    movieId: row.movie_id,
    movieTitle: row.movie_title ?? '',
    hallId: row.hall_id,
    hallName: row.hall_name ?? '',
    date: start ? start.toISOString().slice(0, 10) : '',
    time: start ? start.toTimeString().slice(0, 5) : '',
    start_time: row.start_time,
    end_time: row.end_time,
    price: row.price ?? 0,
  }
}

const mapGenre = (row) => ({
  id: row.id,
  name: row.name ?? '',
  description: row.description ?? '',
  movieCount: Number(row.movie_count ?? row.movieCount ?? 0),
})

const mapEmployee = (row) => ({
  id: row.id,
  name: row.username ?? row.name ?? '',
  role: row.role ?? 'staff',
  email: row.email ?? '',
  phone: row.phone ?? '-',
  status: 'Active',
})

const toShowtimePayload = (form, movies) => {
  const movie = movies.find(m => String(m.id) === String(form.movieId))
  const durationMin = Number(movie?.duration) || 120
  const start = new Date(`${form.date}T${form.time}`)
  const end = new Date(start.getTime() + durationMin * 60_000)
  return {
    movie_id: Number(form.movieId),
    hall_id: Number(form.hallId),
    start_time: start.toISOString(),
    end_time: end.toISOString(),
  }
}

const toMoviePayload = (form) => ({
  title: form.title,
  director: form.director,
  duration: Number(form.duration) || null,
  poster_url: form.poster || null,
  release_date: form.year ? `${form.year}-01-01` : null,
  description: form.description || null,
})

const toHallPayload = (form) => ({
  hall_name: form.name,
  seat_count: Number(form.rows || 0) * Number(form.cols || 0) || Number(form.capacity) || 0,
})

export const AppProvider = ({ children }) => {
  const { token } = useAuth()
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [halls, setHalls] = useState([])
  const [showtimes, setShowtimes] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [moviesRes, genresRes, hallsRes, showtimesRes] = await Promise.all([
        moviesApi.getAll(),
        genresApi.getAll(),
        hallsApi.getAll(token),
        showtimesApi.getAll({ size: 100 }),
      ])

      setMovies((moviesRes.movies ?? []).map(mapMovie))
      setGenres((genresRes.data ?? genresRes.genres ?? []).map(mapGenre))
      setHalls((hallsRes.halls ?? []).map(mapHall))
      setShowtimes((showtimesRes.data?.content ?? []).map(mapShowtime))

      if (token) {
        const usersRes = await usersApi.getAll(token)
        const staff = (usersRes.users ?? []).filter(u => u.role === 'staff' || u.role === 'admin')
        setEmployees(staff.map(mapEmployee))
      } else {
        setEmployees([])
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchAll() }, [fetchAll])

  const addMovie = async (form) => {
    await moviesApi.create(toMoviePayload(form), token)
    await fetchAll()
  }

  const updateMovie = async (item) => {
    await moviesApi.update(item.id, toMoviePayload(item), token)
    await fetchAll()
  }

  const deleteMovie = async (id) => {
    await moviesApi.remove(id, token)
    await fetchAll()
  }

  const addGenre = async (form) => {
    await genresApi.create({ name: form.name }, token)
    await fetchAll()
  }

  const updateGenre = async (item) => {
    await genresApi.update(item.id, { name: item.name }, token)
    await fetchAll()
  }

  const deleteGenre = async (id) => {
    await genresApi.remove(id, token)
    await fetchAll()
  }

  const addHall = async (form) => {
    await hallsApi.create(toHallPayload(form), token)
    await fetchAll()
  }

  const updateHall = async (item) => {
    await hallsApi.update(item.id, toHallPayload(item), token)
    await fetchAll()
  }

  const deleteHall = async (id) => {
    await hallsApi.remove(id, token)
    await fetchAll()
  }

  const addShowtime = async (form) => {
    await showtimesApi.create(toShowtimePayload(form, movies), token)
    await fetchAll()
  }

  const updateShowtime = async (item) => {
    await showtimesApi.update(item.id, toShowtimePayload(item, movies), token)
    await fetchAll()
  }

  const deleteShowtime = async (id) => {
    await showtimesApi.remove(id, token)
    await fetchAll()
  }

  const deleteEmployee = async (id) => {
    await usersApi.deleteUser(id, token)
    await fetchAll()
  }

  return (
    <AppContext.Provider value={{
      movies, genres, halls, showtimes, employees,
      loading, error, refetch: fetchAll,
      addMovie, updateMovie, deleteMovie,
      addGenre, updateGenre, deleteGenre,
      addHall, updateHall, deleteHall,
      addShowtime, updateShowtime, deleteShowtime,
      addEmployee: async () => { throw new Error('Use auth register for new users') },
      updateEmployee: async () => { throw new Error('Not supported yet') },
      deleteEmployee,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
