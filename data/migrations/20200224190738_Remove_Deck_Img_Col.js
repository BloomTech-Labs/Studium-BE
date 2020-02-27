exports.up = function(knex) {
  return knex.schema.table("decks", tbl => {
    tbl.dropColumn("deck-image");
  });
};

exports.down = function(knex) {
  return knex.schema.table("decks", tbl => {
    tbl.binary("deck-image");
  });
};
