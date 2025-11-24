const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return errorResponse(res, 401, "No token provided");
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return errorResponse(res, 401, "Invalid or expired token");
  }
};
