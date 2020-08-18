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
//   it("returns specific cards ", async () => {
//     const res = await request(cardRouter).get("/api/cards/:id");
//     expect(res.status.should).toBe(201);
//     expect(res.body.message).toBe("There was an error retrieving the cards!");
//     expect(500);
//   });
// });

// UPDATE EXISTING CARD (PUT) tests
// it("should edit current user", done => {
//   request
//     .put("/api/users")
//     .set({ auth: "uid1" })
//     .send({ username: "newUsername" })
//     .expect(201)
//     .then(res => {
//       const user = res.body[0];
//       expect(typeof user).toBe("object");
//       expect(user).toEqual({
//         user_id: 1,
//         username: "newUsername",
//         created_at: expect.any(String),
//         updated_at: expect.any(String)
//       });
//       done();
//     });
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
