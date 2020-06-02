const express = require('express')

const Decks = require('./decks-model')

const router = express.Router()

router.get('/', (req, res) => {
   Decks.find()
      .then(decks => {
         res.json(deck)
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to retrieve decks'})
      })
})

router.get('/:id', (req, res) => {
   const { id } = req.params

   Users.findById(id)
      .then(deck => {
         deck
            ? res.json(deck)
            : res.status(404).json({ message: 'Could not find a deck with that id'})
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to get deck' });
      })
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router