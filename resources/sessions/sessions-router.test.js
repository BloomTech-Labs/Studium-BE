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
test("GET /", (err) => {
  supertest(app)
    .get("/")
    .expect(200, JSON.stringify({ message: "The api is up." }))
    .end(err);
});

// put
// describe("PATCH /:id", () => {
//   test("It should respond with an array of sessions", async () => {
//     const newSession = await request(app).post("/").send({
//       message: "Failed to create a new session",
//     });
//     const updatedSession = await request(app).patch(`/students/${newSession.body.id}`).send({ name: "updated" });
//     expect(updatedSession.body.name).toBe("updated");
//     expect(updatedSession.body).toHaveProperty("changes");
//     expect(updatedSession.body).toHaveProperty("id");
//     expect(updatedSession.statusCode).toBe(200);

//     // make sure we have 3 sessions
//     const response = await request(app).get("/");
//     expect(response.body.length).toBe(3);
//   });
// });

// deletes exisitng card tests
it("should delete cards router", (done) => {
  request
    .delete("/:id")
    .set({ errorMessage: "No such card with that ID exists." })
    .expect(404)
    .then((req) => {
      const id = req.params;
      done();
    });
});
