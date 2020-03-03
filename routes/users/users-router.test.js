const supertest = require("supertest");
const app = require("../../api/server.js");
const knex = require("../../data/dbConfig.js");
const cleaner = require("knex-cleaner");
const request = supertest(app);

describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("User Endpoints", () => {
  beforeAll(() => {
    cleaner.clean(knex);
  });

  it("should retrieve the current user", done => {
    request
      .get("/api/users/me")
      .set({ auth: "uid1" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        const user = res.body;
        expect(user).toEqual({
          user_id: 1,
          uid: "uid1",
          username: "user 1",
          created_at: expect.any(String),
          updated_at: expect.any(String)
        });
        done();
      });
  });
});
