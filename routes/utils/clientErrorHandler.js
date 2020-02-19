module.exports = ( err, req, res, next ) => {
  if( req.xhr ){
    res.logger.info( "Client Error Handler", "Sending out res to user." );
    res.status( err.status || 500 )
      .send( {
        status: "Internal Server Error",
        message: err.message || err.userMessage || "Unknown error message"
      } );
    res.logger.info( "Client Error Handler", "Waiting for next request." );
  }else{
    next( err );
  }
};