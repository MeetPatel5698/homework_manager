/**
 * Auth API Integration Tests
 * Covers:
 *  - POST /api/register   -> creates a user and returns JWT + public user
 *  - POST /api/login      -> authenticates and returns JWT
 *  - GET  /api/profile    -> requires Bearer token; returns public profile
 */

const {
  app,
  request,
  resetDatabase,
  getAuthToken,
} = require("./testSetup");

describe("Auth API", () => {
  beforeAll(async () => {
    await resetDatabase();
  });

  test("POST /api/register should create a new user and return token", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        username: "karm",
        email: "karm@example.com",
        password: "secret123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.user).toHaveProperty("userID");
    expect(res.body.data.user.email).toBe("karm@example.com");
  });

  test("POST /api/login should return token for valid credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "karm@example.com",
        password: "secret123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("token");
  });

  test("GET /api/profile should reject without token", async () => {
    const res = await request(app).get("/api/profile");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("GET /api/profile should return profile with valid token", async () => {
    const token = await getAuthToken();

    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.message).toBe("Profile loaded.");
  });
});
