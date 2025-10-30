const { body } = require("express-validator");

const registerValidator = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

module.exports = { registerValidator, loginValidator };
