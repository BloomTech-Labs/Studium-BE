const UserDb = require( "../users/users-model.js" );

module.exports = ( req, res, next ) => {
  console.log( "inside of uid middle wear" );
  const { uid } = req.body;
  
  UserDb.findBy( { uid } )
    .then( user => {
      req.user = user[ 0 ];
      next();
    } )
    .catch( err => {
      console.log( "Error in uid middle wear." );
      res.status( 404 )
        .json( { message: "uid not found", error: err.message } );
    } );
};
