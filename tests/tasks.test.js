/**
 * Tasks API Integration Tests:
 * Covers:
 *  - POST   /api/tasks       -> create a task for an owned subject
 *  - GET    /api/tasks       -> list tasks (with compact subject info)
 *  - PUT    /api/tasks/:id   -> update task fields (status/priority)
 *  - DELETE /api/tasks/:id   -> delete task
 */

const {
  app,
  request,
  resetDatabase,
  getAuthToken,
} = require("./testSetup");

describe("Tasks API", () => {
  let token;
  let subjectID;
  let taskID;

  beforeAll(async () => {
    await resetDatabase();
    token = await getAuthToken();

    // create a subject to attach tasks to
    const subjectRes = await request(app)
      .post("/api/subjects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "CWEB 280",
        colorCode: "#123456",
      });

    subjectID = subjectRes.body.data.subjectID;
  });

  test("POST /api/tasks should create a new task for that subject", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Finish midterm backend",
        description: "Complete CRUD and tests",
        dueDate: "2025-10-30",
        priority: "high",
        status: "pending",
        subjectID: subjectID,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("taskID");
    expect(res.body.data.title).toBe("Finish midterm backend");

    taskID = res.body.data.taskID;
  });

  test("GET /api/tasks should list tasks for logged in user", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);

    // check subject info was included
    const firstTask = res.body.data[0];
    expect(firstTask).toHaveProperty("Subject");
    expect(firstTask.Subject).toHaveProperty("name");
  });

  test("PUT /api/tasks/:id should update task status and priority", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "in-progress",
        priority: "medium",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("in-progress");
    expect(res.body.data.priority).toBe("medium");
  });

  test("DELETE /api/tasks/:id should delete the task", async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.taskID).toBe(String(taskID));
  });

  test("GET /api/tasks after delete should still work", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
