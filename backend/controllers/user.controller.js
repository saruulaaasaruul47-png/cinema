const asyncHandler = require("express-async-handler");
const {
    getProfileService,
    updateProfileService,
    changePasswordService,
    getAllUsersService,
    deleteUserService
} = require("../services/user.service");

// GET /api/v1/users/profile
const getProfile = asyncHandler(async (req, res) => {
    const user = await getProfileService(req.user.id);
    return res.status(200).json({ success: true, user });
});

// PUT /api/v1/users/profile
const updateProfile = asyncHandler(async (req, res) => {
    const result = await updateProfileService(req.user.id, req.body);
    return res.status(200).json({ success: true, message: result.message });
});

// PATCH /api/v1/users/change-password
const changePassword = asyncHandler(async (req, res) => {
    const result = await changePasswordService(req.user.id, req.body);
    return res.status(200).json({ success: true, message: result.message });
});

// GET /api/v1/users  (admin only)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await getAllUsersService();
    return res.status(200).json({ success: true, users });
});

// DELETE /api/v1/users/:id  (admin only)
const deleteUser = asyncHandler(async (req, res) => {
    const result = await deleteUserService(req.params.id);
    return res.status(200).json({ success: true, message: result.message });
});

module.exports = { getProfile, updateProfile, changePassword, getAllUsers, deleteUser };
