const supertest = require("supertest");
const app = require("../../api/server.js");
const knex = require("../../data/dbConfig.js");
const cleaner = require("knex-cleaner");
const request = supertest(app);

describe("Decks Endpoints", () => {
  beforeAll(() => {
    return knex.seed.run();
  });

  //   it("Should add a new deck", done => {
  //     request
  //       .post("/api/decks")
  //       .set({ auth: "uid1" })
  //       .expect(201)
  //       .then(res => {});
  //   });

  afterAll(() => {
    cleaner.clean(knex);
  });
});
