const DecksDb = require("../decks/decks-model.js");

module.exports = (req, res, next) => {
  console.log("inside of deck_id middle wear");
  const { deck_id } = req.body;

  DecksDb.findBy({ deck_id })
    .then(deck => {
      req.deck = deck[0];
      next();
    })
    .catch(err => {
      console.log("Error in deck middle wear.");
      res
        .status(404)
        .json({ message: "deck_id not found", error: err.message });
    });
};
