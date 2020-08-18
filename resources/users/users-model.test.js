const db = require("../../db/db-config");
const Users = require("./users-model.js");
const server = require("../../api/server");

// const app = require("../../api/server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(server);
const knex = require("../../db/db-config");
const cleaner = require("knex-cleaner");

// beforeEach(() => {
//   return db.migrate.rollback("users").then(() => db.migrate.latest("users"));
// });

describe("Users router test", () => {
   it("should test that true === true", () => {
     expect(true).toBe(true);
   });
 });

// describe("users-model", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//   });

//   describe("add()", () => {
//     it("adds the provided users to the db", async () => {
//       await Users.add({
//         first_name: "Super",
//         last_name: "Test",
//         username: "supertest",
//         email: "super@gtest.com",
//         password: "iamatest",
//       });
//       await Users.add({
//         first_name: "Super2",
//         last_name: "Test2",
//         username: "supertest2",
//         email: "super2@gtest2.com",
//         password: "iamatest2",
//       });
//       const users = await db("users");
//       expect(users).toHaveLength(2);
//     });
//   });
// });
