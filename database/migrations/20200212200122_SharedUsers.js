exports.up = function(knex) {
  return knex.schema.createTable("shared_users", tbl => {
    tbl.increments("shared_user_id");

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
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shared_users");
};
