const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password )

    const token = createToken(user._id)
    res.status(200).json({ name: user.name, email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id)
    res.status(200).json({ name, email, token  });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signUp };
