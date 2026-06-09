export const movies = [
  {
    id: 1,
    title: "Interstellar",
    rating: 8.7,
    duration: "169 min",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    releaseDate: "November 7, 2014",
    year: "2014",
    language: "English",
    country: "USA / UK",
    director: "Christopher Nolan",
    writers: ["Jonathan Nolan", "Christopher Nolan"],
    ageRating: "PG-13",
    productionCompany: "Paramount Pictures",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When Earth's future is threatened by a catastrophic blight and famine, Cooper, a former NASA pilot, leads a mission to find a new home for mankind across the galaxy. He must choose between his family and the fate of the human race in a journey that spans time itself.",
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    trailerThumbnail:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    cast: [
      {
        id: 1,
        name: "Matthew McConaughey",
        character: "Cooper",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        name: "Anne Hathaway",
        character: "Brand",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: 3,
        name: "Jessica Chastain",
        character: "Murph (Adult)",
        image: "https://randomuser.me/api/portraits/women/26.jpg",
      },
      {
        id: 4,
        name: "Michael Caine",
        character: "Professor Brand",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
      },
      {
        id: 5,
        name: "Matt Damon",
        character: "Dr. Mann",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      {
        id: 6,
        name: "Mackenzie Foy",
        character: "Murph (Young)",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
    ],
    showtimes: {
      today: {
        "2D": ["10:00", "13:00", "16:00", "19:00"],
        "3D": ["11:00", "14:30", "18:00", "21:30"],
        IMAX: ["12:00", "15:30", "20:00"],
      },
      tomorrow: {
        "2D": ["09:30", "12:30", "15:30", "18:30"],
        "3D": ["10:00", "13:30", "17:00", "20:30"],
        IMAX: ["11:30", "16:00", "21:00"],
      },
    },
    recommendations: [2, 3, 4, 5],
  },
  {
    id: 2,
    title: "Oppenheimer",
    rating: 8.3,
    duration: "180 min",
    genre: ["Biography", "Drama", "History"],
    releaseDate: "July 21, 2023",
    year: "2023",
    language: "English",
    country: "USA / UK",
    director: "Christopher Nolan",
    writers: ["Christopher Nolan"],
    ageRating: "R",
    productionCompany: "Universal Pictures",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A biographical thriller that explores the moral complexities of scientific achievement and the devastating consequences of mankind's deadliest invention.",
    poster:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    trailerThumbnail:
      "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    cast: [
      {
        id: 1,
        name: "Cillian Murphy",
        character: "J. Robert Oppenheimer",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: 2,
        name: "Emily Blunt",
        character: "Katherine Oppenheimer",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      {
        id: 3,
        name: "Matt Damon",
        character: "Gen. Leslie Groves",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      {
        id: 4,
        name: "Robert Downey Jr.",
        character: "Lewis Strauss",
        image: "https://randomuser.me/api/portraits/men/62.jpg",
      },
    ],
    showtimes: {
      today: {
        "2D": ["11:00", "14:00", "17:00"],
        "3D": ["12:00", "15:00", "18:30"],
        IMAX: ["13:00", "16:30", "20:00"],
      },
      tomorrow: {
        "2D": ["10:30", "13:30", "16:30"],
        "3D": ["11:30", "14:30", "19:00"],
        IMAX: ["12:30", "17:30", "21:00"],
      },
    },
    recommendations: [1, 3, 4, 5],
  },
  {
    id: 3,
    title: "Dune: Part Two",
    rating: 8.5,
    duration: "166 min",
    genre: ["Sci-Fi", "Action", "Adventure"],
    releaseDate: "March 1, 2024",
    year: "2024",
    language: "English",
    country: "USA",
    director: "Denis Villeneuve",
    writers: ["Denis Villeneuve", "Jon Spaihts"],
    ageRating: "PG-13",
    productionCompany: "Warner Bros. Pictures",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    poster:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    trailerThumbnail:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    cast: [
      {
        id: 1,
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        image: "https://randomuser.me/api/portraits/men/15.jpg",
      },
      {
        id: 2,
        name: "Zendaya",
        character: "Chani",
        image: "https://randomuser.me/api/portraits/women/19.jpg",
      },
      {
        id: 3,
        name: "Rebecca Ferguson",
        character: "Lady Jessica",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
      },
    ],
    showtimes: {
      today: {
        "2D": ["10:30", "13:30", "16:30"],
        "3D": ["11:30", "14:30", "18:00"],
        IMAX: ["12:30", "16:00", "20:30"],
      },
      tomorrow: {
        "2D": ["09:00", "12:00", "15:00"],
        "3D": ["10:00", "13:00", "16:30"],
        IMAX: ["11:00", "15:00", "19:30"],
      },
    },
    recommendations: [1, 2, 4, 5],
  },
  {
    id: 4,
    title: "The Dark Knight",
    rating: 9.0,
    duration: "152 min",
    genre: ["Action", "Crime", "Drama"],
    releaseDate: "July 18, 2008",
    year: "2008",
    language: "English",
    country: "USA / UK",
    director: "Christopher Nolan",
    writers: ["Jonathan Nolan", "Christopher Nolan", "David S. Goyer"],
    ageRating: "PG-13",
    productionCompany: "Warner Bros. Pictures",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    trailerThumbnail:
      "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    cast: [
      {
        id: 1,
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        image: "https://randomuser.me/api/portraits/men/28.jpg",
      },
      {
        id: 2,
        name: "Heath Ledger",
        character: "The Joker",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
      },
      {
        id: 3,
        name: "Aaron Eckhart",
        character: "Harvey Dent",
        image: "https://randomuser.me/api/portraits/men/43.jpg",
      },
      {
        id: 4,
        name: "Maggie Gyllenhaal",
        character: "Rachel Dawes",
        image: "https://randomuser.me/api/portraits/women/38.jpg",
      },
    ],
    showtimes: {
      today: {
        "2D": ["10:00", "13:00", "16:00", "20:00"],
        "3D": ["11:00", "14:00", "17:00", "21:00"],
        IMAX: ["12:00", "15:00", "19:00"],
      },
      tomorrow: {
        "2D": ["09:30", "12:30", "15:30", "19:30"],
        "3D": ["10:30", "13:30", "16:30", "20:30"],
        IMAX: ["11:30", "14:30", "18:30"],
      },
    },
    recommendations: [1, 2, 3, 5],
  },
  {
    id: 5,
    title: "Blade Runner 2049",
    rating: 8.0,
    duration: "164 min",
    genre: ["Sci-Fi", "Drama", "Mystery"],
    releaseDate: "October 6, 2017",
    year: "2017",
    language: "English",
    country: "USA",
    director: "Denis Villeneuve",
    writers: ["Hampton Fancher", "Michael Green"],
    ageRating: "R",
    productionCompany: "Warner Bros. Pictures",
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years. In a dystopian Los Angeles of 2049, LAPD Officer K unearths a secret that threatens to destabilize society.",
    poster:
      "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/ilRyazdMfOUPPeQKgEBBQlJ5WBZK.jpg",
    trailerThumbnail:
      "https://image.tmdb.org/t/p/original/ilRyazdMfOUPPeQKgEBBQlJ5WBZK.jpg",
    cast: [
      {
        id: 1,
        name: "Ryan Gosling",
        character: "Officer K",
        image: "https://randomuser.me/api/portraits/men/17.jpg",
      },
      {
        id: 2,
        name: "Harrison Ford",
        character: "Rick Deckard",
        image: "https://randomuser.me/api/portraits/men/58.jpg",
      },
      {
        id: 3,
        name: "Ana de Armas",
        character: "Joi",
        image: "https://randomuser.me/api/portraits/women/29.jpg",
      },
    ],
    showtimes: {
      today: {
        "2D": ["11:30", "14:30", "17:30"],
        "3D": ["12:30", "15:30", "19:00"],
        IMAX: ["13:30", "17:00", "21:00"],
      },
      tomorrow: {
        "2D": ["10:00", "13:00", "16:00"],
        "3D": ["11:00", "14:00", "17:30"],
        IMAX: ["12:00", "16:30", "20:30"],
      },
    },
    recommendations: [1, 2, 3, 4],
  },
];

export const getMovieById = (id) => movies.find((m) => m.id === parseInt(id));
export const getRecommendedMovies = (ids) =>
  movies.filter((m) => ids.includes(m.id));
