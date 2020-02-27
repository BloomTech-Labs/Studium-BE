const DecksDb = require("../decks/decks-model.js");

module.exports = (req, res, next) => {
  console.log("inside of deck_id middle wear");
  const { deck_id } = req.body;

  DecksDb.findBy({ deck_id })
    .then(deck => {
      if (deck.length > 0) {
        next();
      } else {
        res.status(404).json({ message: `deck_id #${deck_id} not found` });
      }
    })
    .catch(err => {
      console.log("Error in deck middle wear.");
      res.status(500).json({ message: "Error in deck middle wear.", err });
    });
};
