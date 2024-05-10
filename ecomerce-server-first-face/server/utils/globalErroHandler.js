const errorHandler = require("./error");

function globalErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path} `;
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered `;
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  }
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  }
  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, try again`;
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  }

  // Generic error

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
}

module.exports = globalErrorHandler;
