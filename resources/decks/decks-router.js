const express = require('express')

const Decks = require('./decks-model.js')

const router = express.Router()

// GET ALL DECKS
router.get('/', (req, res) => {
   Decks.find()
      .then(decks => {
         res.json(decks)
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the decks!" })
      })
})

// GET SPECIFIC DECK
router.get("/:id", (req, res) => {
   const id = req.params.id;

   Decks.findDeckById(id)
      .then(deck => {
         if (deck.length) {
            deck.forEach(deck => {
               Decks.getDeckTags(req.params.id).then(tags => { // SHOWS TAGS 
                  deck.tags = tags;
                  res.status(201).json(deck)
               })
            })
         } else {
            res.status(404).json({ errorMessage: "No such deck with that ID exists." })
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the deck!" })
      })
})

// SEE CARDS WITHIN AN EXISTING DECK
router.get("/:id/cards", (req, res) => {
   const { id } = req.params;

   Decks.getDeckCards(id)
      .then(cards => {
         if (cards.length) {
            res.status(200).json(cards)
         } else {
            res.status(404).json({ errorMessage: "No cards exist within this deck." })
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the cards in this deck!" })
      })
})

// ADD NEW DECK (POST)
router.post('/', (req, res) => {
   const deckData = req.body;

   Decks.add(deckData)
      .then(deck => {
         res.status(201).json(deck)
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error adding the deck." })
      })
})

// UPDATE EXISTING DECK (PUT)
router.put('/:id', (req, res) => {
   const { id } = req.params;
   const changes = req.body;

   Decks.findDeckById(id)
      .then(deck => {
         if (deck.length) {
            Decks.update(changes, id)
               .then(updatedDeck => {
                  res.json(updatedDeck);
               });
         } else {
            res.status(404).json({ errorMessage: "No such deck with that ID exists." });
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error updating the deck." });
      });
})

// DELETE EXISTING DECK 
router.delete('/:id', (req, res) => {
   const { id } = req.params;

   Decks.remove(id)
      .then(deleted => {
         if (deleted.length) {
            res.json({ removed: deleted });
         } else {
            res.status(404).json({ errorMessage: "No such deck with that ID exists." });
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error deleting the deck." });
      });
})

module.exports = router;