const {
  app,
  request,
  resetDatabase,
  getAuthToken,
} = require("./testSetup");

describe("Subjects API", () => {
  let token;
  let createdSubjectID;

  beforeAll(async () => {
    await resetDatabase();
    token = await getAuthToken();
  });

  test("POST /api/subjects should create a subject for the logged in user", async () => {
    const res = await request(app)
      .post("/api/subjects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Math 110",
        colorCode: "#FF0000",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("subjectID");
    expect(res.body.data.name).toBe("Math 110");

    createdSubjectID = res.body.data.subjectID;
  });

  test("GET /api/subjects should return the user's subjects", async () => {
    const res = await request(app)
      .get("/api/subjects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("PUT /api/subjects/:id should update an existing subject", async () => {
    const res = await request(app)
      .put(`/api/subjects/${createdSubjectID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Math 110 - Updated",
        colorCode: "#00FF00",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Math 110 - Updated");
  });

  test("DELETE /api/subjects/:id should delete an existing subject", async () => {
    const res = await request(app)
      .delete(`/api/subjects/${createdSubjectID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.subjectID).toBe(String(createdSubjectID));
  });

  test("DELETE /api/subjects/:id again should return 404", async () => {
    const res = await request(app)
      .delete(`/api/subjects/${createdSubjectID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
