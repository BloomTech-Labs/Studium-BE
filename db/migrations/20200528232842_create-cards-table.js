
exports.up = function (knex) {
    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .then(() => {
            return knex.schema.createTable('cards', tbl => {
                tbl.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable().primary(); // ID
                tbl.uuid('deck_id') // ID FROM DECKS TABLE
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('decks');
                tbl.string('card_front') // FRONT OF CARD 
                    .notNullable();
                tbl.string('card_back') // BACK OF CARD 
                    .notNullable();
                tbl.string('notes'); // OPTIONAL NOTES SECTION
                tbl.bigint('created_at') // CREATED AT TIMESTAMP
                tbl.bigint('updated_at') // UPDATED AT TIMESTAMP 
                tbl.integer('comfort_level') // COMFORT LEVEL FROM 0 TO 1 
                    .notNullable()
                    .defaultTo(0);
                tbl.boolean('is_starred') // IS THE CARD STARRED/SAVED?
                    .defaultTo(false);
                tbl.bigint('next_due') // NEXT DUE TIMESTAMP 
                tbl.string('card_img'); // OPTIONAL CARD IMAGE 
            })
        })


};

exports.down = function (knex) {
    knex.raw('drop extension if exists "uuid-ossp"');
    return knex.schema.dropTableIfExists('cards');
};
