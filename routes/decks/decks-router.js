const router = require("express").Router();

const Decks = require("./decks-model.js");

router.post("/", (req, res) => {
  let user = req.user;
  let newDeck = req.body;
  newDeck.user_id = user.user_id;

  Decks.add(newDeck)
    .then(deck => res.status(201).json(deck))
    .catch(err =>
      res.status(501).json({ message: "error adding the deck", error: err })
    );
});

router.get("/", (req, res) => {
  Decks.getAll()
    .then(Decks => {
      res.json(Decks);
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error getting Decks." });
    });
});

router.get("/:id", (req, res) => {
  Decks.findById(req.params.id)
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

router.get("/user", (req, res) => {
  let { user_id } = req.user;

  Decks.findBy({ user_id })
    .then(decks => {
      if (decks) {
        res.status(200).json(decks);
      } else {
        res.status(400).json({ message: "Couldn't find decks for this user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Server error", err });
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
