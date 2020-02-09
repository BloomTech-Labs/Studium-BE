const router = require( "express" ).Router();
const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const secrets = require( "../config/secrets.js" );

const Users = require( "../users/users-model.js" );

router.post( "/login", ( req, res ) => {
  let { uuid } = req.body;
  
  Users.findBy( { uuid } )
    .first()
    .then( user => {
      if( user ){
        const token = genToken( user );
        
        res.status( 200 ).json( {
          message: `Welcome ${ user.username }, you are now logged in!`,
          token: token,
          user: user,
        } );
        
      }else{
        res.status( 404 ).json( { message: "User not found" } );
      }
    } )
    .catch( error => {
      res.status( 500 ).json( error );
    } );
} );

function genToken( user ){
  const payload = {
    userid: user.id, username: user.username,
  };
  const options = { expiresIn: "1h" };
  const token = jwt.sign( payload, secrets.jwtSecret, options );
  
  return token;
}

module.exports = router;