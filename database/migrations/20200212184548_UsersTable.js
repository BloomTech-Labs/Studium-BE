exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("user_id");

    tbl.string("first_name").notNullable();

    tbl.string("last_name").notNullable();

    tbl
      .string("uid")
      .notNullable()
      .unique();

    tbl
      .string("username")
      .notNullable()
      .unique();

    tbl.string("created_at").defaultTo(knex.raw("now()"));

    tbl.string("updated_at").defaultTo(knex.raw("now()"));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
