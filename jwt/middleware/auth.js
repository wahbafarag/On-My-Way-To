const CustomAPIError = require("../errors/custom-error");
const Jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Invalid Token ", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decodedToken;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError(
      "You are not Authorized to access our Routes please Login in first",
      401
    );
  }
};

module.exports = authenticationMiddleware;
