# CinemaX Frontend

## Atomic Architecture

```
src/
├── api/          # Backend API layer — /api/v1/... endpoints
├── context/      # AuthContext (JWT), AppContext (nav + toast)
├── hooks/        # useFetch, useMutation
├── atoms/        # Badge, Btn, Input, Spinner, Tag, Skeleton, Select, EmptyState
├── molecules/    # MovieCard, ComingSoonCard, NavLink, SeatButton, ShowtimeBtn, BookingCard
├── organisms/    # Navbar, HeroCarousel, MovieGrid, SeatMap, Footer
├── templates/    # PageLayout, InnerPageLayout
├── pages/        # HomePage, MoviesPage, MovieDetailPage, SeatSelectionPage, ...
└── styles/       # global.css
```

## Backend Endpoints (тохирох)

| Frontend хийдэг | Backend endpoint |
|---|---|
| Кинонуудын жагсаалт | `GET /api/v1/movie/movielist` |
| Кино дэлгэрэнгүй | `GET /api/v1/movie/:id` |
| Цагийн хуваарь | `GET /api/v1/showtimes` |
| Суудлын map | `GET /api/v1/bookings/showtimes/:id/seats` |
| Захиалга үүсгэх | `POST /api/v1/bookings` |
| Захиалга цуцлах | `PATCH /api/v1/bookings/:id/cancel` |
| Захиалгын түүх | `GET /api/v1/bookings/history` |
| Нэвтрэх | `POST /api/v1/auth/login` |
| Бүртгүүлэх | `POST /api/v1/auth/register` |
| Профайл | `GET /api/v1/users/profile` |

## Суурилуулах

```bash
npm install
npm run dev
```

## Environment

`.env` файл үүсгэх:
```
VITE_API_URL=http://localhost:3000
```

Backend `PORT=3000` дээр ажиллана. Vite dev server `/api` proxy-оор backend рүү дамжуулна.
