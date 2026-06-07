const express = require("express");
const {
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    deleteUser
} = require("../controllers/user.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const router = express.Router();

// Бүртгэлтэй хэрэглэгч
router.get("/profile",         protect, getProfile);
router.put("/profile",         protect, updateProfile);
router.patch("/change-password", protect, changePassword);

// Admin only
router.get("/",       protect, authorize("admin"), getAllUsers);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
