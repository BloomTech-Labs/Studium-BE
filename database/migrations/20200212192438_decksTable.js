exports.up = function(knex) {
  return knex.schema.createTable("decks", tbl => {
    tbl.increments("deck_id");

    tbl
      .integer("user_id")
      .notNullable()
      .references("users.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.timestamps([useTimestamps], [defaultToNow]);

    tbl.string("category").notNullable();

    tbl.string("deck_name").notNullable();

    tbl.text("tags");

    tbl.boolean("public");

    tbl.blob("deck-image");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("decks");
};
