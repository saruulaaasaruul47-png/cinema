import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MainLayout from './components/templates/MainLayout'

import Dashboard from './pages/Dashboard/Dashboard'
import Movies from './pages/Movies/Movies'
import Genres from './pages/Genres/Genres'
import Halls from './pages/Halls/Halls'
import HallSeats from './pages/HallSeats/HallSeats'
import Showtimes from './pages/Showtimes/Showtimes'
import Employees from './pages/Employees/Employees'
import Settings from './pages/Settings/Settings'

const App = () => (
  <BrowserRouter>
    <AppProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/hall-seats" element={<HallSeats />} />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </AppProvider>
  </BrowserRouter>
)

export default App
