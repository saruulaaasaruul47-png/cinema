const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
    [email]
  );
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE username = ? AND deleted_at IS NULL",
    [username]
  );
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id, username, email, role, profile_image, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows[0];
};

const findUserWithPasswordById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows[0];
};

const createUser = async (username, email, hashedPassword, role = "user") => {
  const [result] = await pool.execute(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, hashedPassword, role]
  );
  return result;
};

const updateUserProfile = async (id, username, profile_image) => {
  const [result] = await pool.execute(
    "UPDATE users SET username = ?, profile_image = ? WHERE id = ? AND deleted_at IS NULL",
    [username, profile_image, id]
  );
  return result;
};

const updateUserPassword = async (id, hashedPassword) => {
  const [result] = await pool.execute(
    "UPDATE users SET password = ? WHERE id = ? AND deleted_at IS NULL",
    [hashedPassword, id]
  );
  return result;
};

const getAllUsers = async () => {
  const [rows] = await pool.execute(
    "SELECT id, username, email, role, profile_image, created_at FROM users WHERE deleted_at IS NULL"
  );
  return rows;
};

const softDeleteUser = async (id) => {
  const [result] = await pool.execute(
    "UPDATE users SET deleted_at = NOW() WHERE id = ?",
    [id]
  );
  return result;
};

const saveRefreshToken = async (userId, token, expiresAt) => {
  await pool.execute(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]
  );
};

const findRefreshToken = async (token) => {
  const [rows] = await pool.execute(
    "SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()",
    [token]
  );
  return rows[0];
};

const deleteRefreshToken = async (token) => {
  await pool.execute("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};

const deleteAllRefreshTokensByUser = async (userId) => {
  await pool.execute("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserById,
  findUserWithPasswordById,
  createUser,
  updateUserProfile,
  updateUserPassword,
  getAllUsers,
  softDeleteUser,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokensByUser,
};
