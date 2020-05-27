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
   findBy,
   add,
   update,
   remove
}