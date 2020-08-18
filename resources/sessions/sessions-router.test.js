const app = require("../../api/server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../../db/db-config");
const cleaner = require("knex-cleaner");

describe("Users router test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

// test for successful get requests
test("GET /", err => {
  supertest(app)
    .get("/")
    .expect(200, JSON.stringify({ message: "The api is up." }))
    .end(err)
})

// deletes exisitng card tests
it("should delete cards router", done => {
  request
    .delete("/:id")
    .set({ errorMessage: "No such card with that ID exists." })
    .expect(404)
    .then(req => {
      const id = req.params;
      done();
    });
});