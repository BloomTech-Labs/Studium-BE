const db = require('../../db/db-config.js')

const find = () => {
   return db('decks')
}

const findDeckById = (id) => {
   return db("deck as d")
      .where({ id })
      .first()
}

function getDeckTags(id) {
   return db("tags as t")
      .where({ id: id })
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
   findDeckById,
   getDeckTags,
   findBy,
   add,
   update,
   remove
}