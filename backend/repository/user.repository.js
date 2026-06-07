const db = require("../config/db");

const findUserByEmail = async (email) => {
    const connection = await db();
    const [rows] = await connection.execute(
        "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
        [email]
    );
    await connection.end();
    return rows[0];
};

const findUserByUsername = async (username) => {
    const connection = await db();
    const [rows] = await connection.execute(
        "SELECT * FROM users WHERE username = ? AND deleted_at IS NULL",
        [username]
    );
    await connection.end();
    return rows[0];
};

const findUserById = async (id) => {
    const connection = await db();
    const [rows] = await connection.execute(
        "SELECT id, username, email, role, profile_image, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL",
        [id]
    );
    await connection.end();
    return rows[0];
};

const createUser = async (username, email, hashedPassword, role = 'user') => {
    const connection = await db();
    const [result] = await connection.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, role]
    );
    await connection.end();
    return result;
};

const updateUserProfile = async (id, username, profile_image) => {
    const connection = await db();
    const [result] = await connection.execute(
        "UPDATE users SET username = ?, profile_image = ? WHERE id = ? AND deleted_at IS NULL",
        [username, profile_image, id]
    );
    await connection.end();
    return result;
};

const updateUserPassword = async (id, hashedPassword) => {
    const connection = await db();
    const [result] = await connection.execute(
        "UPDATE users SET password = ? WHERE id = ? AND deleted_at IS NULL",
        [hashedPassword, id]
    );
    await connection.end();
    return result;
};

const getAllUsers = async () => {
    const connection = await db();
    const [rows] = await connection.execute(
        "SELECT id, username, email, role, profile_image, created_at FROM users WHERE deleted_at IS NULL"
    );
    await connection.end();
    return rows;
};

const softDeleteUser = async (id) => {
    const connection = await db();
    const [result] = await connection.execute(
        "UPDATE users SET deleted_at = NOW() WHERE id = ?",
        [id]
    );
    await connection.end();
    return result;
};

// Refresh token
const saveRefreshToken = async (userId, token, expiresAt) => {
    const connection = await db();
    await connection.execute(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
        [userId, token, expiresAt]
    );
    await connection.end();
};

const findRefreshToken = async (token) => {
    const connection = await db();
    const [rows] = await connection.execute(
        "SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()",
        [token]
    );
    await connection.end();
    return rows[0];
};

const deleteRefreshToken = async (token) => {
    const connection = await db();
    await connection.execute(
        "DELETE FROM refresh_tokens WHERE token = ?",
        [token]
    );
    await connection.end();
};

const deleteAllRefreshTokensByUser = async (userId) => {
    const connection = await db();
    await connection.execute(
        "DELETE FROM refresh_tokens WHERE user_id = ?",
        [userId]
    );
    await connection.end();
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    findUserById,
    createUser,
    updateUserProfile,
    updateUserPassword,
    getAllUsers,
    softDeleteUser,
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteAllRefreshTokensByUser
};
