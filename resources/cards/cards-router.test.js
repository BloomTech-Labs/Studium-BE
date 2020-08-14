const supertest = require("supertest");
const app = require("../../api/server");
const request = supertest(app);
// const knex = require("../../db/db-config");
// const cleaner = require("knex-cleaner");
const cardRouter = require("./cards-router");

describe("Card Router Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

// describe("GET SPECIFIC CARD /", () => {
//   it("if 201 returns ok ", async () => {
//     const res = await request(cardRouter).get("/api/users/me/:id");
//     expect(res.status.should).toBe(201);
//     expect(res.body.message).toBe("There was an error retrieving the cards!");
//     expect(201);
//   });
// });
