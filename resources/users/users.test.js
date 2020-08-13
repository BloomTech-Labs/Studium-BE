// // const knex = require("../../knexfile");
// const db = require("../../db/db-config");
const app = require("../../api/server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../../db/db-config");
const cleaner = require("knex-cleaner");

// describe("User Endpoints", () => {
//   beforeEach(async () => {
//     // return knex.seed.run();
//     await db("users").truncate();
//   });

//   it("should give the correct code when getting users", async (done) => {
//     const response = await request.get("/api/users");

//     expect(response.status).toBe(200);
//     done();
//   });
// });

describe("Users router test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("User Endpoints", () => {
  beforeAll(() => {
    return knex.seed.run();
  });

  afterAll(() => {
    cleaner.clean(knex);
  });
});
