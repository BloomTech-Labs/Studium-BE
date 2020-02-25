const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getAll,
  update,
  remove,
  addToShared,
  findSharedUsers
};

function find() {
  return db("decks");
}

function findBy(filter) {
  return db("decks").where(filter);
}

async function add(deck) {
  const [newDeck] = await db("decks")
    .insert(deck)
    .returning("*");

  return newDeck;
}

function findById(deck_id) {
  return db("decks")
    .where({ deck_id })
    .first();
}

function getAll() {
  return db("decks");
}

function update(id, changes) {
  return db("decks")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("decks")
    .where({ id })
    .del();
}

function addToShared(deck_id, user_id) {
  let newRow = { deck_id: deck_id, user_id: user_id };

  db("shared_users")
    .insert(newRow)
    .then(() => {
      return findSharedUsers(deck_id);
    });
}

function findSharedUsers(deck_id) {
  return db("shared_users")
    .where({ deck_id })
    .innerJoin("users", "users.user_id", "shared_users.user_id");
}
