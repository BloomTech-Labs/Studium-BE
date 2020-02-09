
exports.up = function(knex) {
    return knex.schema 
    .createTable('categories', categories => {
        categories.increments();
        categories
        .string('categoryName', 255)
        .unique()
        .notNullable();
    })
  
};

exports.down = function(knex) {
  
};
