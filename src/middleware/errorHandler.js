/**
 * Error Handler:
 *   Captures unhandled errors thrown in routes, controllers, or async
 *   middleware and sends a safe, consistent JSON response to the client.
 */

function errorHandler(err, req, res, next) {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error (unhandled).",
  });
}

module.exports = errorHandler;
