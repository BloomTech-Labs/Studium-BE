
exports.up = function (knex) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.uuid('id').notNullable().primary(); //id
    tbl.uuid('deck_id') //deck id
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('decks');
    tbl.uuid('user_id') //user id
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    tbl.integer('total_looked_at') //total looked at
      .notNullable()
      .defaultTo(0);
    tbl.integer('session_start') //session start
      .notNullable();
    tbl.integer('session_end'); //session end
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sessions');
};