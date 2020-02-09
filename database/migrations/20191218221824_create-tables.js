exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
      users.increments();
      users.string('username', 255).notNullable();
      users.string('password', 255).notNullable();
      users.string('firstname').notNulllable();
      users.string('lastname').notNullable();
      users.varchar('email').unique();
      users.string('role',255)
    }) 

  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users');
  };
  