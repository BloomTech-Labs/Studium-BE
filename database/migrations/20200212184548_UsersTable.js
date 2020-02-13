exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("user_id");

    tbl.string("first_name").notNullable();

    tbl.string("last_name").notNullable();

    tbl
      .string("username")
      .notNullable()
      .unique();

    tbl.timestamp("created_at").defaultTo(knex.fn.now());

    tbl.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
