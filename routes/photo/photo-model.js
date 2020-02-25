const db = require( "../../data/dbConfig.js" );

module.exports = {
  add
};

function add( photo ){
  return db.table( "photos" ).insert( photo ).returning( "*" );
}

function getAllUnAssignedImages(){
  return db.table( "photos" )
    .where( "assigned", false )
    .returning( [ "id", "public_id" ] );
}