const UserDb = require( "../users/users-model.js" );
const DEBUG_NAME = "UID Middle Wear";
const createError = require( "./createError" );

module.exports = ( req, res, next ) => {
  const { uid } = req.body;
  
  UserDb.findBy( { uid } )
    .then( user => {
      if( user.length > 0 ){
        res.logger.success( DEBUG_NAME, "Found user for uid: " + uid );
        req.user = user[ 0 ];
        next();
      }else{
        res.logger.errorMessage( DEBUG_NAME, "Did not find user: " + uid );
        res.status( 401 )
          .json( { message: "Could not find user for that uid." } );
      }
      
    } )
    .catch( err => {
      console.log( "Error in uid middle wear." );
      res.status( 404 )
        .json( { message: "uid not found", error: err.message } );
    } );
};
