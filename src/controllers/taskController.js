/**
 * Task Controller:
 *  - List current user's tasks (with subject info)
 *  - Create a task (subject ownership enforced)
 *  - Update a task (optional subject reassignment with ownership check)
 *  - Delete a task
 */

const { validationResult } = require("express-validator");
const { success, fail } = require("../utils/response");
const Task = require("../models/Task");
const Subject = require("../models/Subject");

async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll({
      where: { userID: req.user.userID },
      include: [
        {
          model: Subject,
          attributes: ["subjectID", "name", "colorCode"],
        },
      ],
    });

    return success(res, 200, "Tasks loaded.", tasks);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error loading tasks.");
  }
}

async function createTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, "Invalid input.", errors.array());
  }

  const { title, description, dueDate, priority, status, subjectID } = req.body;

  try {
    // verify that subjectID belongs to this user
    const subject = await Subject.findOne({
      where: { subjectID, userID: req.user.userID },
    });
    if (!subject) {
      return fail(res, 400, "You do not own this subjectID.");
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      subjectID,
      userID: req.user.userID,
    });

    return success(res, 201, "Task created.", newTask);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error creating task.");
  }
}

async function updateTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, "Invalid input.", errors.array());
  }

  const { id } = req.params;
  const { title, description, dueDate, priority, status, subjectID } = req.body;

  try {
    const task = await Task.findOne({
      where: { taskID: id, userID: req.user.userID },
    });

    if (!task) {
      return fail(res, 404, "Task not found.");
    }

    // if changing subject, confirm ownership again
    if (subjectID) {
      const subject = await Subject.findOne({
        where: { subjectID, userID: req.user.userID },
      });
      if (!subject) {
        return fail(res, 400, "You do not own this subjectID.");
      }
      task.subjectID = subjectID;
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;

    await task.save();

    return success(res, 200, "Task updated.", task);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error updating task.");
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      where: { taskID: id, userID: req.user.userID },
    });

    if (!task) {
      return fail(res, 404, "Task not found.");
    }

    await task.destroy();
    return success(res, 200, "Task deleted.", { taskID: id });
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error deleting task.");
  }
}


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
