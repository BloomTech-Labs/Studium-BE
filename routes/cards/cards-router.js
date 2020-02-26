const router = require("express").Router();

const cards = require("./cards-model.js");
const Decks = require("../decks/decks-model.js");
const deckIdMiddleWare = require("../utils/findDeckIDMiddleware");

/**
 * @api  {post} /api/cards   Creates a new card for an existing deck
 * @apiVersion  1.0.0
 * @apiName CreateNewCard
 * @apiGroup  Cards
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 *
 * @apiParam  {Number}      deck_id        Unique id of deck that card belongs to
 *
 * @apiParam  {String}      question       Question for front of card
 *
 * @apiParam  {String}      answer         Answer for back of card
 *
 * @apiParam  {String}      [tags]         Tags that relate to card
 *
 * @apiParam  {String}      [background]   Background hex color code for card customization
 *
 * @apiParam  {String}      [text]         Optional text, usage TBD
 *
 * @apiParam  {String}      [image_front]  Public (id number + file type) from data cloudinary
 *
 * @apiParam  {String}      [image_back]  Public (id number + file type) from data cloudinary
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.post('api/cards', {
 * "deck_id": 1,
 * "question": "How many moons does Earth have",
 * "answer": "1",
 * "tags", "space,earth,moon,astrology",
 * "background": "008080"
 * "text": "optional text"
 * "image_front": "321s3d56f1061d6.png",
 * "image_back": "ssdf6516s510f6.png"
 * })
 *
 * @apiUse Error
 *
 * @apiSuccessExample Card Data
 *
 * {
 * "card_id": 4,
 * "deck_id": 1,
 * "question": "How many moons does Earth have",
 * "answer": "1",
 * "tags", "space,earth,moon,astrology",
 * "background": "008080"
 * "text": "optional text"
 * "image_front": "321s3d56f1061d6.png",
 * "image_back": "ssdf6516s510f6.png"
 * }
 */

router.post("/", deckIdMiddleWare, (req, res) => {
  let newCard = req.body;
  console.log("newCard from post", newCard);
  cards
    .add(newCard)
    .then(card => res.status(201).json(card))
    .catch(err => {
      res.status(501).json({ message: "error adding the card", error: err });
    });
});

/**
 * @api  {get} /api/cards/:card_id   Retrieves a single card
 * @apiVersion  1.0.0
 * @apiName GetCard
 * @apiGroup  Cards
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.get('api/cards/1')
 *
 * @apiUse Error
 *
 * @apiSuccessExample Card Data
 *
 * {
 * "card_id": 4,
 * "deck_id": 1,
 * "question": "How many moons does Earth have",
 * "answer": "1",
 * "tags", "space,earth,moon,astrology",
 * "background": "008080"
 * "text": "optional text"
 * "image_front": "321s3d56f1061d6.png",
 * "image_back": "ssdf6516s510f6.png"
 * }
 */

