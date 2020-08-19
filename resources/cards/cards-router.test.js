const uuid = require('uuid');

const supertest = require("supertest");
const server = require("../../api/server");
const request = supertest(server);
// const knex = require("../../db/db-config");
// const cleaner = require("knex-cleaner");
const cardRouter = require("./cards-router");

describe("Card Router Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe('testing uuid', () => {
it('should mock a random uuid', () => {
  jest.mock("uuid", () => jest.fn().mockReturnValue("id"));
})
})

// describe("GET SPECIFIC CARD /", () => {
//   it("returns specific cards ", async () => {
//     const req = await request(cardRouter).get("/api/cards/:id");
//     expect(req.status.should).toBe(201);
//     expect(req.body.message).toBe("There was an error retrieving the cards!");
//     expect(500);
//   });
// });

// it("delete should return 204 status", async () => {
//   const deleteRes = await request(server).delete("/1");

//   expect(deleteRes.status).toEqual(204);
// });
// it("delete should return an object", async () => {
//   const deleteRes = await request(server).delete("/3");

//   expect(typeof deleteRes.body).toBe("object");
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
