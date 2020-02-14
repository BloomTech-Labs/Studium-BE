exports.up = function(knex) {
  return knex.schema.createTable("quiz_results", tbl => {
    tbl.increments("quiz_result_id");

    tbl
      .integer("card_id")
      .notNullable()
      .unsigned()
      .references("cards.card_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("users.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.integer("comfort_level").notNullable();

    tbl.integer("ts").Number(defaultTo(knex.raw("now()")));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("quiz_results");
};
