
exports.up = function async(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('users', tbl => {
        tbl.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable().primary(); // ID
        tbl.string("first_name") // FIRST NAME
            .notNullable();
        tbl.string("last_name") // LAST NAME
            .notNullable();
        tbl.string("username", 255) // USERNAME
            .notNullable()
            .unique();
        tbl.string("email") // EMAIL
            .notNullable()
            .unique();
        tbl.string("password", 255) // PASSWORD
            .notNullable();
        tbl.integer("user_points") // POINTS
            .notNullable()
            .defaultTo(0);
        tbl.integer("user_streak") // STREAK 
            .notNullable()
            .defaultTo(0);
        tbl.integer("user_level") // LEVEL
            .notNullable()
            .defaultTo(1);
        tbl.integer("created_at") // CREATED AT TIMESTAMP
        tbl.string("user_img"); // USER AVATAR/IMG 
    })
};

exports.down = function (knex) {
    knex.raw('drop extension if exists "uuid-ossp"');
    return knex.schema.dropTableIfExists('users');
};
