const router = require( "express" ).Router();
const DEBUG_NAME = "Decks";

const Decks = require( "./decks-model.js" );

/**
 * @api {post} /api/decks   Creates a new deck
 * @apiVersion 1.0.0
 * @apiName CreateNewDeck
 * @apiGroup Decks
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiParam  {String}    deck_name name of new deck
 *
 * @apiParam  {String}      [tags]      List of tags separated by ","
 *
 * @apiParam  {Boolean}     [public]    Does user want this to be seen/visible
 *     to others?
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 *
 *
 * @apiUse  Error
 *
 * @apiSuccessExample Deck Data
 *
 * {
 *    "deck_name": "Skeleton"
 *    "deck_id": 1,
 *    "user_id": 2,
 *    "created_at": "2020-02-18 14:10:08.566262-07",
 *    "updated_at": "2020-02-18 14:10:08.566262-07",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 * }
 *
 *
 */

router.post( "/", ( req, res ) => {
  let user = req.user;
  let newDeck = req.body;
  newDeck.user_id = user.user_id;
  
  Decks.add( newDeck )
    .then( deck => res.status( 201 ).json( deck ) )
    .catch( err => {
      console.log( "Newdeck from err", newDeck );
      res.status( 501 )
        .json( { message: "error adding the deck", error: err } );
    } );
} );

/**
 * @api {get} /api/decks   Retrieves all public decks
 * @apiVersion 1.0.0
 * @apiName GetAllDecks
 * @apiGroup Decks
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 *
 *
 * @apiUse  Error
 *
 * @apiSuccessExample Deck Data
 *
 * [
 *  {
 *    "deck_name": "Skeleton"
 *    "deck_id": 1,
 *    "user_id": 2,
 *    "created_at": "2020-02-18 14:10:08.566262-07",
 *    "updated_at": "2020-02-18 14:10:08.566262-07",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 *  },
 *  {
 *    "deck_name": "random"
 *    "deck_id": 5,
 *    "user_id": 4,
 *    "created_at": "2020-02-20 14:10:08.566262-07",
 *    "updated_at": "2020-02-20 14:10:08.566262-07",
 *    "tags": "random,text,here",
 *    "public": true
 *  },
 *  ...
 * ]
 */

router.get( "/", ( req, res ) => {
  Decks.getAll()
    .then( Decks => {
      res.json( Decks );
    } )
    .catch( error => {
      res.status( 500 )
        .json( { message: "There was an error getting Decks." } );
    } );
} );

/**
 * @api {get} /api/decks/user   Retrieves all current User's decks
 * @apiVersion 1.0.0
 * @apiName GetAllCurrentUserDecks
 * @apiGroup Decks
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 *
 *
 * @apiUse  Error
 *
 * @apiSuccessExample Deck Data
 *
 * [
 {
        "deck_id": 2,
        "user_id": 1,
        "created_at": "2020-03-09 14:32:23.288908-06",
        "updated_at": "2020-03-09 14:32:23.288908-06",
        "deck_name": "Some Deck",
        "tags": null,
        "public": null
    },
 {
        "deck_id": 3,
        "user_id": 1,
        "created_at": "2020-03-09 14:32:34.776917-06",
        "updated_at": "2020-03-09 14:32:34.776917-06",
        "deck_name": "Another Deck",
        "tags": null,
        "public": null
    }
 ]
 */

router.get( "/user", ( req, res ) => {
  
  let { user_id } = req.user;
  console.log( "user_id from decks/user", user_id );
  Decks.findBy( { user_id } )
    .then( decks => {
      if( decks.length > 0 ){
        res.status( 200 ).json( decks );
      }else{
        res.status( 400 )
          .json( { message: "Couldn't find decks for this user" } );
      }
    } )
    .catch( err => {
      res.status( 500 )
        .json( { message: "error retrieving decks", err } );
    } );
} );

