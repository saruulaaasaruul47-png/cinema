require("dotenv").config();
const bcrypt       = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
    findUserById,
    updateUserProfile,
    updateUserPassword,
    getAllUsers,
    softDeleteUser
} = require("../repository/user.repository");

const SALT_ROUNDS = 10;

// Өөрийн профайл харах
const getProfileService = asyncHandler(async (id) => {
    const user = await findUserById(id);
    if (!user) {
        const err = new Error("Хэрэглэгч олдсонгүй");
        err.statusCode = 404;
        throw err;
    }
    return user;
});

// Профайл засах
const updateProfileService = asyncHandler(async (id, data) => {
    const { username, profile_image } = data;
    const user = await findUserById(id);
    if (!user) {
        const err = new Error("Хэрэглэгч олдсонгүй");
        err.statusCode = 404;
        throw err;
    }
    await updateUserProfile(id, username || user.username, profile_image || user.profile_image);
    return { message: "Профайл амжилттай шинэчлэгдлээ" };
});

// Нууц үг солих
const changePasswordService = asyncHandler(async (id, data) => {
    const { currentPassword, newPassword } = data;

    const { findUserByEmail } = require("../repository/user.repository");
    const connection = require("../config/db");
    const db = await connection();
    const [rows] = await db.execute(
        "SELECT * FROM users WHERE id = ? AND deleted_at IS NULL", [id]
    );
    await db.end();
    const user = rows[0];

    if (!user) {
        const err = new Error("Хэрэглэгч олдсонгүй");
        err.statusCode = 404;
        throw err;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        const err = new Error("Одоогийн нууц үг буруу");
        err.statusCode = 400;
        throw err;
    }

    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await updateUserPassword(id, hashed);
    return { message: "Нууц үг амжилттай солигдлоо" };
});

// Admin: бүх хэрэглэгч харах
const getAllUsersService = asyncHandler(async () => {
    return await getAllUsers();
});

// Admin: хэрэглэгч устгах (soft delete)
const deleteUserService = asyncHandler(async (id) => {
    const user = await findUserById(id);
    if (!user) {
        const err = new Error("Хэрэглэгч олдсонгүй");
        err.statusCode = 404;
        throw err;
    }
    await softDeleteUser(id);
    return { message: "Хэрэглэгч устгагдлаа" };
});

module.exports = {
    getProfileService,
    updateProfileService,
    changePasswordService,
    getAllUsersService,
    deleteUserService
};
