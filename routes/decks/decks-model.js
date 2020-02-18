const db = require( "../../data/dbConfig.js" );

module.exports = {
  add, find, findBy, findById, getAll, update, remove
};

function find(){
  return db( "decks" );
}

function findBy( filter ){
  return db( "decks" ).where( filter );
}

async function add( deck ){
  const [ id ] = await db( "decks" ).insert( deck );
  
  return findById( id );
}

function findById( id ){
  return db( "decks" )
    .where( { id } )
    .first();
}

function getAll(){
  return db( "decks" );
}

function update( id, changes ){
  return db( "decks" )
    .where( { id } )
    .update( changes, "*" );
}

function remove( id ){
  return db( "decks" )
    .where( { id } )
    .del();
}
