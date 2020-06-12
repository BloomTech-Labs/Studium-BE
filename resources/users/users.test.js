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

  it("should give the correct code when getting users", async done => {

    const response = await request.get('/api/users')

    expect(response.status).toBe(200)
    done();

  })
});
