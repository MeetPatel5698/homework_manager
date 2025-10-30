const { validationResult } = require("express-validator");
const { success, fail } = require("../utils/response");
const Subject = require("../models/Subject");

async function getSubjects(req, res) {
  try {
    const subjects = await Subject.findAll({
      where: { userID: req.user.userID },
    });
    return success(res, 200, "Subjects loaded.", subjects);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error loading subjects.");
  }
}

async function createSubject(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, "Invalid input.", errors.array());
  }

  const { name, colorCode } = req.body;

  try {
    const newSubject = await Subject.create({
      name,
      colorCode,
      userID: req.user.userID,
    });

    return success(res, 201, "Subject created.", newSubject);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error creating subject.");
  }
}

async function updateSubject(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, "Invalid input.", errors.array());
  }

  const { id } = req.params;
  const { name, colorCode } = req.body;

  try {
    const subject = await Subject.findOne({
      where: { subjectID: id, userID: req.user.userID },
    });

    if (!subject) {
      return fail(res, 404, "Subject not found.");
    }

    subject.name = name ?? subject.name;
    subject.colorCode = colorCode ?? subject.colorCode;
    await subject.save();

    return success(res, 200, "Subject updated.", subject);
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error updating subject.");
  }
}

async function deleteSubject(req, res) {
  const { id } = req.params;

  try {
    const subject = await Subject.findOne({
      where: { subjectID: id, userID: req.user.userID },
    });

    if (!subject) {
      return fail(res, 404, "Subject not found.");
    }

    await subject.destroy();
    return success(res, 200, "Subject deleted.", { subjectID: id });
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error deleting subject.");
  }
}

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
