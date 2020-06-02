const express = require('express')

const Decks = require('./decks-model')

const router = express.Router()

router.get('/', (req, res) => {
   Decks.find()
      .then(decks => {
         res.json(deck)
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to retrieve decks' })
      })
})

router.get("/:id", (req, res) => {
   Decks.findDeckById(req.params.id)
      .then(deck => {
         deck.forEach(deck => {
            Decks.getDeckTags(req.params.id).then(tags => {
               deck.tags = tags;
               res.status(201).json(deck)
            })
         })

      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the deck!" })
      })
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router