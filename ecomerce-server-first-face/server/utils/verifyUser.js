const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  let token = "";
  token = req.cookies.access_token;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (!token) return next(errorHandler(401, "You are not authenticated!"));
  jwt.verify(token, process.env.secret_key, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};

const isAdminToken = (req, res, next) => {
  let token = "";
  token = req.cookies.access_token;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  if (!token) return next(errorHandler(401, "You are not authenticated!"));
  try {
    const decodedToken = jwt.verify(token, process.env.secret_key);
    if (decodedToken.isAdmin) {
      req.userId = decodedToken.userId;
      next();
    } else {
      return next(
        errorHandler(403, "You are not authorized to access this resource!")
      );
    }
  } catch (error) {
    return next(errorHandler(401, "Invalid token!"));
  }
};

module.exports = { verifyToken, isAdminToken };
