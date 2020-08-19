process.env.NODE_ENV = "test";

// // const knex = require("../../knexfile");
// const db = require("../../db/db-config");
const app = require("../api/server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/db-config");
const cleaner = require("knex-cleaner");
const server = require("../api/server");

describe("POST /login", () => {
  test("It should respond with an array of login", async () => {
    const newUser = await request(app).post("/login").send({
      name: "New User",
    });
    expect(newUser.body.username).toBe("New User");
    expect(newUser.body).toHaveProperty("username");
    expect(newUser.body).toHaveProperty("password");
    expect(newUser.statusCode).toBe(200);

    // make sure we have 3 login
    const response = await request(app).get("/login");
    expect(response.body.length).toBe(3);
  });
});
