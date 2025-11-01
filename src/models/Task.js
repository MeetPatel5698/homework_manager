/**
 * Task Model:
 * Represents an assignment/task owned by a user and linked to a subject.
 * Stores title, optional description, due date, priority, and status.
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Subject = require("./Subject");

const Task = sequelize.define(
  "Task",
  {
    taskID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Task title is required.",
        },
        len: {
          args: [2, 150],
          msg: "Task title must be between 2 and 150 characters.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: "dueDate must be a valid date.",
        },
      },
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "medium",
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },

    // We'll let Sequelize handle createdAt/updatedAt for us,
    // but if your instructor wants them explicitly in the model:
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    subjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Subjects",
        key: "subjectID",
      },
      onDelete: "CASCADE",
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userID",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "Tasks",
    timestamps: true, // keeps createdAt/updatedAt in sync automatically
  }
);

// Associations:
User.hasMany(Task, { foreignKey: "userID" });
Task.belongsTo(User, { foreignKey: "userID" });

Subject.hasMany(Task, { foreignKey: "subjectID" });
Task.belongsTo(Subject, { foreignKey: "subjectID" });

module.exports = Task;
