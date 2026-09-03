const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../routes/UserRoutes");
const User = require("../models/User");

// Initialize test app
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("Auth API Endpoints", () => {
  beforeAll(async () => {
    // Connect to an in-memory or test database
    // For this example, we verify logic mocking
    await mongoose.connect("mongodb://127.0.0.1:27017/ambica_test_auto");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("should register a new user successfully", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual("test@example.com");
  });

  it("should not allow duplicate emails", async () => {
    await User.create({
      name: "Existing",
      email: "duplicate@example.com",
      password: "123",
    });

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "New Name",
        email: "duplicate@example.com",
        password: "abc",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain("already registered");
  });
});
