/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import {
  employeesData,
  genresData,
  hallsData,
  moviesData,
  showtimesData,
} from '../data/mockData'

const AppContext = createContext(null)

const nextId = (items) => Math.max(0, ...items.map(item => Number(item.id) || 0)) + 1

const createCrud = (setItems) => ({
  add: (item) => setItems(items => [...items, { ...item, id: nextId(items) }]),
  update: (item) => setItems(items => items.map(current => current.id === item.id ? item : current)),
  remove: (id) => setItems(items => items.filter(item => item.id !== id)),
})

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState(moviesData)
  const [genres, setGenres] = useState(genresData)
  const [halls, setHalls] = useState(hallsData)
  const [showtimes, setShowtimes] = useState(showtimesData)
  const [employees, setEmployees] = useState(employeesData)

  const value = useMemo(() => {
    const movieCrud = createCrud(setMovies)
    const genreCrud = createCrud(setGenres)
    const hallCrud = createCrud(setHalls)
    const showtimeCrud = createCrud(setShowtimes)
    const employeeCrud = createCrud(setEmployees)

    return {
      movies,
      genres,
      halls,
      showtimes,
      employees,
      addMovie: movieCrud.add,
      updateMovie: movieCrud.update,
      deleteMovie: movieCrud.remove,
      addGenre: genreCrud.add,
      updateGenre: genreCrud.update,
      deleteGenre: genreCrud.remove,
      addHall: hallCrud.add,
      updateHall: hallCrud.update,
      deleteHall: hallCrud.remove,
      addShowtime: showtimeCrud.add,
      updateShowtime: showtimeCrud.update,
      deleteShowtime: showtimeCrud.remove,
      addEmployee: employeeCrud.add,
      updateEmployee: employeeCrud.update,
      deleteEmployee: employeeCrud.remove,
    }
  }, [employees, genres, halls, movies, showtimes])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
