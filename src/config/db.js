/**
 * Purpose:
 *   Establish a connection to the MySQL database using Sequelize ORM.
 *   This file exports a configured Sequelize instance shared across
 *   models and controllers.
 */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "homework_manager", //database name
  process.env.DB_USER || "root", //username
  process.env.DB_PASS || "", // password
  {
    host: process.env.DB_HOST,
    dialect: "mysql", 
    logging: false,   // cleaner console
  }
);

module.exports = { sequelize };
