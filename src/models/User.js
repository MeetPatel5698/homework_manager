const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 50],
          msg: "Username must be between 3 and 50 characters.",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be a valid email address.",
        },
      },
    },
    passwordHash: {
      // store the hashed password, never the raw password
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 200],
          msg: "Password hash looks invalid.",
        },
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = User;
