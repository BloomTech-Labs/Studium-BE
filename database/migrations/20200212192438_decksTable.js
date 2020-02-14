exports.up = function(knex) {
  return knex.schema.createTable("decks", tbl => {
    tbl.increments("deck_id");

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("users.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.integer("created_at").Number(defaultTo(knex.fn.now()));

    tbl.integer("updated_at").Number(defaultTo(knex.fn.now()));

    tbl.string("category").notNullable();

    tbl.string("deck_name").notNullable();

    tbl.text("tags");

    tbl.boolean("public");

    tbl.bytea("deck-image");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("decks");
};
