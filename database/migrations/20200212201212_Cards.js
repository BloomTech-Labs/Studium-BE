exports.up = function(knex) {
  return knex.schema.createTable("cards", tbl => {
    tbl.increments("card_id");

    tbl
      .integer("deck_id")
      .notNullable()
      .unsigned()
      .references("decks.deck_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.string("question").notNullable();

    tbl.string("answer").notNullable();

    tbl.text("tags");

    tbl.string("background");

    tbl.string("text");

    tbl.blob("image_front");

    tbl.blob("image_back");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cards");
};
