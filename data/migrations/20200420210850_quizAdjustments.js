exports.up = function (knex) {
  return knex.schema.alterTable("cards", (tbl) => {
    tbl.integer("quiz_results").defaultTo(0);
    tbl.string("last_viewed").defaultTo("0");
  });
};

exports.down = function (knex) {
  return knex.schema.table("cards", (tbl) => {
    tbl.dropColumn("quiz_results");
    tbl.dropColumn("last_viewed");
  });
};
