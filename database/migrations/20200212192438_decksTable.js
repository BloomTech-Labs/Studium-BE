exports.up = function(knex) {
  return knex.schema.createTable("decks", tbl => {
    tbl.increments("deck_id");

    tbl
      .integer("user_id")
      .notNullable()
      .references("users.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());

    tbl.timestamp("updated_at").defaultTo(knex.fn.now());

    tbl.string("category").notNullable();

    tbl.string("deck_name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("decks");
};
