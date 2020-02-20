exports.up = function(knex) {
  return knex.schema.createTable("shared_users", tbl => {
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("users.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl
      .integer("deck_id")
      .notNullable()
      .unsigned()
      .references("decks.deck_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.primary(["user_id", "deck_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shared_users");
};
