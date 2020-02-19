module.exports = ( err, req, res, next ) => {
  res.logger.error( "Came from: " + err.functionName || "Unknown",
    err.stack
  );
  next( err );
  
};