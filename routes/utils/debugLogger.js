require( "dotenv" );
const chalk = require( "chalk" );
const env = process.env.LOG_LEVEL;

if( env === "debug" ){
  console.log( chalk.blue( "Debug Logging Set" ) );
}

module.exports = ( req, res, next ) => {
  
  const write = ( chalk, type = undefined ) => {
    if( type ){
      console.log( type + ": " + chalk );
    }else{
      console.log( chalk );
    }
    
  };
  
  const blank = ( number ) => {
    for( let i = 0; i < number; i++ ){
      console.log();
    }
  };
  
  const attachUrl = ( name ) => {
    if( req.originalUrl ){
      name += " " + req.originalUrl;
    }
    return name;
  };
  
  const logIfDebug = ( message, name = undefined ) => {
    if( env === "debug" ){
      write( message, name );
    }
  };
  
  const info = ( name, message ) => {
    
    name = attachUrl( name );
    logIfDebug( chalk.blue( message ), chalk.bold.blue( name ) );
  };
  
  const errorMessage = ( name, message ) => {
    name = attachUrl( name );
    write( chalk.red( message ), chalk.red( name ) );
  };
  
  const error = ( message, error ) => {
    blank( 2 );
    message = attachUrl( message );
    write( chalk.red( message ) );
    write( chalk.red( error ) );
    blank( 2 );
  };
  
  const success = ( name, message ) => {
    name = attachUrl( name );
    logIfDebug( chalk.green( message ), chalk.bold.greenBright( name ) );
  };
  
  const route = ( method ) => {
    if( req.originalUrl.includes( "api/" ) ){
      logIfDebug( chalk.magenta( req.originalUrl ),
        chalk.bold.magenta( method )
      );
    }
  };
  
  res.logger = {
    info, errorMessage, error, success, route
  };
  next();
};