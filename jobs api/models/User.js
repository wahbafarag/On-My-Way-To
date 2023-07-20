const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLenght: 3,
    maxLenght: 20,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Enter valid Email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLenght: [6, "Please Enter a strong and secure Password "],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// instance methods
UserSchema.methods.generateJwt = function () {
  return Jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.ComparePass = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
