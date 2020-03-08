exports.up = function( knex ){
  return knex.schema.createTable( "photos", tbl => {
    
    tbl.increments("id").primary()
    
    tbl.increments( "public_id" );
    
    tbl.string('photo_url').notNullable();
    
    tbl.boolean( "assigned" ).notNullable().defaultTo( false );
    
    tbl.string( "created_at" ).defaultTo( knex.raw( "now()" ) );
    
    tbl.string( "updated_at" ).defaultTo( knex.raw( "now()" ) );
  } );
};

exports.down = function( knex ){
  return knex.schema.dropTableIfExists( "photos" );
};
