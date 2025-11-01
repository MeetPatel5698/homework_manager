/**
 * Auth Controller:
 *  - Register a new user (hash password, return JWT)
 *  - Login existing user (verify password, return JWT)
 *  - Return user's profile
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { success, fail } = require("../utils/response");
const User = require("../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      userID: user.userID,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

// POST /api/register
async function register(req, res) {
  // validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, "Invalid input.", errors.array());
  }

  const { username, email, password } = req.body;

  try {
    // check if already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
      return fail(res, 400, "Email already registered.");
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      passwordHash: hashed,
    });

    const token = generateToken(newUser);

    return success(res, 201, "User registered.", {
      token,
      user: {
        userID: newUser.userID,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error creating user.");
  }
}

// POST /api/login
async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, "Invalid input.", errors.array());
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return fail(res, 401, "Invalid email or password.");
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return fail(res, 401, "Invalid email or password.");
    }

    const token = generateToken(user);

    return success(res, 200, "Login successful.", {
      token,
      user: {
        userID: user.userID,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error during login.");
  }
}

// GET /api/profile  (requires auth)
async function profile(req, res) {
  try {
    const user = await User.findByPk(req.user.userID, {
      attributes: ["userID", "username", "email", "createdAt", "updatedAt"],
    });

    if (!user) {
      return fail(res, 404, "User not found.");
    }

    return success(res, 200, "Profile loaded.", user);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error loading profile.");
  }
}

module.exports = { register, login, profile };
