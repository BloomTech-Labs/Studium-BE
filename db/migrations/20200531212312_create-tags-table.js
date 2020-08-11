
exports.up = function (knex) {
    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .then(() => {
            return knex.schema
                .createTable('tags', tbl => {
                    tbl.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable().primary(); // TAG ID 
                    tbl.string('tag_name') // TAG NAME 
                        .notNullable();
                    tbl.string('tag_description') // OPTIONAL DESCRIPTION 
                })
        })


};

exports.down = function (knex) {
    knex.raw('drop extension if exists "uuid-ossp"');
    return knex.schema
        .dropTableIfExists('tags');
};
