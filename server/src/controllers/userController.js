const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const mailOptions = require("./mailOptions")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ name: user.name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
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
        res.status(403).json({ error: error.message });
      }
      try {
        const user = await User.updatePassword(_id, password);
        res.status(200).json({ ...user });
      } catch (error) {
        res.status(403).json({ error: error.message });
      }
    }
  );
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const { _id } = user;

    if (!user) {
      return res.status(404).json({ error: "The user was not found!" });
    }
    
    const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    req.app.locals.OTP = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rkenjaev1@gmail.com",
        pass: "spqg medu zhlz vylf",
      },
    });

    transporter.sendMail(mailOptions(email, req.app.locals.OTP), function (error, info) {
      if (error) {
        res.status(400).json({ error: error.message });
      } else {
        return res.status(200).json({ status: "The email with OTP was sent" });
      }
    });

    res.status(201).json({ status: "Email is sent", _id , token });
  } catch(error){
    res.status(400).json({ error: error.message });
  }
}

const verifyOTP = (req, res) => {
  const { code, _id, token } = req.body;

  if (!req.app.locals.OTP)
    return res.status(400).json({ error: "You have no OTP" });
  console.log(req.app.locals.user)
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    res.app.locals.OTP = null;
    res.app.locals.resetSession = true;
    res.status(201).json({ status: "success", _id, token });
  }
};

module.exports = {
  login,
  signUp,
  recoverPassword,
  // generateOTP,
  verifyOTP,
  resetPassword,
};
