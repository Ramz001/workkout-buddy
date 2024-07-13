const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const mailOptions = require("../../utils/mailOptions");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    return res.status(200).json({ name: user.name, email: user.email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);

    return res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = (req, res) => {
  const { password, _id, token } = req.body;

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    async function (error, decoded) {
      if (error) {
        return res.status(403).json({ error: error.message });
      }
      try {
        const user = await User.updatePassword(_id, password);
        return res
          .status(200)
          .json({ status: "Password updated successfully", ...user });
      } catch (error) {
        return res.status(403).json({ error: error.message });
      }
    }
  );
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).json({ error: "Email is required!" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "The user was not found!" });
  const { _id } = user;

  if (!user) {
    return res.status(404).json({ error: "The user was not found!" });
  }

  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    host: "smtp.gmail.com",
    auth: {
      user: "rkenjaev1@gmail.com",
      pass: "spqg medu zhlz vylf",
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) => {
    transporter.sendMail(
      mailOptions(email, req.app.locals.OTP),
      function (error, info) {
        if (error) {
          reject(error);
          return res.status(400).json({ error: error.message });
        } else {
          resolve(info);
        }
      }
    );
  });
  return res.status(201).json({ status: "Email is sent", _id });
};

const verifyOTP = (req, res) => {
  const { code, _id } = req.body;

  if (code.length !== 6) {
    return res.status(400).json({ error: "OTP must contain 6 digits!" });
  }
  if (!code) return res.status(400).json({ error: "OTP is required!" });
  if (!_id) return res.status(400).json({ error: "User ID is required!" });
  if (parseInt(req.app.locals.OTP) !== parseInt(code)) {
    return res.status(400).json({ error: "Your OTP is incorrect" });
  }

  try {
    if (!req.app.locals.OTP)
      return res.status(400).json({ error: "The server does not contain OTP" });

    req.app.locals.OTP = null;
    const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(201).json({ status: "User is verified", _id, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signUp,
  recoverPassword,
  verifyOTP,
  resetPassword,
};
