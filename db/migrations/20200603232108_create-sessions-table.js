
exports.up = function (knex) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.uuid('id').notNullable().primary(); //id
    tbl.integer('deck_id') //deck id
      .notNullable();
    tbl.integer('user_id') //user id
      .notNullable();
    tbl.integer('total_looked_at') //total looked at
      .notNullable()
      .defaultTo(0);
    tbl.integer('session_start') //session start
      .notNullable();
    tbl.timestamp('session_end') //session end
      .integer();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sessions');
};