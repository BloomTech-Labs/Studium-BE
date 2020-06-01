
exports.up = function (knex) {
    return knex.schema.createTable('decks', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.string('deck_name')
            .notNullable();
        tbl.string('category')
        tbl.string('description')
        tbl.boolean('public')
            .defaultTo(false)
        tbl.string('deck_img')
        tbl.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        tbl.timestamp('updated_at')
            .defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('decks');
};
