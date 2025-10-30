function errorHandler(err, req, res, next) {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error (unhandled).",
  });
}

module.exports = errorHandler;
