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
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [newUser] = await db("users")
    .insert(user)
    .returning("*");

  return newUser;
}

function findById(user_id) {
  return db("users")
    .where({ user_id })
    .first();
}

function getAll() {
  return db("users");
}

function update(user_id, changes) {
  return db("users")
    .where({ user_id })
    .update(changes, "*");
}

function remove(user_id) {
  return db("users")
    .where({ user_id })
    .del();
}
