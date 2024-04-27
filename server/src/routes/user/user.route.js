const express = require("express");
const {
  login,
  signUp,
  resetPassword,
  recoverPassword,
  verifyOTP,
} = require("./user.controller");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/recover-password", recoverPassword);

router.post("/verifyOTP", verifyOTP);

router.patch("/reset-password/", resetPassword);

module.exports = router;
