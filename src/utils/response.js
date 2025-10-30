function success(res, statusCode, message, data) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function fail(res, statusCode, message, details) {
  return res.status(statusCode).json({
    success: false,
    message,
    details, // ex: validation errors
  });
}

module.exports = { success, fail };
