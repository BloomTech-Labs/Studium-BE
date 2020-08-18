const request = require("supertest");

const server = require("./server.js");

// const app = require("../../api/server.js"); // Link to your server file
// const supertest = require("supertest");
// // const request = supertest(app);
// const knex = require("../../db/db-config");
// const cleaner = require("knex-cleaner");

describe("GET /", () => {
  it("if 200 returns ok ", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("The api is up.");
  });
});

