const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Subject = sequelize.define(
  "Subject",
  {
    subjectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Subject name is required.",
        },
        len: {
          args: [2, 100],
          msg: "Subject name must be between 2 and 100 characters.",
        },
      },
    },
    colorCode: {
      // like "#FF0000"
      type: DataTypes.STRING(7),
      allowNull: true,
      validate: {
        is: {
          args: /^#([0-9A-Fa-f]{6})$/,
          msg: "colorCode must be a valid hex color like #AABBCC",
        },
      },
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
    tableName: "Subjects",
    timestamps: true, // createdAt, updatedAt
  }
);

// set up association at the model level:
User.hasMany(Subject, { foreignKey: "userID" });
Subject.belongsTo(User, { foreignKey: "userID" });

module.exports = Subject;
