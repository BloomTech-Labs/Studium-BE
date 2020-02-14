exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("user_id");

    tbl.string("first_name").notNullable();

    tbl.string("last_name").notNullable();

    tbl
      .string("username")
      .notNullable()
      .unique();

    tbl.integer("created_at").defaultTo(knex.fn.now());

    tbl.integer("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
