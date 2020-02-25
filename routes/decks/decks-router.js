const router = require("express").Router();
const DEBUG_NAME = "Decks";

const Decks = require("./decks-model.js");
const findUIDMiddleWare = require("../utils/findUIDMiddleware.js");
const createError = require("../utils/createError");

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
 * @apiParam  {String}    category  deck's category
 * 
 * @apiParam  {String}      tags      List of tags separated by ","  
 * 
 * @apiParam  {Boolean}     public    Does user want this to be seen/visible to others?
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
 *    "category": "bones",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 * }
 *
 *
 */

router.post("/", (req, res) => {
  let user = req.user;
  let newDeck = req.body;
  newDeck.user_id = user.user_id;

  Decks.add(newDeck)
    .then(deck => res.status(201).json(deck))
    .catch(err => {
      console.log("Newdeck from err", newDeck);
      res.status(501).json({ message: "error adding the deck", error: err });
    });
});

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
 *    "category": "bones",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 *  },
 *  {
 *    "deck_name": "random"
 *    "deck_id": 5,
 *    "user_id": 4,
 *    "created_at": "2020-02-20 14:10:08.566262-07",
 *    "updated_at": "2020-02-20 14:10:08.566262-07",
 *    "category": "something",
 *    "tags": "random,text,here",
 *    "public": true
 *  },
 *  ...
 * ]
 */

router.get("/", (req, res) => {
  Decks.getAll()
    .then(Decks => {
      res.json(Decks);
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error getting Decks." });
    });
});

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
 *  {
 *    "deck_name": "Skeleton"
 *    "deck_id": 1,
 *    "user_id": 2,
 *    "created_at": "2020-02-18 14:10:08.566262-07",
 *    "updated_at": "2020-02-18 14:10:08.566262-07",
 *    "category": "bones",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 *  },
 *  {
 *    "deck_name": "random"
 *    "deck_id": 5,
 *    "user_id": 2,
 *    "created_at": "2020-02-20 14:10:08.566262-07",
 *    "updated_at": "2020-02-20 14:10:08.566262-07",
 *    "category": "something",
 *    "tags": "random,text,here",
 *    "public": true
 *  },
 *  ...
 * ]
 */

router.get("/user", (req, res) => {
  let { user_id } = req.user;
  console.log("user_id from decks/user", user_id);
  Decks.findBy({ user_id })
    .then(decks => {
      if (decks.length > 0) {
        res.status(200).json(decks);
      } else {
        res.status(400).json({ message: "Couldn't find decks for this user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving decks", err });
    });
});

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
 *    "category": "bones",
 *    "tags": "limbs,skull,hands",
 *    "public": false
 * }
 *
 *
 */

router.get("/:id", (req, res) => {
  let { user_id } = req.user;
  Decks.findById(req.params.id, user_id)
    .then(deck => {
      if (deck) {
        res.status(200).json(deck);
      } else {
        res.status(404).json({ message: "deck not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the deck"
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Decks.update(req.params.id, changes)
    .then(deck => {
      if (deck) {
        res.status(200).json(deck);
      } else {
        res.status(404).json({ message: "The deck could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the deck."
      });
    });
});

router.delete("/:id", (req, res) => {
  Decks.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The deck has been removed" });
      } else {
        res.status(404).json({ message: "The deck could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the deck"
      });
    });
});

module.exports = router;
