/**
 * Test Setup
 * Purpose:
 *  - Provide shared helpers and handles for integration tests:
 *    * supertest `request`
 *    * `resetDatabase()` to drop/recreate tables
 *    * `getAuthToken()` to register/login and return a Bearer token
 *    * exported Sequelize instance and models if tests need them
 */

require("dotenv").config(); // loads .env for DB + JWT

const request = require("supertest");
const { sequelize } = require("../src/config/db");

// IMPORTANT: these requires register models and associations
const app = require("../server.js");
const User = require("../src/models/User");
const Subject = require("../src/models/Subject");
const Task = require("../src/models/Task");

async function resetDatabase() {
  // force: true will DROP and recreate tables
  await sequelize.sync({ force: true });
}

// helper: register + login to get token
async function getAuthToken() {
  // 1. register
  const registerRes = await request(app)
    .post("/api/register")
    .send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

  // 2. login
  const loginRes = await request(app)
    .post("/api/login")
    .send({
      email: "testuser@example.com",
      password: "password123",
    });

  const token = loginRes.body?.data?.token;
  return token;
}

module.exports = {
  app,
  request,
  sequelize,
  User,
  Subject,
  Task,
  resetDatabase,
  getAuthToken,
};
