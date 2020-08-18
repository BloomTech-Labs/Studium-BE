const app = require("../../api/server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../../db/db-config");
const cleaner = require("knex-cleaner");

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