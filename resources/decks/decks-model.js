const db = require('../../db/db-config.js')

const find = () => {
   return db('decks')
}

const findDeckById = (id) => {
   return db("decks as d")
      .where({ id })
      .first()
}

function getDeckCards(id) {
   return db("cards as c")
      .join("decks as d", "d.id", "c.deck_id")
      .select("d.deck_name", "d.category", "d.description", "d.public", "c.card_front")
      .where("cards.id", id)
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