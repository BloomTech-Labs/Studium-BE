
exports.up = function (knex) {
    return knex.schema
        .createTable('tags', tbl => {
            tbl.uuid('id').notNullable().primary(); // TAG ID 
            tbl.string('tag_name') // TAG NAME 
                .notNullable();
            tbl.string('tag_description') // OPTIONAL DESCRIPTION 
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tags');
};
