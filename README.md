# Homework Task Manager API (CWEB280 Middle Project)

## Team
- Meetkumar Patel
- Karmkumar Patel
- Smit Parmar

## Overview
This is a secure backend API for managing homework tasks, subjects, and user accounts.

Features:
- User registration / login with JWT
- Authenticated profile endpoint
- CRUD for Subjects
- CRUD for Tasks
- Validation on input (express-validator)
- Ownership checks so users can only access their own data
- Jest + Supertest tests to prove every API works

This project is built to meet the CWEB280 "Secured Backend" midterm rubric:
- APIs are secured (JWT required for protected routes)
- Proper JSON and HTTP status codes
- Clear validation and constraints on entity properties
- CRUD for at least 2 entities (Subjects, Tasks) and a 3rd entity (User)
- Unit tests demonstrating functionality

## Tech Stack
- Node.js + Express (HTTP API)
- Sequelize ORM
- MySQL (mysql2 driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- express-validator (request validation)
- jest + supertest (automated tests / Postman-style checks)

## Project Structure
```text
cweb280-homework-manager/
│  server.js
│  package.json
│  .env
│  README.md
│
├─ src/
│  ├─ config/
│  │    db.js
│  ├─ models/
│  │    User.js
│  │    Subject.js
│  │    Task.js
│  ├─ middleware/
│  │    authMiddleware.js
│  │    errorHandler.js
│  ├─ controllers/
│  │    authController.js
│  │    subjectController.js
│  │    taskController.js
│  ├─ routes/
│  │    authRoutes.js
│  │    subjectRoutes.js
│  │    taskRoutes.js
│  ├─ validators/
│  │    authValidators.js
│  │    subjectValidators.js
│  │    taskValidators.js
│  └─ utils/
│       response.js
│
└─ tests/
   ├─ testSetup.js
   ├─ auth.test.js
   ├─ subjects.test.js
   └─ tasks.test.js
