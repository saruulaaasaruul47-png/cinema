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

const getAllMovies = async () => {
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM movies");
    return rows;
}


const getMovieById = async (id) => {
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM movies WHERE id = ?",[id]
    );
    return rows[0];
};


const updateMovie = async (id, title, description, duration, release_date, director) => {
    const connection = await db();
    const [rows] = await connection.execute(
        "UPDATE movies SET title = ?, description = ?, duration = ?, release_date = ?, director = ? WHERE id = ?",
        [title, description, duration, release_date, director, id]
    );
    return rows;
};

const deleteMovie = async (id) => {
    const connection = await db();
    const [rows] = await connection.execute("DELETE FROM movies WHERE id = ?", [id]);
    return rows;
}


module.exports = { 
    createMovie, 
    findMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie 
};