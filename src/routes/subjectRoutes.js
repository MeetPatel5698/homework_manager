const express = require("express");
const router = express.Router();

const {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const { createOrUpdateSubjectValidator } = require("../validators/subjectValidators");
const authMiddleware = require("../middleware/authMiddleware");

// all subject routes require auth
router.get("/", authMiddleware, getSubjects);
router.post("/", authMiddleware, createOrUpdateSubjectValidator, createSubject);
router.put("/:id", authMiddleware, createOrUpdateSubjectValidator, updateSubject);
router.delete("/:id", authMiddleware, deleteSubject);

module.exports = router;
