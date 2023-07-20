const User = require("../models/User");
const Jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Access denied");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = Jwt.verify(token, process.env.JWT_SECRET);
    // const user = User.findById(payload.id).select("-password");
    // req.user = user;
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Token");
  }
};

module.exports = verifyToken;
