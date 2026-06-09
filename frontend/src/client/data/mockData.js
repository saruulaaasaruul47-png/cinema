// src/data/mockData.js

// ─── Movie ────────────────────────────────────────────────────────────────────
export const movie = {
  id:        1,
  title:     'Oppenheimer',
  tagline:   'The world forever changes.',
  genre:     ['Drama', 'Biography', 'History'],
  duration:  180,                        // minutes
  rating:    'PG-13',
  year:      2023,
  director:  'Christopher Nolan',
  imdb:      '8.9',
  poster:    'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  backdrop:  'https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
  hall:      'Hall 1',
  hallType:  '2D Digital',
  showtime:  '07:30 PM',
  date:      'Saturday, Jun 7, 2025',
  language:  'English',
  priceAdult: 15000,
}

// ─── Seat Layout ──────────────────────────────────────────────────────────────
// status: 'available' | 'occupied'
// Row labels A–H, columns 1–14
// Some seats are deliberately pre-occupied for realism

const O = 'occupied'   // shorthand
const A = 'available'

const RAW_LAYOUT = {
  A: [A, A, A, O, A, A, O, O, A, A, O, A, A, A],
  B: [A, O, A, A, A, O, A, A, A, O, A, A, O, A],
  C: [O, A, A, A, O, A, A, A, A, A, O, A, A, O],
  D: [A, A, O, A, A, A, O, A, A, A, A, O, A, A],
  E: [A, A, A, A, O, O, A, A, O, A, A, A, A, A],
  F: [O, A, A, O, A, A, A, A, A, O, O, A, A, A],
  G: [A, A, A, A, A, O, A, A, A, A, A, A, O, A],
  H: [A, O, O, A, A, A, A, O, A, A, A, A, A, A],
}

export const seatLayout = Object.entries(RAW_LAYOUT).map(([row, cols]) => ({
  row,
  seats: cols.map((status, i) => ({
    id:     `${row}${i + 1}`,
    row,
    col:    i + 1,
    label:  `${row}${i + 1}`,
    status,                     // 'available' | 'occupied'
  })),
}))

// Column count helper
export const COL_COUNT = RAW_LAYOUT.A.length
