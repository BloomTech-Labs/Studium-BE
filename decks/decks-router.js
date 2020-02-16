const router = require("express").Router();

const Decks = require("./decks-model.js");
const restricted = require("../auth/authenticate-middleware.js");

router.get("/", restricted, (req, res) => {
  Decks.getAll()
    .then(Decks => {
      res.json(Decks);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error getting Decks." });
    });
});

router.get("/:id", (req, res) => {
  Decks.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user"
      });
    });
});

router.put("/:id", restricted, (req, res) => {
  const changes = req.body;
  Decks.update(req.params.id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the user."
      });
    });
});

router.delete("/:id", restricted, (req, res) => {
  Decks.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been removed" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the user"
      });
    });
});

module.exports = router;
