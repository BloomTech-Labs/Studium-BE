const router = require("express").Router();

const cards = require("./cards-model.js");
const deckIdMiddleWare = require("../utils/findDeckIDMiddleware");
const uidMiddleWear = require("../utils/findUIDMiddleware.js");

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
 * @apiSuccessExample User Data
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
 * @apiSuccessExample User Data
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

router.get("/:id", deckIdMiddleWare, (req, res) => {
  let { deck_id } = req.deck;
  cards
    .findById(deck_id)
    .then(card => {
      if (card.length > 0) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "card not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the card"
      });
    });
});

router.get("/user", uidMiddleWear, (req, res) => {
  let { user_id } = req.user;

  cards
    .findBy({ user_id })
    .then(cards => {
      if (cards.length > 0) {
        res.status(200).json(cards);
      } else {
        res.status(400).json({ message: "Couldn't find cards for this user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Server error", err });
    });
});

router.put("/:id", deckIdMiddleWare, (req, res) => {
  let { deck_id } = req.deck;
  const changes = req.body;
  cards
    .update(deck_id, changes)
    .then(card => {
      if (card.length > 0) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "The card could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the card."
      });
    });
});

router.delete("/:id", deckIdMiddleWare, (req, res) => {
  let { deck_id } = req.deck;
  cards
    .remove(deck_id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The card has been removed" });
      } else {
        res.status(404).json({ message: "The card could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the card"
      });
    });
});

module.exports = router;
