const express = require("express");
const { login, signUp, forgotPassword, resetPassword } = require("../controllers/userController");


const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:id/:token", resetPassword)

module.exports = router;
