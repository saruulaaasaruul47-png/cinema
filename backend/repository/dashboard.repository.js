const db = require("../config/db");

const EMPTY_ANALYTICS = {
    summary: {
        totalUsers: 0,
        totalMovies: 0,
        totalHalls: 0,
        totalBookings: 0,
        activeBookings: 0,
        cancelledBookings: 0,
        totalRevenue: 0,
        todayRevenue: 0,
        occupancyRate: 0
    },
    recentBookings: [],
    popularMovies: [],
    hallOccupancy: [],
    revenueByDay: []
};

const tableExists = async (connection, tableName) => {
    const [rows] = await connection.execute(
        `SELECT COUNT(*) AS count
         FROM information_schema.tables
         WHERE table_schema = DATABASE() AND table_name = ?`,
        [tableName]
    );
    return Number(rows[0]?.count || 0) > 0;
};

const countRows = async (connection, tableName, where = "1 = 1") => {
    const exists = await tableExists(connection, tableName);
    if (!exists) return 0;

    const [rows] = await connection.execute(`SELECT COUNT(*) AS count FROM ${tableName} WHERE ${where}`);
    return Number(rows[0]?.count || 0);
};

const sumRows = async (connection, tableName, column, where = "1 = 1") => {
    const exists = await tableExists(connection, tableName);
    if (!exists) return 0;

    const [rows] = await connection.execute(`SELECT COALESCE(SUM(${column}), 0) AS total FROM ${tableName} WHERE ${where}`);
    return Number(rows[0]?.total || 0);
};

const getDashboardAnalytics = async () => {
    const connection = await db();

    const [
        hasBookings,
        hasMovies,
        hasHalls,
        hasShowtimes
    ] = await Promise.all([
        tableExists(connection, "bookings"),
        tableExists(connection, "movies"),
        tableExists(connection, "cinema_halls"),
        tableExists(connection, "showtimes")
    ]);

    const summary = {
        totalUsers: await countRows(connection, "users", "deleted_at IS NULL"),
        totalMovies: await countRows(connection, "movies", "deleted_at IS NULL"),
        totalHalls: await countRows(connection, "cinema_halls"),
        totalBookings: await countRows(connection, "bookings"),
        activeBookings: await countRows(connection, "bookings", "status = 'confirmed'"),
        cancelledBookings: await countRows(connection, "bookings", "status = 'cancelled'"),
        totalRevenue: await sumRows(connection, "bookings", "total_price", "status = 'confirmed'"),
        todayRevenue: await sumRows(connection, "bookings", "total_price", "status = 'confirmed' AND DATE(created_at) = CURDATE()"),
        occupancyRate: 0
    };

    if (!hasBookings) {
        return { ...EMPTY_ANALYTICS, summary };
    }

    const [seatRows] = await connection.execute(
        `SELECT COALESCE(SUM(seat_count), 0) AS totalSeats
         FROM cinema_halls`
    ).catch(() => [[{ totalSeats: 0 }]]);

    const bookedSeats = await sumRows(connection, "bookings", "JSON_LENGTH(seats)", "status = 'confirmed'");
    const totalSeats = Number(seatRows[0]?.totalSeats || 0);
    summary.occupancyRate = totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0;

    const [recentBookings] = await connection.execute(
        `SELECT b.id, b.customer_name, b.seats, b.total_price, b.status, b.created_at,
                m.title AS movie_title, h.hall_name
         FROM bookings b
         LEFT JOIN showtimes s ON b.showtime_id = s.id
         LEFT JOIN movies m ON s.movie_id = m.id
         LEFT JOIN cinema_halls h ON s.hall_id = h.id
         ORDER BY b.created_at DESC
         LIMIT 8`
    ).catch(() => [[]]);

    const popularMovies = hasMovies && hasShowtimes
        ? await connection.execute(
            `SELECT m.id, m.title, COUNT(b.id) AS bookings, COALESCE(SUM(b.total_price), 0) AS revenue
             FROM movies m
             LEFT JOIN showtimes s ON s.movie_id = m.id
             LEFT JOIN bookings b ON b.showtime_id = s.id AND b.status = 'confirmed'
             WHERE m.deleted_at IS NULL
             GROUP BY m.id, m.title
             ORDER BY bookings DESC, revenue DESC
             LIMIT 5`
        ).then(([rows]) => rows).catch(() => [])
        : [];

    const hallOccupancy = hasHalls && hasShowtimes
        ? await connection.execute(
            `SELECT h.id, h.hall_name, h.seat_count,
                    COALESCE(SUM(CASE WHEN b.status = 'confirmed' THEN JSON_LENGTH(b.seats) ELSE 0 END), 0) AS booked_seats
             FROM cinema_halls h
             LEFT JOIN showtimes s ON s.hall_id = h.id
             LEFT JOIN bookings b ON b.showtime_id = s.id
             GROUP BY h.id, h.hall_name, h.seat_count
             ORDER BY h.hall_name ASC`
        ).then(([rows]) => rows).catch(() => [])
        : [];

    const [revenueByDay] = await connection.execute(
        `SELECT DATE(created_at) AS day, COALESCE(SUM(total_price), 0) AS revenue
         FROM bookings
         WHERE status = 'confirmed' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
         GROUP BY DATE(created_at)
         ORDER BY day ASC`
    ).catch(() => [[]]);

    return {
        summary,
        recentBookings,
        popularMovies,
        hallOccupancy,
        revenueByDay
    };
};

module.exports = {
    getDashboardAnalytics
};
