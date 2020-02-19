module.exports = ( err, req, res, next ) => {
  res.logger.error( "Came from: " + err.functionName || "Unknown",
    err.stack || err.userMessage || "Server error"
  );
  next( err );
  
};