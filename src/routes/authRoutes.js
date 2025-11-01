/**
 * Auth Routes
 * Endpoints:
 *   POST /api/register  -> register a new user
 *   POST /api/login     -> authenticate and return JWT
 *   GET  /api/profile   -> get current user's profile (requires auth)
 */

const express = require("express");
const router = express.Router();

const { register, login, profile } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const authMiddleware = require("../middleware/authMiddleware");

// public
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

// private
router.get("/profile", authMiddleware, profile);

module.exports = router;
