// const knex = require("../../knexfile");
const db = require('../../db/db-config');
const app = require("../../api/server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe("User Endpoints", () => {
  beforeEach(async () => {
    // return knex.seed.run();
    await db('users').truncate();
  });

  // it("should retrieve the current user", done => {
  //   request
  //     .get("/api/users")
  //     .set({ auth: "username" })
  //     .expect(200)
  //     .then(res => {
  //       const user = res.body;
  //       expect(user).toEqual({
  //         user_id: 1,
  //         username: "user1",
  //         created_at: expect.any(String),
  //         updated_at: expect.any(String)
  //       });
  //       done();
  //     });
  // })

  it("should give the correct code when getting users", async done => {

    const response = await request.get('/api/users')

    expect(response.status).toBe(200)
    done();

  })

  // it("should retrieve all users", done => {
  //   request
  //     .get("/api/users/:id")
  //     .set({ auth: "username" })
  //     .expect(200)
  //     .then(res => {
  //       const users = res.body;
  //       expect(users.length).toEqual(3);
  //       expect(typeof users).toBe("object");
  //       expect(users).toEqual([
  //         {
  //           username: "user1",
  //           created_at: expect.any(String),
  //           updated_at: expect.any(String)
  //         },
  //         {
  //           username: "user2",
  //           created_at: expect.any(String),
  //           updated_at: expect.any(String)
  //         },
  //         {
  //           username: "user3",
  //           created_at: expect.any(String),
  //           updated_at: expect.any(String)
  //         }
  //       ]);
  //       done();
  //     });
  // });

  // it("should edit current user", done => {
  //   request
  //     .put("/api/users")
  //     .set({ auth: "username" })
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

  // it("should delete current user", done => {
  //   request
  //     .delete("/api/users/:id")
  //     .set({ auth: "username" })
  //     .expect(203)
  //     .then(res => {
  //       const body = res.body;
  //       expect(body.message).toEqual("The user has been removed");
  //       done();
  //     });
  // });
});
