module.exports = ( req, res, next ) => {
  res.logger.route( req.method, req.originalUrl );
  next();
};