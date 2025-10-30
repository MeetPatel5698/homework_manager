const { body } = require("express-validator");

const createOrUpdateTaskValidator = [
  body("title")
    .optional({ nullable: false })
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters."),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed."),
  body("subjectID")
    .optional()
    .isInt()
    .withMessage("subjectID must be an integer."),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("dueDate must be a valid date."),
];

module.exports = { createOrUpdateTaskValidator };
