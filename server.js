/**
 * Purpose:
 *   Bootstraps the Express server, mounts routes, connects to
 *   the database via Sequelize, and registers centralized error
 *   handling.
 */

require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");


require("./src/models/User");
require("./src/models/Subject");
require("./src/models/Task");

// Import route modules
const authRoutes = require("./src/routes/authRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
app.use(express.json());

// mount routes
app.use("/api", authRoutes);           // /api/register, /api/login, /api/profile
app.use("/api/subjects", subjectRoutes); // Subject CRUD: /api/subjects/
app.use("/api/tasks", taskRoutes); // Task CRUD: /api/tasks/

// central error handler (must be last)
app.use(errorHandler);

// connect DB then listen
sequelize.sync() // {alter:true} for dev if needed
  .then(() => {
    console.log("DB connected and synced");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running");
    });
  })
  .catch(err => {
    console.error("DB connection failed", err);
  });

module.exports = app; // for Jest tests
