const db = require('../../db/db-config.js')

const find = () => {
   return db('decks')
}

const findDeckById = (id) => {
   return db("decks as d")
      .where({ id })
}

const findCardsByDeckId = (deck_id) => {
   return db('cards').where({ deck_id })
}

function getDeckTags(id) {
   return db("tags as t")
      .where({ id: id })
}

const findBy = (filter) => {
   return db('decks')
      .where(filter)
}

const add = (deck) => {
   return db('decks')
      .insert(deck, 'id')
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
   findCardsByDeckId,
   findBy,
   add,
   update,
   remove
}