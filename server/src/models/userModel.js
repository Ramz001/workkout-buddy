const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [5, "Password is too short"],
    max: [16, "Password is too long"],
  },
});

UserSchema.statics.signup = async function (name, email, password) {
  if (!email || !password || !name) {
    throw new Error("All fields must be filled in");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("the user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ name, email, password: hash });

  return user;
};

UserSchema.statics.updatePassword = async function(id, password){
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.findByIdAndUpdate({ _id: id }, { password: hash });

  return user
}

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
