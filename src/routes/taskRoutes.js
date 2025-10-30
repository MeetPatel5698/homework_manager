const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { createOrUpdateTaskValidator } = require("../validators/taskValidators");
const authMiddleware = require("../middleware/authMiddleware");

// all task routes require auth
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createOrUpdateTaskValidator, createTask);
router.put("/:id", authMiddleware, createOrUpdateTaskValidator, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
