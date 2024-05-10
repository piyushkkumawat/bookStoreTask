const customSender = (res, statusCode, success, message, data) => {
  return res.status(statusCode).json({
    success: success,
    message: message,
    data: data,
  });
};

module.exports = customSender;
