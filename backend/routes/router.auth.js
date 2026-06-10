const express = require("express");

const {
    register,
    login,
    adminLogin,
    logout,
    refresh
} = require("../controllers/auth.controller");


const router = express.Router();


router.post("/register", register);

router.post("/login", login);

router.post("/admin-login", adminLogin);

router.post("/logout", logout);

router.post("/refresh", refresh);


module.exports = router;