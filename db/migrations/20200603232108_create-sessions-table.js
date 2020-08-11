
exports.up = function (knex) {
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('sessions', tbl => {
        tbl.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable().primary(); //id
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
    })


};

exports.down = function (knex) {
  knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists('sessions');
};