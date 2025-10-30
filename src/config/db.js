const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "homework_manager",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql", 
    logging: false,   // cleaner console
  }
);

module.exports = { sequelize };
