/**
 * Task Routes:
 * Endpoints (all require authentication):
 *   GET    /api/tasks        -> list all tasks for the logged-in user
 *   POST   /api/tasks        -> create a new task
 *   PUT    /api/tasks/:id    -> update an existing task
 *   DELETE /api/tasks/:id    -> delete a task
 */

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
