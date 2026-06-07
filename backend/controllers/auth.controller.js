const asyncHandler = require("express-async-handler");
const {
    registerService,
    loginService,
    logoutService,
    refreshTokenService
} = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
    const result = await registerService(req.body);
    return res.status(201).json({
        success: true,
        message: result.message
    });
});

const login = asyncHandler(async (req, res) => {
    const result = await loginService(req.body);
    // Refresh token-ийг httpOnly cookie-д хадгалах
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 хоног
    });
    return res.status(200).json({
        success: true,
        message: "Нэвтрэх амжилттай",
        accessToken: result.accessToken,
        user: result.user
    });
});

const logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    await logoutService(refreshToken);
    res.clearCookie("refreshToken");
    return res.status(200).json({
        success: true,
        message: "Гарах амжилттай"
    });
});

const refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    const result = await refreshTokenService(refreshToken);
    return res.status(200).json({
        success: true,
        accessToken: result.accessToken
    });
});

module.exports = { register, login, logout, refresh };
