const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getAll,
  update,
  remove
};

function find() {
  return db("cards");
}

function findBy(filter) {
  return db("cards").where(filter);
}

async function add(card) {
  console.log("card from add", card);
  const [newCard] = await db("cards")
    .insert(card)
    .returning("*");

  return newCard;
}

function findById(card_id) {
  return db("cards")
    .where({ card_id })
    .first();
}

function getAll() {
  return db("cards");
}

function update(card_id, changes) {
  return db("cards")
    .where({ card_id })
    .update(changes, "*");
}

function remove(card_id) {
  return db("cards")
    .where({ card_id })
    .del();
}
