const { body } = require("express-validator");

const createOrUpdateSubjectValidator = [
  body("name")
    .optional({ nullable: false })
    .isLength({ min: 2 })
    .withMessage("Subject name must be at least 2 characters."),
  body("colorCode")
    .optional()
    .matches(/^#([0-9A-Fa-f]{6})$/)
    .withMessage("colorCode must be a hex string like #AABBCC"),
];

module.exports = { createOrUpdateSubjectValidator };
