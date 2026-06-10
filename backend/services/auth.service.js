require("dotenv").config();
const bcrypt        = require("bcrypt");
const jwt           = require("jsonwebtoken");
const {
    findUserByEmail,
    findUserByUsername,
    createUser,
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteAllRefreshTokensByUser
} = require("../repositories/user.repository");

const SALT_ROUNDS = 10;

function createError(message, statusCode) {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
}

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

const registerService = async (data) => {
    const { username, email, password, role } = data;

    const existEmail = await findUserByEmail(email);
    if (existEmail) throw createError("Энэ и-мэйл бүртгэлтэй байна", 409);

    const existUsername = await findUserByUsername(username);
    if (existUsername) throw createError("Энэ хэрэглэгчийн нэр аль хэдийн авагдсан", 409);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await createUser(username, email, hashedPassword, role || "user");

    return { message: "Бүртгэл амжилттай" };
};

const loginService = async (data) => {
    const { email, password } = data;

    const user = await findUserByEmail(email);
    if (!user) throw createError("И-мэйл эсвэл нууц үг буруу", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError("И-мэйл эсвэл нууц үг буруу", 401);

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshToken(user.id, refreshToken, expiresAt);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };
};

const adminLoginService = async (data) => {
    const result = await loginService(data);
    const allowedRoles = ["admin", "staff"];

    if (!allowedRoles.includes(result.user.role)) {
        throw createError("Энэ үйлдэл хийх эрх байхгүй", 403);
    }

    return result;
};

const logoutService = async (refreshToken) => {
    if (!refreshToken) throw createError("Refresh token олдсонгүй", 400);
    await deleteRefreshToken(refreshToken);
    return { message: "Гарах амжилттай" };
};

const refreshTokenService = async (refreshToken) => {
    if (!refreshToken) throw createError("Refresh token шаардлагатай", 401);

    const tokenInDb = await findRefreshToken(refreshToken);
    if (!tokenInDb) throw createError("Хүчингүй эсвэл хугацаа дууссан token", 403);

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const payload = { id: decoded.id, email: decoded.email, role: decoded.role };
        const newAccessToken = generateAccessToken(payload);
        return { accessToken: newAccessToken };
    } catch {
        await deleteRefreshToken(refreshToken);
        throw createError("Token буруу байна", 403);
    }
};

module.exports = {
    registerService,
    loginService,
    adminLoginService,
    logoutService,
    refreshTokenService,
};
