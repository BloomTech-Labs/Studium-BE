process.env.NODE_ENV = "test";

// // const knex = require("../../knexfile");
// const db = require("../../db/db-config");
const app = require("../api/server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/db-config");
const cleaner = require("knex-cleaner");
const server = require("../api/server");

describe("POST /register", () => {
  test("It should respond with an array of login", async () => {
    const newUser = await request .post("/register").send({
      username: "Undefined",
      password:"bobscool2"
    });
    expect(newUser.body.username).toBe(undefined);
   
    expect(newUser.statusCode).toBe(404);
  });
});

test("POST /register", (err) => {
  supertest(app)
    .post("/register")
    .expect(404)
    .set({ errormessage: "A user can't register." } )
    .end(err);
});