router.get("/:card_id", (req, res) => {
  let { card_id } = req.params;

  cards
    .findBy({ card_id })
    .then(cards => {
      if (cards.length > 0) {
        res.status(200).json(cards);
      } else {
        res.status(404).json({ message: `Card_id #${card_id} not found` });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting cards.", error });
    });
});

/**
 * @api  {get} /api/cards/from/deck/:id   Retrieves all cards for a deck
 * @apiVersion  1.0.0
 * @apiName GetCardsFromDeck
 * @apiGroup  Cards
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.get('api/cards/from/deck/:id')
 *
 * @apiUse Error
 *
 * @apiSuccessExample Card Data
 *
 * [
 * {
 *  "card_id": 4,
 *  "deck_id": 1,
 *  "question": "How many moons does Earth have",
 *  "answer": "1",
 *  "tags", "space,earth,moon,astrology",
 *  "background": "008080"
 *  "text": "optional text"
 *  "image_front": "321s3d56f1061d6.png",
 *  "image_back": "ssdf6516s510f6.png"
 * },
 * {
 *  "card_id": 1,
 *  "deck_id": 2,
 *  "question": "What's my favorite number",
 *  "answer": "99",
 *  "tags", "truth,almost,100,not,quite,though",
 *  "background": "123456"
 *  "text": "optional text"
 *  "image_front": "6ikl46j5k1h61.png",
 *  "image_back": "984afsd61fasfd3.png"
 * }, ....
 * ]
 */

router.get("/from/deck/:deck_id", (req, res) => {
  let { deck_id } = req.params;
  cards
    .findBy({ deck_id })
    .then(cards => {
      if (cards.length > 0) {
        res.status(200).json(cards);
      } else {
        res.status(400).json({ message: "Couldn't find cards for this deck" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Server error", err });
    });
});

/**
 * @api  {put} /api/cards/:card_id   Edits an existing card
 * @apiVersion  1.0.0
 * @apiName EditCard
 * @apiGroup  Cards
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiParam  {Number}      deck_id        Unique id of deck that card belongs to
 *
 * @apiParam  {String}      question       Question for front of card
 *
 * @apiParam  {String}      answer         Answer for back of card
 *
 * @apiParam  {String}      [tags]         Tags that relate to card
 *
 * @apiParam  {String}      [background]   Background hex color code for card customization
 *
 * @apiParam  {String}      [text]         Optional text, usage TBD
 *
 * @apiParam  {String}      [image_front]  Public (id number + file type) from data cloudinary
 *
 * @apiParam  {String}      [image_back]  Public (id number + file type) from data cloudinary
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.put('api/cards/4', {
 * "deck_id": 1,
 * "question": "How many moons does Earth have",
 * "answer": "1",
 * "tags", "space,earth,moon,astrology",
 * "background": "008080"
 * "text": "optional text"
 * "image_front": "321s3d56f1061d6.png",
 * "image_back": "ssdf6516s510f6.png"
 * })
 *
 * @apiUse Error
 *
 * @apiSuccessExample Card Data
 *
 * {
 * "card_id": 4,
 * "deck_id": 1,
 * "question": "How many moons does Earth have",
 * "answer": "1",
 * "tags", "space,earth,moon,astrology",
 * "background": "008080"
 * "text": "optional text"
 * "image_front": "321s3d56f1061d6.png",
 * "image_back": "ssdf6516s510f6.png"
 * }
 */

router.put("/:card_id", deckIdMiddleWare, (req, res) => {
  let { card_id } = req.params;
  let user = req.user;
  let changes = req.body;
  let { deck_id } = changes;
  Decks.findBy({ deck_id }).then(deck => {
    if (deck[0].user_id !== user.user_id) {
      res
        .status(402)
        .json({ message: "You aren't authorized to edit/delete this card" });
    } else {
      cards
        .update(card_id, changes)
        .then(card => {
          res.status(202).json(card);
        })
        .catch(error => {
          // log error to database
          console.log(error);
          res.status(502).json({
            message: "Error updating the card."
          });
        });
    }
  });
});

/**
 * @api  {delete} /api/cards/:card_id   Deletes an existing card
 * @apiVersion  1.0.0
 * @apiName DeleteCard
 * @apiGroup  Cards
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.delete('api/cards/4')
 *
 * @apiUse Error
 *
 * @apiSuccessExample Card Data
 *
 * {message: "Card successfully deleted!"}
 *
 */

router.delete("/:card_id", (req, res) => {
  let { card_id } = req.params;
  let user = req.user;
  cards
    .findBy({ card_id })
    .then(card => {
      if (card.length > 0) {
        let { deck_id } = card[0];

        Decks.findBy({ deck_id }).then(deck => {
          if (deck[0].user_id !== user.user_id) {
            console.log(
              "card from findBy",
              card,
              "user.user_id from params",
              user.user_id
            );
            res.status(403).json({
              message: "You aren't authorized to edit/delete this card"
            });
          } else {
            cards
              .remove(card_id)
              .then(card => {
                res.status(203).json({ message: "Card successfully deleted!" });
              })
              .catch(err => {
                res.status(503).json({
                  message: "Error deleting the card.",
                  err
                });
              });
          }
        });
      } else {
        res
          .status(403)
          .json({ message: `Card id #${card[0].card_id} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Server error finding the card.",
        err
      });
    });
});

module.exports = router;
