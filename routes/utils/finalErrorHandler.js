module.exports = ( err, req, res, next ) => {
  res.logger( "Setting website error message." );
  res.logger( "Waiting for next request." );
  res.status( err.message || 500 ).json( {
    status: err.status || 500, message: err.userMessage || "Server error"
  } );
};