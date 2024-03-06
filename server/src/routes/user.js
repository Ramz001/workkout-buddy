const express = require("express");
const { login, signUp, forgotPassword } = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/forgot-password", forgotPassword);

module.exports = router;
