const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateJwt();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Enter valid Email and Password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPassCorrect = await user.ComparePass(password);
  if (!isPassCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.generateJwt();
  res
    .status(StatusCodes.OK)
    .json({ user: { email: user.email }, token: token });
};

module.exports = { register, login };
