const db = require('../../db/db-config.js')

const find = () => {
   return db('decks')
}

const findById = (id) => {
   return db('decks')
      .where({ id })
      .first()
}

const findBy = (filter) => {
   return db('decks')
      .where(filter)
}

const add = (user) => {
   return db('decks')
      .insert(user, 'id')
}

const update = (changes, id) => {
   return db('decks')
      .where({ id })
      .update(changes)
}

const remove = (id) => {
   return db('decks')
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