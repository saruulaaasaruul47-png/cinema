// Base URL — dev дээр vite proxy ашиглана, prod дээр env-ээс авна
const BASE = import.meta.env.VITE_API_URL || "";

// ── core fetcher ──────────────────────────────────────────────
async function request(method, path, body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = { method, headers, credentials: "include" };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = json?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

const get  = (path, token)       => request("GET",    path, null, token);
const post = (path, body, token) => request("POST",   path, body, token);
const put  = (path, body, token) => request("PUT",    path, body, token);
const patch= (path, body, token) => request("PATCH",  path, body, token);
const del  = (path, token)       => request("DELETE", path, null, token);

// ── Auth  /api/v1/auth ────────────────────────────────────────
export const authApi = {
  register: (body)              => post("/api/v1/auth/register", body),
  login:    (body)              => post("/api/v1/auth/login",    body),
  adminLogin:(body)             => post("/api/v1/auth/admin-login", body),
  logout:   ()                  => post("/api/v1/auth/logout",   {}),
  refresh:  ()                  => post("/api/v1/auth/refresh",  {}),
};

// ── Users  /api/v1/users ──────────────────────────────────────
export const usersApi = {
  getProfile:     (token)         => get("/api/v1/users/profile",          token),
  updateProfile:  (body, token)   => put("/api/v1/users/profile",    body, token),
  changePassword: (body, token)   => patch("/api/v1/users/change-password", body, token),
  getAll:         (token)         => get("/api/v1/users",                  token),
  deleteUser:     (id, token)     => del(`/api/v1/users/${id}`,            token),
};

// ── Movies  /api/v1/movie ─────────────────────────────────────
export const moviesApi = {
  getAll:   (params)        => get(`/api/v1/movie/movielist${params ? "?" + new URLSearchParams(params) : ""}`),
  getById:  (id)            => get(`/api/v1/movie/${id}`),
  create:   (body, token)   => post("/api/v1/movie/newmovie",    body, token),
  update:   (id, body, token) => put(`/api/v1/movie/${id}`,      body, token),
  remove:   (id, token)     => del(`/api/v1/movie/${id}`,              token),
};

// ── Halls  /api/v1/halls ──────────────────────────────────────
export const hallsApi = {
  getAll:   (token)           => get("/api/v1/halls/hallslist",         token),
  create:   (body, token)     => post("/api/v1/halls/newhall",    body, token),
  update:   (id, body, token) => put(`/api/v1/halls/${id}`,       body, token),
  remove:   (id, token)       => del(`/api/v1/halls/${id}`,             token),
};

// ── ShowTimes  /api/v1/showtimes ──────────────────────────────
export const showtimesApi = {
  getAll:    (params)          => get(`/api/v1/showtimes${params ? "?" + new URLSearchParams(params) : ""}`),
  getById:   (id)              => get(`/api/v1/showtimes/${id}`),
  getOptions:()                => get("/api/v1/showtimes/options"),
  create:    (body, token)     => post("/api/v1/showtimes",       body, token),
  update:    (id, body, token) => put(`/api/v1/showtimes/${id}`,  body, token),
  remove:    (id, token)       => del(`/api/v1/showtimes/${id}`,        token),
};

// ── Bookings  /api/v1/bookings ────────────────────────────────
export const bookingsApi = {
  getSeatMap:    (showtimeId, token)  => get(`/api/v1/bookings/showtimes/${showtimeId}/seats`, token),
  getHistory:    (params, token)      => get(`/api/v1/bookings/history${params ? "?" + new URLSearchParams(params) : ""}`, token),
  create:        (body, token)        => post("/api/v1/bookings",             body, token),
  cancel:        (id, token)          => patch(`/api/v1/bookings/${id}/cancel`, {}, token),
};

// ── Dashboard  /api/v1/dashboard ─────────────────────────────
export const dashboardApi = {
  getAnalytics: (token) => get("/api/v1/dashboard/analytics", token),
};

// ── Genres  /api/v1/genres ────────────────────────────────────
export const genresApi = {
  getAll:   ()              => get("/api/v1/genres"),
  create:   (body, token)    => post("/api/v1/genres", body, token),
  update:   (id, body, token)=> put(`/api/v1/genres/${id}`, body, token),
  remove:   (id, token)      => del(`/api/v1/genres/${id}`, token),
};
