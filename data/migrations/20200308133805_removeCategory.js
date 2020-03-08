exports.up = function( knex ){
    return knex.schema.table( "decks", tbl => {
        tbl.dropColumn( "category" );
    } );
};

exports.down = function( knex ){

};
