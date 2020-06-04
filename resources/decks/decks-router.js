const express = require('express')

const Decks = require('./decks-model.js')

const router = express.Router()

router.get('/', (req, res) => {
   Decks.find()
      .then(decks => {
         res.json(decks)
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the decks!" })
      })
})

router.get("/:id", (req, res) => {
   const id = req.params.id;

   Decks.findDeckById(id)
      .then(deck => {
         if (deck.length) {
            deck.forEach(deck => {
               Decks.getDeckTags(req.params.id).then(tags => {
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

router.post('/', (req, res) => {
   const deckData = req.body;

   if (!deckData.deck_name) {
      res.status(401).json({ errorMessage: "Please include at least a deck name!" })
   } else {
      Decks.add(deckData)
         .then(deck => {
            res.status(201).json(deck)
         })
         .catch(err => {
            res.status(500).json({ errorMessage: "There was an error adding the deck." })
         })
   }
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router