/**
 * @api {get} /api/decks/:id   Retrieves single deck
 * @apiVersion 1.0.0
 * @apiName FindDeckById
 * @apiGroup Decks
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiParam  {Number}    deck_id deck's unique id
 
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 *
 *
 * @apiUse  Error
 *
 * @apiSuccessExample Deck Data
 *
 * {
 *    "deck_name": "Skeleton"
 *    "deck_id": 1,
 *    "user_id": 2,
 *    "created_at": "2020-02-18 14:10:08.566262-07",
 *    "updated_at": "2020-02-18 14:10:08.566262-07",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 * }
 *
 *
 */

router.get( "/:id", ( req, res ) => {
  
  let { user_id } = req.user;
  Decks.findById( req.params.id, user_id )
    .then( deck => {
      if( deck ){
        res.status( 200 ).json( deck );
      }else{
        res.status( 404 ).json( { message: "deck not found" } );
      }
    } )
    .catch( error => {
      // log error to database
      console.log( error );
      res.status( 500 ).json( {
        message: "Error retrieving the deck",
      } );
    } );
} );

/**
 * @api {put} /api/decks/:deck_id   Edits single deck
 * @apiVersion 1.0.0
 * @apiName EditDeck
 * @apiGroup Decks
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiParam  {String}    deck_name name of deck
 *
 * @apiParam  {String}      tags      List of tags separated by ","
 *
 * @apiParam  {Boolean}     public    Does user want this to be seen/visible to
 *     others?
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 *
 *
 * @apiUse  Error
 *
 * @apiSuccessExample Deck Data
 *
 * {
 *    "deck_name": "Skeleton"
 *    "deck_id": 1,
 *    "user_id": 2,
 *    "created_at": "2020-02-18 14:10:08.566262-07",
 *    "updated_at": "2020-02-18 14:10:08.566262-07",
 *    "tags": "limbs,skull,hands",
 *    "public": true
 * }
 *
 */

router.put( "/:deck_id", ( req, res ) => {
  let { user_id } = req.user;
  let changes = req.body;
  let deck_id = req.params.deck_id;
  changes.deck_id = deck_id;
  
  Decks.findBy( { deck_id } ).then( deck => {
    if( deck.length > 0 ){
      if( deck[ 0 ].user_id !== user_id ){
        res
          .status( 402 )
          .json( { message: "You aren't authorized to edit/delete this deck" } );
      }else{
        Decks.update( deck_id, changes )
          .then( deck => {
            res.status( 202 ).json( deck );
          } )
          .catch( error => {
            // log error to database
            console.log( error );
            res.status( 502 ).json( {
              message: "Error updating the deck.",
            } );
          } );
      }
    }else{
      res.status( 404 )
        .json( { message: "The deck could not be found" } );
    }
  } );
} );

/**
 * @api {delete} /api/decks/:id   Deletes a single deck
 * @apiVersion 1.0.0
 * @apiName DeleteDeck
 * @apiGroup Decks
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 *
 *
 * @apiUse  Error
 *
 * @apiSuccessExample Deck Data
 *
 * { message: "Deck successfully deleted!" }
 *
 */

router.delete( "/:deck_id", ( req, res ) => {
  let { user_id } = req.user;
  let deck_id = req.params.deck_id;
  
  Decks.findBy( { deck_id } ).then( deck => {
    if( deck.length > 0 ){
      if( deck[ 0 ].user_id !== user_id ){
        res
          .status( 400 )
          .json( { message: "You aren't authorized to edit/delete this deck" } );
      }else{
        Decks.remove( deck_id )
          .then( () => {
            res.status( 203 )
              .json( { message: "Deck successfully deleted!" } );
          } )
          .catch( error => {
            // log error to database
            console.log( error );
            res.status( 500 ).json( {
              message: "Error deleting the deck.",
            } );
          } );
      }
    }else{
      res.status( 404 )
        .json( { message: "The deck could not be found" } );
    }
  } );
} );

module.exports = router;
