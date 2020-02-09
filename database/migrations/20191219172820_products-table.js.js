
exports.up = function(knex) {
    return knex.schema
    .createTable('products', products=> {
        products.increments();
        products
          .string('productName', 255)
          .notNullable()
          .unique();
        products
          .integer('category_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('categories')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        products
          .string('sub_category',255)
        products
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        products
          .varchar('price')
          .notNullable();
        products
          .string('country',255)
          .notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('products')
};
