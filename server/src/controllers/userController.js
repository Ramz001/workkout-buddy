const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const { _id } = user;

    if (!user) {
      return res.status(404).json({ error: "The user was not found!" });
    }
    const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rkenjaev1@gmail.com",
        pass: "spqg medu zhlz vylf",
      },
    });

    const mailOptions = {
      from: "rkenjaev1@gmail.com",
      to: "rkenjayev001@gmail.com",
      subject: "Reset your password",
      text: `http://localhost:${process.env.PORT}/forgot-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({ status: "Success" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signUp, forgotPassword };
