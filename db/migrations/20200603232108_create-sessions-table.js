
exports.up = function(knex) {
    return knex.schema.createTable('sessions', tbl => {
        tbl.increments(); //id
        tbl.integer('deck_id') //deck id
          .notNullable();
        tbl.integer('user_id') //user id
          .notNullable();
        tbl.integer('total_looked_at') //total looked at
          .notNullable()
          .defaultTo(0);
        tbl.timestamp('session_start') //session start
          .notNullable();
        tbl.timestamp('session_end') //session end
          .notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sessions');
  };