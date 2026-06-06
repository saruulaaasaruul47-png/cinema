const db = require("../config/db");

const findHall = async (hall_name) => {
    const connection = await db()
    const [rows] = await connection.execute("SELECT * FROM cinema_halls WHERE hall_name = ?", [hall_name])
    return rows[0];
}

const hallList = async () => {
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM cinema_halls");
    return rows;
}

const findHallById = async (id) => {
    console.log("ID:", id);
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM cinema_halls WHERE id = ?", [id]);
    return rows[0];
}

const createHall = async (hall_name, seat_count) => {
    const connection = await db()
    const [rows] = await connection.execute("insert into cinema_halls (hall_name, seat_count) values(?,?)", [hall_name, seat_count])
    return rows
}

const updateHall = async (id, hall_name, seat_count) =>{
    const connection = await db();
    const [rows] = await connection.execute(
        "update cinema_halls set hall_name = ?, seat_count = ? where id = ?", 
        [hall_name, seat_count, id]
    );
    return rows;
}

const deleteHall = async (id) => {
    const connection = await db();
    const [rows] = await connection.execute("DELETE FROM cinema_halls WHERE id = ?", [id]);
    return rows;
}

module.exports = {
    findHall,
    hallList,
    createHall,
    updateHall,
    findHallById,
    deleteHall
};