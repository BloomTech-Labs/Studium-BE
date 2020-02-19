const router = require( "express" ).Router();
const DEBUG_NAME = "USERS";

const Users = require( "./users-model.js" );
const restricted = require( "../auth/authenticate-middleware.js" );
const uidMiddleWear = require( "../utils/findUIDMiddleware.js" );

/**
 * @api {post} /api/users/me    Gets current user
 * @apiVersion 1.0.0
 * @apiName GetUserByUID
 * @apiGroup Users
 *
 * @apiParam {String} uid  Users google uid.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',
        timeout: 1000,
 * });
 * request.post('/api/users/me', {
 *   uid: "123456080978"
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
    "user_id": 1,
    "first_name": "Jeremiah",
    "last_name": "Tenbrink",
    "uid": "12345",
    "username": "Jeremiah Tenbrink",
    "created_at": "2020-02-18 14:10:08.566262-07",
    "updated_at": "2020-02-18 14:10:08.566262-07"
}
 *
 */
router.post( "/me", uidMiddleWear, ( req, res ) => {
  const user = req.user;
  if( user ){
    res.logger.success( DEBUG_NAME, "Returning user" );
    return res.status( 200 ).json( user );
  }
  
} );

/**
 * @api {post} /api/users     Create a new user.
 * @apiVersion 1.0.0
 * @apiName PostNewUsers
 * @apiGroup Users
 *
 * @apiParam {String} first_name  Users first name.
 * @apiParam {String} last_name   Users last name.
 * @apiParam {String} uid         Users google UID.
 * @apiParam {String} username    Users username.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',
        timeout: 1000,
 * });
 * request.post('/api/users', {
 *    first_name: "Jeremiah",
 *    last_name: "Tenbrink",
 *    uid: "1kdhio39578sil;",
 *    username: "Jeremiah Tenbrink"
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
    "user_id": 10,
    "first_name": "Jeremiah",
    "last_name": "Tenbrink",
    "uid": "someothersuisomethingfdafdadfadfsdadfda",
    "username": "Jeremiah343223656654",
    "created_at": "2020-02-18 14:15:20.463231-07",
    "updated_at": "2020-02-18 14:15:20.463231-07"
}
 *
 */
router.post( "/", ( req, res ) => {
  let newUser = req.body;
  Users.add( newUser )
    .then( user => {
      res.logger.success( DEBUG_NAME,
        "Created new" + " user. Returning user."
      );
      res.status( 201 ).json( user );
    } )
    .catch( err => res.status( 501 )
      .json( { message: "error adding the user", error: err.message } ) );
} );

/**
 * @api {get} /api/users/all     Gets all users
 * @apiVersion 1.0.0
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',
        timeout: 1000,
 * });
 * request.get('/api/users');
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 [  {
        "user_id": 1,
        "first_name": "Jeremiah",
        "last_name": "Tenbrink",
        "uid": "12345",
        "username": "Jeremiah Tenbrink",
        "created_at": "2020-02-18 14:10:08.566262-07",
        "updated_at": "2020-02-18 14:10:08.566262-07"
    },
 {
        "user_id": 5,
        "first_name": "Jeremiah",
        "last_name": "Tenbrink",
        "uid": "someothersui",
        "username": "Jeremiah",
        "created_at": "2020-02-18 14:12:47.906184-07",
        "updated_at": "2020-02-18 14:12:47.906184-07"
    }, ...
 
 ]
 *
 */
router.get( "/all", ( req, res ) => {
  
  Users.getAll()
    .then( users => {
      res.logger.success( DEBUG_NAME, "Returning all users." );
      res.json( users );
    } )
    .catch( err => {
      res.status( 500 )
        .json( { message: "There was an error getting users." } );
    } );
} );

router.put( "/:id", restricted, ( req, res ) => {
  const changes = req.body;
  Users.update( req.params.id, changes )
    .then( user => {
      if( user ){
        res.status( 200 ).json( user );
      }else{
        res.status( 404 ).json( { message: "The user could not be found" } );
      }
    } )
    .catch( error => {
      // log error to database
      console.log( error );
      res.status( 500 ).json( {
        message: "Error updating the user."
      } );
    } );
} );

router.delete( "/:id", restricted, ( req, res ) => {
  Users.remove( req.params.id )
    .then( count => {
      if( count > 0 ){
        res.status( 200 ).json( { message: "The user has been removed" } );
      }else{
        res.status( 404 ).json( { message: "The user could not be found" } );
      }
    } )
    .catch( error => {
      // log error to database
      console.log( error );
      res.status( 500 ).json( {
        message: "Error removing the user"
      } );
    } );
} );

module.exports = router;
