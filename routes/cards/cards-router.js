const router = require("express").Router();

const cards = require("./cards-model.js");
const deckIdMiddleWare = require("../utils/findDeckIDMiddleware");
const uidMiddleWear = require("../utils/findUIDMiddleware.js");

/**
 * @api  {post} /api/cards   Creates a new existing card
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
 * @apiParam  {String}      username        Users display name
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.post('api/cards', {
 * "username": "newUserName"
 * })
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 * {
 *  "user_id": 1,
 *  "username": "newUserName",
 * "uid": "1859027",
 * "created_at": "2020-02-18 14:10:08.566262-07",
 * "updated_at": "2020-02-20 20:26:08.566262-07"
 * }
 */

router.post("/", deckIdMiddleWare, (req, res) => {
  let newCard = req.body;

  cards
    .add(newCard)
    .then(card => res.status(201).json(card))
    .catch(err =>
      res.status(501).json({ message: "error adding the card", error: err })
    );
});

router.get("/:id", deckIdMiddleWare, (req, res) => {
  let { deck_id } = req.deck;

  cards
    .findBy({ deck_id })
    .then(cards => {
      res.json(cards);
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error getting cards." });
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
