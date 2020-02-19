module.exports = ( err, req, res, next ) => {
  res.status( 500 );
  res.logger( "Setting website error message." );
  res.render( "error", { message: "Internal server error." } );
  res.logger( "Waiting for next request." );
};