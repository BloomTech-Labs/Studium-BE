let request = require("supertest");
let server = require('./api/server');

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(server)
      .get("/");

    expect(res.statusCode).toBe(200);
  });
});

