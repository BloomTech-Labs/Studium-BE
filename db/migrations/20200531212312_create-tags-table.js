
exports.up = function (knex) {
    return knex.schema
        .createTable('tags', tbl => {
            tbl.increments(); // TAG ID 
            tbl.string('tag_name') // TAG NAME 
                .notNullable();
            tbl.string('tag_description') // OPTIONAL DESCRIPTION 
        })
        .createTable('decks_tags', tbl => { // THIS TABLE CROSS REFERENCES AND JOINS THE DECKS & TAGS
            tbl.increments();
            tbl.integer('decks_id')
                .references('id')
                .inTable('decks')
                .notNullable()
                .unsigned()
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('tags_id')
                .references('id')
                .inTable('tags')
                .notNullable()
                .unsigned()
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('cards_tags', tbl => { // THIS TABLE CROSS REFERENCES AND JOINS THE CARDS & TAGS
            tbl.increments();
            tbl.integer('cards_id')
                .references('id')
                .inTable('cards')
                .notNullable()
                .unsigned()
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('tags_id')
                .references('id')
                .inTable('tags')
                .notNullable()
                .unsigned()
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('cards_tags')
        .dropTableIfExists('decks_tags')
        .dropTableIfExists('tags');
};
