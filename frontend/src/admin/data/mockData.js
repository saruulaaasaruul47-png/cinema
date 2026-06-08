export const moviesData = [
  { id: 1, title: 'Oppenheimer', director: 'Christopher Nolan', duration: 180, genres: ['Drama', 'Biography'], poster: 'https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', year: 2023, rating: 8.5 },
  { id: 2, title: 'Interstellar', director: 'Christopher Nolan', duration: 169, genres: ['Sci-Fi', 'Adventure'], poster: 'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', year: 2014, rating: 8.7 },
  { id: 3, title: 'Inception', director: 'Christopher Nolan', duration: 148, genres: ['Action', 'Sci-Fi'], poster: 'https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', year: 2010, rating: 8.8 },
  { id: 4, title: 'The Dark Knight', director: 'Christopher Nolan', duration: 152, genres: ['Action', 'Crime'], poster: 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg', year: 2008, rating: 9.0 },
  { id: 5, title: 'Dune: Part Two', director: 'Denis Villeneuve', duration: 166, genres: ['Sci-Fi', 'Adventure'], poster: 'https://image.tmdb.org/t/p/w200/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', year: 2024, rating: 8.6 },
  { id: 6, title: 'Avengers: Endgame', director: 'Anthony Russo', duration: 181, genres: ['Action', 'Sci-Fi'], poster: 'https://image.tmdb.org/t/p/w200/or06FN3Dka5tukK1e9sl16pB3iy.jpg', year: 2019, rating: 8.4 },
  { id: 7, title: 'Parasite', director: 'Bong Joon-ho', duration: 132, genres: ['Drama', 'Thriller'], poster: 'https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', year: 2019, rating: 8.5 },
  { id: 8, title: 'The Godfather', director: 'Francis Ford Coppola', duration: 175, genres: ['Drama', 'Crime'], poster: 'https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsLlegkAo7ksh.jpg', year: 1972, rating: 9.2 },
]

// ─── GENRES ─────────────────────────────────────────────────────────────────────
export const genresData = [
  { id: 1, name: 'Action', description: 'High energy, exciting', movieCount: 24 },
  { id: 2, name: 'Adventure', description: 'Exciting and daring', movieCount: 18 },
  { id: 3, name: 'Animation', description: 'Animated movies', movieCount: 12 },
  { id: 4, name: 'Comedy', description: 'Funny and entertaining', movieCount: 31 },
  { id: 5, name: 'Crime', description: 'Crime and detective', movieCount: 15 },
  { id: 6, name: 'Drama', description: 'Emotional and serious', movieCount: 42 },
  { id: 7, name: 'Horror', description: 'Scary and thrilling', movieCount: 9 },
  { id: 8, name: 'Sci-Fi', description: 'Science fiction and future', movieCount: 21 },
  { id: 9, name: 'Thriller', description: 'Suspense and tension', movieCount: 17 },
  { id: 10, name: 'Biography', description: 'Real life stories', movieCount: 8 },
]

// ─── HALLS ──────────────────────────────────────────────────────────────────────
export const hallsData = [
  { id: 1, name: 'Hall 1', capacity: 120, type: '2D', rows: 10, cols: 12 },
  { id: 2, name: 'Hall 2', capacity: 100, type: '3D', rows: 10, cols: 10 },
  { id: 3, name: 'Hall 3', capacity: 80, type: '2D', rows: 8, cols: 10 },
  { id: 4, name: 'VIP Hall 1', capacity: 50, type: 'VIP', rows: 5, cols: 10 },
]

// ─── SHOWTIMES ──────────────────────────────────────────────────────────────────
export const showtimesData = [
  { id: 1, movieId: 1, movieTitle: 'Oppenheimer', hallId: 1, hallName: 'Hall 1', date: '2025-06-01', time: '10:00 AM', price: 12.00 },
  { id: 2, movieId: 2, movieTitle: 'Interstellar', hallId: 2, hallName: 'Hall 2', date: '2025-06-01', time: '12:30 PM', price: 12.00 },
  { id: 3, movieId: 3, movieTitle: 'Inception', hallId: 1, hallName: 'Hall 1', date: '2025-06-01', time: '03:00 PM', price: 12.00 },
  { id: 4, movieId: 5, movieTitle: 'Dune: Part Two', hallId: 3, hallName: 'Hall 3', date: '2025-06-01', time: '05:30 PM', price: 15.00 },
  { id: 5, movieId: 4, movieTitle: 'The Dark Knight', hallId: 2, hallName: 'Hall 2', date: '2025-06-01', time: '08:00 PM', price: 12.00 },
  { id: 6, movieId: 6, movieTitle: 'Avengers: Endgame', hallId: 4, hallName: 'VIP Hall 1', date: '2025-06-02', time: '02:00 PM', price: 25.00 },
  { id: 7, movieId: 7, movieTitle: 'Parasite', hallId: 3, hallName: 'Hall 3', date: '2025-06-02', time: '06:00 PM', price: 12.00 },
]

// ─── EMPLOYEES ──────────────────────────────────────────────────────────────────
export const employeesData = [
  { id: 1, name: 'John Doe', role: 'Manager', email: 'john@example.com', phone: '9911-1111', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Operator', email: 'jane@example.com', phone: '9922-2222', status: 'Active' },
  { id: 3, name: 'Mike Lee', role: 'Technician', email: 'mike@example.com', phone: '9933-3333', status: 'Active' },
  { id: 4, name: 'Sara Kim', role: 'Cleaner', email: 'sara@example.com', phone: '9944-4444', status: 'Inactive' },
  { id: 5, name: 'Alex Park', role: 'Cashier', email: 'alex@example.com', phone: '9955-5555', status: 'Active' },
  { id: 6, name: 'Emma Wilson', role: 'Security', email: 'emma@example.com', phone: '9966-6666', status: 'Active' },
]

// ─── DASHBOARD ──────────────────────────────────────────────────────────────────
export const weeklyTickets = [
  { day: 'Mon', tickets: 120 },
  { day: 'Tue', tickets: 95 },
  { day: 'Wed', tickets: 140 },
  { day: 'Thu', tickets: 110 },
  { day: 'Fri', tickets: 180 },
  { day: 'Sat', tickets: 200 },
  { day: 'Sun', tickets: 175 },
]

export const popularMovies = [
  { id: 1, title: 'Oppenheimer', tickets: 1250, poster: 'https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
  { id: 2, title: 'Interstellar', tickets: 980, poster: 'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: 3, title: 'Inception', tickets: 870, poster: 'https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: 4, title: 'The Dark Knight', tickets: 760, poster: 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
]
