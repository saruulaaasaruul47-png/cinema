USE cinema_booking;
 
-- USERS
CREATE TABLE IF NOT EXISTS users (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    role          ENUM('user','staff','admin') DEFAULT 'user',
    profile_image VARCHAR(255),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at    TIMESTAMP NULL
);
 
-- REFRESH TOKENS (auth-д шаардлагатай)
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    token      TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- MOVIES
CREATE TABLE IF NOT EXISTS movies (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(180) NOT NULL,
    description  TEXT,
    duration     INT NOT NULL,
    release_date DATE,
    director     VARCHAR(150),
    poster_url   VARCHAR(255),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at   TIMESTAMP NULL
);

-- CINEMA HALLS
CREATE TABLE IF NOT EXISTS cinema_halls (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    hall_name  VARCHAR(100) NOT NULL UNIQUE,
    seat_count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SHOWTIMES
CREATE TABLE IF NOT EXISTS showtimes (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id   BIGINT NOT NULL,
    hall_id    BIGINT NOT NULL,
    start_time DATETIME NOT NULL,
    price      DECIMAL(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (hall_id) REFERENCES cinema_halls(id) ON DELETE CASCADE
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    showtime_id   BIGINT NOT NULL,
    user_id       BIGINT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150),
    seats         JSON NOT NULL,
    total_price   DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status        ENUM('confirmed','cancelled') DEFAULT 'confirmed',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title);
CREATE INDEX IF NOT EXISTS idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX IF NOT EXISTS idx_showtimes_hall ON showtimes(hall_id);
CREATE INDEX IF NOT EXISTS idx_bookings_showtime ON bookings(showtime_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
