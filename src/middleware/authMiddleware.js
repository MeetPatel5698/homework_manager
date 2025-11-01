/**
 * Authentication Middleware:
 *   Verifies the JSON Web Token (JWT) sent in the "Authorization" header.
 *   If valid, attaches the decoded user object to `req.user` and continues
 *   to the next middleware/route handler.
 *
 * Header Format:
 *   Authorization: Bearer <token>
 */

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Authorization denied.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should contain { userID, username, email }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

module.exports = authMiddleware;
