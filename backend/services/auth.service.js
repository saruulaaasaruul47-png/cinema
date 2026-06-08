require("dotenv").config();
const bcrypt        = require("bcrypt");
const jwt           = require("jsonwebtoken");
const asyncHandler  = require("express-async-handler");
const User          = require("../models/userModel");
const {
    findUserByEmail,
    findUserByUsername,
    createUser,
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteAllRefreshTokensByUser
} = require("../repository/user.repository");

const SALT_ROUNDS = 10;

// Token үүсгэх тусгай функцүүд
const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    });
};

// Register
const registerService = asyncHandler(async (data) => {
    const { username, email, password, role } = data;

    const existEmail = await findUserByEmail(email);
    if (existEmail) {
        const err = new Error("Энэ и-мэйл бүртгэлтэй байна");
        err.statusCode = 409;
        throw err;
    }

    const existUsername = await findUserByUsername(username);
    if (existUsername) {
        const err = new Error("Энэ хэрэглэгчийн нэр аль хэдийн авагдсан");
        err.statusCode = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User(username, email, hashedPassword, role || 'user');
    await createUser(user.username, user.email, user.password, user.role);

    return { message: "Бүртгэл амжилттай" };
});

// Login
const loginService = asyncHandler(async (data) => {
    const { email, password } = data;

    const user = await findUserByEmail(email);
    if (!user) {
        const err = new Error("И-мэйл эсвэл нууц үг буруу");
        err.statusCode = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error("И-мэйл эсвэл нууц үг буруу");
        err.statusCode = 401;
        throw err;
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken  = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Refresh token-ийг DB-д хадгалах
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 хоног
    await saveRefreshToken(user.id, refreshToken, expiresAt);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
});

// Logout
const logoutService = asyncHandler(async (refreshToken) => {
    if (!refreshToken) {
        const err = new Error("Refresh token олдсонгүй");
        err.statusCode = 400;
        throw err;
    }
    await deleteRefreshToken(refreshToken);
    return { message: "Гарах амжилттай" };
});

// Refresh — шинэ access token авах
const refreshTokenService = asyncHandler(async (refreshToken) => {
    if (!refreshToken) {
        const err = new Error("Refresh token шаардлагатай");
        err.statusCode = 401;
        throw err;
    }

    const tokenInDb = await findRefreshToken(refreshToken);
    if (!tokenInDb) {
        const err = new Error("Хүчингүй эсвэл хугацаа дууссан token");
        err.statusCode = 403;
        throw err;
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (e) {
        await deleteRefreshToken(refreshToken);
        const err = new Error("Token буруу байна");
        err.statusCode = 403;
        throw err;
    }

    const payload      = { id: decoded.id, email: decoded.email, role: decoded.role };
    const newAccessToken = generateAccessToken(payload);

    return { accessToken: newAccessToken };
});

module.exports = {
    registerService,
    loginService,
    logoutService,
    refreshTokenService
};
