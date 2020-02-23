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
  const [id] = await db("cards").insert(card);

  return findById(id);
}

function findById(id) {
  return db("cards")
    .where({ id })
    .first();
}

function getAll() {
  return db("cards");
}

function update(id, changes) {
  return db("cards")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("cards")
    .where({ id })
    .del();
}
