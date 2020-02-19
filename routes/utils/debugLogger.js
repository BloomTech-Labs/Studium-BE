const chalk = require( "chalk" );
const env = process.env.LOG_LEVEL;

if( env === "debug" ){
  console.log( chalk.blue( "Debug Logging Set" ) );
}

module.exports = ( req, res, next ) => {
  
  const write = ( chalk, type = undefined ) => {
    
    if( env === "debug" ){
      if( type ){
        console.log( type + ": " + chalk );
      }else{
        console.log( chalk );
      }
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
  
  res.logger = {
    info: ( name, message ) => {
      name = attachUrl( name );
      write( chalk.blue( message ), chalk.bold.blue( name ) );
    }, errorMessage: ( name, message ) => {
      name = attachUrl( name );
      write( chalk.red( message ), chalk.red( name ) );
    }, error: ( message, error ) => {
      blank( 2 );
      
      write( chalk.red( message ) );
      write( chalk.red( error ) );
      blank( 2 );
    }, success: ( name, message ) => {
      name = attachUrl( name );
      write( chalk.green( message ), chalk.bold.greenBright( name ) );
    }, route: ( method ) => {
      write( chalk.magenta( req.originalUrl ), chalk.bold.magenta( method ) );
    },
    
  };
  next();
};