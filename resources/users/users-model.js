const db = require('../../db/db-config.js')

const find = () => {
   return db('users')
}

const findById = (id) => {
   return db('users')
      .where({ id })
      .first()
}

const findBy = (filter) => {
   return db('users')
      .where(filter)
}

const findDeckByUserId = (user_id) => {
   return db('decks').where({ user_id })
}

const add = (user) => {
   return db('users')
      .insert(user, 'id')
}

const update = (changes, id) => {
   return db('users')
      .where({ id })
      .update(changes)
}

const remove = (id) => {
   return db('users')
      .where({ id })
      .del()
}

module.exports = {
   find,
   findById,
   findDeckByUserId,
   findBy,
   add,
   update,
   remove
}