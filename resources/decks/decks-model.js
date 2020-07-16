const db = require('../../db/db-config.js')

const find = () => {
   return db('decks')
}

const findDeckById = (id) => {
   return db("decks as d")
      .where({ id })
}

function getDeckCards(id) {
   return db("decks as d")
      .join("cards as c", "d.id", "c.id")
      .select("d.deck_name", "d.category", "d.description", "d.public", "c.card_front")
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
   getDeckCards,
   findBy,
   add,
   update,
   remove
}