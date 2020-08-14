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

// test for successful get requests
test("GET /", err => {
  supertest(app)
    .get("/")
    .expect(200, JSON.stringify({ message: "The api is up." }))
    .end(err)
})

// test("POST /", err => {
//   supertest(app)
//     .post("/")
//     .expect(201, JSON.stringify({ message: "Created" }))
//     .end(err)
// })

// supertest(app)
//   .post("/userData")
//   // .field("name", "John Doe")
//   // .field("age", "25")
//   .expect(response => {
//     expect(response.status).toBe(201)
//     expect(response.body).toEqual({ name: "John Doe", age: "24" })
//     done()
//   })

// describe("POST /register", () => {
//   it("201 means good", () => {
//     return request(server)
//       .post("/register")
//       .send({ username: "sleepy123", password: "sleepy123" })
//       .then((res) => {
//         expect(res.status).toBe(201);
//       });
//   });

describe("User Endpoints", () => {
  beforeAll(() => {
    return knex.seed.run();
  });

  afterAll(() => {
    cleaner.clean(knex);
  });
});
