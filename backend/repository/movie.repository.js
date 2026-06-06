const db = require("../config/db");

const createMovie = async (title, description, duration, release_date, director) => {
    const connection = await db();

    const [rows] = await connection.execute(
        "INSERT INTO movies (title, description, duration, release_date, director) VALUES (?, ?, ?, ?, ?)",
        [title, description, duration, release_date, director]
    );

    return rows;
};
const findMovie = async (title, director) => {
    const connection = await db();
    const [rows] = await connection.execute("SELECT title, director FROM movies WHERE title = ? AND director = ?", [title, director]);
    return rows[0];
}


module.exports = { createMovie, findMovie };