const db = require('../../db/db-config')
const Users = require('./users-model.js')

describe('users-model', () => {
   beforeEach(async () => {
      await db('users').truncate();
    });

   describe('add()', () => {
      it('adds the provided users to the db', async () => {
         await Users.add({ 
           first_name: "Super",
           last_name: "Test",
           username: "supertest",
           email: "super@gtest.com",
           password: "iamatest"
         })
         await Users.add({ 
            first_name: "Super2",
            last_name: "Test2",
            username: "supertest2",
            email: "super2@gtest2.com",
            password: "iamatest2"
         })
         const users = await db('users')
         expect(users).toHaveLength(2)
       })
   })
})