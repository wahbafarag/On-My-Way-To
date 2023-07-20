const CustomAPIError = require("../errors/custom-error");
const Jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Invalid username or password", 400);
  }
  const id = new Date().getDate(); // just demo one , id is provided by database

  const token = Jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `As We know Who you are now , Here is your Lucky Number ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
