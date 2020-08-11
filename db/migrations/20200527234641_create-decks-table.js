
exports.up = function async(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('decks', tbl => {
        tbl.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable().primary(); // ID
        tbl.uuid('user_id') // USER ID FROM USERS TABLE 
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.string('deck_name') // DECK NAME
            .notNullable();
        tbl.string('category') // OPTIONAL CATEGORY 
        tbl.string('description') // OPTIONAL DESCRIPTION
        tbl.boolean('public') // PUBLIC OR NOT BOOLEAN 
            .defaultTo(false)
        tbl.string('deck_img') // OPTIONAL DECK IMAGE 
        tbl.integer('created_at') // CREATED AT TIMESTAMP 
        tbl.integer('updated_at') // UPDATED AT TIMESTAMP 
    })
};

exports.down = function (knex) {
    knex.raw('drop extension if exists "uuid-ossp"');
    return knex.schema.dropTableIfExists('decks');
};
