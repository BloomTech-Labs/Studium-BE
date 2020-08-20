const app = require("../../api/server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../../db/db-config");
const cleaner = require("knex-cleaner");

// updates exisitng card tests
it("should update cards router", done => {
  request
    .put("/:id")
    .set({ errorMessage: "No such deck with that ID exists." })
    .expect(404)
    .then(req => {
      const id = req.params;
      done();
    });
});

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

it("Should get dekcs", done => {
  request
    .put("/")
    .set({ errorMessage: "Dekcs do not exist." })
    .expect(404)
    .then(req => {
      const id = req.params;
      done();
    });
});